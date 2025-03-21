import { LanguageSwitcher } from "./language-switcher";
import { Navigation } from "./navigation";
import { SocialIcons } from "@/ui/social";

export const Header = async ({ locale }: { locale: string }) => {
  return (
    <header>
      {/* TypeScript limitation: async components receiving props need the expect-error,
          while prop-less async components like SocialIcons work fine */}
      {/* @ts-expect-error Async Server Component */}
      <Navigation locale={locale} />
      <LanguageSwitcher />
      <SocialIcons />
    </header>
  );
};
