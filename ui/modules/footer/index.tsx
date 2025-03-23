import { Footer } from "@/types/contentful";
import { FooterNavigation } from "./navigation";
import { SocialIcons } from "@/ui/social";
import styles from "./styles.module.css";

export const ModuleFooter = async ({ module }: { module: Footer }) => {
  return (
    <footer className={styles.container}>
      <p className={styles.headline}>{module.headline} GAA</p>
      <div className={styles.content}>
        <SocialIcons type="vertical" />
        <FooterNavigation
          navigationLinksCollection={module.navigationLinksCollection}
        />
      </div>
    </footer>
  );
};
