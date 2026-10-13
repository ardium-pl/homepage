export const PRIVACY_POLICY_QUERY = `*[_type == "privacyPolicy" && _id == "privacyPolicy"][0] {
  updatedAt,
  "content": coalesce(content[$language], content.en, content.pl, [])[]{
    ...,
    _type == "image" => {"imageUrl": asset->url}
  }
}`;
