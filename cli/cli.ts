import "dotenv/config";

import cac from "cac";

import { correctAddressesInCsvAction } from "./actions";

const cli = cac();
cli.help();

cli
  .command(
    "<file>",
    "Correct addresses in a CSV file. CSV file must contain columns 'City', 'Street', and 'Zip Code' data with headers.",
  )
  .action(correctAddressesInCsvAction);

export async function run() {
  try {
    cli.parse(process.argv, { run: false });
    await cli.runMatchedCommand();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
}
