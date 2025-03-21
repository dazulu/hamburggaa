import { Footer } from "@/types/contentful";
import { Navigation } from "./navigation";
import styles from "./styles.module.css";

export const ModuleFooter = async ({ module }: { module: Footer }) => {
  return (
    <footer className={styles.container}>
      <p>{module.headline}</p>
      <Navigation
        navigationLinksCollection={module.navigationLinksCollection}
      />
    </footer>
  );
};
