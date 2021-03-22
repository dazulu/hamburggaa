import {
  Page as PageProps,
  NavigationConfig,
  SocialMediaLink,
} from '@/types/contentful';

export type PathParams = Pick<NavigationConfig, 'dir' | 'slug'>;

export interface NavigationItem {
  sys: {
    id: string;
  };
  menuLabel: string;
  dir?: string;
  slug?: string;
  url?: string;
}

export interface PageData {
  data: {
    page: PageProps;
    navigation: NavigationItem[];
    social: SocialMediaLink[];
  };
}
