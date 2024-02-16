import { z, ZodIssueCode } from "zod";

import type { Address } from "./address-service";

const baseUrl = "https://us-street.api.smarty.com";
const authId = String(process.env["SMARTY_API_AUTH_ID"]);
const authToken = String(process.env["SMARTY_API_AUTH_TOKEN"]);

function createUrl(path: string, params: Record<string, string>) {
  const paramsWithAuth = new URLSearchParams({
    "auth-id": authId,
    "auth-token": authToken,
    ...params,
  }).toString();

  return `${baseUrl}/${path}?${paramsWithAuth}`;
}

const smartyAddressResponseSchema = z
  .object({
    components: z.object({
      city_name: z.string(),
      plus4_code: z.string(),
      primary_number: z.string(),
      street_name: z.string(),
      street_predirection: z.string(),
      street_suffix: z.string(),
      zipcode: z.string(),
    }),
  })
  .array()
  .nonempty();

export const smartyAddressApi = {
  getCorrectedAddress: async (address: Address) => {
    const params = {
      city: address.city,
      street: address.street,
      zipcode: address.zip,
    };
    const url = createUrl("street-address", params);
    const result = await fetch(url);
    if (!result.ok) {
      throw new Error("Error fetching data from Smarty API", {
        cause: result.statusText,
      });
    }

    const json = await result.json();

    const parseResult = smartyAddressResponseSchema.safeParse(json);
    if (!parseResult.success) {
      if (
        parseResult.error.issues.some(
          (issue) => issue.code === ZodIssueCode.too_small,
        )
      ) {
        return null;
      }
      throw new Error("Error parsing data from Smarty API", {
        cause: parseResult.error.issues,
      });
    }

    const {
      components: {
        city_name,
        plus4_code,
        primary_number,
        street_name,
        street_predirection,
        street_suffix,
        zipcode,
      },
    } = parseResult.data[0];

    return {
      city: city_name,
      street: [
        primary_number,
        street_predirection,
        street_name,
        street_suffix,
      ].join(" "),
      zip: `${zipcode}-${plus4_code}`,
    };
  },
};
