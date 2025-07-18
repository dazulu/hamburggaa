import Image from "next/image";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/routing";
import type { FooterNavigationLinksCollection } from "@/types/contentful";
import { getInternalLinkSlug } from "@/utils/navigation";

import styles from "./styles.module.css";

export const FooterNavigation = async ({
	navigationLinksCollection,
}: {
	navigationLinksCollection: FooterNavigationLinksCollection;
}): Promise<React.ReactElement> => {
	const locale = await getLocale();

	return (
		<ul className={styles.list}>
			{navigationLinksCollection.items.map((item) => {
				// Internal routing links
				if (item.__typename === "Page") {
					const href = getInternalLinkSlug(item);

					return (
						<li
							key={item.sys.id}
							className={styles.item}
						>
							<Link
								locale={locale}
								href={href}
								className={styles.link}
							>
								{item.menuLabel}
							</Link>
						</li>
					);
				}

				// External links
				return (
					<li
						key={item.sys.id}
						className={styles.item}
					>
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
	);
};
