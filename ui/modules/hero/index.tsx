import Image from "next/image";

import type { Hero } from "@/types/contentful";
import { ButtonLink } from "@/ui/button-link";

import styles from "./styles.module.css";

export const ModuleHero = ({ module }: { module: Hero }) => {
	const { headline, image, callToActionLink, type } = module;

	return (
		<div className={`${styles.container} ${styles[type]}`}>
			{image && (
				<Image
					fill
					priority
					alt={image.description || ""}
					className={styles.image}
					src={image.url}
				/>
			)}
			<div className={styles.content}>
				{headline && <h1 className={styles.headline}>{module.headline}</h1>}
				{headline && (
					<span
						aria-hidden="true"
						className={`${styles.headline} ${styles.visualHeadline}`}
					>
						{module.headline}
					</span>
				)}
				{callToActionLink && <ButtonLink {...callToActionLink} />}
			</div>
		</div>
	);
};
