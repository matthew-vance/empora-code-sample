import { describe, expect, it } from "vitest";

import { newCsvAddressDataReader } from "./csv-addressDataReader";

describe("csv-addressDataReader", () => {
  it("should throw if file does not exist", () => {
    expect(() => newCsvAddressDataReader("nonexistent.csv")).toThrowError(
      "File does not exist",
    );
  });

  it("should throw if file is not a CSV", () => {
    expect(() => newCsvAddressDataReader("nonexistent.txt")).toThrowError(
      "File must be a CSV",
    );
  });

  it("should read file", async () => {
    const fileDataReader = newCsvAddressDataReader("./test/fixtures/test.csv");

    expect(await fileDataReader.read()).toStrictEqual([
      {
        city: "Columbus",
        street: "143 e Maine Street",
        zip: "43215",
      },
      {
        city: "Title",
        street: "1 Empora St",
        zip: "11111",
      },
    ]);
  });

  it("should throw if no header row found", async () => {
    const fileDataReader = newCsvAddressDataReader(
      "./test/fixtures/no-header.csv",
    );

    await expect(fileDataReader.read()).rejects.toThrowError(
      "No header row found",
    );
  });

  it("should handle missing data", async () => {
    const fileDataReader = newCsvAddressDataReader(
      "./test/fixtures/missing-data.csv",
    );

    expect(await fileDataReader.read()).toStrictEqual([
      {
        city: "Columbus",
        street: "",
        zip: "43215",
      },
      {
        city: "",
        street: "143 e Maine Street",
        zip: "43215",
      },
      {
        city: "Columbus",
        street: "143 e Maine Street",
        zip: "",
      },
    ]);
  });
});
