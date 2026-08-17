export const CLIENT_LOGOS_QUERY = `*[_type == "clientLogos"][0]{
  "list": coalesce(list[]{
    "key": _key,
    name,
    "logoUrl": logo.asset->url
  }, [])
}`;

