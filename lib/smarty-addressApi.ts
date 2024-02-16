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

    const json = (await result.json()) as [
      {
        components: {
          city_name: string;
          plus4_code: string;
          primary_number: string;
          street_name: string;
          street_predirection: string;
          street_suffix: string;
          zipcode: string;
        };
      },
    ];

    if (json.length < 1) {
      return null;
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
    } = json[0];

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
