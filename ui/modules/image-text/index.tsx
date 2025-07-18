import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

import type { ImageText } from "@/types/contentful";
import { ButtonLink } from "@/ui/button-link";

import styles from "./styles.module.css";

export const ModuleImageText = ({ module }: { module: ImageText }) => {
	const { image, text, callToActionLink } = module;

	return (
		<div className={styles.container}>
			{documentToReactComponents(text.json)}
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
