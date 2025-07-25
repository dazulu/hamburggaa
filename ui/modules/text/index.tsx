import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { createRichTextRenderOptions } from "@/components/rich-text-renderer";
import type { Text } from "@/types/contentful";

import styles from "./styles.module.css";

export const ModuleText = ({ module }: { module: Text }) => {
	const { text } = module;
	const centeredClassName = module.centerText ? styles.centered : "";

	const renderOptions = createRichTextRenderOptions(text?.links);

	return (
		<div className={`${styles.container} ${centeredClassName} global-contain-width global-module-spacing`}>
			{text && documentToReactComponents(text.json, renderOptions)}
		</div>
	);
};
