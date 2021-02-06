var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { GMapsContext } from "../contexts";
var GMapsProvider = function (_a) {
    var apiKey = _a.apiKey, children = _a.children;
    return (_jsx(GMapsContext.Provider, __assign({ value: { apiKey: apiKey } }, { children: children }), void 0));
};
export default GMapsProvider;
//# sourceMappingURL=GMapsProvider.js.map