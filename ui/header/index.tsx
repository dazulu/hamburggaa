import { LanguageSwitcher } from "./language-switcher";
import { Locale } from "@/types/i18n";
import { Navigation } from "./navigation";
import { SocialIcons } from "../social";

export const Header = ({ lang }: { lang: Locale }): JSX.Element => {
  return (
    <header>
      {/* @ts-expect-error Async Server Component */}
      <Navigation lang={lang} />
      <LanguageSwitcher />
      {/* @ts-expect-error Async Server Component */}
      <SocialIcons />
    </header>
  );
};
