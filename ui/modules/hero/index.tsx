import { ButtonLink } from "@/ui/button-link";
import { Hero } from "@/types/contentful";
import Image from "next/image";
import styles from "./styles.module.css";

export const ModuleHero = ({ module }: { module: Hero }) => {
  const { headline, image, callToActionLink, type } = module;

  return (
    <div className={`${styles.container} ${styles[type]}`}>
      {image && (
        <Image
          fill
          priority
          alt={image.description || ""}
          className={styles.image}
          src={image.url}
        />
      )}
      <div className={styles.content}>
        {headline && <h1 className={styles.headline}>{module.headline}</h1>}
        {callToActionLink && <ButtonLink {...callToActionLink} />}
      </div>
    </div>
  );
};
