import { accessSync } from "node:fs";
import fs from "node:fs/promises";

import { squash } from "./string";

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

/**
 * Constructs a new CSV address data reader
 * @param file Path to CSV file containing addresses
 * @returns Array of addresses
 */
export function newCsvAddressDataReader(file: string) {
  validateFile(file);

  return {
    async read() {
      const contents = await fs.readFile(file, { encoding: "utf8" });
      const lines = contents.split("\n");
      const firstLine = lines[0];
      if (!firstLine) {
        throw new Error("No header row found");
      }

      const headers = firstLine
        .split(",")
        .map((header) => squash(header.toLowerCase()));
      const data = lines.slice(1);
      const addresses = data.map((row) => {
        const values = row.split(",");
        return Object.fromEntries(
          headers.map((header, i) => [header, values[i]?.trim()]),
        );
      });

      return addresses.map((address) => ({
        city: address["city"] ?? "",
        street: address["street"] ?? "",
        zip: address["zipcode"] ?? "",
      }));
    },
  };
}
