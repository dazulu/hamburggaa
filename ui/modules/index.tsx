import type { PageModulesItem } from "@/types/contentful";

import { ModuleFollowUs } from "./follow-us";
import { ModuleFooter } from "./footer";
import { ModuleHeader } from "./header";
import { ModuleHero } from "./hero";
import { ModuleImageText } from "./image-text";
import { ModuleImages } from "./images";
import { ModulePersonList } from "./person-list";
import { ModuleQuote } from "./quote";
import { ModuleRepeatingItems } from "./repeating-items";
import { ModuleShowcase } from "./showcase";
import { ModuleText } from "./text";

const moduleMapping = {
	FollowUs: ModuleFollowUs,
	Footer: ModuleFooter,
	Header: ModuleHeader,
	Hero: ModuleHero,
	Images: ModuleImages,
	ImageText: ModuleImageText,
	PersonList: ModulePersonList,
	Quote: ModuleQuote,
	RepeatingItems: ModuleRepeatingItems,
	Showcase: ModuleShowcase,
	Text: ModuleText,
};

export const Modules = ({ modules }: { modules: PageModulesItem[] }) => {
	return modules.map((module, _index) => {
		const ModuleComponent = moduleMapping[module.__typename];

		if (!ModuleComponent) {
			return (
				<pre key={module.sys.id}>
					<code>
						NOT MAPPED
						<br />
						{JSON.stringify(module, null, 2)}
					</code>
				</pre>
			);
		}

		return (
			<ModuleComponent
				key={module.sys.id}
				module={module}
			/>
		);
	});
};
