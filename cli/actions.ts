import { newAddressService } from "../lib/address-service";
import { newCsvAddressDataReader } from "../lib/csv-addressDataReader";
import { smartyAddressApi } from "../lib/smarty-addressApi";
import { consoleAddressDataWriter } from "./../lib/console-addressDataWriter";

export async function correctAddressesInCsvAction(file: string) {
  const addressService = newAddressService({
    api: smartyAddressApi,
    reader: newCsvAddressDataReader(file),
    writer: consoleAddressDataWriter,
  });

  await addressService.correctAddresses();
}
