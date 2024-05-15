import { usePathname } from "next/navigation";

import type { Locale } from "@/types/i18n";

export const useLang = (): Locale => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] as Locale;
  return locale;
};
