import { Coordinates } from "./types";
declare type GeocodeOptions = {
    bounds?: {
        southwest: Coordinates;
        northeast: Coordinates;
    };
    region?: string;
    components?: {
        type: "postal_code" | "country" | "route" | "locality" | "administrative_area";
        value: string;
    }[];
};
declare const useGeocoding: () => {
    geocode: (address: string, options?: GeocodeOptions) => Promise<import("./types/ResData").FormattedResData>;
};
export default useGeocoding;
//# sourceMappingURL=index.d.ts.map