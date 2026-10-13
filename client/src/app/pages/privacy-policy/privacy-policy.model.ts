import { PortableTextNode } from '../blog-post/blog-post.model';

export interface PrivacyPolicy {
  updatedAt: string;
  content: PortableTextNode[];
}
