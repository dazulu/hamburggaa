import "@/styles/global.css";
import "@/styles/variables.css";

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}
