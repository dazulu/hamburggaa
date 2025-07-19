import type { PageData } from "@/types/page";
import { Modules } from "@/ui/modules";

import styles from "./styles.module.css";

export default function Page({ data }: PageData) {
	return (
		<div className={styles.container}>
			<Modules modules={data.modulesCollection.items.filter(Boolean)} />
		</div>
	);
}
