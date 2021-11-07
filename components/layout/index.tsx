import React, { useState, VFC } from 'react';
import styles from './styles.module.scss';
import { Meta } from '@/components/meta';
import { Sidebar } from '@/components/sidebar';
import { MobileHeader } from '@/components/mobile-header';
import { Module } from '@/components/modules';
import { PageData } from '@/types/page';
import { LinksProvider } from '@/context/links';
import { ConfigProvider } from '@/context/config';
import { NavigationProvider } from '@/context/navigation';

export const Layout: VFC<PageData> = ({ data }) => {
  if (!data) return null;

  const [navIsOpen, setNavIsOpen] = useState(false);
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
              {modules.map((module) => (
                <Module key={module.sys.id} module={module} />
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
