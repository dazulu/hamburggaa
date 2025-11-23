import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

import { createRichTextRenderOptions } from "@/components/rich-text-renderer";
import type { ImageText } from "@/types/contentful";
import { ButtonLink } from "@/ui/button-link";

import styles from "./styles.module.css";

export const ModuleImageText = ({ module }: { module: ImageText }) => {
	const { image, richTextContent, callToActionLink, shouldFlip } = module;

	const renderOptions = createRichTextRenderOptions(richTextContent?.links);

	const flipClassName = shouldFlip ? styles.flip : "";

	return (
		<div className={`${styles.container} ${flipClassName} global-contain-width global-module-spacing`}>
			<div className={styles.textContent}>
				{documentToReactComponents(richTextContent.json, renderOptions)}
				{callToActionLink && (
					<ButtonLink
						className={styles.button}
						{...callToActionLink}
					/>
				)}
			</div>
			{image && (
				<div className={styles.imageWrapper}>
					<Image
						alt={image.description || ""}
						src={image.url}
						width={image.width}
						height={image.height}
					/>
				</div>
			)}
		</div>
	);
};
