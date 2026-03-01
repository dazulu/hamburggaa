"use client";

import { useEffect, useState } from "react";

import styles from "./styles.module.css";

type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

const getDataThemeAttr = (theme: Theme): string => (theme === "dark" ? "dark" : "");

export const ThemeToggle = () => {
	const [theme, setTheme] = useState<Theme>("light");

	useEffect(() => {
		const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
		const initial = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
		setTheme(initial);
		document.documentElement.setAttribute("data-theme", getDataThemeAttr(initial));
	}, []);

	const toggle = () => {
		const next: Theme = theme === "light" ? "dark" : "light";
		setTheme(next);
		localStorage.setItem(THEME_STORAGE_KEY, next);
		document.documentElement.setAttribute("data-theme", getDataThemeAttr(next));
	};

	return (
		<button
			type="button"
			onClick={toggle}
			className={styles.button}
			aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
			title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
		>
			{theme === "light" ? "🌙" : "☀️"}
		</button>
	);
};
