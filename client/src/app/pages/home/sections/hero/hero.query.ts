export const HERO_QUERY = `*[_type == "homepage"][0].hero{
  "preHeading": coalesce(preHeading[$language], preHeading.en, ""),
  "title": coalesce(title[$language], title.en, ""),
  "subtitle": coalesce(subtitle[$language], subtitle.en, ""),
  "contactButtonText": coalesce(contactButtonText[$language], contactButtonText.en, ""),
  "imageUrl": image.asset->url
}`;
