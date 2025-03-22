import "@/styles/global.css";
import "@/styles/variables.css";

import { bodyFont, headlineFont } from "@/services/fonts";

import { CSSVariables } from "@/components/css-variables";
import { ThemeCollection } from "@/types/contentful";
import { getData } from "@/services/get-data";
import { query } from "@/queries/config";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const data = await getData<ThemeCollection>({ query });
  const { primaryColour, secondaryColour } = data.themeCollection.items[0];

  return (
    <html lang="en" className={`${bodyFont.variable} ${headlineFont.variable}`}>
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
