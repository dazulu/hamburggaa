import React from 'react';

export interface NavigationContextProps {
  navIsOpen?: boolean;
  setNavIsOpen: (value: boolean) => void;
}

export const NavigationContext = React.createContext<NavigationContextProps>({
  navIsOpen: false,
  setNavIsOpen: () => null,
});

export const { Provider: NavigationProvider } = NavigationContext;
export const useNavigation = (): NavigationContextProps =>
  React.useContext(NavigationContext);
