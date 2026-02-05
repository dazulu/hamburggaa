import Image from "next/image";

import type { Hero } from "@/types/contentful";
import { BigText } from "@/ui/big-text";
import { ButtonLink } from "@/ui/button-link";
import { HighlightPhrases } from "@/ui/highlight-phrases";
import { Video } from "@/ui/modules/video";

import styles from "./styles.module.css";

// Defined in Contentful "Hero" module content type
type HeroType = "full" | "reduced" | "bigText";

// Limiting to one image with ability to support more later for different types of layouts
const MAX_IMAGES = 1;

export const ModuleHero = ({ module }: { module: Hero }) => {
	const {
		headline,
		text,
		mediaCollection: { items: media = [] },
		callToActionLink,
		type,
	} = module;

	const heroType = type as HeroType;

	const images = media.filter((item) => item.contentType?.startsWith("image/")).slice(0, MAX_IMAGES);
	const video = media.filter((item) => item.contentType?.startsWith("video/")).shift();

	if (heroType === "bigText") {
		return (
			<div className={`global-top-gradient ${styles.bigText}`}>
				<BigText
					text={headline}
					component="h1"
					image={images[0]}
				/>
			</div>
		);
	}

	return (
		<div className={`${styles.container} ${styles[heroType]}`}>
			{images.length >= 1 && (
				<div className={styles.image}>
					<Image
						fill
						priority
						alt={images[0].description || ""}
						src={images[0].url}
					/>
				</div>
			)}
			{video && images.length === 0 && <Video media={video} />}

			<div className={styles.content}>
				{headline && (
					<h1 className={styles.headline}>
						<HighlightPhrases text={module.headline} />
					</h1>
				)}
				{text && <p className={styles.text}>{text}</p>}
				{callToActionLink && <ButtonLink {...callToActionLink} />}
			</div>

			{heroType === "full" && (
				<div
					aria-hidden="true"
					className={styles.scrollIndicator}
				>
					<span />
					<span />
					<span />
				</div>
			)}
		</div>
	);
};
