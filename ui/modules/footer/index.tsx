import { Footer } from "@/types/contentful";
import { FooterNavigation } from "./navigation";
import Image from "next/image";
import { SocialIcons } from "@/ui/social";
import styles from "./styles.module.css";
export const ModuleFooter = async ({ module }: { module: Footer }) => {
  return (
    <footer className={styles.container}>
      <p className={styles.headline}>{module.headline}</p>
      {/* {module.image && (
        <Image
          className={styles.image}
          alt={module.image.description || ""}
          src={module.image.url}
          width={module.image.width}
          height={module.image.height}
        />
      )} */}
      <div className={styles.content}>
        <SocialIcons />
        <FooterNavigation
          navigationLinksCollection={module.navigationLinksCollection}
        />
      </div>
    </footer>
  );
};
