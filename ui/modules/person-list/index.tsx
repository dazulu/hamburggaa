import Image from "next/image";
import { PersonList } from "@/types/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./styles.module.css";

export const ModulePersonList = ({ module }: { module: PersonList }) => {
  const { headline, text, peopleCollection } = module;
  return (
    <div className={styles.container}>
      <h2>{headline}</h2>
      {text ? documentToReactComponents(text.json) : null}
      {peopleCollection.items?.length && (
        <ul className={styles.people}>
          {peopleCollection.items.map((person) => (
            <li key={person.sys.id} className={styles.person}>
              <figure>
                <figcaption>
                  <p>{person.name}</p>
                  <p>{person.role}</p>
                </figcaption>
                {person.image && (
                  <div className={styles.imageWrapper}>
                    <Image
                      fill
                      src={`${person.image.url}?fit=fill&w=400&fm=avif&q=80`}
                      alt={person.image.description}
                    />
                  </div>
                )}
              </figure>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
