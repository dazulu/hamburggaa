import React from 'react';
import styles from './styles.module.scss';
import { Page as PageProps } from '@/types/contentful';
import { Meta } from '@/components/meta';

export const Layout: React.FC<{ data: PageProps }> = ({ data }) => {
  const { metaInformation } = data;
  const {
    modulesCollection: { items: modules },
  } = data;

  return (
    <div className={styles.layout}>
      hi
      <Meta data={metaInformation} />
      <nav></nav>
      <main>
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
