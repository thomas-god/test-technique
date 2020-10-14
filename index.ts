import { getCentralesProd } from "./centrales";
import { aggregateProd } from "./aggregation";
import { checkInputDate, checkInputFormat } from "./utils";
import { displayFormattedData } from "./formats";

(async () => {
  try {
    // Inputs from CLI
    const from = process.argv[2];
    const to = process.argv[3];
    const format = process.argv[4];

    // Simple input validation
    checkInputDate(from);
    checkInputDate(to);
    checkInputFormat(format);

    // Getting and aggregating data
    const data = await getCentralesProd(from, to);
    const data_agg = aggregateProd(data);

    // Displaying data in the correct format
    displayFormattedData(data_agg, format);
  } catch (error) {
    console.error(error.message);
  }
})();
