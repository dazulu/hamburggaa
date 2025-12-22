import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { getLocale } from "next-intl/server";

import { createRichTextRenderOptions } from "@/components/rich-text-renderer";
import { i18n } from "@/i18n/translations";
import type { BlogPost as BlogPostType, Footer, Header } from "@/types/contentful";
import { Label } from "@/ui/label";
import { ModuleBlogPostList } from "@/ui/modules/blog-post-list";
import { ModuleFooter } from "@/ui/modules/footer";
import { ModuleHeader } from "@/ui/modules/header";
import { getReadingTimeFromRichText } from "@/utils/reading-time";

import styles from "./styles.module.css";

type BlogPostProps = {
	post: BlogPostType;
	header: Header;
	footer: Footer;
};

export const BlogPost = async ({ post, header, footer }: BlogPostProps) => {
	const { headline, hook, image, content, labelsCollection, author, sys } = post;

	const locale = await getLocale();
	const publishedDate = sys.firstPublishedAt
		? new Intl.DateTimeFormat(locale, {
				year: "numeric",
				month: "long",
				day: "numeric",
			}).format(new Date(sys.firstPublishedAt))
		: null;

	const renderOptions = createRichTextRenderOptions(content?.links);

	const readingTime = Math.ceil(getReadingTimeFromRichText(content.json));
	const readingTimeText = `${readingTime} ${i18n[locale].blogPost.readingTimeSuffix}`;

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline,
		description: hook || undefined,
		image: image?.url ? [image.url] : undefined,
		datePublished: sys.firstPublishedAt,
		dateModified: sys.firstPublishedAt,
		author: author
			? {
					"@type": "Person",
					name: author.name,
					image: author.image?.url,
				}
			: undefined,
		publisher: {
			"@type": "Organization",
			name: "Hamburg GAA",
		},
	};

	const labelIds = labelsCollection?.items?.map((label) => label.sys.id).filter(Boolean);
	const moduleBlogPostListProps = {
		headline: i18n[locale].blogPost.youMightAlsoLike,
		labelIds,
		originatingPostSysId: sys.id,
	};

	return (
		<div className={styles.wrapper}>
			<ModuleHeader module={header} />
			<div className="global-top-gradient">
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<article className={styles.container}>
					<header className={styles.header}>
						<h1 className={styles.title}>{headline}</h1>
						{hook && <p className={styles.subtitle}>{hook}</p>}
						<p className={styles.readingTime}>
							<svg
								role="presentation"
								fill="currentColor"
								width="24px"
								height="24px"
								viewBox="0 -960 960 960"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M556.88-571.77v-47.77q32.62-16.27 68.71-24.09 36.09-7.83 74.41-7.83 23.21 0 45.78 2.98t44.91 8.68v46.91q-21.96-7.34-43.86-10.32-21.9-2.98-46.79-2.98-38.33 0-74.74 8.71-36.42 8.71-68.42 25.71Zm0 219.23v-48.54q31.85-16.27 68.52-24.5 36.67-8.23 74.6-8.23 23.21 0 45.78 3.12 22.57 3.11 44.91 9.34v46.93q-21.98-7.35-43.87-10.73-21.9-3.39-46.79-3.39-38.34 0-74.76 9.19-36.42 9.2-68.39 26.81Zm0-109.23v-48.54q32.62-16.27 68.71-24.09 36.09-7.83 74.41-7.83 23.21 0 45.78 2.71t44.91 8.94v46.93q-21.98-7.35-43.87-10.74-21.9-3.38-46.79-3.38-38.34 0-74.76 9.5t-68.39 26.5Zm-294.3 140.92q49.54 0 96.54 11.27 47 11.27 93.3 35.35v-388.38q-41.34-27.47-90.87-41.6-49.53-14.14-99.17-14.14-35.44 0-66.4 5.66-30.95 5.65-63.48 18.54-4.62 1.54-6.54 4.42t-1.92 6.35v373.42q0 5.38 3.84 7.88 3.85 2.5 8.47.58 27.34-9.69 58.84-14.52 31.51-4.83 67.39-4.83Zm245.8 46.62q46.35-24.08 93-35.35 46.65-11.27 95.98-11.27 35.72 0 67.33 4.83 31.62 4.83 58.96 14.52 4.62 1.92 8.47-.58 3.84-2.5 3.84-7.88v-373.46q0-3.46-1.92-6.16-1.92-2.69-6.54-4.61-32.5-12.04-63.46-18.1-30.97-6.06-66.46-6.06-49.7 0-98.77 14.14-49.08 14.13-90.43 41.66v388.32ZM480-191.89q-48.08-34.57-103.27-53.78-55.19-19.22-114.31-19.22-34.96 0-68.67 7.56t-65.6 22.08q-21.46 9.48-40.76-3.4-19.31-12.89-19.31-36.51v-421.38q0-13.23 7.06-24.32 7.05-11.1 19.59-16.29 39.54-18.46 81.9-27.81 42.36-9.35 85.79-9.35 57.94 0 113.2 16.12 55.26 16.11 104.38 46.96 49.12-30.85 104.38-46.96 55.26-16.12 113.2-16.12 43.43 0 85.79 9.35 42.36 9.35 81.9 27.81 12.54 5.19 19.59 16.29 7.06 11.09 7.06 24.32v421.38q0 23.62-20.08 36.12-20.07 12.5-42.3 3.02-31.5-14.14-64.55-21.5-33.04-7.37-67.41-7.37-59.12 0-114.31 19.22-55.19 19.21-103.27 53.78Zm-191.77-304.8Z" />
							</svg>
							{readingTimeText}
						</p>
					</header>

					<div className={styles.hero}>
						<Image
							fill
							priority
							alt={image.description || ""}
							className={styles.heroImage}
							objectFit="cover"
							src={image.url}
						/>
					</div>

					<div className={styles.meta}>
						<div className={styles.author}>
							{author.image?.url ? (
								<Image
									src={author.image.url}
									alt={`Author avatar for ${author.name || ""}`}
									width={56}
									height={56}
									className={styles.authorAvatar}
								/>
							) : (
								<div className={styles.authorPlaceholder}>{author.name?.charAt(0).toUpperCase() || "A"}</div>
							)}
							<div className={styles.authorInfo}>
								{author.name && <div className={styles.authorName}>{author.name}</div>}
								{author.role && <div className={styles.authorRole}>{author.role}</div>}
							</div>
						</div>

						<div className={styles.metadata}>
							<div className={styles.publishedDate}>{publishedDate}</div>
							{labelsCollection?.items?.length > 0 && (
								<ul
									aria-label={i18n[locale].blogPost.postLabels}
									className={styles.labels}
								>
									{labelsCollection.items?.map(({ name, color }) => {
										return (
											<li key={name}>
												<Label
													name={name}
													color={color.value}
												/>
											</li>
										);
									})}
								</ul>
							)}
						</div>
					</div>

					{content && <div className={styles.content}>{documentToReactComponents(content.json, renderOptions)}</div>}
				</article>
				{labelIds.length > 0 && <ModuleBlogPostList module={moduleBlogPostListProps} />}
				<ModuleFooter module={footer} />
			</div>
		</div>
	);
};
