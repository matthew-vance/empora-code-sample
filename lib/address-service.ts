/*
This service defines all of the domain objects used in the address correction process.
Any logic here has no direct side effects, and all of the side effects are abstracted away behind interfaces.
It is important that all collaborators utilize the domain types defined here so that this service can remain ignorant of implementation details of dependencies.
This is a key tenet of hexagonal architecture.
*/

export interface Address {
  city: string;
  street: string;
  zip: string;
}

export interface AddressCorrectionResult {
  corrected: Address | null;
  original: Address;
}

export interface AddressDataReader {
  read(): Address[] | Promise<Address[]>;
}

export interface AddressApi {
  getCorrectedAddress(address: Address): Promise<Address | null>;
}

export interface AddressDataWriter {
  write(
    data: { original: Address; corrected: Address | null }[],
  ): void | Promise<void>;
}

/**
 * Constructs a new address service
 * @param dependencies
 * @returns
 */
export function newAddressService({
  api,
  reader,
  writer,
}: {
  api: AddressApi;
  reader: AddressDataReader;
  writer: AddressDataWriter;
}) {
  return {
    async correctAddresses() {
      const data = await reader.read();
      const correctionResult = await Promise.all(
        data.map(async (address) => ({
          corrected: await api.getCorrectedAddress(address),
          original: address,
        })),
      );
      writer.write(correctionResult);
    },
  };
}
