export interface Address {
  street: string;
  city: string;
  zip: string;
}

export interface AddressDataReader {
  read(): Address[] | Promise<Address[]>;
}

export interface AddressDataWriter {
  write(data: Address[]): void | Promise<void>;
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
      writer.write(data);
    },
  };
}
