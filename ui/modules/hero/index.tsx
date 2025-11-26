import Image from "next/image";

import type { Hero } from "@/types/contentful";
import { ButtonLink } from "@/ui/button-link";
import { Video } from "@/ui/modules/video";

import styles from "./styles.module.css";

export const ModuleHero = ({ module }: { module: Hero }) => {
	const { headline, media, callToActionLink, type } = module;

	const isImage = media?.contentType?.startsWith("image/");
	const isVideo = media?.contentType?.startsWith("video/");

	return (
		<div className={`${styles.container} ${styles[type]}`}>
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
