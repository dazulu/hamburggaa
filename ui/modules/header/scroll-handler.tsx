"use client";

import { useEffect, useRef } from "react";

import styles from "./styles.module.css";

export const ScrollHeader = ({ children }: { children: React.ReactNode }) => {
	const headerRef = useRef<HTMLElement>(null);
	const ticking = useRef(false);

	useEffect(() => {
		const updateVisibility = () => {
			const scrollY = window.scrollY;

			if (headerRef.current) {
				if (scrollY > 200) {
					headerRef.current.classList.add(styles.hidden);
				} else {
					headerRef.current.classList.remove(styles.hidden);
				}
			}

			ticking.current = false;
		};

		const onScroll = () => {
			if (!ticking.current) {
				requestAnimationFrame(updateVisibility);
				ticking.current = true;
			}
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			ref={headerRef}
			className={styles.container}
		>
			{children}
		</header>
	);
};
