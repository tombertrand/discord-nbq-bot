interface TypeProps {
  getBonusDescriptionMap: string[];
  bonusType: string[];
}

const Types = {} as TypeProps;

Types.getBonusDescriptionMap = [
  "+# Minimum damage",
  "+# Maximum damage",
  "+# Attack",
  "+# Health",
  "+# Magic damage",
  "+# Defense",
  "+# Absorbed damage",
  "+#% Experience",
  "+# health regeneration per second",
  "+#% Critical hit",
  "+#% Block enemy attack",
  "+#% Magic find",
  "+#% Attack speed",
  "+# Drain life",
  "+# Flame damage",
  "+# Lightning damage",
  "+# Pierce armor attack",
  "+# Health",
  "+# Cold damage",
  "+#% Freeze the enemy for # seconds",
  "-#% Chance of being frozen",
  "+#% Magic resistance",
  "+#% Flame resistance",
  "+#% Lightning resistance",
  "+#% Cold resistance",
  "+#% Poison resistance",
  "+#% Physical resistance",
  "+#% Magic damage",
  "+#% Flame damage",
  "+#% Lightning damage",
  "+#% Cold damage",
  "+#% Poison damage",
  "+#% All resistances",
  "+#% Prevent enemy health regeneration",
  "+# Poison damage",
  "-#% Skill timeout",
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
  "physicalResistance", // 26
  "magicDamagePercent", // 27
  "flameDamagePercent", // 28
  "lightningDamagePercent", // 29
  "coldDamagePercent", // 30
  "poisonDamagePercent", // 31
  "allResistance", // 32
  "preventRegenerateHealth", // 33
  "poisonDamage", // 34
  "skillTimeout", // 35
];

export const getBonusDescription = (bonus, stats) => {
  const index = Types.bonusType.indexOf(bonus);

  return Types.getBonusDescriptionMap[index].replace("#", stats);
};
