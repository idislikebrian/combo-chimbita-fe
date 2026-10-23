// Every user-facing string, Spanish first. Components never hold copy.
// Story text is the band's own draft ("Visión del álbum", short versions) — DRAFT until approved.
// Anything in [brackets] is a placeholder waiting on the band.

export type Lang = "es" | "en";
export type Bilingual<T = string> = Record<Lang, T>;

export const copy = {
  meta: {
    title: "COMBO CHIMBITA · Haz parte del disco",
    description: {
      es: "Diez años, cuatro discos. El próximo lo hacemos con ustedes adentro. Crowdfunding del nuevo disco de COMBO CHIMBITA.",
      en: "Ten years, four records. We're making the next one with you in it. Crowdfunding the new COMBO CHIMBITA record.",
    },
  },

  header: {
    langLabel: { es: "Idioma", en: "Language" },
  },

  hero: {
    chapter: { es: "Nuevo disco", en: "New record" },
    ask: {
      es: "Diez años sonando porque ustedes llegaron. El próximo disco lo hacemos con ustedes adentro.",
      en: "Ten years of this music because you showed up. The next record, we make with you in it.",
    },
    cta: { es: "Haz parte del disco", en: "Be part of the record" },
    mediaAlt: {
      es: "Los cuatro integrantes de COMBO CHIMBITA en un pasillo azul, pasados por el filtro de rastreo.",
      en: "The four members of COMBO CHIMBITA in a blue hallway, run through the tracking filter.",
    },
    /** The edge-running ficha band on the hero poster. Coordinates come from campaign.ts. */
    ficha: {
      record: { es: "Nuevo disco", en: "New record" },
    },
    /** Screen-reader name of the Filtro / Trazado toggle group. */
    layersLabel: { es: "Capas", en: "Layers" },
  },

  ficha: {
    heading: { es: "Estado de la campaña", en: "Campaign status" },
    band: { es: "Ficha de campaña", en: "Where we are" },
    raised: { es: "Recaudado", en: "Raised" },
    goal: { es: "Meta", en: "Goal" },
    backers: { es: "Aportes", en: "Contributions" },
    /** Progress toward the goal (COB-614). WORKING COPY, pending band review. */
    funded: { es: "Financiado", en: "Funded" },
    /** Screen-reader name of the progress meter. */
    progress: { es: "Avance hacia la meta", en: "Progress toward the goal" },
    /** Joins raised and goal in the meter's spoken value: "$100 de $30,000". */
    of: { es: "de", en: "of" },
    /** Spoken form of the visible "<1%". */
    lessThanOne: { es: "menos de 1%", en: "less than 1%" },
    testMode: { es: "Modo de prueba · no se cobra dinero real", en: "Test mode · no real money is charged" },
    placeholders: {
      raised: { es: "…", en: "…" },
      goal: { es: "…", en: "…" },
      backers: { es: "…", en: "…" },
      funded: { es: "…", en: "…" },
    },
  },

  // Listen section: rehearsal fragments (Dropbox assets/NEW ALBUM REHERASAL CLIPS, Oct 20 2026).
  escucha: {
    kicker: { es: "Escucha · disco nuevo", en: "Listen · new record" },
    heading: { es: "Escucha", en: "Listen in" },
    body: {
      es: "Fragmentos de los ensayos del disco nuevo. Todavía crudos, todavía cambiando. Escoge uno.",
      en: "Fragments from rehearsals for the new record. Still raw, still changing. Pick one.",
    },
    tile: { es: "Fragmento", en: "Fragment" },
    play: { es: "Reproducir", en: "Play" },
    pause: { es: "Pausa", en: "Pause" },
  },

  story: {
    kicker: { es: "La historia", en: "The story" },
    heading: { es: "Diez años con ustedes", en: "Ten years, with you" },
    paragraphs: {
      es: [
        "Diez años y cuatro discos después, seguimos aquí por una razón: ustedes. La gente que llegó a los toques, que compró los discos, que le pasó una canción a alguien que la necesitaba.",
        "Esta banda duró porque una comunidad decidió quedarse. En Brooklyn, en Bogotá, y en cada ciudad donde alguien se sabe estas canciones de memoria.",
        "El disco nuevo nace desde un lugar más crudo y libre: rock latinoamericano de los 90, cumbia psicodélica, sonidos afrocaribeños y experimentales.",
        "Lo vamos a sacar de manera independiente, y no lo queremos hacer solos. Esta vez, ustedes están adentro.",
      ],
      en: [
        "Ten years and four records in, we're still here for one reason. You kept showing up. To the shows, to the records, to the moment you sent one of our songs to someone who needed it.",
        "This band lasted because a community decided to stay. In Brooklyn, in Bogotá, and every city in between where someone knows these songs by heart.",
        "The new record comes from a rawer, more direct place. 90s Latin American rock, psychedelic cumbia, Afro-Cuban chants, Batá rhythms, experimental textures, all woven into something that feels completely ours.",
        "We're releasing it independently, and we don't want to do it without you. This time, you're in it.",
      ],
    },
    places: { es: "Studio 9, Massachusetts · Bogotá", en: "Studio 9, Massachusetts · Bogotá" },
  },

  discografia: {
    kicker: { es: "Discografía", en: "Discography" },
    heading: { es: "Cuatro discos, una historia", en: "Four records, one story" },
    line: {
      es: "De El Corredor del Jaguar a IRÉ, y los sencillos que vinieron después. Empiecen por donde quieran.",
      en: "From El Corredor del Jaguar to IRÉ, plus the singles since. Start anywhere.",
    },
    singles: { es: "Sencillos", en: "Singles" },
    link: { es: "Escúchalo en Bandcamp", en: "Listen on Bandcamp" },
    types: { ep: { es: "EP", en: "EP" }, album: { es: "Álbum", en: "Album" } },
  },

  tiers: {
    kicker: { es: "Formas de entrar", en: "Ways in" },
    heading: { es: "Haz parte del disco", en: "Be part of the record" },
    includes: { es: "Incluye", en: "Includes" },
    limit: { es: "Cupos", en: "Spots" },
    currency: { es: "USD", en: "USD" },
    cta: { es: "Me sumo", en: "I'm in" },
    /** Facts already true (COB-601). WORKING COPY, pending band review. No policy beyond these. */
    terms: {
      es: [
        "El cobro a tu tarjeta se hace en el momento del aporte.",
        "Esta campaña financia el disco directamente: no es de todo o nada.",
        "El envío del disco físico no está incluido en el precio de la recompensa. Las tarifas de envío todavía se están definiendo.",
      ],
      en: [
        "Your card is charged when you contribute.",
        "This campaign funds the record directly. It isn't all-or-nothing.",
        "Shipping for the physical record isn't included in the reward price. Shipping rates are still being set.",
      ],
    },
    open: {
      name: { es: "Aporte libre", en: "Any amount" },
      body: {
        es: "Sin recompensa. Cada aporte suma al disco.",
        en: "No reward attached. Every bit counts toward the record.",
      },
      label: { es: "Monto en USD", en: "Amount in USD" },
    },
    edition: { es: "№", en: "№" },
    notAvailable: { es: "Aún no disponible", en: "Not available yet" },
  },

  // Funding breakdown and roadmap live in funding.ts.
  // SPANISH: WORKING TRANSLATION, pending band review.
  money: {
    kicker: { es: "A dónde va el dinero", en: "Where the money goes" },
    heading: { es: "Lo que hacen posible $30,000", en: "What $30,000 makes possible" },
    paragraphs: {
      es: [
        "Esta campaña lleva el disco desde el estudio hasta el mundo. Primero vienen la grabación y la mezcla. Después, la masterización, el arte y la fabricación. A partir de ahí, la campaña apoya dos sencillos y videos, prensa, el trabajo de lanzamiento y a las personas que sostienen el proyecto en cada etapa.",
        "La meta no es solo terminar un álbum. Es darle la vida completa que merece.",
      ],
      en: [
        "This campaign carries the record from the studio all the way into the world. Recording and mixing come first. Then mastering, artwork and manufacturing. From there, the campaign supports two singles and videos, press, release work, and the people carrying the project through each stage.",
        "The goal isn’t just to finish an album. It’s to give it the full life it deserves.",
      ],
    },
    goalLabel: { es: "Meta de recaudación", en: "Funding goal" },
    total: { es: "Total", en: "Total" },
    roadmapLabel: { es: "Ruta de lanzamiento", en: "Release roadmap" },
  },

  checkout: {
    working: { es: "Abriendo pago…", en: "Opening checkout…" },
    notReady: {
      es: "Los pagos aún no están conectados en esta vista previa.",
      en: "Payments aren't connected in this preview yet.",
    },
    error: { es: "No se pudo abrir el pago. Intenta de nuevo.", en: "Couldn't open checkout. Try again." },
    thanks: { es: "Gracias. Tu aporte quedó registrado.", en: "Thank you. Your contribution went through." },
    /** Shown on the receipt page while Stripe runs on test keys. */
    testMode: { es: "Modo de prueba · no se cobra dinero real", en: "Test mode · no real money is charged" },
    /** Appended to the Stripe line-item description for tiers with the physical record. WORKING COPY.
     *  Neutral on purpose: no price or timing until regional rates are approved (see shipping.ts). */
    shippingNotIncluded: { es: "Envío no incluido en el precio de la recompensa.", en: "Shipping not included in the reward price." },
    invalidAmount: { es: "Escribe un monto de al menos ${min}.", en: "Enter an amount of at least ${min}." },
  },

  // Return pages after Stripe Checkout. DRAFT wording, not reviewed by the band.
  gracias: {
    title: { es: "Ya estás adentro", en: "You're in" },
    kicker: { es: "Comprobante de aporte", en: "Contribution receipt" },
    body: {
      es: "Tu aporte quedó registrado. Este disco ya lleva algo tuyo.",
      en: "Your contribution went through. This record already has a piece of you in it.",
    },
    processing: {
      es: "Tu pago se está procesando. Recarga esta página en unos minutos.",
      en: "Your payment is still processing. Reload this page in a few minutes.",
    },
    missing: {
      // No contact address yet: add "write to us at …" back once the band confirms one.
      es: "No encontramos este pago. Revisa que el enlace esté completo o vuelve a la campaña.",
      en: "We couldn't find this payment. Check that the link is complete, or go back to the campaign.",
    },
    reward: { es: "Recompensa", en: "Reward" },
    /** Reward value when a paid session's tier can't be matched to tiers.ts. */
    rewardFallback: { es: "Sin detalle", en: "Not listed" },
    amount: { es: "Monto", en: "Amount" },
    email: { es: "Correo", en: "Email" },
    shipping: { es: "Envío a", en: "Ships to" },
    back: { es: "Volver a la campaña", en: "Back to the campaign" },
  },

  // Post-contribution sharing. Nothing personal goes into a share: no amount, reward, name or email.
  share: {
    heading: { es: "Pásalo", en: "Pass it on" },
    /** Prefilled post for X and Threads; the campaign URL is appended. DRAFT wording. */
    message: {
      es: "Me sumé al disco nuevo de COMBO CHIMBITA. Lo están haciendo independiente, con su gente adentro. Haz parte:",
      en: "I'm in on COMBO CHIMBITA's new record. They're making it independently, with their people in it. Be part of it:",
    },
    instagram: { es: "Instagram", en: "Instagram" },
    threads: { es: "Threads", en: "Threads" },
    x: { es: "X", en: "X" },
    copy: { es: "Copiar enlace", en: "Copy link" },
    linkLabel: { es: "Enlace", en: "Link" },
    copied: { es: "Enlace copiado", en: "Link copied" },
    /** Desktop / no native share: Instagram has no web share intent, so hand over the link. */
    instagramFallback: {
      es: "Enlace copiado. Pégalo en tu historia o en tu bio de Instagram.",
      en: "Link copied. Paste it into your Instagram story or bio.",
    },
    copyFailed: { es: "No se pudo copiar. Copia el enlace a mano.", en: "Couldn't copy. Copy the link by hand." },
    newWindow: { es: "abre en una ventana nueva", en: "opens in a new window" },
  },

  cancelado: {
    title: { es: "Pago cancelado", en: "Payment cancelled" },
    kicker: { es: "Sin cobro", en: "Nothing charged" },
    body: {
      es: "Cuando quieras, vuelve y elige otra forma de entrar.",
      en: "Come back and pick another way in whenever you're ready.",
    },
    back: { es: "Ver las formas de entrar", en: "See the ways in" },
  },

  // Holding page on the root domain (combochimbita.net). Not linked to the campaign yet.
  holding: {
    title: "COMBO CHIMBITA",
    description: "COMBO CHIMBITA. Lenapehoking / Abya Yala.",
    line: { es: "Otro sueño empieza.", en: "Another dream begins." },
    date: { es: "27 oct 2026", en: "Oct 27, 2026" },
    meanwhile: { es: "Escucha y sigue:", en: "Listen and follow:" },
    /** The Escucha section on the holding page; the body and tiles stay as on the campaign. */
    escucha: {
      kicker: { es: "Disco nuevo", en: "New record" },
      heading: { es: "Lo que viene.", en: "What's coming." },
    },
  },

  footer: {
    list: { es: "Lista de correo", en: "Mailing list" },
    rights: { es: "Lenapehoking / Abya Yala", en: "Lenapehoking / Abya Yala" },
  },
} as const;

