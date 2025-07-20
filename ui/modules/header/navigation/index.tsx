import Image from "next/image";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/routing";
import type { HeaderNavigationLinksCollection } from "@/types/contentful";
import { getInternalLinkSlug } from "@/utils/navigation";

import styles from "./styles.module.css";

export const HeaderNavigation = async ({
	navigationLinksCollection,
}: {
	navigationLinksCollection: HeaderNavigationLinksCollection;
}): Promise<React.ReactElement> => {
	const locale = await getLocale();

	const navigationCollectionItems = navigationLinksCollection.items ?? [];
	const leftLinks = navigationCollectionItems.slice(0, 4);
	const rightLinks = navigationCollectionItems.slice(4);

	return (
		<nav className={styles.list}>
			<div className={styles.left}>
				{leftLinks.map((item) => {
					// Internal routing links
					if (item.__typename === "Page") {
						const href = getInternalLinkSlug(item);

						return (
							<Link
								key={item.sys.id}
								locale={locale}
								href={href}
								className={styles.link}
							>
								{item.menuLabel}
							</Link>
						);
					}

					// External links
					return (
						<a
							key={item.sys.id}
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
					);
				})}
			</div>
			<div className={styles.right}>
				{rightLinks.map((item) => {
					// Internal routing links
					if (item.__typename === "Page") {
						const href = getInternalLinkSlug(item);

						return (
							<Link
								key={item.sys.id}
								locale={locale}
								href={href}
								className={styles.link}
							>
								{item.menuLabel}
							</Link>
						);
					}

					// External links
					return (
						<a
							key={item.sys.id}
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
					);
				})}
			</div>
		</nav>
	);
};
