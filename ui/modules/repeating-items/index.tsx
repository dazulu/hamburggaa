import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { createRichTextRenderOptions } from "@/components/rich-text-renderer";
import type { RepeatingItems } from "@/types/contentful";

import styles from "./styles.module.css";

export const ModuleRepeatingItems = ({ module }: { module: RepeatingItems }) => {
	const { sys, title, richTextContent, items } = module;

	const renderOptions = createRichTextRenderOptions(richTextContent?.links);

	return (
		<div className={`${styles.container} global-full-width`}>
			<div>
				<h2 className={styles.title}>{title}</h2>
				{documentToReactComponents(richTextContent.json, renderOptions)}
				<div className={styles.questions}>
					{items.map(({ id, key: question, value: answer }, index) => (
						<details
							key={id}
							name={`item_${sys.id}`}
							open={index === 0}
							className={styles.details}
						>
							<summary className={styles.summary}>
								{question}
								<svg
									role="presentation"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<circle
										cx="12"
										cy="12"
										r="10"
										fill="currentColor"
									/>
									<path
										d="M12 7V17M7 12H17"
										stroke="white"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
							</summary>
							{answer}
						</details>
					))}
				</div>
			</div>
		</div>
	);
};
