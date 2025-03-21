import { Header } from "@/types/contentful";
import { HeaderNavigation } from "./navigation";
import { LanguageSwitcher } from "./language-switcher";
import { SocialIcons } from "@/ui/social";

export const ModuleHeader = async ({ module }: { module: Header }) => {
  return (
    <header>
      <HeaderNavigation
        navigationLinksCollection={module.navigationLinksCollection}
      />
      <LanguageSwitcher />
      <SocialIcons />
    </header>
  );
};
