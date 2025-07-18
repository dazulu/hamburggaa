import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";

import type { ImageTextCallToActionLink } from "@/types/contentful";
import { getInternalLinkSlug } from "@/utils/navigation";

import styles from "./styles.module.css";

export const ButtonLink = async (item: ImageTextCallToActionLink) => {
	const locale = await getLocale();

	// Internal Nextjs routing links
	if (item.__typename === "Page") {
		const href = getInternalLinkSlug(item);

		return (
			<Link
				locale={locale}
				href={href}
				className={styles.button}
			>
				{item.menuLabel}
			</Link>
		);
	}

	// External link
	return (
		<a
			href={item.url}
			className={styles.button}
			target="_blank"
			rel="noopener noreferrer"
		>
			{item.menuLabel}
			<Image
				src="/icons/external.svg"
				width="16"
				height="16"
				alt=""
			/>
		</a>
	);
};
