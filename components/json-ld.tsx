type JsonLdProps = {
	data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}
