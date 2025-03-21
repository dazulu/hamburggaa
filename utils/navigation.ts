import { NavigationConfig, NavigationMenuItemsItem } from "@/types/contentful";

export const isNavigationConfig = (
  item: NavigationMenuItemsItem
): item is NavigationConfig => {
  return "slug" in item;
};

export const getInternalLinkSlug = (item: NavigationConfig) =>
  item.dir === "ROOT" ? "/" : `/${item.slug}`;
