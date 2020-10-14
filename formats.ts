/**
 * Various display formats.
 */
import { ProdData } from "./types";

/**
 * Display using JSON format
 * @param data Production data
 */
function displayJSON(data: ProdData[]): void {
  data.forEach((data_point) => console.log(data_point));
}

/**
 * Display using CSV format
 * @param data Production data
 */
function displayCSV(data: ProdData[]): void {
  console.log("start,end,power");
  data.forEach((data_point) =>
    console.log(`${data_point.start},${data_point.end},${data_point.power}`)
  );
}

/**
 * Wrapper around the different display formats.
 * @param data Production data
 * @param format Format, json | csv
 */
export function displayFormattedData(data: ProdData[], format: string): void {
  switch (format) {
    case "json":
      displayJSON(data);
      break;
    case "csv":
      displayCSV(data);
      break;

    default:
      console.log("Format d'affichage non reconnu");
      break;
  }
}
