import { Coordinates as CoordinatesT } from "./Coordinates";
import { FormattedResData, RawResData } from "./ResData";
import { FormattedResDataResult, RawResDataResult } from "./ResDataResult";

export type Coordinates = CoordinatesT;

export type GeocodingRawResponseData = RawResData;
export type GeocodingFormattedResponseData = FormattedResData;

export type GeocodingRawResponseDataResult = RawResDataResult;
export type GeocodingFormattedResponseDataResult = FormattedResDataResult;
