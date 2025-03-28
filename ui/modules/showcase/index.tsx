import { ButtonLink } from "@/ui/button-link";
import Image from "next/image";
import { Showcase } from "@/types/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./styles.module.css";

export const ModuleShowcase = ({ module }: { module: Showcase }) => {
  const { callToActionLink, headline, image, text } = module;
  return (
    <div className={styles.container}>
      {headline && <p>{headline}</p>}
      <div>
        {text && documentToReactComponents(text.json)}{" "}
        {callToActionLink && <ButtonLink {...callToActionLink} />}
      </div>
      {image && (
        <Image
          alt={image.description || ""}
          src={image.url}
          width={image.width}
          height={image.height}
        />
      )}
      <pre>
        <code>{JSON.stringify(module, null, 2)}</code>
      </pre>
    </div>
  );
};
