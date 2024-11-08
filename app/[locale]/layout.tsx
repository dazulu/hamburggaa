import { Header } from "@/ui/header";
import "@/styles/global.css";
import "@/styles/variables.css";

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<Record<string, any>>;
}): Promise<JSX.Element> {
  const params = await props.params;

  const { children } = props;

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
