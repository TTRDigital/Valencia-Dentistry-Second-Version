import { serviceCategories } from "../../content/site.ts";

export type NavLink = { label: string; href: string; description?: string; image?: string; imageAlt?: string };
export type NavGroup = { label: string; href: string; children?: NavLink[]; featured?: NavLink[] };

/** Services mega menu columns: each category card + the pages under it. */
export const servicesMenu: { category: (typeof serviceCategories)[number]; links: NavLink[] }[] = [
  { category: serviceCategories[0], links: [{ label: "Preventive Dentistry", href: "/services/preventive-dentistry/", description: "Cleanings, exams, X-rays, night guards" }, { label: "TMJ Treatment", href: "/tmj-treatments/", description: "Jaw pain, clicking and headaches" }] },
  { category: serviceCategories[1], links: [{ label: "Family Dentistry", href: "/services/family-dentistry/", description: "Care for every age, in one place" }] },
  {
    category: serviceCategories[2],
    links: [
      { label: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry/", description: "Smile design around your face" },
      { label: "Veneers", href: "/services/cosmetic-dentistry/veneers/", description: "Porcelain and composite veneers" },
      { label: "Teeth Whitening", href: "/services/cosmetic-dentistry/teeth-whitening/", description: "Brighter, evenly toned teeth" },
      { label: "Invisalign", href: "/services/cosmetic-dentistry/invisalign/", description: "Clear aligners with iTero scans" },
      { label: "Composite Fillings", href: "/services/cosmetic-dentistry/composite-filling/", description: "Tooth-colored, mercury-free" },
    ],
  },
  {
    category: serviceCategories[3],
    links: [
      { label: "Restorative Dentistry", href: "/services/restorative-dentistry/", description: "Rebuild strength and comfort" },
      { label: "Dental Crowns", href: "/services/dental-crowns/", description: "Same-day, in-house crowns" },
      { label: "Dental Bridges", href: "/services/restorative-dentistry/dental-bridges/", description: "Fixed replacement for missing teeth" },
    ],
  },
  {
    category: serviceCategories[4],
    links: [
      { label: "Dental Implants", href: "/services/dental-implants/", description: "Guided, 3D-planned implants" },
      { label: "All-on-4 Implants", href: "/services/oral-surgery/all-on-4-implants/", description: "A full arch on four implants" },
      { label: "Oral Surgery", href: "/services/oral-surgery/", description: "Surgical care with PRF healing" },
      { label: "Bone Grafting", href: "/services/oral-surgery/bone-grafting/", description: "Rebuild support for implants" },
      { label: "Tooth Extractions", href: "/services/oral-surgery/tooth-extractions/", description: "Gentle, well-planned removal" },
      { label: "Wisdom Teeth Removal", href: "/services/oral-surgery/wisdom-teeth-removal/", description: "For teens and adults" },
    ],
  },
  { category: serviceCategories[5], links: [{ label: "Holistic Dentistry", href: "/services/holistic-dentistry/", description: "Biocompatible, mercury-free care" }] },
];

export const mainNav: NavGroup[] = [
  { label: "Our Practice", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Smile Gallery", href: "/smile-gallery/" },
  { label: "Reviews", href: "/testimonials/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];

export const footerNav = {
  practice: [
    { label: "Our Practice", href: "/about/" },
    { label: "New Patient Special", href: "/new-patient-offer/" },
    { label: "Emergency Dental", href: "/emergency-dental/" },
    { label: "Smile Gallery", href: "/smile-gallery/" },
    { label: "Reviews", href: "/testimonials/" },
    { label: "Blog", href: "/blog/" },
    { label: "Contact", href: "/contact/" },
    { label: "Request Appointment", href: "/appointment/" },
  ],
  services: [
    { label: "All Services", href: "/services/" },
    { label: "Preventive Dentistry", href: "/services/preventive-dentistry/" },
    { label: "Family Dentistry", href: "/services/family-dentistry/" },
    { label: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry/" },
    { label: "Veneers", href: "/services/cosmetic-dentistry/veneers/" },
    { label: "Invisalign", href: "/services/cosmetic-dentistry/invisalign/" },
    { label: "Teeth Whitening", href: "/services/cosmetic-dentistry/teeth-whitening/" },
    { label: "Dental Implants", href: "/services/dental-implants/" },
    { label: "All-on-4 Implants", href: "/services/oral-surgery/all-on-4-implants/" },
    { label: "Dental Crowns", href: "/services/dental-crowns/" },
    { label: "Restorative Dentistry", href: "/services/restorative-dentistry/" },
    { label: "Oral Surgery", href: "/services/oral-surgery/" },
    { label: "Holistic Dentistry", href: "/services/holistic-dentistry/" },
    { label: "TMJ Treatment", href: "/tmj-treatments/" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms and Services", href: "/terms-and-services/" },
    { label: "Sitemap", href: "/sitemap/" },
  ],
};
