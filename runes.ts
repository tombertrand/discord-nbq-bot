export const Runes: { [key: string]: any } = {
  sat: {
    rank: 1,
    requirement: 1,
    attribute: {
      health: 10,
    },
  },
  al: {
    rank: 2,
    requirement: 2,
    attribute: {
      minDamage: 4,
    },
  },
  bul: {
    rank: 3,
    requirement: 3,
    attribute: {
      maxDamage: 4,
    },
  },
  nan: {
    rank: 4,
    requirement: 4,
    attribute: {
      magicDamage: 4,
    },
  },
  mir: {
    rank: 5,
    requirement: 6,
    attribute: {
      attackDamage: 4,
    },
  },
  gel: {
    rank: 6,
    requirement: 8,
    attribute: {
      absorbedDamage: 4,
    },
  },
  do: {
    rank: 7,
    requirement: 10,
    attribute: {
      defense: 4,
    },
  },
  ban: {
    rank: 8,
    requirement: 12,
    attribute: {
      exp: 4,
    },
  },
  vie: {
    rank: 9,
    requirement: 22,
    attribute: {
      regenerateHealth: 10,
    },
  },
  um: {
    rank: 10,
    requirement: 16,
    attribute: {
      flameDamage: 10,
    },
  },
  hex: {
    rank: 11,
    requirement: 18,
    attribute: {
      lightningDamage: 5,
    },
  },
  zal: {
    rank: 12,
    requirement: 20,
    attribute: {
      pierceDamage: 5,
    },
  },
  sol: {
    rank: 13,
    requirement: 14,
    attribute: {
      reduceFrozenChance: 5,
    },
  },
  eth: {
    rank: 14,
    requirement: 24,
    attribute: {
      poisonDamage: 10,
    },
  },
  btc: {
    rank: 15,
    requirement: 26,
    attribute: {
      magicResistance: 10,
    },
  },
  vax: {
    rank: 16,
    requirement: 28,
    attribute: {
      flameResistance: 10,
    },
  },
  por: {
    rank: 17,
    requirement: 30,
    attribute: {
      lightningResistance: 10,
    },
  },
  las: {
    rank: 18,
    requirement: 32,
    attribute: {
      coldResistance: 10,
    },
  },
  cham: {
    rank: 19,
    requirement: 34,
    attribute: {
      poisonResistance: 10,
    },
  },
  dur: {
    rank: 20,
    requirement: 36,
    attribute: {
      physicalResistance: 10,
    },
  },
  fal: {
    rank: 21,
    requirement: 41,
    attribute: {
      magicDamagePercent: 8,
    },
  },
  kul: {
    rank: 22,
    requirement: 44,
    attribute: {
      lightningDamagePercent: 8,
    },
  },
  mer: {
    rank: 23,
    requirement: 47,
    attribute: {
      flameDamagePercent: 8,
    },
  },
  qua: {
    rank: 24,
    requirement: 50,
    attribute: {
      coldDamagePercent: 8,
    },
  },
  gul: {
    rank: 25,
    requirement: 53,
    attribute: {
      poisonDamagePercent: 8,
    },
  },
  ber: {
    rank: 26,
    requirement: 56,
    attribute: {
      skillTimeout: 6,
    },
  },
  tor: {
    rank: 27,
    requirement: 59,
    attribute: {
      coldDamage: 10,
      freezeChance: 5,
    },
  },
  xno: {
    rank: 28,
    requirement: 38,
    attribute: {
      attackSpeed: 10,
    },
  },
  jah: {
    rank: 29,
    requirement: 62,
    attribute: {
      magicFind: 6,
    },
  },
  shi: {
    rank: 30,
    requirement: 65,
    attribute: {
      allResistance: 6,
    },
  },
  vod: {
    rank: 31,
    requirement: 68,
    attribute: {
      regenerateHealth: 10,
      preventRegenerateHealth: 10,
    },
  },
};

