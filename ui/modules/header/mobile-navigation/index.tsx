"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/routing";
import { Logo } from "@/ui/logo";
import { getInternalLinkSlug } from "@/utils/navigation";

import styles from "./styles.module.css";
import type { BurgerMenuProps } from "./types";

export const BurgerMenu = ({ navigationLinksCollection, asset }: BurgerMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const locale = useLocale();
	const pathname = usePathname();

	const navigationCollectionItems = navigationLinksCollection.items ?? [];

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) {
			return;
		}

		if (isOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}, [isOpen]);

	// Handle responsive behavior - close dialog if burger button is hidden by CSS
	// Handles cases where screen width changes display none an open menu but dialog remains open and blocking
	useEffect(() => {
		const container = dialogRef.current?.parentElement;
		if (!container || !isOpen) {
			return;
		}

		const resizeObserver = new ResizeObserver(() => {
			// If container is hidden (display: none), close the dialog
			if (container.offsetParent === null) {
				setIsOpen(false);
			}
		});

		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	}, [isOpen]);

	const handleLinkClick = () => {
		setIsOpen(false);
	};

	return (
		<div className={styles.container}>
			<button
				type="button"
				className={styles.burgerButton}
				onClick={() => setIsOpen(!isOpen)}
				aria-label={isOpen ? "Close menu" : "Open menu"}
				aria-expanded={isOpen}
				aria-controls="mobile-menu-dialog"
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					stroke="#000"
					strokeWidth=".42"
					viewBox="-2.8 -2.8 33.6 33.6"
				>
					<g fill="#000">
						<path d="M4 7a1 1 0 0 1 1-1h19a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1ZM4 14a1 1 0 0 1 1-1h11a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1ZM5 20a1 1 0 1 0 0 2h17a1 1 0 1 0 0-2H5Z" />
					</g>
				</svg>
			</button>

			<dialog
				ref={dialogRef}
				id="mobile-menu-dialog"
				className={styles.dialog}
				onClose={() => setIsOpen(false)}
			>
				<div className={styles.dialogContent}>
					<nav className={styles.menu}>
						<button
							type="button"
							className={styles.close}
							onClick={() => setIsOpen(false)}
							aria-label="Close menu"
						>
							<span aria-hidden="true">×</span>
						</button>

						<ul className={styles.menuList}>
							{navigationCollectionItems.map((item) => {
								// Internal routing links
								if (item.__typename === "Page") {
									const href = getInternalLinkSlug(item);
									const isCurrent = pathname === href;

									return (
										<li key={item.sys.id}>
											<Link
												locale={locale}
												href={href}
												className={styles.link}
												data-current={isCurrent || undefined}
												onClick={handleLinkClick}
											>
												{item.menuLabel}
											</Link>
										</li>
									);
								}

								// External links
								return (
									<li key={item.sys.id}>
										<a
											href={item.url}
											target="_blank"
											className={styles.link}
											rel="noopener noreferrer"
											onClick={handleLinkClick}
										>
											{item.menuLabel}
											<Image
												className={styles.externalIcon}
												src="/icons/external.svg"
												width="20"
												height="20"
												alt=""
											/>
										</a>
									</li>
								);
							})}
						</ul>
					</nav>
					<Logo
						static
						asset={asset}
						className={styles.logo}
					/>
				</div>
			</dialog>
		</div>
	);
};
