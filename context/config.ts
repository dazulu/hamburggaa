import React from 'react';
import { Theme } from '@/types/contentful';

export const ConfigContext = React.createContext<Theme>(null);

export const { Provider: ConfigProvider } = ConfigContext;
export const useConfig = (): Theme => React.useContext(ConfigContext);
