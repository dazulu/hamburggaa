import "@/styles/global.css";
import "@/styles/variables.css";

import { CSSVariables } from "@/components/css-variables";
import { Oswald } from "next/font/google";
import { ThemeCollection } from "@/types/contentful";
import { getData } from "@/services/get-data";
import { query } from "@/queries/config";

const oswald = Oswald({
  weight: "700",
  subsets: ["latin"],
});

export default async function RootLayout(props: { children: React.ReactNode }) {
  const data = await getData<ThemeCollection>({ query });
  const { primaryColour, secondaryColour } = data.themeCollection.items[0];

  return (
    <html lang="en" className={oswald.className}>
      <body>
        <CSSVariables
          primaryColour={primaryColour}
          secondaryColour={secondaryColour}
        />
        {props.children}
      </body>
    </html>
  );
}
