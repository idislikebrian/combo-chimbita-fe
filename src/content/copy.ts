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
    status: { es: "Crowdfunding · borrador", en: "Crowdfunding · draft" },
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
      status: { es: "Crowdfunding · borrador", en: "Crowdfunding · draft" },
      record: { es: "Nuevo disco", en: "New record" },
    },
    mediaNote: {
      es: "Imagen temporal · el video con filtro de rastreo llega después",
      en: "Temporary image · the tracking-filter video comes later",
    },
  },

  ficha: {
    heading: { es: "Estado de la campaña", en: "Campaign status" },
    band: { es: "Ficha de campaña", en: "Campaign sheet" },
    raised: { es: "Recaudado", en: "Raised" },
    goal: { es: "Meta", en: "Goal" },
    backers: { es: "Aportes", en: "Contributions" },
    testMode: { es: "Pagos de prueba · no es dinero real", en: "Test payments · not real money" },
    placeholders: {
      raised: { es: "[recaudado]", en: "[raised]" },
      goal: { es: "[meta]", en: "[goal]" },
      backers: { es: "[aportes]", en: "[contributions]" },
    },
  },

  story: {
    kicker: { es: "La historia · borrador", en: "The story · draft" },
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

  tiers: {
    kicker: { es: "Formas de entrar · borrador", en: "Ways in · draft" },
    heading: { es: "Haz parte del disco", en: "Be part of the record" },
    includes: { es: "Incluye", en: "Includes" },
    limit: { es: "Cupos", en: "Slots" },
    currency: { es: "USD", en: "USD" },
    limitPlaceholder: { es: "[límite]", en: "[limit]" },
    cta: { es: "Me sumo", en: "I'm in" },
    open: {
      name: { es: "Aporte libre", en: "Any amount" },
      body: {
        es: "Sin recompensa. Cada aporte suma al disco.",
        en: "No reward attached. Every bit counts toward the record.",
      },
      label: { es: "Monto en USD", en: "Amount in USD" },
    },
    edition: { es: "№", en: "№" },
    draftStamp: { es: "Borrador · sin aprobar", en: "Draft · not approved" },
    draftNote: {
      es: "Precios, cupos y contenidos vienen de un documento anterior y no están aprobados. Se actualizan con el documento final de recompensas.",
      en: "Prices, limits and contents come from an earlier document and aren't approved. They'll be updated from the final rewards doc.",
    },
    notAvailable: { es: "Disponible al aprobarse", en: "Available once approved" },
  },

  money: {
    kicker: { es: "A dónde va el dinero", en: "Where the money goes" },
    heading: { es: "Para empezar a grabar", en: "To start recording" },
    body: {
      es: "Esta campaña financia el inicio de la grabación del disco.",
      en: "This campaign funds the start of recording the album.",
    },
    budgetLabel: { es: "Presupuesto del proyecto", en: "Project budget" },
    pending: { es: "[desglose del presupuesto de $30K, por confirmar]", en: "[breakdown of the $30K budget, to be confirmed]" },
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
    invalidAmount: { es: "Escribe un monto de al menos ${min} USD.", en: "Enter an amount of at least ${min} USD." },
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
      es: "Tu pago se está procesando. Dale un momento.",
      en: "Your payment is still processing. Give it a moment.",
    },
    missing: {
      es: "No encontramos este pago.",
      en: "We couldn't find this payment.",
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
      es: "No se hizo ningún cobro. Cuando quieras, vuelve y elige otra forma de entrar.",
      en: "Nothing was charged. Come back and pick another way in whenever you're ready.",
    },
    back: { es: "Ver las formas de entrar", en: "See the ways in" },
  },

  footer: {
    list: { es: "Lista de correo", en: "Mailing list" },
    pending: { es: "[enlace pendiente]", en: "[link pending]" },
    rights: { es: "Brooklyn · Bogotá", en: "Brooklyn · Bogotá" },
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
