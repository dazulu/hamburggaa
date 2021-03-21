import React from 'react';
import { NavigationConfig } from '@/types/contentful';

export const NavigationContext = React.createContext<NavigationConfig[]>([]);

export const { Provider: NavigationProvider } = NavigationContext;
export const useNavigation = () => React.useContext(NavigationContext);
