import React, { createContext, useContext } from 'react';

export interface NavigationContextProps {
  navIsOpen?: boolean;
  setNavIsOpen: (value: boolean) => void;
}

export const NavigationContext = createContext<NavigationContextProps>({
  navIsOpen: false,
  setNavIsOpen: () => null,
});

export const { Provider: NavigationProvider } = NavigationContext;
export const useNavigation = (): NavigationContextProps =>
  useContext(NavigationContext);
