export const BLOG_POST_QUERY = `*[
  _type == "blogPost" && urlSlug.current == $slug
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
