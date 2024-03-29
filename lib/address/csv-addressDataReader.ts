import { accessSync } from "node:fs";
import fs from "node:fs/promises";

import { z } from "zod";

import { squash } from "../string";

const csvAddressRecordSchema = z.object({
  city: z.string(),
  street: z.string(),
  zipcode: z.string(),
});

type CsvAddressRecord = z.infer<typeof csvAddressRecordSchema>;

function validateFile(file: string) {
  const isCsv = file.endsWith(".csv");
  if (!isCsv) {
    throw new Error("File must be a CSV");
  }

  try {
    accessSync(file);
  } catch {
    throw new Error("File does not exist");
  }
}

function parseHeaders(firstLine: string) {
  return firstLine.split(",").map((header) => squash(header.toLowerCase()));
}

function mapDataToCsvAddressRecords(data: string[], headers: string[]) {
  return data.map((row) => {
    const values = row.split(",");
    return Object.fromEntries(
      headers.map((header, i) => [header, values[i]?.trim()]),
    );
  });
}

function csvRecordsToCorrectedAddresses(records: CsvAddressRecord[]) {
  return records.map((record) => ({
    city: record.city,
    street: record.street,
    zip: record.zipcode,
  }));
}

/**
 * Constructs a new CSV address data reader
 * @param file Path to CSV file containing addresses
 * @returns Array of addresses
 */
export function newCsvAddressDataReader(file: string) {
  validateFile(file);

  return {
    /*
    This reads in the whole file and parses it into an array of addresses.
    This works for this sample project but long term I would rather this streamed in the file and parsed it line by line to avoid memory issues with large files.
    */
    async read() {
      const contents = await fs.readFile(file, { encoding: "utf8" });
      const lines = contents.split("\n");
      const firstLine = lines[0];
      if (!firstLine) {
        throw new Error("No header row found");
      }

      const headers = parseHeaders(firstLine);
      const data = lines.slice(1);
      const csvAddressRecords = mapDataToCsvAddressRecords(data, headers);

      return csvAddressRecordSchema
        .array()
        .transform(csvRecordsToCorrectedAddresses)
        .parse(csvAddressRecords);
    },
  };
}
