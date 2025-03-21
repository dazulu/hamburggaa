import { Faqs } from "@/types/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import React, { Fragment } from "react";

export const ModuleFaq = ({ module }: { module: Faqs }) => {
  const { title, description, questions } = module;

  return (
    <div>
      <h2>{title}</h2>
      {documentToReactComponents(description.json)}
      <dl>
        {questions.map(({ id, key: question, value: answer }) => (
          <Fragment key={id}>
            <dt>{question}</dt>
            <dd>{answer}</dd>
          </Fragment>
        ))}
      </dl>
    </div>
  );
};
