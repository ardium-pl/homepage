export const SERVICES_QUERY = `*[_type == "services"][0]{
  "preHeading": coalesce(preHeading[$language], preHeading.en),
  "title": coalesce(title[$language], title.en),
  "subtitle": coalesce(subtitle[$language], subtitle.en),
  "list": list[]{
    "key": _key,
    "title": coalesce(title[$language], title.en),
    "description": coalesce(description[$language], description.en),
    "iconUrl": icon.asset->url
  }
}`;
