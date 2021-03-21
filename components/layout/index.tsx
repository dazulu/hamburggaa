import React from 'react';
import styles from './styles.module.scss';
import { Page as PageProps } from '@/types/contentful';
import { Meta } from '@/components/meta';
import { Sidebar } from '@/components/sidebar';

export const Layout: React.FC<{ data: PageProps }> = ({ data }) => {
  const { metaInformation } = data;
  const {
    modulesCollection: { items: modules },
  } = data;

  return (
    <div className={styles.layout}>
      <Meta data={metaInformation} />
      <Sidebar />
      <main className={styles.main}>
        Hi
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
