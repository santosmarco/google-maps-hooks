import * as React from "react";
import { GMapsContext as GMapsContextT } from "./types";

const GMapsContext = React.createContext<GMapsContextT>({});

export default GMapsContext;
