/**
 * Contient les wrappers autour des API spécifiques de chaque
 * centrales.
 */

import * as https from "https";
import { ProdData, CentraleProdData } from "./types";

const api_url = "https://interview.beta.bcmenergy.fr";

/**
 * Wrapper around the Hawes APIs.
 * @param from Date start
 * @param to Date end
 */
async function getHawesProd(from, to): Promise<CentraleProdData> {
  const data = await get(from, to, "hawes");
  const data_clean = checkMissingDataPoint(data);
  return {
    name: "hawes",
    prod: data_clean,
  };
}

/**
 * Wrapper around the Barnsley APIs.
 * @param from Date start
 * @param to Date end
 */
async function getBarnsleyProd(from, to): Promise<CentraleProdData> {
  const data = (await get(from, to, "barnsley")).map((point) => {
    return {
      start: point.start_time,
      end: point.end_time,
      power: point.value,
    };
  });
  const data_clean = checkMissingDataPoint(data);
  return {
    name: "barnsley",
    prod: data_clean,
  };
}

/**
 * Wrapper around the Hounslow APIs.
 * @param from Date start
 * @param to Date end
 */
async function getHounslowProd(from, to): Promise<CentraleProdData> {
  const data = (await get(from, to, "hounslow", false))
    .split("\n")
    .slice(1)
    .map((str) => {
      const fields = str.split(",");
      return {
        start: Number(fields[0]),
        end: Number(fields[1]),
        power: Number(fields[2]),
      };
    });
  const data_clean = checkMissingDataPoint(data);
  return {
    name: "Hounslow",
    prod: data_clean,
  };
}

/**
 * Wrapper around the different power plants APIs.
 * @param from Date start
 * @param to Date end
 */
export async function getCentralesProd(from, to): Promise<CentraleProdData[]> {
  const data = await Promise.all([
    getHawesProd(from, to),
    getBarnsleyProd(from, to),
    getHounslowProd(from, to),
  ]);
  return data;
}

/**
 * Wrapper autour de https.request.
 * @param from Start time, MM-DD-YYY
 * @param to End time, MM-DD-YYY
 * @param centrale Power plant name
 * @param json Default true, parse the body as JSON
 */
async function get(from, to, centrale, json = true): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(`${api_url}/${centrale}?from=${from}&to=${to}`, (res) => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", (data) => {
        body += data;
      });
      res.on("end", () => {
        if (json) body = JSON.parse(body);
        resolve(body);
      });
      res.on("error", (err) => {
        console.log(`Error: ${centrale} - ${err.message}`);
        reject();
      });
    });
  });
}

/**
 * Fix missing data points.
 * @param data Production data
 * @param verbose Default false. If true prints the number of missing points fixed.
 */
export function checkMissingDataPoint(
  data: ProdData[],
  verbose = false
): ProdData[] {
  const clean_data = [data[0]];
  let n_missing = 0;
  for (let i = 1; i < data.length - 1; i++) {
    if (data[i].start !== data[i - 1].end) {
      clean_data.push({
        start: data[i - 1].end,
        end: data[i].start,
        power: (data[i].power + data[i - 1].power) / 2,
      });
      n_missing++;
    }
    clean_data.push(data[i]);
  }
  clean_data.push(data[data.length - 1]);
  if (verbose)
    console.log(
      `Fix ${n_missing} missing data points over ${data.length} initial points`
    );
  return clean_data;
}
