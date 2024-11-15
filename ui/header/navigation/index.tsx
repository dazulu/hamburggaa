import Image from "next/image";
import { Link } from "@/i18n/routing";
import { query } from "@/queries/navigation";

import {
  NavigationConfig,
  NavigationMenuItemsItem,
  NavigationMenuCollection,
} from "@/types/contentful";
import { Locale } from "@/types/i18n";

import styles from "./styles.module.css";

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;

async function getData(locale: string) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        locale,
      },
    }),
  });

  const data = await response
    .json()
    .then(({ data }) =>
      (
        data.navigationMenuCollection as NavigationMenuCollection
      ).items[0].itemsCollection.items.filter(Boolean)
    );

  return data;
}

const isNavigationConfig = (
  item: NavigationMenuItemsItem
): item is NavigationConfig => {
  return "slug" in item;
};

export const Navigation = async ({
  locale,
}: {
  locale: Locale;
}): Promise<React.ReactElement> => {
  const data = await getData(locale);

  return (
    <nav>
      <ul className={styles.list}>
        {data.map((item) => {
          // Internal routing links
          if (isNavigationConfig(item)) {
            const href = item.dir === "ROOT" ? `/` : `/${item.slug}`;
            return (
              <li key={item.sys.id} className={styles.item}>
                <Link locale={locale} href={href} className={styles.link}>
                  {item.menuLabel}
                </Link>
              </li>
            );
          }

          // External links
          return (
            <li key={item.sys.id} className={styles.item}>
              <a
                href={item.url}
                target="_blank"
                className={styles.link}
                rel="noopener noreferrer"
              >
                {item.menuLabel}
                <Image
                  className={styles.icon}
                  src="/icons/external.svg"
                  width="16"
                  height="16"
                  alt=""
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
