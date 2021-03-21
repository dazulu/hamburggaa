import { Page as PageProps, NavigationConfig } from '@/types/contentful';

export type PathParams = Pick<NavigationConfig, 'dir' | 'slug'>;

export interface PageData {
  data: {
    page: PageProps;
    navigation: NavigationConfig[];
  };
}
