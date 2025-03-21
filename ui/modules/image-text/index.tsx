import Image from "next/image";
import { ImageText } from "@/types/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./styles.module.css";

export const ModuleImageText = ({ module }: { module: ImageText }) => {
  const {
    image: { alt, image },
    text,
  } = module;
  return (
    <div className={styles.container}>
      {documentToReactComponents(text.json)}
      <Image
        alt={alt}
        src={image.url}
        width={image.width}
        height={image.height}
      />
    </div>
  );
};
