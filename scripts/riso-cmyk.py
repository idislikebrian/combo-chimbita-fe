"""Overprint four riso separations into one halftoned CMYK-style image for the hero.

Usage:
  python3 scripts/riso-cmyk.py <separations-dir> <out.jpg> [width] [cell]

The separations are the grayscale ink channels exported for the band photo
(dark = ink). Each ink is screened as round dots at its own angle, multiplied
over the paper ground, and one ink is slipped out of register (the brand's
desfase), so the result reads as a print rather than a filter.
"""

import sys

import numpy as np
from PIL import Image

SRC = sys.argv[1]
OUT = sys.argv[2]
WIDTH = int(sys.argv[3]) if len(sys.argv) > 3 else 2000
CELL = float(sys.argv[4]) if len(sys.argv) > 4 else 5.0  # screen period in output px
SS = 3  # supersampling for clean dot edges

PREFIX = "combo chimbita 1-19.grayscale."
PAPER = (0xEF, 0xE7, 0xD8)  # fondo-100

# (channel file, brand ink hex, screen angle, slip in output px)
# Brand inks stand in for the drums: cobalto = Blue, fucsia = Fluorescent Pink,
# maiz = Sunflower, tinta = Black. Classic CMYK angles; magenta slips down-right.
INKS = [
    ("ink-3-sunflower", (0xF0, 0xC0, 0x1E), 0.0, (0, 0)),
    ("ink-3-blue", (0x2B, 0x37, 0xA3), 15.0, (0, 0)),
    ("ink-2-fluorescentpink", (0xE8, 0x45, 0x7C), 75.0, (3, 3)),
    ("ink-4-black", (0x16, 0x11, 0x0E), 45.0, (0, 0)),
]


def coverage(name, size):
    g = Image.open(f"{SRC}/{PREFIX}{name}.png").convert("L").resize(size, Image.LANCZOS)
    return 1.0 - np.asarray(g, dtype=np.float32) / 255.0  # 0 = no ink, 1 = solid


def screen(cov, angle, cell):
    """Amplitude-modulated round dots: dot area per cell matches ink coverage."""
    h, w = cov.shape
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    t = np.deg2rad(angle)
    u = x * np.cos(t) + y * np.sin(t)
    v = -x * np.sin(t) + y * np.cos(t)
    du = (u / cell) % 1.0 - 0.5
    dv = (v / cell) % 1.0 - 0.5
    d = np.sqrt(du * du + dv * dv)  # 0 at dot centre, ~0.707 at cell corner
    r = np.sqrt(np.clip(cov, 0, 1) / np.pi)  # radius (in cells) for that area
    return (d < r).astype(np.float32)


src0 = Image.open(f"{SRC}/{PREFIX}{INKS[0][0]}.png")
height = round(WIDTH * src0.height / src0.width)
big = (WIDTH * SS, height * SS)

out = np.ones((big[1], big[0], 3), dtype=np.float32) * (np.array(PAPER, np.float32) / 255.0)
for name, ink, angle, (sx, sy) in INKS:
    dots = screen(coverage(name, big), angle, CELL * SS)
    if sx or sy:
        dots = np.roll(dots, (sy * SS, sx * SS), axis=(0, 1))
    ink_rgb = np.array(ink, np.float32) / 255.0
    # Overprint: each ink multiplies what is already on the sheet. Never knock out.
    out *= 1.0 - dots[..., None] * (1.0 - ink_rgb)

img = Image.fromarray((out * 255).clip(0, 255).astype(np.uint8)).resize((WIDTH, height), Image.LANCZOS)
img.save(OUT, quality=86, optimize=True, progressive=True)
print(OUT, img.size)
