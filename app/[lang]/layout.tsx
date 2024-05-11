import { Header } from '@/ui/header';
import '@/styles/global.scss';
import '@/styles/variables.scss';

export default function RootLayout({
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
        <Header lang={lang} />
        {children}
      </body>
    </html>
  );
}
