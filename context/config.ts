import { createContext, useContext } from "react";

import { Config } from "@/types/contentful";

export const ConfigContext = createContext<Config>(null);

export const { Provider: ConfigProvider } = ConfigContext;
export const useConfig = (): Config => useContext(ConfigContext);
