export const generateRandomString = (length = 0, possible = "0123456789") =>
  Array.from(Array(length)).reduce(
    (result) =>
      result + possible.charAt(Math.floor(Math.random() * possible.length)),
    ""
  );
