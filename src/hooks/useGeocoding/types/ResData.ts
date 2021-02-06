import { RawResDataResult, FormattedResDataResult } from "./ResDataResult";

interface BaseResData {
  status:
    | "OK"
    | "ZERO_RESULTS"
    | "OVER_DAILY_LIMIT"
    | "OVER_QUERY_LIMIT"
    | "REQUEST_DENIED"
    | "INVALID_REQUEST"
    | "UNKNOWN_ERROR";
}

export interface RawResData extends BaseResData {
  results: RawResDataResult[];
  error_message?: string;
}

export interface FormattedResData extends BaseResData {
  results: FormattedResDataResult[];
  error: boolean;
  errorMessage?: string;
}
