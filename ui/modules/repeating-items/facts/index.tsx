import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { createRichTextRenderOptions } from "@/components/rich-text-renderer";
import type { RepeatingItems } from "@/types/contentful";

import styles from "./styles.module.css";

export const RepeatingItemsDisplayTypeFacts = ({ module }: { module: RepeatingItems }) => {
	const { title, richTextContent, items } = module;

	const renderOptions = createRichTextRenderOptions(richTextContent?.links);

	return (
		<div className={`${styles.container} global-full-width`}>
			<div>
				<div className={styles.header}>
					{title && <h2 className={styles.title}>{title}</h2>}
					{documentToReactComponents(richTextContent.json, renderOptions)}
				</div>
				<div className={styles.items}>
					{items.map(({ id, key: fact, value: description }) => (
						<div
							key={id}
							className={styles.item}
						>
							<div className={styles.fact}>{fact}</div>
							<div className={styles.description}>{description}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
