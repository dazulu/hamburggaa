import styles from "./styles.module.css";

interface BigTextProps {
	component?: "h1" | "h2" | "h3" | "p";
	text: string;
}

export const BigText = ({ text, component = "p" }: BigTextProps) => {
	const Component = component;

	return (
		<div className={styles.container}>
			<Component className={styles.text}>{text}</Component>
		</div>
	);
};
