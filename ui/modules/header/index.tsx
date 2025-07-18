import type { Header } from "@/types/contentful";

import { LanguageSwitcher } from "./language-switcher";
import { HeaderNavigation } from "./navigation";
import { ScrollHeader } from "./scroll-handler";

export const ModuleHeader = async ({ module: _module }: { module: Header }) => {
	return (
		<ScrollHeader>
			<div></div>
			<div>
				<LanguageSwitcher />
			</div>
		</ScrollHeader>
	);
};
