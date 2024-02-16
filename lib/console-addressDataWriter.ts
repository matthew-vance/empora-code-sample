import type { AddressCorrectionResult } from "./address-service";

export const consoleAddressDataWriter = {
  write(data: AddressCorrectionResult[]) {
    data.forEach(({ corrected, original }) => {
      console.log(
        `${original.street}, ${original.city}, ${original.zip} -> ${corrected.street}, ${corrected.city}, ${corrected.zip}`,
      );
    });
  },
};
