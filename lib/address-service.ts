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
