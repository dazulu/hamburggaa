import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Meta } from '@/components/meta';
import { MobileHeader } from '@/components/mobile-header';
import { Module } from '@/components/modules';
import { PageData } from '@/types/page';
import { LinksProvider } from '@/context/links';
import { ConfigProvider } from '@/context/config';
import { NavigationProvider } from '@/context/navigation';

export const Layout = ({ data }: PageData) => {
  const [navIsOpen, setNavIsOpen] = useState(false);

  if (!data) return null;

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
              {/* ToDo: can this be repurposed/reused? */}
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
