import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	generateBuildId: () => "build",
	devIndicators: false,
	trailingSlash: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.ctfassets.net",
				port: "",
			},
		],
		formats: ["image/avif", "image/webp"],
	},
};

export default withNextIntl(nextConfig);