// Band's original story draft. Not rendered. Source material for upcoming sections.
const storyBandDraft = {
  es: [
    "Después de cuatro discos y diez años tocando juntos, seguimos creyendo en la música como una fuerza de conexión y transformación.",
    "Este nuevo álbum nace desde un lugar más crudo y libre, inspirado por el rock latinoamericano de los 90, la cumbia psicodélica y sonidos afrocaribeños y experimentales.",
    "Queremos lanzar este disco de manera independiente, junto a la comunidad que ha crecido con nosotros durante todos estos años.",
    "Esta campaña es una invitación a ser parte de este nuevo capítulo y ayudarnos a llevar este álbum al mundo.",
  ],
  en: [
    "After four albums, we still believe in music as a force that connects experiences, dreams, and transformation. Each record has reflected a moment in our lives, and this one is no different.",
    "This new album comes from a rawer, more direct place. A sound inspired by 90s Latin American rock, psychedelic cumbia, Afro-Cuban chants, Batá rhythms and experimental textures, all woven into something that feels completely ours.",
    "These songs were born during long sessions at Studio 9 in Massachusetts, and finished in Bogotá, where new cumbias became the rhythmic heart of the album.",
    "After ten years together, COMBO CHIMBITA is more than a music project. It's a way of life. This record is who we are today.",
    "Help us release it independently and bring it directly to the community that has made this journey possible.",
  ],
};
