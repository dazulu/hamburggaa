import Image from "next/image";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/routing";
import type { HeaderNavigationLinksCollection } from "@/types/contentful";
import { Logo } from "@/ui/logo";
import { getInternalLinkSlug } from "@/utils/navigation";

import styles from "./styles.module.css";

export const HeaderNavigation = async ({
	navigationLinksCollection,
}: {
	navigationLinksCollection: HeaderNavigationLinksCollection;
}): Promise<React.ReactElement> => {
	const locale = await getLocale();

	const navigationCollectionItems = navigationLinksCollection.items ?? [];
	const leftLinks = navigationCollectionItems.slice(0, 3);
	const rightLinks = navigationCollectionItems.slice(3);

	return (
		<nav>
			<ul className={styles.list}>
				{leftLinks.map((item) => {
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

				<li className={styles.logoItem}>
					<Link
						locale={locale}
						href="/"
					>
						<Logo />
					</Link>
				</li>

				{rightLinks.map((item) => {
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
		</nav>
	);
};
