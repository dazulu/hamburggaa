import { LanguageSwitcher } from './language-switcher';
import { Navigation } from './navigation';

import type { Locale } from '@/types/i18n';

export const Header: React.FC<{ lang: Locale }> = () => {
  return (
    <div>
      <Navigation />
      <LanguageSwitcher />
    </div>
  );
};
