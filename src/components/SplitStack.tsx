// Primary mark: small C/O and C/H stacked beside MBO / IMBITA.
// Geometry from design-system/components/Marca (large 120, small 56 = 0.47 S).
export function SplitStack({ className, title = "COMBO CHIMBITA" }: { className?: string; title?: string }) {
  return (
    <svg className={`mark ${className ?? ""}`} viewBox="0 0 380 236" role="img" aria-label={title}>
      <g className="mark__ink">
        <text x="14" y="55" fontSize="56" textAnchor="middle">C</text>
        <text x="14" y="106" fontSize="56" textAnchor="middle">O</text>
        <text x="36" y="106" fontSize="120">MBO</text>
        <text x="14" y="165" fontSize="56" textAnchor="middle">C</text>
        <text x="14" y="216" fontSize="56" textAnchor="middle">H</text>
        <text x="36" y="216" fontSize="120">IMBITA</text>
      </g>
    </svg>
  );
}
