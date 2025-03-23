import { Page } from "@/types/contentful";

export const getInternalLinkSlug = (item: Page) =>
  item.slug === "ROOT" ? "/" : `/${item.slug}`;
