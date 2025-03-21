import { ButtonLink } from "@/ui/button-link";
import { Hero } from "@/types/contentful";
import Image from "next/image";
import styles from "./styles.module.css";

export const ModuleHero = ({ module }: { module: Hero }) => {
  const { headline, image, callToActionLink, type } = module;

  return (
    <div className={`${styles.container} ${styles[type]}`}>
      <div className={styles.headline}>
        {headline && <h1>{module.headline}</h1>}
      </div>
      {image && (
        <Image
          fill
          alt={image.alt}
          className={styles.image}
          src={image.image.url}
        />
      )}
      {callToActionLink && <ButtonLink {...callToActionLink} />}
    </div>
  );
};
