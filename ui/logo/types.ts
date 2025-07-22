import type { Asset } from "@/types/contentful";

export interface LogoProps {
	asset: Asset;
	className?: string;
	baseResolutionWidth?: number;
	static?: boolean;
}
