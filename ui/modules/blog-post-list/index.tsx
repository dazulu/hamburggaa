import { getLocale } from "next-intl/server";

import { query } from "@/queries/blog-post-list";
import { getData } from "@/services/get-data";
import type { BlogPostCollection, BlogPostFilter, BlogPostList } from "@/types/contentful";

import styles from "./styles.module.css";

export const ModuleBlogPostList = async ({ module }: { module: BlogPostList }) => {
	const locale = await getLocale();
	const { numPosts = 3, filterByLabelsCollection } = module;

	const labelIds =
		filterByLabelsCollection?.items
			.filter((item): item is NonNullable<typeof item> => !!item?.sys?.id)
			.map((item) => item.sys.id) || [];

	const where: BlogPostFilter = {};
	if (labelIds.length > 0) {
		where.labels = { sys: { id_in: labelIds } };
	}

	const data = await getData<{ blogPostCollection: BlogPostCollection }>({
		query,
		variables: {
			limit: numPosts || 3,
			locale,
			where,
		},
	});

	const posts = data.blogPostCollection.items.filter((item): item is NonNullable<typeof item> => !!item);

	if (posts.length === 0) {
		return null;
	}

	return (
		<div className={`${styles.container} global-contain-width global-module-spacing`}>
			<h2>ModuleBlogPostList</h2>
			<pre>
				<code>{JSON.stringify(posts, null, 2)}</code>
			</pre>
		</div>
	);
};
