import type { Columns } from "@/types/contentful";

import styles from "./styles.module.css";

export const ModuleColumns = ({ module }: { module: Columns }) => {
	return (
		<div className={styles.container}>
			<h2>ModuleColumns</h2>
			<pre>
				<code>{JSON.stringify(module, null, 2)}</code>
			</pre>
		</div>
	);
};
