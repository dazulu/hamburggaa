"use client";

import { useEffect } from "react";

import { useLocale } from "next-intl";

import { Link } from "@/i18n/routing";
import { i18n } from "@/i18n/translations";
import styles from "@/styles/error.module.css";

export default function Error({ error }: { error: Error & { digest?: string } }) {
	const locale = useLocale();

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.title}>{i18n[locale].error.title}</h1>
				<p className={styles.message}>{i18n[locale].error.message}</p>
				<div className={styles.actions}>
					<Link
						href="/"
						className={styles.link}
					>
						{i18n[locale].error.returnHome}
					</Link>
				</div>
			</div>
		</div>
	);
}
