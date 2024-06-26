export const expForLevel = [
  1,
  8,
  18,
  36,
  68,
  100,
  150,
  256,
  410,
  625, // 10

  915,
  1296,
  1785,
  2401,
  3164,
  4096,
  5220,
  6561,
  8145,
  10000, // 20

  12155,
  14641,
  17490,
  20736,
  24414,
  28561,
  33215,
  38416,
  44205,
  50625, // 30

  57720,
  65536,
  74120,
  83521,
  93789,
  104976,
  117135,
  130321,
  144590,
  160000, // 40

  176610,
  194481,
  213675,
  234256,
  256289,
  279841,
  304980,
  331776,
  360300,
  390625, // 50

  422825,
  456976,
  493155,
  531441,
  571914,
  614_656,
  659_750,
  707_281,
  757_335,
  825_000, // 60

  900_000,
  1_000_000,
  1_125_000,
  1_275_000,
  1_450_000, // 65
  1_650_000,
  1_900_000,
  2_200_000,
  2_550_000,
  2_950_000, // 70

  3_550_000 // 71
  // 4_400_000, // 72
];

export const getLevel = function (exp: number) {
  var i = 1;
  for (i = 1; i < expForLevel.length; i++) {
    if (exp < expForLevel[i]) {
      return i;
    }
  }
  return i;
};