import Image from 'next/image';
import React from 'react';
import { ImageText } from '@/types/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const ModuleImageText = ({ module }: { module: ImageText }) => {
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
        width={image.width}
        height={image.height}
      />
    </>
  );
};
