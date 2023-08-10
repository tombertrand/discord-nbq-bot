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
    requirement: 14,
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
    requirement: 22,
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
  dur: {
    rank: 19,
    requirement: 34,
    attribute: {
      allResistance: 4,
    },
  },
  fal: {
    rank: 20,
    requirement: 36,
    attribute: {
      magicDamagePercent: 8,
    },
  },
  kul: {
    rank: 21,
    requirement: 38,
    attribute: {
      lightningDamagePercent: 8,
    },
  },
  mer: {
    rank: 22,
    requirement: 41,
    attribute: {
      flameDamagePercent: 8,
    },
  },
  qua: {
    rank: 23,
    requirement: 44,
    attribute: {
      coldDamagePercent: 8,
    },
  },
  gul: {
    rank: 24,
    requirement: 47,
    attribute: {
      poisonDamagePercent: 8,
    },
  },
  ber: {
    rank: 25,
    requirement: 50,
    attribute: {
      skillTimeout: 6,
    },
  },
  cham: {
    rank: 26,
    requirement: 53,
    attribute: {
      poisonResistance: 10,
    },
  },
  tor: {
    rank: 27,
    requirement: 56,
    attribute: {
      coldDamage: 10,
      freezeChance: 5,
    },
  },
  xno: {
    rank: 28,
    requirement: 59,
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
      allResistance: 8,
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
    "mir-do-bul": {
      name: "Decentralizer",
      bonus: {
        maxDamage: 12,
        magicDamage: 10,
        attackDamage: 4,
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
    "do-um-hex-do-zal-mer": {
      name: "Block blade",
      bonus: {
        defense: 18,
        attackDamage: 13,
        flameDamage: 20,
        flameDamagePercent: 15,
        flameResistance: 35,
        regenerateHealth: 25,
      },
    },
    "las-bul-mir-tor-al-vie": {
      name: "Cold Wallet",
      bonus: {
        health: 80,
        minDamage: 25,
        attackDamage: 20,
        coldDamage: 40,
        freezeChance: 15,
        coldResistance: 35,
        regenerateHealth: 15,
      },
    },
    "las-tor-qua-tor-jah-vie": {
      name: "Cold Wallet 2.0",
      bonus: {
        health: 100,
        minDamage: 25,
        attackDamage: 25,
        coldDamage: 40,
        freezeChance: 25,
        reduceFrozenChance: 15,
        coldDamagePercent: 18,
        coldResistance: 35,
        regenerateHealth: 25,
      },
    },
    "bul-mir-zal-um-vax": {
      name: "Hot Wallet",
      bonus: {
        maxDamage: 15,
        attackDamage: 15,
        flameDamage: 20,
        flameResistance: 15,
        pierceDamage: 10,
      },
    },
    "ber-gul-cham-eth-eth": {
      name: "Living Whitepaper",
      bonus: {
        attackDamage: 15,
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
        minDamage: 10,
        attackDamage: 15,
        magicDamagePercent: 30,
        allResistance: 20,
        attackSpeed: 18,
        pierceDamage: 20,
        criticalHit: 8,
      },
    },
    "mer-qua-vod-mer-kul-fal": {
      name: "ASIC",
      bonus: {
        attackDamage: 20,
        coldDamage: 20,
        coldDamagePercent: 15,
        criticalHit: 10,
        regenerateHealth: 30,
        allResistance: 15,
        preventRegenerateHealth: 20,
      },
    },
    "jah-shi-tor-qua-zal": {
      name: "Not a Security",
      bonus: {
        attackDamage: 15,
        lightningDamage: 25,
        lightningDamagePercent: 20,
        pierceDamage: 20,
        freezeChance: 15,
        allResistance: 18,
        magicFind: 25,
      },
    },
    "fal-shi-zal-xno-cham": {
      name: "Sharding",
      bonus: {
        attackDamage: 20,
        magicDamage: 20,
        magicDamagePercent: 20,
        magicResistance: 20,
        pierceDamage: 25,
        allResistance: 18,
        attackSpeed: 14,
      },
    },
  },
  armor: {
    "um-hex-sol-zal-btc-fal": {
      name: "Dandelion++",
      bonus: {
        health: 60,
        defense: 20,
        flameDamage: 20,
        pierceDamage: 10,
        magicResistance: 20,
        lightningResistance: 15,
        reduceFrozenChance: 15,
      },
    },
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
    "eth-sol-zal-hex": {
      name: "Web3",
      bonus: {
        exp: 10,
        defense: 20,
        magicDamage: 20,
        magicResistance: 30,
        magicDamagePercent: 20,
      },
    },
    "nan-btc-fal-ban": {
      name: "Know Your Customer",
      bonus: {
        exp: 15,
        defense: 20,
        magicDamage: 20,
        magicResistance: 30,
        magicDamagePercent: 20,
      },
    },
    "btc-btc-btc-btc-btc-btc": {
      name: "The Maxi",
      bonus: {
        maxDamage: 15,
        health: 100,
        defense: 30,
        allResistance: 20,
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
    "btc-fal-dur-nan-shi-sat": {
      name: "Bucketing System",
      bonus: {
        health: 120,
        defense: 20,
        magicDamage: 25,
        magicDamagePercent: 20,
        allResistance: 15,
        magicResistance: 25,
        lowerMagicResistance: 15,
      },
    },
    "um-shi-dur-mer-vax-sat": {
      name: "Ascending Bootstrapping",
      bonus: {
        health: 100,
        defense: 25,
        flameDamage: 25,
        flameDamagePercent: 20,
        allResistance: 15,
        flameResistance: 25,
        lowerFlameResistance: 15,
      },
    },
    "kul-shi-hex-por-sat-kul": {
      name: "Announcement of an Announcement",
      bonus: {
        health: 60,
        defense: 20,
        lightningDamage: 30,
        lightningDamagePercent: 20,
        allResistance: 15,
        lightningResistance: 25,
        lowerLightningResistance: 15,
      },
    },
    "sol-las-qua-las-qua-shi": {
      name: "What if Price Goes Below 2K",
      bonus: {
        defense: 20,
        coldDamage: 25,
        coldDamagePercent: 20,
        allResistance: 15,
        coldResistance: 35,
        lowerColdResistance: 15,
        freezeChance: 15,
        reduceFrozenChance: 35,
      },
    },
    "eth-shi-gul-eth-sat-gul": {
      name: "Let that sink in for a Second",
      bonus: {
        health: 120,
        defense: 25,
        poisonDamage: 25,
        poisonDamagePercent: 20,
        allResistance: 15,
        poisonResistance: 25,
        lowerPoisonResistance: 25,
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
        minDamage: 8,
        attackDamage: 10,
        defense: 25,
        health: 180,
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
    "sol-btc-um-las-sat": {
      name: "Ordinals",
      bonus: {
        defense: 30,
        lightningResistance: 25,
        coldResistance: 25,
        regenerateHealth: 25,
        flameDamagePercent: 18,
      },
    },
    "zal-hex-fal-btc-eth-bul": {
      name: "Fear and Greed index",
      bonus: {
        health: 60,
        defense: 20,
        absorbedDamage: 15,
        attackDamage: 15,
        minDamage: 15,
      },
    },
    "dur-sat-do-dur-las-gul": {
      name: "Satoshi's Original Vision",
      bonus: {
        health: 180,
        defense: 30,
        poisonDamage: 20,
        poisonResistance: 35,
        allResistance: 20,
        regenerateHealth: 25,
      },
    },
    "jah-shi-xno-ber-vod-gul": {
      name: "Echo Chamber",
      bonus: {
        health: 160,
        defense: 35,
        magicDamage: 15,
        flameDamage: 15,
        lightningDamage: 15,
        coldDamage: 15,
        poisonDamage: 15,
        magicFind: 25,
        skillTimeout: 15,
        allResistance: 20,
      },
    },
  },
  helm: {
    "sat-do-vie": {
      name: "Live to fight another day",
      bonus: {
        health: 35,
        defense: 10,
        regenerateHealth: 15,
      },
    },
    "bul-bul": {
      name: "Bull market wen?",
      bonus: {
        health: 20,
        attackDamage: 5,
        defense: 10,
        regenerateHealth: 5,
      },
    },
    "mir-sat-hex": {
      name: "Mesh network",
      bonus: {
        health: 20,
        attackDamage: 15,
        defense: 5,
        lightningDamage: 15,
      },
    },
    "mer-mer-um": {
      name: "Global warming",
      bonus: {
        health: 20,
        defense: 10,
        flameDamage: 25,
        flameDamagePercent: 20,
        flameResistance: 25,
      },
    },
    "tor-qua-tor": {
      name: "Crypto Winter",
      bonus: {
        health: 20,
        coldDamage: 25,
        coldDamagePercent: 20,
        coldResistance: 25,
        freezeChance: 15,
        reduceFrozenChance: 10,
      },
    },
    "dur-kul-mer": {
      name: "Halving",
      bonus: {
        health: 40,
        attackDamage: 15,
        flameDamage: 25,
        flameDamagePercent: 15,
        flameResistance: 25,
        allResistance: 15,
      },
    },
    "ber-jah-ber": {
      name: "Censorship-Resistant",
      bonus: {
        health: 40,
        lowerAllResistance: 15,
        skillTimeout: 30,
        allResistance: 25,
      },
    },
    "dur-xno-kul": {
      name: "Shocking price is undervalued",
      bonus: {
        health: 25,
        absorbedDamage: 12,
        lightningDamage: 10,
        attackSpeed: 10,
        lightningDamagePercent: 15,
      },
    },
    "shi-xno-gul": {
      name: "Regulation is coming",
      bonus: {
        defense: 10,
        attackDamage: 10,
        poisonDamage: 20,
        poisonDamagePercent: 15,
        attackSpeed: 10,
        allResistance: 10,
        regenerateHealth: 15,
      },
    },
    "xno-xno-fal": {
      name: "Ledger Bloat",
      bonus: {
        defense: 10,
        health: 45,
        magicDamage: 25,
        magicDamagePercent: 15,
        magicResistance: 20,
        magicFind: 15,
        attackSpeed: 15,
      },
    },
    "jah-shi-vod": {
      name: "OMG!😭 Can't believe I won ! Thank you Walton team !",
      bonus: {
        health: 45,
        attackDamage: 10,
        absorbedDamage: 10,
        magicFind: 15,
        skillTimeout: 15,
        allResistance: 10,
        regenerateHealth: 15,
        preventRegenerateHealth: 20,
      },
    },
  },
};
