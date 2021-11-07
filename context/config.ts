import { createContext, useContext } from 'react';
import { Theme } from '@/types/contentful';

export const ConfigContext = createContext<Theme>(null);

export const { Provider: ConfigProvider } = ConfigContext;
export const useConfig = (): Theme => useContext(ConfigContext);
