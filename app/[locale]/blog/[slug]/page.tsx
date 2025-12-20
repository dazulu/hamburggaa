import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { LOCALES } from "@/i18n/locales";
import { query, staticParamsQuery } from "@/queries/blog-post";
import { getData as getContentfulData } from "@/services/get-data";
import type {
	BlogPostCollection,
	BlogPost as ContentfulBlogPost,
	FooterCollection,
	HeaderCollection,
} from "@/types/contentful";
import { getAllSlugs, getAlternateSlug } from "@/utils/alternate-language-slugs";

import PageRenderer from "./renderer";

async function getData(locale: string) {
	try {
		const response = await fetch(
			`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
				},
				body: JSON.stringify({
					query: staticParamsQuery,
					variables: { locale },
				}),
			},
		);

		const { data } = await response.json();

		const staticParams = data.blogPostCollection.items
			.filter((item: ContentfulBlogPost) => Boolean(item?.slug))
			.reduce((acc, { slug }) => {
				return [...acc, { locale, slug }];
			}, []);

		return staticParams;
	} catch (_error) {
		console.error("Failed to fetch data for generateStaticParams");
		return [];
	}
}

export async function generateStaticParams() {
	const promises = LOCALES.map((locale) => getData(locale));
	const data = await Promise.all(promises);
	return data.flat();
}

type Props = {
	params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;

	const data = await getContentfulData<{
		headerCollection: HeaderCollection;
		footerCollection: FooterCollection;
		blogPostCollection: BlogPostCollection;
	}>({
		query,
		variables: { locale, slug },
	});

	const post = data.blogPostCollection.items[0];

	if (!post) {
		return {};
	}
	const allSlugs = await getAllSlugs();
	const currentPath = `blog/${slug}`;
	const alternateLocale = locale === "en" ? "de" : "en";
	const alternateSlug = getAlternateSlug(currentPath, locale, alternateLocale, allSlugs);

	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://hamburggaa.de";

	return {
		metadataBase: new URL(baseUrl),
		title: post.headline,
		description: post.hook,
		alternates: {
			canonical: `/${locale}/${currentPath}`,
			languages: {
				[alternateLocale]: `/${alternateLocale}${alternateSlug}`,
			},
		},
		openGraph: {
			title: post.headline || undefined,
			description: post.hook || undefined,
			images: post.image?.url
				? [
						{
							url: post.image.url,
							width: post.image.width || 1200,
							height: post.image.height || 630,
							alt: post.image.description || post.headline || "",
						},
					]
				: [],
			type: "article",
			publishedTime: post.sys.firstPublishedAt || undefined,
			authors: post.author?.name ? [post.author.name] : undefined,
		},
		twitter: {
			card: "summary_large_image",
			title: post.headline || undefined,
			description: post.hook || undefined,
			images: post.image?.url ? [post.image.url] : [],
		},
	};
}

export default async function Page({ params }: Props) {
	const { slug } = await params;
	const locale = await getLocale();
	return PageRenderer({ params: { locale, slug } });
}
