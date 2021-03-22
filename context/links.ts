import React from 'react';
import { NavigationItem } from '@/types/page';
import { SocialMediaLink } from '@/types/contentful';

export interface LinksContextProps {
  navigation: NavigationItem[];
  social: SocialMediaLink[];
}

export const LinksContext = React.createContext<LinksContextProps>({
  navigation: [],
  social: [],
});

export const { Provider: LinksProvider } = LinksContext;
export const useLinks = () => React.useContext(LinksContext);
