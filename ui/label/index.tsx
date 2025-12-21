import styles from "./styles.module.css";

type LabelProps = {
	name: string;
	color?: string;
};

export const Label = ({ name, color }: LabelProps) => {
	return (
		<span
			className={styles.label}
			style={{ "--label-color": color || "#e0e0e0" } as React.CSSProperties}
		>
			{name}
		</span>
	);
};
