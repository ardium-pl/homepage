export const BLOG_POST_QUERY = `*[
  _type == "blogPost" &&
  type in ["blog", "caseStudy"] &&
  urlSlug.current == $slug &&
  defined(publishedAt) &&
  publishedAt <= now()
][0] {
  "id": _id,
  "title": coalesce(title[$language], title.en, title.pl, ""),
  "summary": coalesce(summary[$language], summary.en, summary.pl, ""),
  "imageUrl": mainImage.asset->url,
  "imageAlt": coalesce(mainImage.altText[$language], mainImage.altText.en, mainImage.altText.pl, ""),
  "content": coalesce(content[$language], content.en, content.pl, [])[]{
    ...,
    _type == "image" => {
      "imageUrl": asset->url
    }
  }
}`;
