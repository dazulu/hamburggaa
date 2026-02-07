import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

import { createRichTextRenderOptions } from "@/components/rich-text-renderer";
import type { Columns } from "@/types/contentful";
import { ButtonLink } from "@/ui/button-link";

import styles from "./styles.module.css";

// Defined in Contentful "Columns" model
export type ColumnsDisplayType = "plain" | "vertical image cards";

export const ModuleColumns = ({ module }: { module: Columns }) => {
	const { headline, richTextContent, entriesCollection, maxColumns = 3 } = module;

	const displayType = (module.displayType || "plain") as ColumnsDisplayType;

	const renderOptions = createRichTextRenderOptions(richTextContent?.links);

	// Randomise order of entries so as not to give preference e.g. to teams or sport types
	const entries = [...(entriesCollection?.items || [])].sort(() => Math.random() - 0.5);

	return (
		<section className={`global-contain-width global-module-spacing ${styles.container}`}>
			<div className={styles.intro}>
				{headline && <h2>{headline}</h2>}
				{richTextContent && documentToReactComponents(richTextContent.json, renderOptions)}
			</div>
			<div
				className={styles.columns}
				style={{ "--max-columns": maxColumns } as React.CSSProperties}
			>
				{displayType === "plain" &&
					entries.map(({ sys, headline, richTextContent }) => (
						<div key={sys.id}>
							{headline && <h3>{headline}</h3>}
							{richTextContent && documentToReactComponents(richTextContent.json, renderOptions)}
						</div>
					))}
				{displayType === "vertical image cards" &&
					entries.map(({ sys, headline, richTextContent, image, callToActionLink }) => (
						<div
							key={sys.id}
							className={styles.verticalCard}
						>
							<div className={styles.verticalCardContent}>
								{headline && <h3>{headline}</h3>}
								{richTextContent && documentToReactComponents(richTextContent.json, renderOptions)}
								{callToActionLink && <ButtonLink {...callToActionLink} />}
							</div>
							{image && (
								<Image
									src={`${image.url}?w=800&q=75&f=faces&fit=fill`}
									alt={image.description || ""}
									fill
								/>
							)}
						</div>
					))}
			</div>
		</section>
	);
};
