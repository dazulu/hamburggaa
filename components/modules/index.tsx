import React, { VFC } from 'react';
import { ModuleImageText } from './module/image-text';
import { PageModulesItem } from '@/types/contentful';

export const Module: VFC<{ module: PageModulesItem }> = ({ module }) => {
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
