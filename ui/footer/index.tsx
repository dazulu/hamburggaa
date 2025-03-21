import { Navigation } from "./navigation";
import styles from "./styles.module.css";

export const Footer = async ({ locale }: { locale: string }) => {
  return (
    <footer className={styles.container}>
      Footer
      {/* TypeScript limitation: async components receiving props need the expect-error,
                  while prop-less async components like SocialIcons work fine */}
      {/* @ts-expect-error Async Server Component */}
      <Navigation locale={locale} />
    </footer>
  );
};

export default Footer;
