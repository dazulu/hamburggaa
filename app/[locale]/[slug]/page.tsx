import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import PageRenderer from "@/app/renderer";
import { LOCALES } from "@/i18n/locales";
import { query as pageQuery } from "@/queries/page";
import { query } from "@/queries/static-params";
import { getData } from "@/services/get-data";
import type { Page as ContentfulPage, PageCollection } from "@/types/contentful";
import { getAllSlugs, getAlternateSlug } from "@/utils/alternate-language-slugs";
import { BASE_URL } from "@/utils/constants";

async function getStaticParamsData(locale: string) {
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
					query,
					variables: { locale },
				}),
			},
		);

		const { data } = await response.json();

		const staticParams = data.pageCollection.items
			.filter((item: ContentfulPage) => Boolean(item?.slug))
			.reduce((acc, { slug }) => {
				return [...acc, { locale, slug }];
			}, []);

		return staticParams;
	} catch {
		console.error("Failed to fetch data for generateStaticParams");
		return [];
	}
}

export async function generateStaticParams() {
	const promises = LOCALES.map((locale) => getStaticParamsData(locale));
	const data = await Promise.all(promises);
	return data.flat();
}

type Props = {
	params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;

	const data = await getData<{ pageCollection: PageCollection }>({
		query: pageQuery,
		variables: { locale, slug },
	});

	const page = data.pageCollection.items[0];

	if (!page) {
		return {};
	}

	const allSlugs = await getAllSlugs();
	const alternateLocale = locale === "en" ? "de" : "en";
	const alternateSlug = getAlternateSlug(slug, locale, alternateLocale, allSlugs);

	return {
		metadataBase: new URL(BASE_URL),
		title: page.seoTitle,
		description: page.seoDescription,
		alternates: {
			canonical: `/${locale}/${slug}`,
			languages: {
				[alternateLocale]: `/${alternateLocale}${alternateSlug}`,
			},
		},
		openGraph: {
			title: page.seoTitle || undefined,
			description: page.seoDescription || undefined,
			images: page.seoImage?.url
				? [
						{
							url: page.seoImage.url,
							width: page.seoImage.width || 1200,
							height: page.seoImage.height || 630,
							alt: page.seoImage.description || page.seoTitle || "",
						},
					]
				: [],
			type: "website",
			locale,
		},
		twitter: {
			card: "summary_large_image",
			title: page.seoTitle || undefined,
			description: page.seoDescription || undefined,
			images: page.seoImage?.url ? [page.seoImage.url] : [],
		},
	};
}

export default async function Page({ params }: Props) {
	const { slug } = await params;
	const locale = await getLocale();
	return PageRenderer({ params: { locale, slug } });
}
