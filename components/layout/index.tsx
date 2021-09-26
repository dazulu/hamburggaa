import React from 'react';
import styles from './styles.module.scss';
import { Meta } from '@/components/meta';
import { Sidebar } from '@/components/sidebar';
import { MobileHeader } from '@/components/mobile-header';
import { PageData } from '@/types/page';
import { LinksProvider } from '@/context/links';
import { ConfigProvider } from '@/context/config';
import { NavigationProvider } from '@/context/navigation';

export const Layout: React.FC<PageData> = ({ data }) => {
  if (!data) return null;

  const [navIsOpen, setNavIsOpen] = React.useState(false);
  const { page, navigation, config } = data;

  const {
    metaInformation,
    modulesCollection: { items: modules },
  } = page;

  const {
    primaryColor,
    secondaryColor,
    socialMediaLinksCollection: { items: socialLinks },
  } = config;

  return (
    <>
      <ConfigProvider value={config}>
        <NavigationProvider value={{ navIsOpen, setNavIsOpen }}>
          <div className={styles.layout}>
            <Meta data={metaInformation} />
            <MobileHeader />

            <LinksProvider value={{ navigation, socialLinks }}>
              <Sidebar />
            </LinksProvider>

            <main className={styles.main}>
              <div className={styles.grid}>
                <div className={`${styles.panel} ${styles.panel1}`}></div>
                <div className={`${styles.panel} ${styles.panel2}`}></div>
                <div className={`${styles.panel} ${styles.panel3}`}></div>
                <div className={`${styles.panel} ${styles.panel4}`}></div>
              </div>
              {modules.map((module) => (
                <pre key={module.sys.id}>
                  <code>{JSON.stringify(module, null, 2)}</code>
                </pre>
              ))}
            </main>
          </div>
        </NavigationProvider>
      </ConfigProvider>
      <style jsx global>{`
        :root {
          --primary: ${primaryColor};
          --secondary: ${secondaryColor};
        }
      `}</style>
    </>
  );
};
