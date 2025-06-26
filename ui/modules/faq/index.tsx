import { Faqs } from "@/types/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import React from "react";

import styles from "./styles.module.css";

export const ModuleFaq = ({ module }: { module: Faqs }) => {
  const { sys, title, description, questions } = module;

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {documentToReactComponents(description.json)}
      <div className={styles.questions}>
        {questions.map(({ id, key: question, value: answer }, index) => (
          <details
            key={id}
            name={`faq_${sys.id}`}
            open={index === 0}
            className={styles.details}
          >
            <summary className={styles.summary}>{question}</summary>
            {answer}
          </details>
        ))}
      </div>
    </div>
  );
};
