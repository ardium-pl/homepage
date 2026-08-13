export const CONTACT_INFO_QUERY = `*[_type == "contactInfo"][0]{
  "phoneNumber": coalesce(phoneNumber, ""),
  "email": coalesce(email, ""),
  "address": coalesce(address[$language], address.en, ""),
  "linkedIn": coalesce(linkedIn, "")
}`;
