// Reference: https://developers.google.com/maps/documentation/geocoding/overview?hl=en_US#GeocodingResponses
import axios from "axios";
import * as React from "react";
import { GMapsContext } from "../../contexts";
var forceURIEncoding = function (string) {
    var decodedAddress = decodeURI(string);
    if (decodedAddress === string) {
        string = encodeURI(string);
    }
    return string;
};
var geocodingUrl = function (apiKey, uriEncodedAddress, options) {
    if (options === void 0) { options = {}; }
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + uriEncodedAddress + "&key=" + apiKey;
    if (options.bounds) {
        url += "&bounds=" + options.bounds.southwest.lat + "," + options.bounds.southwest.lng + "|" + options.bounds.northeast.lat + "," + options.bounds.northeast.lng;
    }
    if (options.region) {
        url += "&region=" + options.region;
    }
    if (options.components && options.components.length > 0) {
        url += "&components=" + options.components[0].type + ":" + options.components[0].value;
        options.components.slice(1).forEach(function (comp) {
            url += "|" + comp.type + ":" + comp.value;
        });
    }
    return url;
};
var formatResponseData = function (rawData) {
    var formattedData = {
        status: rawData.status,
        error: !["OK", "ZERO_RESULTS"].includes(rawData.status),
        results: rawData.results.map(function (result) {
            var formattedResult = {
                types: result.types,
                formattedAddress: result.formatted_address,
                addressComponents: result.address_components.map(function (addressComp) { return ({
                    types: addressComp.types,
                    longName: addressComp.long_name,
                    shortName: addressComp.short_name,
                }); }),
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
var geocode = function (apiKey, address, options) {
    if (options === void 0) { options = {}; }
    address = forceURIEncoding(address);
    return axios
        .get(geocodingUrl(apiKey, address, options))
        .then(function (res) {
        console.log(res);
        return formatResponseData(res.data);
    });
};
var useGeocoding = function () {
    var apiKey = React.useContext(GMapsContext).apiKey;
    if (!apiKey) {
        throw new Error("No API key.");
    }
    return {
        geocode: function (address, options) {
            if (options === void 0) { options = {}; }
            return geocode(apiKey, address, options);
        },
    };
};
export default useGeocoding;
//# sourceMappingURL=index.js.map