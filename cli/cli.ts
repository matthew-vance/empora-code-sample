import cac from "cac";

const cli = cac();
cli.help();

cli.command("<file>", "").action((file) => {
  console.log("file", file);
});

export async function run() {
  try {
    cli.parse(process.argv, { run: false });
    await cli.runMatchedCommand();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    throw error;
  }
}
