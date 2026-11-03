import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Valencia Dentistry")
    .items([
      S.listItem().title("Site settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem().title("Navigation").id("navigation").child(S.document().schemaType("navigation").documentId("navigation")),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("page").title("Pages"),
      S.documentTypeListItem("post").title("Blog posts"),
      S.documentTypeListItem("legalPage").title("Legal pages"),
      S.divider(),
      S.documentTypeListItem("doctor").title("Doctor & team"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("beforeAfterCase").title("Before / after cases"),
      S.documentTypeListItem("faq").title("Shared FAQs"),
    ]);
