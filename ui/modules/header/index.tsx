import type { Header } from "@/types/contentful";

import { HeaderNavigation } from "./navigation";
import styles from "./styles.module.css";

export const ModuleHeader = async ({ module }: { module: Header }) => {
	return (
		<header className={styles.container}>
			<HeaderNavigation navigationLinksCollection={module.navigationLinksCollection} />
			{/* <LanguageSwitcher /> */}
		</header>
	);
};
