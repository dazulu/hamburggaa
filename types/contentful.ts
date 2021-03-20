export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: any;
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: any;
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: any;
};

export type Query = {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  navigationConfig?: Maybe<NavigationConfig>;
  navigationConfigCollection?: Maybe<NavigationConfigCollection>;
  page?: Maybe<Page>;
  pageCollection?: Maybe<PageCollection>;
  images?: Maybe<Images>;
  imagesCollection?: Maybe<ImagesCollection>;
  image?: Maybe<Image>;
  imageCollection?: Maybe<ImageCollection>;
  metaTags?: Maybe<MetaTags>;
  metaTagsCollection?: Maybe<MetaTagsCollection>;
};


export type QueryAssetArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryAssetCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<AssetFilter>;
  order?: Maybe<Array<Maybe<AssetOrder>>>;
};


export type QueryNavigationConfigArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryNavigationConfigCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<NavigationConfigFilter>;
  order?: Maybe<Array<Maybe<NavigationConfigOrder>>>;
};


export type QueryPageArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<PageFilter>;
  order?: Maybe<Array<Maybe<PageOrder>>>;
};


export type QueryImagesArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryImagesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<ImagesFilter>;
  order?: Maybe<Array<Maybe<ImagesOrder>>>;
};


export type QueryImageArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryImageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<ImageFilter>;
  order?: Maybe<Array<Maybe<ImageOrder>>>;
};


export type QueryMetaTagsArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryMetaTagsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<MetaTagsFilter>;
  order?: Maybe<Array<Maybe<MetaTagsOrder>>>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  transform?: Maybe<ImageTransformOptions>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Sys = {
  __typename?: 'Sys';
  id: Scalars['String'];
  spaceId: Scalars['String'];
  environmentId: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
};


export type ImageTransformOptions = {
  /** Desired width in pixels. Defaults to the original image width. */
  width?: Maybe<Scalars['Dimension']>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: Maybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: Maybe<Scalars['Quality']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: Maybe<Scalars['Int']>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: Maybe<ImageResizeStrategy>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: Maybe<ImageResizeFocus>;
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: Maybe<Scalars['HexColor']>;
  /** Desired image format. Defaults to the original image format. */
  format?: Maybe<ImageFormat>;
};



export enum ImageResizeStrategy {
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES'
}


export enum ImageFormat {
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  imageCollection?: Maybe<ImageCollection>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsImageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Entry>>;
};

export type Entry = {
  sys: Sys;
};

export type ImageCollection = {
  __typename?: 'ImageCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Image>>;
};

/** A single image. [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/image) */
export type Image = Entry & {
  __typename?: 'Image';
  sys: Sys;
  linkedFrom?: Maybe<ImageLinkingCollections>;
  contentfulTitle?: Maybe<Scalars['String']>;
  alt?: Maybe<Scalars['String']>;
  image?: Maybe<Asset>;
};


/** A single image. [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/image) */
export type ImageLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A single image. [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/image) */
export type ImageContentfulTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A single image. [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/image) */
export type ImageAltArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A single image. [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/image) */
export type ImageImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type ImageLinkingCollections = {
  __typename?: 'ImageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  imagesCollection?: Maybe<ImagesCollection>;
};


export type ImageLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ImageLinkingCollectionsImagesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type ImagesCollection = {
  __typename?: 'ImagesCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Images>>;
};

/** A collection of images. [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/images) */
export type Images = Entry & {
  __typename?: 'Images';
  sys: Sys;
  linkedFrom?: Maybe<ImagesLinkingCollections>;
  contentfulTitle?: Maybe<Scalars['String']>;
  imagesCollection?: Maybe<ImagesImagesCollection>;
};


/** A collection of images. [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/images) */
export type ImagesLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A collection of images. [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/images) */
export type ImagesContentfulTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A collection of images. [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/images) */
export type ImagesImagesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type ImagesLinkingCollections = {
  __typename?: 'ImagesLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ImagesLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type ImagesImagesCollection = {
  __typename?: 'ImagesImagesCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Image>>;
};

