import Image from "next/image";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/routing";
import { query } from "@/queries/blog-post-list";
import { getData } from "@/services/get-data";
import type { BlogPostCollection, BlogPostFilter, BlogPostList } from "@/types/contentful";
import { Label } from "@/ui/label";

import styles from "./styles.module.css";

// Custom props type to support both CMS-driven and hardcoded module props (Blog Post)
type CustomBlogPostListProps = {
	headline?: string;
	labelIds: string[];
	numPosts?: number;
	originatingPostSysId?: string;
};

export const ModuleBlogPostList = async ({ module }: { module: BlogPostList | CustomBlogPostListProps }) => {
	const locale = await getLocale();

	const { headline, numPosts = 3 } = module;
	let labelIds: string[] = [];

	if ("filterByLabelsCollection" in module) {
		labelIds =
			module.filterByLabelsCollection?.items
				.filter((item): item is NonNullable<typeof item> => !!item?.sys?.id)
				.map((item) => item.sys.id) || [];
	} else if ("labelIds" in module) {
		labelIds = module.labelIds || [];
	}

	const where: BlogPostFilter = {};

	if (labelIds.length > 0) {
		where.labels = {
			sys: { id_in: labelIds },
		};
	}

	// For the list shown on a blog post, exclude the current post from the results
	if ("originatingPostSysId" in module && module.originatingPostSysId) {
		where.sys = {
			id_not: module.originatingPostSysId,
		};
	}

	const data = await getData<{ blogPostCollection: BlogPostCollection }>({
		query,
		variables: {
			limit: numPosts || 3,
			locale,
			where,
		},
	});

	const posts = data.blogPostCollection.items.filter(Boolean);

	if (posts.length === 0) {
		return null;
	}

	return (
		<div className={`${styles.container} global-contain-width global-module-spacing`}>
			{headline && <h2 className={styles.headline}>{headline}</h2>}

			<div className={styles.posts}>
				{posts.map((post) => {
					const date = new Date(post.sys.firstPublishedAt);
					const formattedDate = new Intl.DateTimeFormat(locale, {
						year: "numeric",
						month: "long",
						day: "numeric",
					}).format(date);

					const { sys, headline, hook, slug, author, image, labelsCollection } = post;

					return (
						<Link
							key={sys.id}
							href={`/blog/${slug}`}
							className={styles.cardLink}
						>
							<article className={styles.card}>
								{image && (
									<div className={styles.imageWrapper}>
										<Image
											src={image.url}
											alt={image.description || post.headline || ""}
											width={600}
											height={400}
											className={styles.image}
										/>
									</div>
								)}
								<div className={styles.content}>
									<div className={styles.meta}>
										{author && (
											<div className={styles.author}>
												{author.image && (
													<Image
														src={author.image.url}
														alt={author.name}
														width={24}
														height={24}
														className={styles.authorImage}
													/>
												)}
												<span>{author.name}</span>
											</div>
										)}
										<time dateTime={sys.firstPublishedAt}>{formattedDate}</time>
									</div>
									<h3 className={styles.title}>{headline}</h3>
									{hook && <p className={styles.hook}>{hook}</p>}
									{labelsCollection?.items?.length > 0 && (
										<div className={styles.labels}>
											{labelsCollection.items.map((label) => (
												<Label
													key={label.name}
													name={label.name}
													color={label.color.value}
												/>
											))}
										</div>
									)}
								</div>
							</article>
						</Link>
					);
				})}
			</div>
		</div>
	);
};
