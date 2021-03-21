import React from 'react';
import styles from './styles.module.scss';
import { Meta } from '@/components/meta';
import { Sidebar } from '@/components/sidebar';
import { PageData } from '@/types/page';
import { NavigationProvider } from '@/context/navigation';

export const Layout: React.FC<PageData> = ({ data: { page, navigation } }) => {
  const { metaInformation } = page;
  const {
    modulesCollection: { items: modules },
  } = page;

  return (
    <div className={styles.layout}>
      <Meta data={metaInformation} />

      <NavigationProvider value={navigation}>
        <Sidebar />
      </NavigationProvider>

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
  );
};
