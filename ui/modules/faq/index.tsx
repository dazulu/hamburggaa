import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { createRichTextRenderOptions } from "@/components/rich-text-renderer";
import type { Faqs } from "@/types/contentful";

import styles from "./styles.module.css";

export const ModuleFaq = ({ module }: { module: Faqs }) => {
	const { sys, title, description, questions } = module;

	const renderOptions = createRichTextRenderOptions(description?.links);

	return (
		<div className={styles.container}>
			<h2>{title}</h2>
			{documentToReactComponents(description.json, renderOptions)}
			<div className={styles.questions}>
				{questions.map(({ id, key: question, value: answer }, index) => (
					<details
						key={id}
						name={`faq_${sys.id}`}
						open={index === 0}
						className={styles.details}
					>
						<summary className={styles.summary}>{question}</summary>
						{answer}
					</details>
				))}
			</div>
		</div>
	);
};
