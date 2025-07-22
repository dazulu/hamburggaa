import Image from "next/image";
import Link from "next/link";

import { query } from "@/queries/logo";
import { getData } from "@/services/get-data";
import type { ConfigCollection } from "@/types/contentful";

import styles from "./styles.module.css";
import type { LogoProps } from "./types";

export const Logo = async ({ className, baseResolutionWidth = 400 }: LogoProps) => {
	const data = await getData<ConfigCollection>({ query });
	const { logo } = data.configCollection.items[0];
	const { url } = logo;

	// Use configurable resolution for better quality at various sizes
	const src = `${url}?fm=png&w=${baseResolutionWidth}&q=90`;

	return (
		<Link
			href="/"
			className={`${styles.logo} ${className || ""}`}
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
