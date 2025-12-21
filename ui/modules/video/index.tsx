"use client";

import { useEffect, useRef, useState } from "react";

import { useLocale } from "next-intl";

import { i18n } from "@/i18n/translations";
import type { Asset } from "@/types/contentful";

import styles from "./styles.module.css";

interface VideoProps {
	media: Asset;
	className?: string;
}

export const Video = ({ media, className }: VideoProps) => {
	const activeLocale = useLocale();
	const videoRef = useRef<HTMLVideoElement>(null);

	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);

	const togglePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}

			setIsPlaying(!isPlaying);
		}
	};

	const getLanguageLabel = () => {
		return isPlaying ? i18n[activeLocale].video.pause : i18n[activeLocale].video.play;
	};

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mediaQuery.matches);
		setIsPlaying(!mediaQuery.matches);

		const handleChange = (event: MediaQueryListEvent) => {
			setPrefersReducedMotion(event.matches);

			if (event.matches && videoRef.current) {
				videoRef.current.pause();
				setIsPlaying(false);
			}
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	return (
		<div className={styles.videoContainer}>
			<video
				loop
				muted
				playsInline
				aria-hidden="true"
				autoPlay={!prefersReducedMotion}
				className={className || styles.video}
				preload="metadata"
				ref={videoRef}
				tabIndex={-1}
			>
				<source
					src={media.url}
					type={media.contentType}
				/>
				Your browser does not support the video tag. {media.description}
			</video>
			<button
				aria-label={getLanguageLabel()}
				className={styles.playPauseButton}
				onClick={togglePlayPause}
				type="button"
			>
				{isPlaying ? (
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<rect
							x="6"
							y="4"
							width="4"
							height="16"
							fill="currentColor"
						/>
						<rect
							x="14"
							y="4"
							width="4"
							height="16"
							fill="currentColor"
						/>
					</svg>
				) : (
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M8 5v14l11-7L8 5z"
							fill="currentColor"
						/>
					</svg>
				)}
			</button>
		</div>
	);
};
