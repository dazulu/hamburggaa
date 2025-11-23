import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

import { createRichTextRenderOptions } from "@/components/rich-text-renderer";
import type { PersonList } from "@/types/contentful";

import styles from "./styles.module.css";

export const ModulePersonList = ({ module }: { module: PersonList }) => {
	const { headline, richTextContent, peopleCollection } = module;

	const renderOptions = createRichTextRenderOptions(richTextContent?.links);

	return (
		<div className={`${styles.container} global-contain-width global-module-spacing`}>
			<div className={styles.textContent}>
				<h2>{headline}</h2>
				{richTextContent ? documentToReactComponents(richTextContent.json, renderOptions) : null}
			</div>
			{peopleCollection.items?.length && (
				<ul className={styles.people}>
					{peopleCollection.items.map((person) => (
						<li key={person.sys.id}>
							<figure className={styles.personCard}>
								{person.image && (
									<div className={styles.imageWrapper}>
										<Image
											fill
											src={`${person.image.url}?fit=fill&w=400&fm=avif&q=80`}
											alt={person.image.description || ""}
										/>
									</div>
								)}
								<figcaption className={styles.personInfo}>
									<p className={styles.personName}>{person.name}</p>
									<p className={styles.personRole}>{person.role}</p>
								</figcaption>
							</figure>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
