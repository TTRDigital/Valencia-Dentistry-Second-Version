import { seo, faqItem, titledItem, bulletColumn, siteImage, extraSection } from "./objects";
import { siteSettings, navigation, page, service, post, doctor, testimonial, beforeAfterCase, faq, legalPage } from "./documents";

export const schemaTypes = [seo, faqItem, titledItem, bulletColumn, siteImage, extraSection, siteSettings, navigation, page, service, post, doctor, testimonial, beforeAfterCase, faq, legalPage];

/** Documents that exist once. */
export const singletonTypes = new Set(["siteSettings", "navigation"]);
