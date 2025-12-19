import { getLocale } from "next-intl/server";

import { LOCALES } from "@/i18n/locales";
import { staticParamsQuery } from "@/queries/blog-post";
import type { BlogPost as ContentfulBlogPost } from "@/types/contentful";

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

export default async function Page({ params }) {
	const { slug } = await params;
	const locale = await getLocale();
	return PageRenderer({ params: { locale, slug } });
}
