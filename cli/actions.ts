import { newAddressService } from "../lib/address-service";
import { newCsvAddressDataReader } from "../lib/csv-addressDataReader";
import { consoleAddressDataWriter } from "./../lib/console-addressDataWriter";

export async function correctAddressesInCsvAction(file: string) {
  const addressService = newAddressService({
    reader: newCsvAddressDataReader(file),
    writer: consoleAddressDataWriter,
  });

  await addressService.correctAddresses();
}
