"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/routing";
import { getInternalLinkSlug } from "@/utils/navigation";

import styles from "./styles.module.css";
import type { HeaderNavigationProps } from "./types";

export const HeaderNavigation = ({ navigationLinksCollection }: HeaderNavigationProps): React.ReactElement => {
	const locale = useLocale();
	const pathname = usePathname();

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
						const isCurrent = pathname === href;

						return (
							<Link
								key={item.sys.id}
								locale={locale}
								href={href}
								className={styles.link}
								data-current={isCurrent || undefined}
							>
								{item.menuLabel}
							</Link>
						);
					}

					// External links (never current page)
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
						const isCurrent = pathname === href;

						return (
							<Link
								key={item.sys.id}
								locale={locale}
								href={href}
								className={styles.link}
								data-current={isCurrent || undefined}
							>
								{item.menuLabel}
							</Link>
						);
					}

					// External links (never current page)
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
