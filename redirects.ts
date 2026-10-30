/**
 * 301 redirects. Every URL of the current site is kept, so this list only
 * holds alternative spellings and the few new canonical paths. Each rule
 * points straight at the final page (no chains).
 */
type Rule = { source: string; destination: string };

const rules: Rule[] = [
  { source: "/blog", destination: "/blog/" },
  { source: "/blogs/:path*", destination: "/blog/" },
  { source: "/category/:path*", destination: "/blog/" },
  { source: "/author/:path*", destination: "/about/" },
  { source: "/home/", destination: "/" },
  { source: "/index.php", destination: "/" },
  { source: "/sitemap_index.xml", destination: "/sitemap.xml" },
  { source: "/page-sitemap.xml", destination: "/sitemap.xml" },
  { source: "/post-sitemap.xml", destination: "/sitemap.xml" },
  { source: "/services/tmj-treatments/", destination: "/tmj-treatments/" },
  { source: "/tmj/", destination: "/tmj-treatments/" },
  { source: "/services/veneers/", destination: "/services/cosmetic-dentistry/veneers/" },
  { source: "/services/invisalign/", destination: "/services/cosmetic-dentistry/invisalign/" },
  { source: "/services/teeth-whitening/", destination: "/services/cosmetic-dentistry/teeth-whitening/" },
  { source: "/services/composite-filling/", destination: "/services/cosmetic-dentistry/composite-filling/" },
  { source: "/services/dental-bridges/", destination: "/services/restorative-dentistry/dental-bridges/" },
  { source: "/services/all-on-4-implants/", destination: "/services/oral-surgery/all-on-4-implants/" },
  { source: "/services/bone-grafting/", destination: "/services/oral-surgery/bone-grafting/" },
  { source: "/services/tooth-extractions/", destination: "/services/oral-surgery/tooth-extractions/" },
  { source: "/services/wisdom-teeth-removal/", destination: "/services/oral-surgery/wisdom-teeth-removal/" },
  { source: "/new-patient-special/", destination: "/new-patient-offer/" },
  { source: "/emergency-dentist/", destination: "/emergency-dental/" },
  { source: "/terms/", destination: "/terms-and-services/" },
  { source: "/privacy/", destination: "/privacy-policy/" },
];

export const redirects = rules.map((r) => ({ source: r.source, destination: r.destination, permanent: true, statusCode: undefined }))
  .map(({ statusCode: _s, ...r }) => r);
