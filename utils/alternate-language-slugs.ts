import { query } from "@/queries/slugs";
import { getData } from "@/services/get-data";
import type { Page } from "@/types/contentful";

type Data = {
	en: { items: Page[] };
	de: { items: Page[] };
};

export type AllSlugs = Record<string, Record<string, string>>;

/**
 * Fetches all page slugs from Contentful for both locales and creates a lookup table
 * for language switching (e.g., {pageId: {en: "about", de: "ueber-uns"}})
 */
export async function getAllSlugs(): Promise<AllSlugs> {
	try {
		const response = await getData({
			query,
			variables: {},
		});

		const data = response as Data;

		const localisedSlugs: AllSlugs = [...data.en.items, ...data.de.items].reduce((lookup, page) => {
			if (page.slug && page.sys?.id && page.sys?.locale) {
				if (!lookup[page.sys.id]) {
					lookup[page.sys.id] = {};
				}
				lookup[page.sys.id][page.sys.locale] = page.slug;
			}
			return lookup;
		}, {} as AllSlugs);

		return localisedSlugs;
	} catch (error) {
		console.error("Failed to fetch all page slugs:", error);
		return {};
	}
}

/**
 * Returns the slug for a given page slug in the alternate locale.
 */
export function getAlternateSlug(
	currentSlug: string,
	currentLocale: string,
	targetLocale: string,
	allPageSlugs: AllSlugs,
): string {
	for (const localeMap of Object.values(allPageSlugs)) {
		if (localeMap[currentLocale] === currentSlug) {
			const alternateSlug = localeMap[targetLocale];
			return alternateSlug === "ROOT" ? "/" : `/${alternateSlug}`;
		}
	}

	// Fallback homepage if no alternate slug is found for some reason
	return "/";
}
