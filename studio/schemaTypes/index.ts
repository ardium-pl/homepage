import {aboutUsPage} from './documents/about-us-page'
import {blogPage} from './documents/blog-page'
import {blogPost} from './documents/blog-post'
import {clientLogos} from './documents/client-logos'
import {contactInfo} from './documents/contact-info'
import {employees} from './documents/employees'
import {homepage} from './documents/homepage'
import {privacyPolicy} from './documents/privacy-policy'
import {services} from './documents/services'
import {localizedPortableText} from './objects/localized-portable-text'
import {localizedString} from './objects/localized-string'
import {localizedText} from './objects/localized-text'
import {portableText} from './objects/portable-text'



export const schemaTypes = [
  localizedString,
  localizedText,
  portableText,
  localizedPortableText,
  homepage,
  aboutUsPage,
  blogPage,
  services,
  contactInfo,
  clientLogos,
  employees,
  blogPost,
  privacyPolicy,
]
