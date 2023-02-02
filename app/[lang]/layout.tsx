import '@/styles/global.scss';
import '@/styles/variables.scss';

import { Header } from '@/ui/header/';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  params,
}: {
  children: React.ReactNode;
  params: Record<string, any>;
}): JSX.Element {
  const { lang } = params;
  return (
    <html lang={lang}>
      <body>
        {/* ToDo: Consider how to access active locale for Link href */}
        <Header lang={lang} />
        {children}
      </body>
    </html>
  );
}
