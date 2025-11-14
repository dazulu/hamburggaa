import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { createRichTextRenderOptions } from "@/components/rich-text-renderer";
import type { Faqs } from "@/types/contentful";

import styles from "./styles.module.css";

export const ModuleFaq = ({ module }: { module: Faqs }) => {
	const { sys, title, description, questions } = module;

	const renderOptions = createRichTextRenderOptions(description?.links);

	return (
		<div className={`${styles.container} global-full-width`}>
			<div>
				<h2 className={styles.title}>{title}</h2>
				{documentToReactComponents(description.json, renderOptions)}
				<div className={styles.questions}>
					{questions.map(({ id, key: question, value: answer }, index) => (
						<details
							key={id}
							name={`faq_${sys.id}`}
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
										stroke-width="2"
										stroke-linecap="round"
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
