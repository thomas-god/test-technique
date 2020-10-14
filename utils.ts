/**
 * Utility functions.
 */

/**
 * Check that the date format is MM-DD-YYYY.
 * @param date Date, string
 */
export function checkInputDate(date: string): boolean {
  const fields = date.split("-");
  if (fields[0].length !== 2 && Number(fields[0]) < 1 && Number(fields[0]) > 12)
    throw new Error("Erreur: mois non valide");

  if (fields[1].length !== 2 && Number(fields[1]) < 1 && Number(fields[1]) > 31)
    throw new Error("Erreur: jour non valide");

  if (fields[2].length !== 4 && Number(fields[2]) < 1)
    throw new Error("Erreur: année non valide");

  return true;
}

/**
 * Check that the format is allowed.
 * @param format String, json | csv
 */
export function checkInputFormat(format: string): boolean {
  if (!["json", "csv"].includes(format))
    throw new Error("Erreur: format non valide, doit être csv ou json.");
  return true;
}
