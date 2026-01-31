import type { Asset } from "@/types/contentful";

import styles from "./styles.module.css";

interface BigTextProps {
	component?: "h1" | "h2" | "h3" | "p";
	image?: Asset;
	text: string;
}

export const BigText = ({ text, component = "p", image }: BigTextProps) => {
	const Component = component;
	const hasImage = image?.url;

	const style = hasImage
		? ({
				"--bg-image": `url(${image.url}?w=1920&fm=avif&q=80)`,
			} as React.CSSProperties)
		: undefined;

	return (
		<div className={styles.container}>
			<Component
				className={`${styles.text} ${hasImage ? styles.masked : ""}`}
				style={style}
			>
				{text}
			</Component>
		</div>
	);
};