export type AssetFilter = {
  sys?: Maybe<SysFilter>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
  url_not?: Maybe<Scalars['String']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_contains?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  size_exists?: Maybe<Scalars['Boolean']>;
  size?: Maybe<Scalars['Int']>;
  size_not?: Maybe<Scalars['Int']>;
  size_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size_gt?: Maybe<Scalars['Int']>;
  size_gte?: Maybe<Scalars['Int']>;
  size_lt?: Maybe<Scalars['Int']>;
  size_lte?: Maybe<Scalars['Int']>;
  contentType_exists?: Maybe<Scalars['Boolean']>;
  contentType?: Maybe<Scalars['String']>;
  contentType_not?: Maybe<Scalars['String']>;
  contentType_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentType_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentType_contains?: Maybe<Scalars['String']>;
  contentType_not_contains?: Maybe<Scalars['String']>;
  fileName_exists?: Maybe<Scalars['Boolean']>;
  fileName?: Maybe<Scalars['String']>;
  fileName_not?: Maybe<Scalars['String']>;
  fileName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName_contains?: Maybe<Scalars['String']>;
  fileName_not_contains?: Maybe<Scalars['String']>;
  width_exists?: Maybe<Scalars['Boolean']>;
  width?: Maybe<Scalars['Int']>;
  width_not?: Maybe<Scalars['Int']>;
  width_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  width_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  width_gt?: Maybe<Scalars['Int']>;
  width_gte?: Maybe<Scalars['Int']>;
  width_lt?: Maybe<Scalars['Int']>;
  width_lte?: Maybe<Scalars['Int']>;
  height_exists?: Maybe<Scalars['Boolean']>;
  height?: Maybe<Scalars['Int']>;
  height_not?: Maybe<Scalars['Int']>;
  height_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  height_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  height_gt?: Maybe<Scalars['Int']>;
  height_gte?: Maybe<Scalars['Int']>;
  height_lt?: Maybe<Scalars['Int']>;
  height_lte?: Maybe<Scalars['Int']>;
  OR?: Maybe<Array<Maybe<AssetFilter>>>;
  AND?: Maybe<Array<Maybe<AssetFilter>>>;
};

export type SysFilter = {
  id_exists?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  id_not?: Maybe<Scalars['String']>;
  id_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains?: Maybe<Scalars['String']>;
  id_not_contains?: Maybe<Scalars['String']>;
  publishedAt_exists?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedAt_not?: Maybe<Scalars['DateTime']>;
  publishedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  publishedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  publishedAt_gt?: Maybe<Scalars['DateTime']>;
  publishedAt_gte?: Maybe<Scalars['DateTime']>;
  publishedAt_lt?: Maybe<Scalars['DateTime']>;
  publishedAt_lte?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_exists?: Maybe<Scalars['Boolean']>;
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_not?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  firstPublishedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  firstPublishedAt_gt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_gte?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_lt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_lte?: Maybe<Scalars['DateTime']>;
  publishedVersion_exists?: Maybe<Scalars['Boolean']>;
  publishedVersion?: Maybe<Scalars['Float']>;
  publishedVersion_not?: Maybe<Scalars['Float']>;
  publishedVersion_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  publishedVersion_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  publishedVersion_gt?: Maybe<Scalars['Float']>;
  publishedVersion_gte?: Maybe<Scalars['Float']>;
  publishedVersion_lt?: Maybe<Scalars['Float']>;
  publishedVersion_lte?: Maybe<Scalars['Float']>;
};

