import Image from "next/image";

import type { Hero } from "@/types/contentful";
import { BigText } from "@/ui/big-text";
import { ButtonLink } from "@/ui/button-link";
import { Video } from "@/ui/modules/video";

import styles from "./styles.module.css";

// Defined in Contentful "Hero" module content type
type HeroType = "full" | "reduced" | "bigText";

const MAX_IMAGES = 3;

export const ModuleHero = ({ module }: { module: Hero }) => {
	const {
		headline,
		mediaCollection: { items: media = [] },
		callToActionLink,
		type,
	} = module;
	const heroType = type as HeroType;
	console.log(media);

	// Limited to max 3 images
	const images = media.filter((item) => item.contentType?.startsWith("image/")).slice(0, MAX_IMAGES);
	const video = media.filter((item) => item.contentType?.startsWith("video/")).shift();

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
			{images.length >= 1 && (
				<div className={`${styles.images} ${styles[`imageCount${images.length}`]}`}>
					{images.map((image, index) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: it's grand like
							key={index}
						>
							<Image
								fill
								priority
								alt={image.description || ""}
								className={styles.image}
								src={image.url}
							/>
						</div>
					))}
				</div>
			)}
			{video && images.length === 0 && <Video media={video} />}
			<div className={styles.content}>
				{headline && <h1 className={styles.headline}>{module.headline}</h1>}
				{callToActionLink && <ButtonLink {...callToActionLink} />}
			</div>
		</div>
	);
};
