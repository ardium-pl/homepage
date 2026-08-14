export const BLOG_POSTS_QUERY = `*[
  _type == "blogPost" &&
  type in ["blog", "caseStudy"] &&
  defined(publishedAt) &&
  publishedAt <= now()
] | order(publishedAt desc) {
  "id": _id,
  type,
  publishedAt,
  "title": coalesce(title[$language], title.en, title.pl, ""),
  "summary": coalesce(summary[$language], summary.en, summary.pl, ""),
  "contentPreview": coalesce(content[$language], content.en, content.pl, [])[
    _type == "block"
  ][0...8],
  "imageUrl": mainImage.asset->url,
  "imageAlt": coalesce(mainImage.altText[$language], mainImage.altText.en, mainImage.altText.pl, ""),
  "slug": urlSlug.current
}`;
