import { query } from "@/queries/slugs";
import { getData } from "@/services/get-data";
import type { BlogPost, Page } from "@/types/contentful";

type Data = {
	enPages: { items: Page[] };
	dePages: { items: Page[] };
	enBlogPosts: { items: BlogPost[] };
	deBlogPosts: { items: BlogPost[] };
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

		const allItems = [
			...data.enPages.items,
			...data.dePages.items,
			...data.enBlogPosts.items,
			...data.deBlogPosts.items,
		];

		const localisedSlugs: AllSlugs = allItems.reduce((lookup, item) => {
			if (item.slug && item.sys?.id && item.sys?.locale) {
				if (!lookup[item.sys.id]) {
					lookup[item.sys.id] = {};
				}
				const route = item.__typename === "BlogPost" ? "blog/" : "";
				lookup[item.sys.id][item.sys.locale] = `${route}${item.slug}`;
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
		console.log(currentSlug, localeMap);
		if (localeMap[currentLocale] === currentSlug) {
			const alternateSlug = localeMap[targetLocale];
			return alternateSlug === "ROOT" ? "/" : `/${alternateSlug}`;
		}
	}

	// Fallback homepage if no alternate slug is found for some reason
	return "/";
}
