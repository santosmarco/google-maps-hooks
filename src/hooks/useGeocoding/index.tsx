// Reference: https://developers.google.com/maps/documentation/geocoding/overview?hl=en_US#GeocodingResponses

import axios from "axios";
import * as React from "react";
import { GMapsContext } from "../../contexts";
import {
  Coordinates,
  GeocodingFormattedResponseData,
  GeocodingFormattedResponseDataResult,
  GeocodingRawResponseData,
} from "./types";

type GeocodeOptions = {
  bounds?: {
    southwest: Coordinates;
    northeast: Coordinates;
  };
  region?: string;
  components?: {
    type:
      | "postal_code"
      | "country"
      | "route"
      | "locality"
      | "administrative_area";
    value: string;
  }[];
};

const forceURIEncoding = (string: string) => {
  const decodedAddress = decodeURI(string);
  if (decodedAddress === string) {
    string = encodeURI(string);
  }
  return string;
};

const geocodingUrl = (
  apiKey: string,
  uriEncodedAddress: string,
  options: GeocodeOptions = {}
) => {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${uriEncodedAddress}&key=${apiKey}`;

  if (options.bounds) {
    url += `&bounds=${options.bounds.southwest.lat},${options.bounds.southwest.lng}|${options.bounds.northeast.lat},${options.bounds.northeast.lng}`;
  }

  if (options.region) {
    url += `&region=${options.region}`;
  }

  if (options.components && options.components.length > 0) {
    url += `&components=${options.components[0]!.type}:${
      options.components[0]!.value
    }`;
    options.components.slice(1).forEach((comp) => {
      url += `|${comp.type}:${comp.value}`;
    });
  }

  return url;
};

const formatResponseData = (
  rawData: GeocodingRawResponseData
): GeocodingFormattedResponseData => {
  const formattedData: GeocodingFormattedResponseData = {
    status: rawData.status,
    error: !["OK", "ZERO_RESULTS"].includes(rawData.status),
    results: rawData.results.map((result) => {
      const formattedResult: GeocodingFormattedResponseDataResult = {
        types: result.types,
        formattedAddress: result.formatted_address,
        addressComponents: result.address_components.map((addressComp) => ({
          types: addressComp.types,
          longName: addressComp.long_name,
          shortName: addressComp.short_name,
        })),
        geometry: {
          location: result.geometry.location,
          locationType: result.geometry.location_type,
          viewport: result.geometry.viewport,
        },
        placeId: result.place_id,
      };

      if (result.geometry.bounds) {
        formattedResult.geometry.bounds = result.geometry.bounds;
      }
      if (result.plus_code) {
        formattedResult.plusCode = {
          globalCode: result.plus_code.global_code,
          compoundCode: result.plus_code.compound_code,
        };
      }
      if (result.partial_match) {
        formattedResult.partialMatch = result.partial_match;
      }

      return formattedResult;
    }),
  };

  if (rawData.error_message) {
    formattedData.errorMessage = rawData.error_message;
  }

  return formattedData;
};

const geocode = (
  apiKey: string,
  address: string,
  options: GeocodeOptions = {}
) => {
  address = forceURIEncoding(address);

  return axios
    .get<GeocodingRawResponseData>(geocodingUrl(apiKey, address, options))
    .then((res) => {
      console.log(res);
      return formatResponseData(res.data);
    });
};

const useGeocoding = () => {
  const { apiKey } = React.useContext(GMapsContext);

  if (!apiKey) {
    throw new Error("No API key.");
  }

  return {
    geocode: (address: string, options: GeocodeOptions = {}) =>
      geocode(apiKey, address, options),
  };
};

export default useGeocoding;
