import Image from "next/image";

import { Link } from "@/i18n/routing";
import type { ImageTextCallToActionLink } from "@/types/contentful";
import { getInternalLinkSlug } from "@/utils/navigation";

import styles from "./styles.module.css";

interface ButtonLinkProps {
	variant?: "filled" | "outlined";
	className?: string;
}

export const ButtonLink = async ({
	variant = "filled",
	className = "",
	...item
}: ButtonLinkProps & ImageTextCallToActionLink) => {
	const buttonClasses = `${styles.button} ${styles[variant]} ${className}`;

	// Internal Nextjs routing links
	if (item?.__typename === "Page") {
		const href = getInternalLinkSlug(item);

		return (
			<Link
				href={href}
				className={buttonClasses}
			>
				{item.menuLabel}
			</Link>
		);
	}

	// External link
	return (
		<a
			href={item.url}
			className={buttonClasses}
			target="_blank"
			rel="noopener noreferrer"
		>
			{item.menuLabel}
			<Image
				unoptimized
				src="/icons/external.svg"
				width="18"
				height="18"
				alt=""
			/>
		</a>
	);
};
