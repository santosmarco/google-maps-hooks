import { Coordinates } from "./Coordinates";

export type RawResDataResult = {
  types: string[];
  formatted_address: string;
  address_components: {
    types: string[];
    long_name: string;
    short_name: string;
  }[];
  geometry: {
    location: Coordinates;
    location_type: string;
    viewport: { northeast: Coordinates; southwest: Coordinates };
    bounds?: { northeast: Coordinates; southwest: Coordinates };
  };
  place_id: string;
  postcode_localities?: string[];
  plus_code?: { global_code: string; compound_code: string };
  partial_match?: boolean;
};

export type FormattedResDataResult = {
  types: string[];
  formattedAddress: string;
  addressComponents: {
    types: string[];
    longName: string;
    shortName: string;
  }[];
  geometry: {
    location: Coordinates;
    locationType: string;
    viewport: { northeast: Coordinates; southwest: Coordinates };
    bounds?: { northeast: Coordinates; southwest: Coordinates };
  };
  placeId: string;
  postcodeLocalities?: string[];
  plusCode?: {
    globalCode: string;
    compoundCode: string;
  };
  partialMatch?: boolean;
};
