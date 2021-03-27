import React from 'react';

export const NavigationContext = React.createContext<{
  navIsOpen?: boolean;
  setNavIsOpen: (value: boolean) => void;
}>({
  navIsOpen: false,
  setNavIsOpen: () => null,
});

export const { Provider: NavigationProvider } = NavigationContext;
export const useNavigation = () => React.useContext(NavigationContext);
