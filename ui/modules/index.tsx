import type { PageModulesItem } from "@/types/contentful";

import { ModuleBlogPostList } from "./blog-post-list";
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
	BlogPostList: ModuleBlogPostList,
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
	let hasFoundFirstContentModule = false;

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

		if (module.__typename !== "Header" && !hasFoundFirstContentModule) {
			hasFoundFirstContentModule = true;
			if (module.__typename !== "Hero") {
				return (
					<div
						key={module.sys.id}
						className="global-top-gradient"
					>
						<ModuleComponent module={module} />
					</div>
				);
			}
		}

		return (
			<ModuleComponent
				key={module.sys.id}
				module={module}
			/>
		);
	});
};
