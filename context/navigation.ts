import React from 'react';

export interface NavigationItem {
  sys: {
    id: string;
  };
  menuLabel: string;
  dir?: string;
  slug?: string;
  url?: string;
}

export const NavigationContext = React.createContext<Array<NavigationItem>>([]);

export const { Provider: NavigationProvider } = NavigationContext;
export const useNavigation = () => React.useContext(NavigationContext);
