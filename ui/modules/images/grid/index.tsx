import React from "react";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import type { Images } from "@/types/contentful";
import { createRichTextRenderOptions } from "@/utils/rich-text-renderer";

import styles from "./styles.module.css";

export const ImagesDisplayTypeGrid = ({ module }: { module: Images }) => {
	const { headline, text } = module;

	const renderOptions = createRichTextRenderOptions(text?.links);

	return (
		<>
			<div className={styles.text}>
				{headline && <h2>{headline}</h2>}
				{text && documentToReactComponents(text.json, renderOptions)}
			</div>
			<pre>
				<code>{JSON.stringify(module, null, 2)}</code>
			</pre>
		</>
	);
};