export const Runewords: { [key: string]: any } = {
  weapon: {
    "al-sat-mir-nan": {
      name: "Sub Second Confirmation",
      bonus: {
        health: 20,
        minDamage: 8,
        magicDamage: 6,
        attackDamage: 6,
      },
    },
    "mir-bul-al-bul-mir": {
      name: "Smart contract",
      bonus: {
        attackDamage: 12,
        maxDamage: 12,
        minDamage: 6,
      },
    },
    "bul-um-al-bul-mir-zal": {
      name: "Lightweight Node",
      bonus: {
        attackDamage: 6,
        flameDamage: 12,
        pierceDamage: 10,
        minDamage: 6,
        maxDamage: 12,
      },
    },
    "ban-nan-mir-al-btc": {
      name: "Buy the dip",
      bonus: {
        minDamage: 10,
        attackDamage: 10,
        magicDamage: 10,
        magicResistance: 15,
        exp: 10,
      },
    },
    "las-tor-mir-tor-al-vie": {
      name: "Cold Wallet",
      bonus: {
        minDamage: 10,
        attackDamage: 20,
        coldDamage: 30,
        freezeChance: 15,
        coldResistance: 15,
        regenerateHealth: 25,
      },
    },
    "bul-mir-zal-um-vax": {
      name: "Hot Wallet",
      bonus: {
        maxDamage: 10,
        attackDamage: 15,
        flameDamage: 20,
        flameResistance: 15,
        pierceDamage: 10,
      },
    },
    "ber-gul-cham-eth-eth": {
      name: "Living Whitepaper",
      bonus: {
        poisonDamage: 35,
        poisonResistance: 20,
        poisonDamagePercent: 20,
        skillTimeout: 20,
        pierceDamage: 20,
      },
    },
    "fal-btc-xno-zal-xno-fal": {
      name: "Can't the devs do something",
      bonus: {
        magicDamagePercent: 30,
        magicResistance: 20,
        attackSpeed: 30,
        pierceDamage: 20,
        criticalHit: 8,
      },
    },
    "mer-qua-vod-mer-kul-fal": {
      name: "ASIC",
      bonus: {
        attackDamage: 20,
        allResistance: 15,
        criticalHit: 8,
        regenerateHealth: 30,
        preventRegenerateHealth: 20,
      },
    },
  },
  armor: {
    "do-las-sol-vod-jah-por": {
      name: "Melon Tusk",
      bonus: {
        defense: 20,
        magicFind: 15,
        lightningResistance: 10,
        regenerateHealth: 20,
        preventRegenerateHealth: 20,
        coldResistance: 10,
        reduceFrozenChance: 20,
      },
    },
    "eth-btc-xno": {
      name: "EIP-1559",
      bonus: {
        defense: 15,
        absorbedDamage: 20,
        magicResistance: 30,
        poisonResistance: 30,
        poisonDamage: 20,
      },
    },
    "btc-bul-sol-gel-do": {
      name: "SHA-256",
      bonus: {
        defense: 20,
        absorbedDamage: 5,
        reduceFrozenChance: 20,
        coldResistance: 30,
        maxDamage: 15,
      },
    },
    "vie-do-dur-las-vax-cham": {
      name: "Double Spend",
      bonus: {
        exp: 10,
        health: 120,
        defense: 18,
        allResistance: 20,
        reduceFrozenChance: 20,
      },
    },
    "nan-btc-fal-ban": {
      name: "Know Your Customer",
      bonus: {
        exp: 10,
        defense: 20,
        magicDamage: 20,
        magicResistance: 30,
        magicDamagePercent: 20,
      },
    },
    "um-mer-por-um-jah-mer": {
      name: "The Validator",
      bonus: {
        defense: 20,
        flameDamage: 40,
        flameResistance: 20,
        flameDamagePercent: 15,
        magicFind: 15,
      },
    },
    "ban-por-kul-por-hex-ber": {
      name: "Jungle Gorilla",
      bonus: {
        defense: 15,
        lightningDamage: 20,
        lightningResistance: 35,
        lightningDamagePercent: 20,
        skillTimeout: 15,
      },
    },
    "qua-ban-tor-qua-las-tor": {
      name: "Not Your Key Not Your Crypto",
      bonus: {
        defense: 20,
        coldDamage: 40,
        coldResistance: 30,
        coldDamagePercent: 15,
        freezeChance: 20,
      },
    },
    "eth-eth-gul-cham-vie-gul": {
      name: "Growing Seed",
      bonus: {
        regenerateHealth: 25,
        defense: 30,
        poisonDamage: 50,
        poisonResistance: 40,
        poisonDamagePercent: 25,
      },
    },
    "shi-do-vod-jah-ber-gel": {
      name: "Fortune Favors The Brave",
      bonus: {
        defense: 20,
        absorbedDamage: 15,
        allResistance: 18,
        regenerateHealth: 30,
        preventRegenerateHealth: 20,
        magicFind: 20,
        skillTimeout: 20,
      },
    },
  },
  shield: {
    "gel-bul-al-sat-do": {
      name: "Pump and Dump",
      bonus: {
        health: 60,
        defense: 10,
        absorbedDamage: 10,
        attackDamage: 6,
        minDamage: 6,
      },
    },
    "vie-nan-al-mir-um-ban": {
      name: "Confirmations Per Second",
      bonus: {
        exp: 10,
        minDamage: 12,
        attackDamage: 10,
        flameDamage: 15,
        regenerateHealth: 20,
        magicDamage: 10,
      },
    },
    "vie-ban-do-vie-ban-do": {
      name: "King Gorilla",
      bonus: {
        minDamage: 10,
        attackDamage: 10,
        defense: 20,
        health: 300,
        regenerateHealth: 30,
      },
    },
    "sol-btc-vie-por-fal-vie": {
      name: "Open Representative Voting",
      bonus: {
        reduceFrozenChance: 20,
        magicResistance: 20,
        lightningResistance: 25,
        regenerateHealth: 40,
        magicDamagePercent: 20,
      },
    },
    "mer-qua-gul-ber-kul-fal": {
      name: "Ascending Bootstrapping",
      bonus: {
        magicDamagePercent: 20,
        lightningDamagePercent: 20,
        flameDamagePercent: 20,
        coldDamagePercent: 20,
        poisonDamagePercent: 20,
        skillTimeout: 20,
      },
    },
    "sol-tor-shi-vod-las-fal": {
      name: "Bucketing System",
      bonus: {
        coldDamage: 20,
        magicDamagePercent: 16,
        allResistance: 16,
        freezeChance: 10,
        coldResistance: 10,
        coldDamagePercent: 20,
        reduceFrozenChance: 15,
      },
    },
    "jah-shi-jah-ber-eth-gul": {
      name: "Echo Chamber",
      bonus: {
        poisonDamage: 30,
        magicFind: 40,
        skillTimeout: 20,
        allResistance: 16,
        poisonDamagePercent: 25,
      },
    },
  },
};
