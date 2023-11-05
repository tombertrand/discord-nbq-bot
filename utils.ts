export const generateRandomString = (length = 0, possible = "0123456789") =>
  Array.from(Array(length)).reduce(
    (result) =>
      result + possible.charAt(Math.floor(Math.random() * possible.length)),
    ""
  );

export const getYearsAndMonthsSince = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp); // Create a date object from the timestamp
  let years = now.getFullYear() - past.getFullYear();
  let months = now.getMonth() - past.getMonth();

  if (months < 0 || (months === 0 && now.getDate() < past.getDate())) {
    years--;
    months = (months + 12) % 12;
  }

  // If the day of the month on the current date is less than the day of the past date,
  // we need to adjust the months count by subtracting one month
  if (now.getDate() < past.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  return { years, months };
};

