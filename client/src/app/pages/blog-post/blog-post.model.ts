export interface PortableTextSpan {
  _key: string;
  _type: 'span';
  text: string;
  marks?: string[];
}

export interface PortableTextMarkDefinition {
  _key: string;
  _type: string;
  href?: string;
}

export interface PortableTextBlock {
  _key: string;
  _type: 'block';
  style?: string;
  listItem?: 'bullet' | 'number';
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDefinition[];
}

export interface PortableTextImage {
  _key: string;
  _type: 'image';
  imageUrl: string;
  altText?: string;
  caption?: string;
}

export type PortableTextNode = PortableTextBlock | PortableTextImage;

export interface BlogPostDetails {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  content: PortableTextNode[];
}
