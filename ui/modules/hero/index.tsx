import Image from "next/image";

import type { Hero } from "@/types/contentful";
import { BigText } from "@/ui/big-text";
import { ButtonLink } from "@/ui/button-link";
import { Video } from "@/ui/modules/video";

import styles from "./styles.module.css";

// Defined in Contentful "Hero" module content type
type HeroType = "full" | "reduced" | "bigText" | "split";

export const ModuleHero = ({ module }: { module: Hero }) => {
	const { headline, media, callToActionLink, type } = module;
	const heroType = type as HeroType;

	const isImage = media?.contentType?.startsWith("image/");
	const isVideo = media?.contentType?.startsWith("video/");

	if (heroType === "bigText") {
		return (
			<div className={`global-top-gradient ${styles.bigText}`}>
				<BigText
					text={"HAMBURG GAA"}
					component="h1"
				/>
			</div>
		);
	}

	return (
		<div className={`${styles.container} ${styles[heroType]}`}>
			{isImage && media.url && (
				<Image
					fill
					priority
					alt={media.description || ""}
					className={styles.image}
					src={media.url}
				/>
			)}
			{isVideo && media.url && <Video media={media} />}
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
