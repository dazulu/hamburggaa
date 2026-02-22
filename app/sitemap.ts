import type { MetadataRoute } from "next";

import { query } from "@/queries/slugs";
import { getData } from "@/services/get-data";
import type { BlogPost, Page } from "@/types/contentful";
import { BASE_URL } from "@/utils/constants";

type SlugData = {
	enPages: { items: Page[] };
	dePages: { items: Page[] };
	enBlogPosts: { items: BlogPost[] };
	deBlogPosts: { items: BlogPost[] };
};

type SlugPair = {
	en: string;
	de: string;
};

function buildSlugPairs(data: SlugData): SlugPair[] {
	const lookup: Record<string, Partial<SlugPair>> = {};

	for (const page of data.enPages.items) {
		if (!page.slug || !page.sys?.id) {
			continue;
		}
		const path = page.slug === "ROOT" ? "" : page.slug;
		lookup[page.sys.id] = { ...lookup[page.sys.id], en: path };
	}

	for (const page of data.dePages.items) {
		if (!page.slug || !page.sys?.id) {
			continue;
		}
		const path = page.slug === "ROOT" ? "" : page.slug;
		lookup[page.sys.id] = { ...lookup[page.sys.id], de: path };
	}

	for (const post of data.enBlogPosts.items) {
		if (!post.slug || !post.sys?.id) {
			continue;
		}
		lookup[post.sys.id] = { ...lookup[post.sys.id], en: `blog/${post.slug}` };
	}

	for (const post of data.deBlogPosts.items) {
		if (!post.slug || !post.sys?.id) {
			continue;
		}
		lookup[post.sys.id] = { ...lookup[post.sys.id], de: `blog/${post.slug}` };
	}

	return Object.values(lookup).filter((pair): pair is SlugPair => Boolean(pair.en && pair.de));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const data = await getData<SlugData>({ query, variables: {} });
	const slugPairs = buildSlugPairs(data);

	return slugPairs.map(({ en, de }) => {
		const enPath = en === "" ? `${BASE_URL}/en` : `${BASE_URL}/en/${en}`;
		const dePath = de === "" ? `${BASE_URL}/de` : `${BASE_URL}/de/${de}`;

		return {
			url: enPath,
			lastModified: new Date(),
			alternates: {
				languages: {
					en: enPath,
					de: dePath,
				},
			},
		};
	});
}
