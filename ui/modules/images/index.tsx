import type { Images } from "@/types/contentful";

import { ImagesDisplayTypeCollage } from "./collage";
import { ImagesDisplayTypeGrid } from "./grid";
import { ImagesDisplayTypeLogos } from "./logos";
import styles from "./styles.module.css";

const getComponentByDisplayType = (displayType: string) => {
	switch (displayType) {
		case "collage":
			return ImagesDisplayTypeCollage;
		case "grid":
			return ImagesDisplayTypeGrid;
		case "logos":
			return ImagesDisplayTypeLogos;
		default:
			return null;
	}
};

export const ModuleImages = ({ module }: { module: Images }) => {
	const Component = getComponentByDisplayType(module?.displayType);
	return (
		<div className={styles.container}>
			<Component module={module} />
		</div>
	);
};
