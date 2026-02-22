import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import type { Document } from "@contentful/rich-text-types";
import readingTime from "reading-time";

export const getReadingTimeFromRichText = (richText: Document) => {
	const text = documentToPlainTextString(richText);
	return Math.ceil(readingTime(text).minutes);
};

export const getWordCountFromRichText = (richText: Document) => {
	const text = documentToPlainTextString(richText);
	return readingTime(text).words;
};
