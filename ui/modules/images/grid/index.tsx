import React from "react";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { createRichTextRenderOptions } from "@/components/rich-text-renderer";
import type { Images } from "@/types/contentful";

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
