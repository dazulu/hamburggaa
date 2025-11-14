import Image from "next/image";

import type { Quote } from "@/types/contentful";

import styles from "./styles.module.css";

export const ModuleQuote = ({ module }: { module: Quote }) => {
	const { quoteText, person } = module;
	const { name, role, image } = person;

	return (
		<figure className={`${styles.container} global-contain-width global-module-spacing`}>
			<blockquote className={styles.quote}>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					xmlSpace="preserve"
					viewBox="0 0 25.625 25.625"
					fill="currentColor"
				>
					<path d="M12.812.435C5.736.435 0 5.499 0 11.747c0 3.168 1.479 6.028 3.855 8.082-.521 3.01-3.883 4.23-3.652 5.059 2.84 1.175 8.529-1.412 9.918-2.083.869.164 1.768.255 2.691.255 7.076 0 12.813-5.064 12.813-11.313S19.888.435 12.812.435zm-.908 11.783c0 3.076-1.361 4.802-4.043 5.129l-.016.001a.124.124 0 0 1-.125-.125V15.66c0-.046.025-.088.064-.109 1.223-.667 1.834-1.717 1.865-3.207H7.845a.126.126 0 0 1-.125-.125V8.286c0-.069.057-.125.125-.125h3.934c.068 0 .125.056.125.125v3.932zm6.965 0c0 3.029-1.205 4.563-4.033 5.128a.13.13 0 0 1-.104-.026.124.124 0 0 1-.045-.097V15.66c0-.046.025-.088.064-.109 1.223-.667 1.834-1.717 1.865-3.207h-1.804a.126.126 0 0 1-.125-.125V8.286c0-.069.057-.125.125-.125h3.932c.07 0 .125.056.125.125v3.932z" />
				</svg>
				<p className={styles.quoteText}>{quoteText}</p>
			</blockquote>
			<figcaption className={styles.attribution}>
				{image.url && (
					<div className={styles.imageWrapper}>
						<Image
							fill
							src={`${image.url}?fit=fill&w=160&fm=avif&q=75`}
							alt={image.description || name}
						/>
					</div>
				)}
				<div className={styles.personInfo}>
					<cite className={styles.name}>{name}</cite>
					{role && <span className={styles.role}>{role}</span>}
				</div>
			</figcaption>
		</figure>
	);
};
