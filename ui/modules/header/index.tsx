import type { Header } from "@/types/contentful";
import { Logo } from "@/ui/logo";

import { LanguageSwitcher } from "./language-switcher";
import { HeaderNavigation } from "./navigation";
import { ScrollHeader } from "./scroll-handler";
import styles from "./styles.module.css";

export const ModuleHeader = async ({ module }: { module: Header }) => {
	return (
		<ScrollHeader>
			<span className={styles.logo}>
				<Logo />
			</span>
			<div>
				<HeaderNavigation navigationLinksCollection={module.navigationLinksCollection} />
			</div>
			<div>
				<LanguageSwitcher />
			</div>
		</ScrollHeader>
	);
};
