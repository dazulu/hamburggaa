import type { Options } from "@contentful/rich-text-react-renderer";
import type { Inline } from "@contentful/rich-text-types";
import { INLINES } from "@contentful/rich-text-types";
import Image from "next/image";

import { Link } from "@/i18n/routing";
import type { Entry, Page } from "@/types/contentful";
import { PronunciationAnnotator } from "@/ui/pronunciation-annotator";
import { PRONUNCIATION_PATTERN } from "@/ui/pronunciation-annotator/constants";
import { getInternalLinkSlug } from "@/utils/navigation";

interface RichTextLinks {
	entries?: {
		inline?: (Entry | null)[];
		hyperlink?: (Entry | null)[];
	};
}

export const createRichTextRenderOptions = (
	links?: RichTextLinks,
	{ disablePronunciation = false }: { disablePronunciation?: boolean } = {},
): Options => ({
	renderText: (text: string) => {
		const processed = text.replace(/&shy;/g, "\u00AD");

		if (disablePronunciation || !PRONUNCIATION_PATTERN.test(processed)) {
			return processed;
		}

		return <PronunciationAnnotator text={processed} />;
	},
	renderNode: {
		[INLINES.HYPERLINK]: (node: Inline, children: React.ReactNode) => {
			const { uri } = node.data;
			if (uri) {
				return (
					<a
						href={uri}
						target="_blank"
						rel="noopener noreferrer"
					>
						{children}
						<Image
							src="/icons/external.svg"
							width="16"
							height="16"
							alt=""
						/>
					</a>
				);
			}
			return <span>{children}</span>;
		},
		[INLINES.ENTRY_HYPERLINK]: (node: Inline, children: React.ReactNode) => {
			const entryId = node.data.target.sys.id;

			const linkedEntry = (links?.entries?.inline?.find((entry) => entry?.sys.id === entryId) ||
				links?.entries?.hyperlink?.find((entry) => entry?.sys.id === entryId)) as Page | undefined;

			if (linkedEntry?.__typename === "Page") {
				const href = getInternalLinkSlug(linkedEntry);
				return <Link href={href}>{children || linkedEntry.menuLabel}</Link>;
			}

			return <span>{children}</span>;
		},
	},
});
