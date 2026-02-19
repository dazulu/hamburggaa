"use client";

import { useRef } from "react";

import { useLocale } from "use-intl";

import { i18n } from "@/i18n/translations";

import { DEFAULT_PHRASES } from "./constants";
import styles from "./styles.module.css";
import type { PronunciationAnnotatorProps } from "./types";

export const PronunciationAnnotator = ({ text }: PronunciationAnnotatorProps) => {
	const locale = useLocale();
	const audioRef = useRef<HTMLAudioElement>(null);

	const play = (phrase: string) => {
		if (!audioRef.current) {
			return;
		}

		const url = `/audio/${phrase.toLowerCase()}.mp3`;

		if (audioRef.current.src !== url) {
			audioRef.current.src = url;
			audioRef.current.load();
		}

		audioRef.current.currentTime = 0;
		const playPromise = audioRef.current.play();

		if (playPromise?.catch) {
			playPromise.catch(() => {
				console.warn("Audio playback failed");
			});
		}
	};

	const pattern = new RegExp(`\\b(${DEFAULT_PHRASES.join("|")})\\b`, "gi");
	const parts = text.split(pattern);

	return (
		<span className={styles.container}>
			{/* biome-ignore lint/a11y/useMediaCaption: media alternative to neighbouring text */}
			<audio
				ref={audioRef}
				preload="none"
			/>
			{parts.map((part, index) => {
				const isPhrase = DEFAULT_PHRASES.some((phrase) => phrase.toLowerCase() === part.toLowerCase());

				if (!isPhrase) {
					return part;
				}

				return (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: it's grand like
						key={`${part}-${index}`}
						className={styles.phrase}
					>
						{part}
						<button
							type="button"
							className={styles.button}
							aria-label={i18n[locale].pronunciation(part)}
							onClick={() => play(part)}
						>
							<svg
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
							</svg>
						</button>
					</span>
				);
			})}
		</span>
	);
};
