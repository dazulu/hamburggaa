import React from "react";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

import type { Images } from "@/types/contentful";

import styles from "./styles.module.css";

export const ImagesDisplayTypeLogos = ({ module }: { module: Images }) => {
	const { headline, text, imagesCollection } = module;
	const logos = imagesCollection?.items?.filter(Boolean) || [];

	return (
		<section className={styles.container}>
			<div className={styles.header}>
				{headline && <h2>{headline}</h2>}
				{text && <div className={styles.text}>{documentToReactComponents(text.json)}</div>}
			</div>

			{logos.length > 0 && (
				<div className={styles.logoGrid}>
					{logos.map((logo) => (
						<div
							key={logo.sys.id}
							className={styles.logoItem}
						>
							<Image
								src={logo.url}
								alt={logo.description || ""}
								width={200}
								height={120}
								className={styles.logoImage}
							/>
						</div>
					))}
				</div>
			)}
		</section>
	);
};
