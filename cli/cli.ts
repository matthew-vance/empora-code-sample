import cac from "cac";

import { correctAddressesInCsvAction } from "./actions";

const cli = cac();
cli.help();

cli.command("<file>", "").action(correctAddressesInCsvAction);

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
