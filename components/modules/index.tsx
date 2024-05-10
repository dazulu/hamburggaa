import React from 'react';
import { ModuleImageText } from './module/image-text';
import { PageModulesItem } from '@/types/contentful';

export const Module = ({ module }: { module: PageModulesItem }) => {
  switch (module.__typename) {
    case 'ImageText': {
      return <ModuleImageText module={module} />;
    }
    default:
      return (
        <pre>
          <code>NOT MAPPED: {JSON.stringify(module, null, 2)}</code>
        </pre>
      );
  }
};
