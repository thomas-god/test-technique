import { CentraleProdData, ProdData } from "./types";

/**
 * Agrège les données de production du parc.
 * @param data_centrales Liste de production de centrales
 */
export function aggregateProd(data_centrales: CentraleProdData[]): ProdData[] {
  if (data_centrales.length === 0) {
    return [];
  } else if (data_centrales.length === 1) {
    return data_centrales[0].prod;
  } else {
    const data_agg = [];
    for (let i = 0; i < data_centrales[0].prod.length; i++) {
      data_agg.push({
        start: data_centrales[0].prod[i].start,
        end: data_centrales[0].prod[i].end,
        power: data_centrales
          .map((c) => c.prod[i].power)
          .reduce((s, a) => s + a),
      });
    }
    return data_agg;
  }
}
