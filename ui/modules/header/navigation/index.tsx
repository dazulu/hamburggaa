import { HeaderNavigationLinksCollection } from "@/types/contentful";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getInternalLinkSlug } from "@/utils/navigation";
import { getLocale } from "next-intl/server";
import styles from "./styles.module.css";

export const HeaderNavigation = async ({
  navigationLinksCollection,
}: {
  navigationLinksCollection: HeaderNavigationLinksCollection;
}): Promise<React.ReactElement> => {
  const locale = await getLocale();

  return (
    <nav>
      <ul className={styles.list}>
        {navigationLinksCollection.items.map((item) => {
          // Internal routing links
          if (item.__typename === "Page") {
            const href = getInternalLinkSlug(item);

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
