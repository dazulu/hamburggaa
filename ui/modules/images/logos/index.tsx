import { Images } from "@/types/contentful";
import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./styles.module.css";

export const ImagesDisplayTypeLogos = ({ module }: { module: Images }) => {
  const { headline, text } = module;
  return (
    <>
      <div className={styles.text}>
        {headline && <h2>{headline}</h2>}
        {text && documentToReactComponents(text.json)}
      </div>
      <pre>
        <code>{JSON.stringify(module, null, 2)}</code>
      </pre>
    </>
  );
};
