"use client";

import { useRef } from "react";

import { useLocale } from "use-intl";

import { Locale } from "@/types/i18n";

import styles from "./styles.module.css";
import type { PronunciationAnnotatorProps } from "./types";

const PHRASES = ["sliotar", "hurling", "camogie"];
const AUDIO_URL = "/placeholder.mp3";

export const PronunciationAnnotator = ({ text }: PronunciationAnnotatorProps) => {
	const locale = useLocale();
	const audioRef = useRef<HTMLAudioElement>(null);

	const play = () => {
		if (!audioRef.current) {
			return;
		}

		audioRef.current.currentTime = 0;
		const playPromise = audioRef.current.play();

		if (playPromise?.catch) {
			playPromise.catch(() => {
				console.warn("Audio playback failed");
			});
		}
	};

	const getLabel = (phrase: string) =>
		locale === Locale.DE ? `Aussprache für „${phrase}“ abspielen` : `Play pronunciation for "${phrase}"`;

	const pattern = new RegExp(`\\b(${PHRASES.join("|")})\\b`, "gi");
	const parts = text.split(pattern);

	return (
		<span className={styles.container}>
			{/* biome-ignore lint/a11y/useMediaCaption: pronunciation clips are single-word audio, captions not applicable */}
			<audio
				ref={audioRef}
				src={AUDIO_URL}
				preload="none"
			/>
			{parts.map((part, index) => {
				const isPhrase = PHRASES.some((p) => p.toLowerCase() === part.toLowerCase());
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
							aria-label={getLabel(part)}
							onClick={play}
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
