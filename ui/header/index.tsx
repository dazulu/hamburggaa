import { LanguageSwitcher } from "./language-switcher";
import { Locale } from "@/types/i18n";
import { Navigation } from "./navigation";
import { SocialIcons } from "../social";

export const Header = ({ locale }: { locale: Locale }): JSX.Element => {
  return (
    <header>
      {/* @ts-expect-error Async Server Component */}
      <Navigation locale={locale} />
      <LanguageSwitcher />
      {/* @ts-expect-error Async Server Component */}
      <SocialIcons />
    </header>
  );
};
