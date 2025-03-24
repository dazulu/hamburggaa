import { Header } from "@/types/contentful";
import { HeaderNavigation } from "./navigation";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "@/ui/logo";
import styles from "./styles.module.css";

export const ModuleHeader = async ({ module }: { module: Header }) => {
  return (
    <header className={styles.container}>
      <Logo />
      <HeaderNavigation
        navigationLinksCollection={module.navigationLinksCollection}
      />
      <LanguageSwitcher />
    </header>
  );
};