export enum AssetOrder {
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type AssetCollection = {
  __typename?: 'AssetCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Asset>>;
};

/** Navigation configuration for a page [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/navigationConfig) */
export type NavigationConfig = Entry & {
  __typename?: 'NavigationConfig';
  sys: Sys;
  linkedFrom?: Maybe<NavigationConfigLinkingCollections>;
  contentfulTitle?: Maybe<Scalars['String']>;
  dir?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  showInMenu?: Maybe<Scalars['Boolean']>;
  menuLabel?: Maybe<Scalars['String']>;
};


/** Navigation configuration for a page [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/navigationConfig) */
export type NavigationConfigLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Navigation configuration for a page [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/navigationConfig) */
export type NavigationConfigContentfulTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Navigation configuration for a page [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/navigationConfig) */
export type NavigationConfigDirArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Navigation configuration for a page [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/navigationConfig) */
export type NavigationConfigSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Navigation configuration for a page [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/navigationConfig) */
export type NavigationConfigShowInMenuArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Navigation configuration for a page [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/navigationConfig) */
export type NavigationConfigMenuLabelArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type NavigationConfigLinkingCollections = {
  __typename?: 'NavigationConfigLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type NavigationConfigLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type NavigationConfigLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type PageCollection = {
  __typename?: 'PageCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Page>>;
};

/** A single page [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/page) */
export type Page = Entry & {
  __typename?: 'Page';
  sys: Sys;
  linkedFrom?: Maybe<PageLinkingCollections>;
  contentfulTitle?: Maybe<Scalars['String']>;
  navigation?: Maybe<NavigationConfig>;
  metaInformation?: Maybe<MetaTags>;
  modulesCollection?: Maybe<PageModulesCollection>;
};


/** A single page [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/page) */
export type PageLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A single page [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/page) */
export type PageContentfulTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A single page [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/page) */
export type PageNavigationArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** A single page [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/page) */
export type PageMetaInformationArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** A single page [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/page) */
export type PageModulesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type PageLinkingCollections = {
  __typename?: 'PageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type PageLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

/** Meta and SEO related information for a page. [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/metaTags) */
export type MetaTags = Entry & {
  __typename?: 'MetaTags';
  sys: Sys;
  linkedFrom?: Maybe<MetaTagsLinkingCollections>;
  contentfulTitle?: Maybe<Scalars['String']>;
  metaTitle?: Maybe<Scalars['String']>;
  metaDescription?: Maybe<Scalars['String']>;
};


/** Meta and SEO related information for a page. [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/metaTags) */
export type MetaTagsLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Meta and SEO related information for a page. [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/metaTags) */
export type MetaTagsContentfulTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Meta and SEO related information for a page. [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/metaTags) */
export type MetaTagsMetaTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Meta and SEO related information for a page. [See type definition](https://app.contentful.com/spaces/prjjika2gey0/content_types/metaTags) */
export type MetaTagsMetaDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type MetaTagsLinkingCollections = {
  __typename?: 'MetaTagsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type MetaTagsLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type MetaTagsLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type PageModulesCollection = {
  __typename?: 'PageModulesCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Entry>>;
};

export type NavigationConfigFilter = {
  sys?: Maybe<SysFilter>;
  contentfulTitle_exists?: Maybe<Scalars['Boolean']>;
  contentfulTitle?: Maybe<Scalars['String']>;
  contentfulTitle_not?: Maybe<Scalars['String']>;
  contentfulTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulTitle_contains?: Maybe<Scalars['String']>;
  contentfulTitle_not_contains?: Maybe<Scalars['String']>;
  dir_exists?: Maybe<Scalars['Boolean']>;
  dir?: Maybe<Scalars['String']>;
  dir_not?: Maybe<Scalars['String']>;
  dir_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  dir_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  dir_contains?: Maybe<Scalars['String']>;
  dir_not_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_not?: Maybe<Scalars['String']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  showInMenu_exists?: Maybe<Scalars['Boolean']>;
  showInMenu?: Maybe<Scalars['Boolean']>;
  showInMenu_not?: Maybe<Scalars['Boolean']>;
  menuLabel_exists?: Maybe<Scalars['Boolean']>;
  menuLabel?: Maybe<Scalars['String']>;
  menuLabel_not?: Maybe<Scalars['String']>;
  menuLabel_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  menuLabel_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  menuLabel_contains?: Maybe<Scalars['String']>;
  menuLabel_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<NavigationConfigFilter>>>;
  AND?: Maybe<Array<Maybe<NavigationConfigFilter>>>;
};

export enum NavigationConfigOrder {
  ContentfulTitleAsc = 'contentfulTitle_ASC',
  ContentfulTitleDesc = 'contentfulTitle_DESC',
  DirAsc = 'dir_ASC',
  DirDesc = 'dir_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  ShowInMenuAsc = 'showInMenu_ASC',
  ShowInMenuDesc = 'showInMenu_DESC',
  MenuLabelAsc = 'menuLabel_ASC',
  MenuLabelDesc = 'menuLabel_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type NavigationConfigCollection = {
  __typename?: 'NavigationConfigCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<NavigationConfig>>;
};

export type PageFilter = {
  navigation?: Maybe<CfNavigationConfigNestedFilter>;
  metaInformation?: Maybe<CfMetaTagsNestedFilter>;
  sys?: Maybe<SysFilter>;
  contentfulTitle_exists?: Maybe<Scalars['Boolean']>;
  contentfulTitle?: Maybe<Scalars['String']>;
  contentfulTitle_not?: Maybe<Scalars['String']>;
  contentfulTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulTitle_contains?: Maybe<Scalars['String']>;
  contentfulTitle_not_contains?: Maybe<Scalars['String']>;
  navigation_exists?: Maybe<Scalars['Boolean']>;
  metaInformation_exists?: Maybe<Scalars['Boolean']>;
  modulesCollection_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<PageFilter>>>;
  AND?: Maybe<Array<Maybe<PageFilter>>>;
};

export type CfNavigationConfigNestedFilter = {
  sys?: Maybe<SysFilter>;
  contentfulTitle_exists?: Maybe<Scalars['Boolean']>;
  contentfulTitle?: Maybe<Scalars['String']>;
  contentfulTitle_not?: Maybe<Scalars['String']>;
  contentfulTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulTitle_contains?: Maybe<Scalars['String']>;
  contentfulTitle_not_contains?: Maybe<Scalars['String']>;
  dir_exists?: Maybe<Scalars['Boolean']>;
  dir?: Maybe<Scalars['String']>;
  dir_not?: Maybe<Scalars['String']>;
  dir_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  dir_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  dir_contains?: Maybe<Scalars['String']>;
  dir_not_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_not?: Maybe<Scalars['String']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  showInMenu_exists?: Maybe<Scalars['Boolean']>;
  showInMenu?: Maybe<Scalars['Boolean']>;
  showInMenu_not?: Maybe<Scalars['Boolean']>;
  menuLabel_exists?: Maybe<Scalars['Boolean']>;
  menuLabel?: Maybe<Scalars['String']>;
  menuLabel_not?: Maybe<Scalars['String']>;
  menuLabel_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  menuLabel_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  menuLabel_contains?: Maybe<Scalars['String']>;
  menuLabel_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<CfNavigationConfigNestedFilter>>>;
  AND?: Maybe<Array<Maybe<CfNavigationConfigNestedFilter>>>;
};

export type CfMetaTagsNestedFilter = {
  sys?: Maybe<SysFilter>;
  contentfulTitle_exists?: Maybe<Scalars['Boolean']>;
  contentfulTitle?: Maybe<Scalars['String']>;
  contentfulTitle_not?: Maybe<Scalars['String']>;
  contentfulTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulTitle_contains?: Maybe<Scalars['String']>;
  contentfulTitle_not_contains?: Maybe<Scalars['String']>;
  metaTitle_exists?: Maybe<Scalars['Boolean']>;
  metaTitle?: Maybe<Scalars['String']>;
  metaTitle_not?: Maybe<Scalars['String']>;
  metaTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  metaTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  metaTitle_contains?: Maybe<Scalars['String']>;
  metaTitle_not_contains?: Maybe<Scalars['String']>;
  metaDescription_exists?: Maybe<Scalars['Boolean']>;
  metaDescription?: Maybe<Scalars['String']>;
  metaDescription_not?: Maybe<Scalars['String']>;
  metaDescription_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  metaDescription_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  metaDescription_contains?: Maybe<Scalars['String']>;
  metaDescription_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<CfMetaTagsNestedFilter>>>;
  AND?: Maybe<Array<Maybe<CfMetaTagsNestedFilter>>>;
};

export enum PageOrder {
  ContentfulTitleAsc = 'contentfulTitle_ASC',
  ContentfulTitleDesc = 'contentfulTitle_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ImagesFilter = {
  sys?: Maybe<SysFilter>;
  contentfulTitle_exists?: Maybe<Scalars['Boolean']>;
  contentfulTitle?: Maybe<Scalars['String']>;
  contentfulTitle_not?: Maybe<Scalars['String']>;
  contentfulTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulTitle_contains?: Maybe<Scalars['String']>;
  contentfulTitle_not_contains?: Maybe<Scalars['String']>;
  imagesCollection_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<ImagesFilter>>>;
  AND?: Maybe<Array<Maybe<ImagesFilter>>>;
};

export enum ImagesOrder {
  ContentfulTitleAsc = 'contentfulTitle_ASC',
  ContentfulTitleDesc = 'contentfulTitle_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ImageFilter = {
  sys?: Maybe<SysFilter>;
  contentfulTitle_exists?: Maybe<Scalars['Boolean']>;
  contentfulTitle?: Maybe<Scalars['String']>;
  contentfulTitle_not?: Maybe<Scalars['String']>;
  contentfulTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulTitle_contains?: Maybe<Scalars['String']>;
  contentfulTitle_not_contains?: Maybe<Scalars['String']>;
  alt_exists?: Maybe<Scalars['Boolean']>;
  alt?: Maybe<Scalars['String']>;
  alt_not?: Maybe<Scalars['String']>;
  alt_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  alt_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  alt_contains?: Maybe<Scalars['String']>;
  alt_not_contains?: Maybe<Scalars['String']>;
  image_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<ImageFilter>>>;
  AND?: Maybe<Array<Maybe<ImageFilter>>>;
};

export enum ImageOrder {
  ContentfulTitleAsc = 'contentfulTitle_ASC',
  ContentfulTitleDesc = 'contentfulTitle_DESC',
  AltAsc = 'alt_ASC',
  AltDesc = 'alt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type MetaTagsFilter = {
  sys?: Maybe<SysFilter>;
  contentfulTitle_exists?: Maybe<Scalars['Boolean']>;
  contentfulTitle?: Maybe<Scalars['String']>;
  contentfulTitle_not?: Maybe<Scalars['String']>;
  contentfulTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulTitle_contains?: Maybe<Scalars['String']>;
  contentfulTitle_not_contains?: Maybe<Scalars['String']>;
  metaTitle_exists?: Maybe<Scalars['Boolean']>;
  metaTitle?: Maybe<Scalars['String']>;
  metaTitle_not?: Maybe<Scalars['String']>;
  metaTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  metaTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  metaTitle_contains?: Maybe<Scalars['String']>;
  metaTitle_not_contains?: Maybe<Scalars['String']>;
  metaDescription_exists?: Maybe<Scalars['Boolean']>;
  metaDescription?: Maybe<Scalars['String']>;
  metaDescription_not?: Maybe<Scalars['String']>;
  metaDescription_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  metaDescription_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  metaDescription_contains?: Maybe<Scalars['String']>;
  metaDescription_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<MetaTagsFilter>>>;
  AND?: Maybe<Array<Maybe<MetaTagsFilter>>>;
};

export enum MetaTagsOrder {
  ContentfulTitleAsc = 'contentfulTitle_ASC',
  ContentfulTitleDesc = 'contentfulTitle_DESC',
  MetaTitleAsc = 'metaTitle_ASC',
  MetaTitleDesc = 'metaTitle_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type MetaTagsCollection = {
  __typename?: 'MetaTagsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<MetaTags>>;
};
