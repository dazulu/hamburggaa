import { NavigationConfig } from '@/types/contentful';

export type PathParams = Pick<NavigationConfig, 'dir' | 'slug'>;
