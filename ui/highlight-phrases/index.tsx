import { getLocale } from "next-intl/server";

import { highlightPhrasesQuery } from "@/queries/config";
import { getData } from "@/services/get-data";
import type { ConfigCollection } from "@/types/contentful";

import styles from "./styles.module.css";
import type { HighlightPhrasesProps } from "./types";

export const HighlightPhrases = async ({ text }: HighlightPhrasesProps) => {
	const locale = await getLocale();
	const data = await getData<{ configCollection: ConfigCollection }>({
		query: highlightPhrasesQuery,
		variables: { locale },
	});

	const phrases = (data.configCollection.items[0]?.highlightPhrases?.filter(Boolean) as string[]) ?? [];

	if (!phrases.length) {
		return <>{text}</>;
	}

	const pattern = new RegExp(`(${phrases.join("|")})`, "gi");
	const parts = text.split(pattern);

	return (
		<>
			{parts.map((part, index) => {
				const isHighlighted = phrases.some((phrase) => phrase.toLowerCase() === part.toLowerCase());

				if (isHighlighted) {
					return (
						<span
							className={styles.highlight}
							// biome-ignore lint/suspicious/noArrayIndexKey: it's grand like
							key={index}
						>
							{part}
						</span>
					);
				}

				return part;
			})}
		</>
	);
};
