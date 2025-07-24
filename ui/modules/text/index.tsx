import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import type { Text } from "@/types/contentful";
import { createRichTextRenderOptions } from "@/utils/rich-text-renderer";

import styles from "./styles.module.css";

export const ModuleText = ({ module }: { module: Text }) => {
	const { text } = module;
	const centeredClassName = module.centerText ? styles.centered : "";

	const renderOptions = createRichTextRenderOptions(text?.links);

	return (
		<div className={`${styles.container} ${centeredClassName}`}>
			{text && documentToReactComponents(text.json, renderOptions)}
		</div>
	);
};
