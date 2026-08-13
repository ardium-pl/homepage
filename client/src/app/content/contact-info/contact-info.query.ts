export const CONTACT_INFO_QUERY = `*[_type == "contactInfo"][0]{
  phoneNumber,
  email,
  "address": coalesce(address[$language], address.en),
  linkedIn
}`;
