import { query } from "@/queries/logo";
import { getData } from "@/services/get-data";
import type { ConfigCollection } from "@/types/contentful";
import { Logo } from "@/ui/logo";
import { BurgerMenu } from "@/ui/modules/header/mobile-navigation";
import { getAllSlugs } from "@/utils/alternate-language-slugs";

import { LanguageSwitcher } from "./language-switcher";
import { HeaderNavigation } from "./navigation";
import { ScrollHeader } from "./scroll-handler";
import styles from "./styles.module.css";
import type { ModuleHeaderProps } from "./types";

export const ModuleHeader = async ({ module }: ModuleHeaderProps) => {
	// Fetch logo data once for both Logo component and BurgerMenu
	const logoData = await getData<{ configCollection: ConfigCollection }>({ query });
	const logo = logoData.configCollection.items[0].logo;

	const allPageSlugs = await getAllSlugs();

	return (
		<ScrollHeader>
			<Logo
				asset={logo}
				className={styles.logo}
			/>
			<div>
				<BurgerMenu
					asset={logo}
					navigationLinksCollection={module.navigationLinksCollection}
				/>
				<HeaderNavigation navigationLinksCollection={module.navigationLinksCollection} />
			</div>
			<div>
				<LanguageSwitcher allPageSlugs={allPageSlugs} />
			</div>
		</ScrollHeader>
	);
};
