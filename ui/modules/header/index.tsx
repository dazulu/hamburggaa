import type { Header } from "@/types/contentful";

import { LanguageSwitcher } from "./language-switcher";
import { HeaderNavigation } from "./navigation";
import styles from "./styles.module.css";

export const ModuleHeader = async ({ module }: { module: Header }) => {
	return (
		<header className={styles.container}>
			<div className={styles.left}></div>
			<div className={styles.right}>
				<LanguageSwitcher />
			</div>
		</header>
	);
};
