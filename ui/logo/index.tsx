import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.css";
import type { LogoProps } from "./types";

export const Logo = ({ asset, className, baseResolutionWidth = 400, static: isStatic = false }: LogoProps) => {
	if (!asset.url) {
		return null;
	}

	const src = `${asset.url}?fm=png&w=${baseResolutionWidth}&q=90`;

	const logoImage = (
		<Image
			priority
			unoptimized
			src={src}
			alt={isStatic ? asset.description : "Home "}
			height={135}
			width={140}
		/>
	);

	const logoClassName = `${styles.logo} ${className || ""}`;

	if (isStatic) {
		return <div className={logoClassName}>{logoImage}</div>;
	}

	return (
		<Link
			href="/"
			className={logoClassName}
		>
			{logoImage}
		</Link>
	);
};
