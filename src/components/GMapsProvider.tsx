import * as React from "react";
import { GMapsContext } from "../contexts";
import { GMapsProviderProps } from "./types";

const GMapsProvider: React.FC<GMapsProviderProps> = ({ apiKey, children }) => {
  return (
    <GMapsContext.Provider value={{ apiKey }}>{children}</GMapsContext.Provider>
  );
};

export default GMapsProvider;
