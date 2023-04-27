interface TypeProps {
  getBonusDescriptionMap: string[];
  bonusType: string[];
}

const Types = {} as TypeProps;

Types.getBonusDescriptionMap = [
  "+# Minimum damage", // 0
  "+# Maximum damage", // 1
  "+# Attack", // 2
  "+# Health", // 3
  "+# Magic damage", // 4
  "+# Defense", // 5
  "+# Absorbed damage", // 6
  "+#% Experience", // 7
  "+# health regeneration per second", // 8
  "+#% Critical hit", // 9
  "+#% Block enemy attack", // 10
  "+#% Magic find", // 11
  "+#% Attack speed", // 12
  "+# Drain life", // 13
  "+# Flame damage", //14
  "+# Lightning damage", // 15
  "+# Pierce armor attack", // 16
  "+# Health", // 17
  "+# Cold damage", // 18
  "+#% Freeze the enemy for # seconds", // 19
  "-#% Chance of being frozen", // 20
  "+#% Magic resistance", // 21
  "+#% Flame resistance", // 22
  "+#% Lightning resistance", // 23
  "+#% Cold resistance", // 24
  "+#% Poison resistance", // 25
  "+#% Spectral resistance", // 26
  "+#% Magic damage", // 27
  "+#% Flame damage", // 28
  "+#% Lightning damage", // 29
  "+#% Cold damage", // 30
  "+#% Poison damage", // 31
  "+#% All resistances", // 32
  "+#% Prevent enemy health regeneration", // 33
  "+# Poison damage", // 34
  "#% Faster cast rate", // 35
  "-#% Enemy lower Magic resistance", // 36
  "-#% Enemy lower Flame resistance", // 37
  "-#% Enemy lower Lightning resistance", // 38
  "-#% Enemy lower Cold resistance", // 39
  "-#% Enemy lower Poison resistance", // 40
  "-#% Enemy lower resistances", // 41
  "+#% Extra gold from enemies", // 42
];

Types.bonusType = [
  "minDamage", // 0
  "maxDamage", // 1
  "attackDamage", // 2
  "health", // 3
  "magicDamage", // 4
  "defense", // 5
  "absorbedDamage", // 6
  "exp", // 7
  "regenerateHealth", // 8
  "criticalHit", // 9
  "blockChance", // 10
  "magicFind", // 11
  "attackSpeed", // 12
  "drainLife", // 13
  "flameDamage", // 14
  "lightningDamage", // 15
  "pierceDamage", // 16
  "highHealth", // 17
  "coldDamage", // 18
  "freezeChance", // 19
  "reduceFrozenChance", // 20
  "magicResistance", // 21
  "flameResistance", // 22
  "lightningResistance", // 23
  "coldResistance", // 24
  "poisonResistance", // 25
  "spectralResistance", // 26
  "magicDamagePercent", // 27
  "flameDamagePercent", // 28
  "lightningDamagePercent", // 29
  "coldDamagePercent", // 30
  "poisonDamagePercent", // 31
  "allResistance", // 32
  "preventRegenerateHealth", // 33
  "poisonDamage", // 34
  "skillTimeout", // 35
  "lowerMagicResistance", // 36
  "lowerFlameResistance", // 37
  "lowerLightningResistance", // 38
  "lowerColdResistance", // 39
  "lowerPoisonResistance", // 40
  "lowerAllResistance", // 41
  "extraGold", // 42
];

export const getBonusDescription = (bonus, stats) => {
  const index = Types.bonusType.indexOf(bonus);

  return Types.getBonusDescriptionMap[index].replace("#", stats);
};
