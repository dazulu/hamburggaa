import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import SharedPage from "@/app/renderer";
import { LOCALES } from "@/i18n/locales";
import { query } from "@/queries/page";
import { getData } from "@/services/get-data";
import type { PageCollection } from "@/types/contentful";
import { BASE_URL } from "@/utils/constants";

export async function generateStaticParams() {
	return LOCALES.map((locale) => ({ locale, slug: "/" }));
}

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;

	const data = await getData<{ pageCollection: PageCollection }>({
		query,
		variables: { locale, slug: "ROOT" },
	});

	const page = data.pageCollection.items[0];

	if (!page) {
		return {};
	}

	const alternateLocale = locale === "en" ? "de" : "en";

	return {
		metadataBase: new URL(BASE_URL),
		title: page.seoTitle,
		description: page.seoDescription,
		alternates: {
			canonical: `/${locale}`,
			languages: {
				[alternateLocale]: `/${alternateLocale}`,
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

export default async function Page() {
	const locale = await getLocale();

	return SharedPage({
		params: { locale, slug: "ROOT" },
	});
}
