import Image from "next/image";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/routing";
import { query } from "@/queries/blog-post-list";
import { getData } from "@/services/get-data";
import type { BlogPostCollection, BlogPostFilter, BlogPostList } from "@/types/contentful";
import { Label } from "@/ui/label";
import { getOrganizationSchema } from "@/utils/organization-schema";

import styles from "./styles.module.css";

// Custom props type to support both CMS-driven and hardcoded module props (Blog Post)
type CustomBlogPostListProps = {
	headline?: string;
	labelIds: string[];
	numPosts?: number;
	originatingPostSysId?: string;
};

// If this is reached, refactor with pagination
const MAX_POSTS_TO_FETCH = 20;

export const ModuleBlogPostList = async ({ module }: { module: BlogPostList | CustomBlogPostListProps }) => {
	const locale = await getLocale();

	const { headline, numPosts } = module;
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
			limit: numPosts || MAX_POSTS_TO_FETCH,
			locale,
			where,
		},
	});

	const posts = data.blogPostCollection.items.filter(Boolean);

	if (posts.length === 0) {
		return null;
	}

	const organizationSchema = await getOrganizationSchema(locale);

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Blog",
		blogPost: posts.map((post) => ({
			"@type": "BlogPosting",
			headline: post.headline,
			description: post.hook,
			image: post.image?.url ? `${post.image.url}?w=1600&fit=fill&fm=jpg` : undefined,
			datePublished: post.sys.firstPublishedAt,
			author: {
				"@type": "Person",
				name: post.author.name,
				image: post.author.image?.url ? `${post.author.image.url}?w=200&h=200&fit=fill&fm=jpg` : undefined,
			},
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${post.slug}`,
			publisher: organizationSchema,
		})),
	};

	return (
		<div className={`${styles.container} global-contain-width global-module-spacing`}>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			{headline && <h2 className={styles.headline}>{headline}</h2>}

			<ul className={styles.posts}>
				{posts.map((post) => {
					const date = new Date(post.sys.firstPublishedAt);
					const formattedDate = new Intl.DateTimeFormat(locale, {
						year: "numeric",
						month: "long",
						day: "numeric",
					}).format(date);

					const { sys, headline, hook, slug, author, image, labelsCollection } = post;

					return (
						<li key={sys.id}>
							<article className={styles.card}>
								{image && (
									<div className={styles.imageWrapper}>
										<Image
											src={image.url}
											alt={image.description || ""}
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
														alt=""
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
									<h3 className={styles.title}>
										<Link
											href={`/blog/${slug}`}
											className={styles.cardLink}
										>
											{headline}
										</Link>
									</h3>
									{hook && <p className={styles.hook}>{hook}</p>}
									{labelsCollection?.items?.length > 0 && (
										<ul className={styles.labels}>
											{labelsCollection.items.map((label) => (
												<li key={label.name}>
													<Label
														name={label.name}
														color={label.color.value}
													/>
												</li>
											))}
										</ul>
									)}
								</div>
							</article>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
