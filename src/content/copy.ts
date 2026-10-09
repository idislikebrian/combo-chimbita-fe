// Every user-facing string, Spanish first. Components never hold copy.
// Story text is the band's own draft ("Visión del álbum", short versions) — DRAFT until approved.
// Anything in [brackets] is a placeholder waiting on the band.

export type Lang = "es" | "en";
export type Bilingual<T = string> = Record<Lang, T>;

export const copy = {
  meta: {
    title: "COMBO CHIMBITA · Crowdfunding",
    description: {
      es: "Crowdfunding para el nuevo disco de COMBO CHIMBITA.",
      en: "Crowdfunding for the new COMBO CHIMBITA record.",
    },
  },

  header: {
    langLabel: { es: "Idioma", en: "Language" },
    status: { es: "Crowdfunding · borrador", en: "Crowdfunding · draft" },
  },

  hero: {
    chapter: { es: "Nuevo disco", en: "New record" },
    ask: {
      es: "Crowdfunding para grabar el próximo disco de manera independiente, con la comunidad que lo ha hecho posible.",
      en: "Crowdfunding to record the next album independently, with the community that made it possible.",
    },
    cta: { es: "Contribuir", en: "Contribute" },
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
    kicker: { es: "La historia · borrador de la banda", en: "The story · band draft" },
    heading: { es: "Diez años, una historia", en: "Ten years, one story" },
    paragraphs: {
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
    },
    places: { es: "Studio 9, Massachusetts · Bogotá", en: "Studio 9, Massachusetts · Bogotá" },
  },

  tiers: {
    kicker: { es: "Lista de precios · borrador", en: "Price list · draft" },
    heading: { es: "Recompensas", en: "Rewards" },
    includes: { es: "Incluye", en: "Includes" },
    limit: { es: "Cupos", en: "Slots" },
    currency: { es: "USD", en: "USD" },
    limitPlaceholder: { es: "[límite]", en: "[limit]" },
    cta: { es: "Contribuir", en: "Contribute" },
    open: {
      name: { es: "Aporte libre", en: "Any amount" },
      body: {
        es: "Sin recompensa, todo va al disco.",
        en: "No reward, all of it goes to the record.",
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
    title: { es: "Gracias", en: "Thank you" },
    kicker: { es: "Comprobante de aporte", en: "Contribution receipt" },
    body: {
      es: "Tu aporte quedó registrado. Gracias por ser parte de este disco.",
      en: "Your contribution went through. Thank you for being part of this record.",
    },
    processing: {
      es: "Tu pago todavía se está procesando.",
      en: "Your payment is still processing.",
    },
    missing: {
      es: "No encontramos este pago.",
      en: "We couldn't find this payment.",
    },
    reward: { es: "Recompensa", en: "Reward" },
    amount: { es: "Monto", en: "Amount" },
    email: { es: "Correo", en: "Email" },
    shipping: { es: "Envío a", en: "Ships to" },
    back: { es: "Volver a la campaña", en: "Back to the campaign" },
  },

  // Post-contribution sharing. Nothing personal goes into a share: no amount, reward, name or email.
  share: {
    heading: { es: "Ayuda a que esto siga creciendo", en: "Help this keep growing" },
    /** Prefilled post for X and Threads; the campaign URL is appended. DRAFT wording. */
    message: {
      es: "Aporté al crowdfunding del nuevo disco de COMBO CHIMBITA. Súmate:",
      en: "I chipped in to the crowdfunding for COMBO CHIMBITA's new record. Join in:",
    },
    instagram: { es: "Instagram", en: "Instagram" },
    threads: { es: "Threads", en: "Threads" },
    x: { es: "X", en: "X" },
    copy: { es: "Copiar enlace", en: "Copy link" },
    copied: { es: "Enlace copiado", en: "Link copied" },
    /** Desktop / no native share: Instagram has no web share intent, so hand over the link. */
    instagramFallback: {
      es: "Enlace copiado. Pégalo en tu historia o en tu bio de Instagram.",
      en: "Link copied. Paste it into your Instagram story or bio.",
    },
    copyFailed: { es: "No se pudo copiar. Copia el enlace de arriba.", en: "Couldn't copy. Copy the link above." },
    newWindow: { es: "abre en una ventana nueva", en: "opens in a new window" },
  },

  cancelado: {
    title: { es: "Pago cancelado", en: "Payment cancelled" },
    kicker: { es: "Sin cobro", en: "Nothing charged" },
    body: {
      es: "No se hizo ningún cobro. Puedes volver y elegir otra recompensa cuando quieras.",
      en: "Nothing was charged. Come back and pick a reward whenever you like.",
    },
    back: { es: "Volver a las recompensas", en: "Back to the rewards" },
  },

  footer: {
    list: { es: "Lista de correo", en: "Mailing list" },
    pending: { es: "[enlace pendiente]", en: "[link pending]" },
    rights: { es: "Brooklyn · Bogotá", en: "Brooklyn · Bogotá" },
  },
} as const;
