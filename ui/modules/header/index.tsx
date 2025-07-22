import type { Header } from "@/types/contentful";
import { BurgerMenu } from "@/ui/burger-menu";
import { Logo } from "@/ui/logo";

import { LanguageSwitcher } from "./language-switcher";
import { HeaderNavigation } from "./navigation";
import { ScrollHeader } from "./scroll-handler";
import styles from "./styles.module.css";

export const ModuleHeader = async ({ module }: { module: Header }) => {
	return (
		<ScrollHeader>
			<Logo className={styles.logo} />
			<div>
				<BurgerMenu navigationLinksCollection={module.navigationLinksCollection} />
				<HeaderNavigation navigationLinksCollection={module.navigationLinksCollection} />
			</div>
			<div>
				<LanguageSwitcher />
			</div>
		</ScrollHeader>
	);
};
