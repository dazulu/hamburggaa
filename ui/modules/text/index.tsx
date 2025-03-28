import { Text } from "@/types/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./styles.module.css";

export const ModuleText = ({ module }: { module: Text }) => {
  const { text } = module;

  return (
    <div className={styles.container}>
      {text && documentToReactComponents(text.json)}
      <pre>
        <code>{JSON.stringify(module, null, 2)}</code>
      </pre>
    </div>
  );
};
