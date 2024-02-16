import type { AddressCorrectionResult } from "./address-service";

export const consoleAddressDataWriter = {
  write(data: AddressCorrectionResult[]) {
    data.forEach(({ corrected, original }) => {
      const formattedOriginal = `${original.street}, ${original.city}, ${original.zip}`;
      const formattedCorrected = corrected
        ? `${corrected.street}, ${corrected.city}, ${corrected.zip}`
        : "Invalid Address";
      console.log(`${formattedOriginal} -> ${formattedCorrected}`);
    });
  },
};
