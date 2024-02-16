import { newAddressService } from "../lib/address-service";
import { newCsvAddressDataReader } from "../lib/csv-addressDataReader";
import { smartyAddressApi } from "../lib/smarty-addressApi";
import { consoleAddressDataWriter } from "./../lib/console-addressDataWriter";

/**
 *
 * @param file Path to CSV file containing addresses
 */
export async function correctAddressesInCsvAction(file: string) {
  /* 
  Here we build the dependecy graph for this action.
  Injecting the dependencies this way makes things easier to test and allows us to swap out implementations.
  ex. If we wanted to use a different data source, we could just swap out the reader here.
  */
  const addressService = newAddressService({
    api: smartyAddressApi,
    reader: newCsvAddressDataReader(file),
    writer: consoleAddressDataWriter,
  });

  await addressService.correctAddresses();
}
