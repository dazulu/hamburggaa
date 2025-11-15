import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

import { createRichTextRenderOptions } from "@/components/rich-text-renderer";
import type { ImageText } from "@/types/contentful";
import { ButtonLink } from "@/ui/button-link";

import styles from "./styles.module.css";

export const ModuleImageText = ({ module }: { module: ImageText }) => {
	const { image, richTextContent, callToActionLink } = module;

	const renderOptions = createRichTextRenderOptions(richTextContent?.links);

	return (
		<div className={`${styles.container} global-contain-width global-module-spacing`}>
			{documentToReactComponents(richTextContent.json, renderOptions)}
			{image && (
				<Image
					alt={image.description || ""}
					src={image.url}
					width={image.width}
					height={image.height}
				/>
			)}
			{callToActionLink && <ButtonLink {...callToActionLink} />}
		</div>
	);
};
