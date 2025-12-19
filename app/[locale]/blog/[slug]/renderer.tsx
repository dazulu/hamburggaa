import { query } from "@/queries/blog-post";
import { getData } from "@/services/get-data";
import type { BlogPostCollection, FooterCollection, HeaderCollection } from "@/types/contentful";
import { BlogPost } from "@/ui/template/blog-post";

export default async function PageRenderer({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
	const data = await getData<{
		headerCollection: HeaderCollection;
		footerCollection: FooterCollection;
		blogPostCollection: BlogPostCollection;
	}>({
		query,
		variables: { locale, slug },
	});

	const post = data.blogPostCollection.items[0];
	const header = data.headerCollection.items[0];
	const footer = data.footerCollection.items[0];

	return (
		<BlogPost
			header={header}
			footer={footer}
			post={post}
		/>
	);
}
