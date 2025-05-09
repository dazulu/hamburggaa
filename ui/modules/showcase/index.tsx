import { ButtonLink } from "@/ui/button-link";
import Image from "next/image";
import { Showcase } from "@/types/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./styles.module.css";

export const ModuleShowcase = ({ module }: { module: Showcase }) => {
  const { callToActionLink, headline, image, text } = module;

  return (
    <div className={styles.container}>
      {headline && <p className={styles.headline}>{headline}</p>}
      <div className={styles.content}>
        {text && documentToReactComponents(text.json)}{" "}
        {callToActionLink && <ButtonLink {...callToActionLink} />}
      </div>
      {image && (
        <div className={styles.imageWrapper}>
          <Image
            alt={image.description || ""}
            className={styles.image}
            src={image.url}
            width={image.width}
            height={image.height}
          />
        </div>
      )}
      {/* <pre>
        <code>{JSON.stringify(module, null, 2)}</code>
      </pre> */}
    </div>
  );
};
