import { ConfigCollection } from "@/types/contentful";
import Image from "next/image";
import Link from "next/link";
import { getData } from "@/services/get-data";
import { query } from "@/queries/logo";

export const Logo = async ({ size = "sm" }: { size?: "sm" | "lg" }) => {
  const data = await getData<ConfigCollection>({ query });
  const { logo } = data.configCollection.items[0];
  const { description, url } = logo;

  const isSmall = size === "sm";
  const src = isSmall ? `${url}?fm=png&w=180&q=90` : `${url}?fm=png&w=280&q=90`;

  return (
    <Link href="/">
      <Image
        priority
        unoptimized
        src={src}
        alt={description}
        aria-hidden="true"
        height={isSmall ? 84 : 135}
        width={isSmall ? 90 : 140}
      />
    </Link>
  );
};
