import type { Asset, HeaderNavigationLinksCollection } from "@/types/contentful";

export interface BurgerMenuProps {
	navigationLinksCollection: HeaderNavigationLinksCollection;
	asset: Asset;
}
