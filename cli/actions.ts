import { newAddressService } from "../lib/address-service";
import { newCsvAddressDataReader } from "../lib/csv-addressDataReader";

export async function correctAddressesInCsvAction(file: string) {
  const addressService = newAddressService({
    reader: newCsvAddressDataReader(file),
    writer: {
      write: (data) => {
        console.log(data);
      },
    },
  });

  await addressService.correctAddresses();
}
