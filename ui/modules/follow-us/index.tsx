import type { FollowUs } from "@/types/contentful";
import { SocialIcons } from "@/ui/social";

import styles from "./styles.module.css";

export const ModuleFollowUs = ({ module }: { module: FollowUs }) => {
	const { headline } = module;

	return (
		<div className={`${styles.container} global-contain-width global-module-spacing`}>
			{headline && <h2 className={styles.headline}>{headline}</h2>}
			<SocialIcons type="horizontal" />
		</div>
	);
};
