export interface Address {
  city: string;
  street: string;
  zip: string;
}

export interface AddressCorrectionResult {
  corrected: Address;
  original: Address;
}

export interface AddressDataReader {
  read(): Address[] | Promise<Address[]>;
}

export interface AddressDataWriter {
  write(
    data: { original: Address; corrected: Address }[],
  ): void | Promise<void>;
}

export function newAddressService({
  reader,
  writer,
}: {
  reader: AddressDataReader;
  writer: AddressDataWriter;
}) {
  return {
    async correctAddresses() {
      const data = await reader.read();
      writer.write(
        data.map((address) => ({ corrected: address, original: address })),
      );
    },
  };
}
