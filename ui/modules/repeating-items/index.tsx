import type { RepeatingItems } from "@/types/contentful";

import { RepeatingItemsDisplayTypeFacts } from "./facts";
import { RepeatingItemsDisplayTypeQuestions } from "./questions";
import styles from "./styles.module.css";

const getComponentByDisplayType = (displayType: string) => {
	switch (displayType) {
		case "questions":
			return RepeatingItemsDisplayTypeQuestions;
		case "facts":
			return RepeatingItemsDisplayTypeFacts;
		default:
			return null;
	}
};

export const ModuleRepeatingItems = ({ module }: { module: RepeatingItems }) => {
	const Component = getComponentByDisplayType(module?.displayType);

	if (!Component) {
		return null;
	}

	return (
		<div className={styles.container}>
			<Component module={module} />
		</div>
	);
};
