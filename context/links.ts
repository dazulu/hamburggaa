import React, { createContext, useContext } from 'react';
import { NavigationItem } from '@/types/page';
import { SocialMediaLink } from '@/types/contentful';

export interface LinksContextProps {
  navigation: NavigationItem[];
  socialLinks: SocialMediaLink[];
}

export const LinksContext = createContext<LinksContextProps>({
  navigation: [],
  socialLinks: [],
});

export const { Provider: LinksProvider } = LinksContext;
export const useLinks = (): LinksContextProps => useContext(LinksContext);
