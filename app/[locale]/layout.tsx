import { Header } from "@/ui/header";
import "@/styles/global.scss";
import "@/styles/variables.scss";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Record<string, any>;
}): JSX.Element {
  const { locale } = params;

  return (
    <html lang={locale}>
      <body>
        <Header locale={locale} />
        {children}
      </body>
    </html>
  );
}
