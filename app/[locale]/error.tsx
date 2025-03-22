"use client";

import Link from "next/link";
import styles from "@/styles/error.module.css";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Something went wrong!</h1>
        <p className={styles.message}>
          We apologize for the inconvenience. Please try again or return to the
          homepage.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.link}>
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
