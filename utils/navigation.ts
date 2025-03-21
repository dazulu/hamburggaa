import { ExternalNavigationLink, NavigationConfig } from "@/types/contentful";

export const isNavigationConfig = (
  item: ExternalNavigationLink | NavigationConfig
): item is NavigationConfig => {
  return "slug" in item;
};

export const getInternalLinkSlug = (item: NavigationConfig) =>
  item.dir === "ROOT" ? "/" : `/${item.slug}`;
