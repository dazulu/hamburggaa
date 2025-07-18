import Image from "next/image";
import Link from "next/link";

import { query } from "@/queries/logo";
import { getData } from "@/services/get-data";
import type { ConfigCollection } from "@/types/contentful";

import styles from "./styles.module.css";

export const Logo = async ({ size = "sm" }: { size?: "sm" | "lg" }) => {
	const data = await getData<ConfigCollection>({ query });
	const { logo } = data.configCollection.items[0];
	const { url } = logo;

	const isSmall = size === "sm";
	const src = isSmall ? `${url}?fm=png&w=180&q=90` : `${url}?fm=png&w=280&q=90`;

	return (
		<Link
			href="/"
			className={styles.logo}
		>
			<Image
				priority
				unoptimized
				src={src}
				alt="Club Logo: Homepage"
				height={135}
				width={140}
			/>
		</Link>
	);
};
