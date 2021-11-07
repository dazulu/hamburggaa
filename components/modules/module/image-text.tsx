import Image from 'next/image';
import React, { VFC } from 'react';
import { ImageText } from '@/types/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const ModuleImageText: VFC<{ module: ImageText }> = ({ module }) => {
  const {
    image: { alt, image },
    text,
  } = module;
  return (
    <>
      {documentToReactComponents(text.json)}
      <Image
        alt={alt}
        src={image.url}
        layout="responsive"
        width={image.width}
        height={image.height}
      />
    </>
  );
};
