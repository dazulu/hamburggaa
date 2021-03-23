import React from 'react';
import styles from './styles.module.scss';
import { Meta } from '@/components/meta';
import { Sidebar } from '@/components/sidebar';
import { PageData } from '@/types/page';
import { LinksProvider } from '@/context/links';
import { ConfigProvider } from '@/context/config';

export const Layout: React.FC<PageData> = ({
  data: { page, navigation, config },
}) => {
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
        <div className={styles.layout}>
          <Meta data={metaInformation} />

          <LinksProvider value={{ navigation, socialLinks }}>
            <Sidebar />
          </LinksProvider>

          <main className={styles.main}>
            {modules.map((module) => {
              return (
                <>
                  <pre>
                    <code>{JSON.stringify(module, null, 2)}</code>
                  </pre>
                </>
              );
            })}
          </main>
        </div>
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
