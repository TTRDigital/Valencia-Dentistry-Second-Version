import type { BeforeAfterCase, TechKey, Testimonial } from "./types.ts";

/**
 * Practice facts for Valencia Dentistry (Dr. Nuriel Lavi, DDS), taken from the
 * practice's first site (valencia-dentistry.vercel.app) on 2026-11-02.
 */
export const site = {
  name: "Valencia Dentistry",
  legalName: "Valencia Dentistry",
  tagline: "Holistic, one-on-one dentistry in Valencia",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://valenciadentistryca.com",
  phone: "(661) 254-5200",
  phoneE164: "+16612545200",
  email: "ValenciaDentistryCA@gmail.com",
  address: {
    street: "27420 Tourney Rd, Suite 240",
    city: "Santa Clarita",
    neighborhood: "Valencia",
    region: "CA",
    postalCode: "91355",
    country: "US",
  },
  geo: { lat: 34.421619, lng: -118.5780025 },
  mapsUrl: "https://maps.app.goo.gl/zf8fsL8TG72B2QZh9",
  mapsEmbed:
    "https://maps.google.com/maps?q=27420%20Tourney%20Rd%20Suite%20240%20Santa%20Clarita%2C%20CA%2091355&t=m&z=16&output=embed&iwloc=near",
  bookingUrl:
    "https://book2.getweave.com/657e8080-2ad9-44fa-8cfb-2c06a59cd7a7/request-appointment?source=WEBSITE",
  hours: [
    { days: "Monday – Friday", short: "Mon–Fri", open: "8:00 AM", close: "5:00 PM" },
    { days: "Saturday & Sunday", short: "Sat–Sun", open: "", close: "", closed: true },
  ],
  /** 0 = Sunday … 6 = Saturday; minutes from midnight, America/Los_Angeles. */
  openingHours: { days: [1, 2, 3, 4, 5], opens: 8 * 60, closes: 17 * 60, timeZone: "America/Los_Angeles" },
  /**
   * Social profiles. Left empty on purpose: the handles on the earlier sites
   * belong to the previous practice. Icons appear in the header and footer as
   * soon as a URL is filled in here (or in the CMS).
   */
  social: {} as Partial<Record<"facebook" | "instagram" | "linkedin" | "x", string>>,
  google: { rating: 4.9, reviewCount: 180 },
  offer: {
    title: "$59 New Patient Special",
    short: "$59 exam & X-rays",
    price: "$59",
    description: "A complete exam and digital X-rays for new patients, plus unhurried time with Dr. Lavi to talk through your goals.",
    fineprint: "New patients only. Cannot be combined with insurance or other offers.",
  },
  insurance: "Most major PPO plans accepted",
  financing: "Flexible financing options",
  gtmId: "GTM-PPV3TDK8",
  areaServed: ["Valencia", "Santa Clarita", "Stevenson Ranch", "Newhall", "Saugus", "Canyon Country"],
  priceRange: "$$",
};

/**
 * Dr. Nuriel Lavi, DDS. No portrait yet: the photos on the first site show a
 * different dentist, so doctor sections use the practice mark until real
 * photos are supplied (set `portrait` to a path in public/images to show one).
 */
export const doctor = {
  name: "Dr. Nuriel Lavi, DDS",
  shortName: "Dr. Lavi",
  firstName: "Nuriel",
  title: "Dentist and practice owner",
  portrait: "" as string,
  portraitAlt: "Dr. Nuriel Lavi, DDS",
  statement: "Plain explanations, honest priorities and a calm, unhurried visit. That is what every patient should expect.",
  bio: [
    "Dr. Nuriel Lavi leads Valencia Dentistry on Tourney Road in Valencia. He sees every patient himself, at every visit, and takes the time to listen before he recommends anything.",
    "Treatment plans are built around your long-term health, your comfort and your goals, with modern imaging, biocompatible materials and a preference for prevention over quick fixes.",
    "Patients should expect plain explanations, honest priorities and a calm, unhurried visit.",
  ],
  credentials: [
    "One dentist at every visit, no handoffs",
    "3D CBCT imaging and guided implant planning",
    "Holistic, integrative approach to oral health",
    "Same-day crowns made in house",
  ],
};

export const technology: { key: TechKey; name: string; text: string }[] = [
  { key: "cbct", name: "CBCT 3D imaging", text: "A low-dose 3D scan of your teeth, jaw and nerves for precise diagnosis and implant planning." },
  { key: "itero", name: "iTero digital scanning", text: "A quick, mess-free digital impression that replaces putty trays for crowns, veneers and Invisalign." },
  { key: "prf", name: "PRF therapy", text: "Platelet-rich fibrin from your own blood, used to support healing after extractions, grafts and implants." },
  { key: "guided-implants", name: "Guided implant surgery", text: "Implants planned on your 3D scan and placed with a surgical guide for accuracy and a gentler visit." },
  { key: "digital-xray", name: "Digital X-rays", text: "Fast, low-radiation images you can see on screen with Dr. Lavi during your exam." },
  { key: "intraoral-camera", name: "Intraoral cameras", text: "A small camera shows you exactly what we see, so every recommendation makes sense." },
  { key: "laser", name: "Laser dentistry", text: "Precise, minimally invasive soft-tissue care with less discomfort and faster healing for many procedures." },
  { key: "same-day-crowns", name: "Same-day crowns", text: "In-house custom crowns, so many patients leave with their final restoration in a single visit." },
];

export const insurers = [
  { name: "Delta Dental", logo: "/images/insurance/delta-dental.png" },
  { name: "MetLife", logo: "/images/insurance/metlife.png" },
  { name: "Cigna", logo: "/images/insurance/cigna.png" },
  { name: "Aetna", logo: "/images/insurance/aetna.png" },
  { name: "United Concordia Dental", logo: "/images/insurance/united-concordia.png" },
  { name: "Blue Cross Blue Shield", logo: "/images/insurance/blue-cross-blue-shield.png" },
  { name: "Principal", logo: "/images/insurance/principal.png" },
  { name: "Humana", logo: "/images/insurance/humana.png" },
];

/**
 * Real Google reviews of the office, verbatim. Only reviews that do not name
 * a dentist are used (the others refer to the previous practice owner).
 */
export const testimonials: Testimonial[] = [
  {
    id: "doug-chong",
    name: "Doug Chong",
    rating: 5,
    source: "google",
    text: "Best Dentist & Best Dental Hygienist in the Santa Clarita. Beautiful office and friendly staff. They truly take care of you!",
    service: "Cleaning & exam",
  },
  {
    id: "tamarea-jaster",
    name: "Tamarea Jaster",
    rating: 5,
    source: "google",
    text: "I chipped my 2 front teeth back in October pretty bad and I came here to get crowns and they look SO natural you can barely tell it's a crown! I love it so much and the process was pretty simple, definitely recommend coming here if you need any dental work done!",
    service: "Dental crowns",
  },
];

/** Before/after cases from the office's gallery (the same cases the first site shows). */
export const cases: BeforeAfterCase[] = [
  { id: "case-1", title: "Full smile restoration", treatment: "Crowns, veneers and implant restoration", before: "/images/cases/before-1.png", after: "/images/cases/after-1.png", beforeAlt: "Before: a smile with worn, stained and missing teeth", afterAlt: "After: a full set of even, white teeth" },
  { id: "case-2", title: "Smile makeover", treatment: "Porcelain veneers", before: "/images/cases/before-2.png", after: "/images/cases/after-2.png", beforeAlt: "Before: short, uneven teeth", afterAlt: "After: a bright, even smile" },
  { id: "case-3", title: "Worn teeth rebuilt", treatment: "Crowns and whitening", before: "/images/cases/before-3.png", after: "/images/cases/after-3.png", beforeAlt: "Before: close-up of worn, discolored upper and lower teeth", afterAlt: "After: close-up of straight, white upper and lower teeth" },
  { id: "case-4", title: "Brighter, straighter smile", treatment: "Cosmetic dentistry", before: "/images/cases/before-4.png", after: "/images/cases/after-4.png", beforeAlt: "Before: the patient smiling before treatment", afterAlt: "After: the patient smiling with even, white teeth" },
  { id: "case-5", title: "Front teeth refined", treatment: "Veneers and bonding", before: "/images/cases/before-5.png", after: "/images/cases/after-5.png", beforeAlt: "Before: close-up of uneven front teeth", afterAlt: "After: close-up of new white front teeth" },
  { id: "case-6", title: "Chipped teeth restored", treatment: "Crowns and cosmetic bonding", before: "/images/cases/before-6.png", after: "/images/cases/after-6.png", beforeAlt: "Before: a smile with chipped, discolored teeth", afterAlt: "After: a smile with even, white teeth" },
  { id: "implant-1", title: "Implant restoration", treatment: "Dental implants", before: "/images/cases/implant-before.png", after: "/images/cases/implant-after.png", beforeAlt: "Before: a smile with worn and missing teeth", afterAlt: "After: the smile restored with implant-supported teeth" },
];

export type ServiceCategoryCard = {
  key: "preventive" | "family" | "cosmetic" | "restorative" | "surgery" | "holistic";
  name: string;
  href: string;
  text: string;
  image: string;
  imageAlt: string;
};

export const serviceCategories: ServiceCategoryCard[] = [
  { key: "preventive", name: "Preventive", href: "/services/preventive-dentistry/", text: "Cleanings, exams, X-rays and night guards that keep small problems small.", image: "/images/practice/preventive-cleaning.png", imageAlt: "Hygienist and dentist cleaning a patient's teeth" },
  { key: "family", name: "Family", href: "/services/family-dentistry/", text: "Gentle care for children, teens, parents and grandparents in one place.", image: "/images/practice/family-consult.png", imageAlt: "Dentist talking with a family in the treatment room" },
  { key: "cosmetic", name: "Cosmetic", href: "/services/cosmetic-dentistry/", text: "Veneers, whitening, Invisalign and bonding designed around your face.", image: "/images/practice/checkup-smile.png", imageAlt: "Smiling woman in a dental chair during a checkup" },
  { key: "restorative", name: "Restorative", href: "/services/restorative-dentistry/", text: "Same-day crowns, bridges and fillings that look and feel natural.", image: "/images/practice/tooth-model.jpg", imageAlt: "Gloved hands holding a tooth model with a filling" },
  { key: "surgery", name: "Implants & Oral Surgery", href: "/services/dental-implants/", text: "Guided implants, All-on-4, extractions and grafting with PRF healing.", image: "/images/blog/dental-implant-timeline.png", imageAlt: "Dentist showing a smiling patient a dental implant model" },
  { key: "holistic", name: "Holistic", href: "/services/holistic-dentistry/", text: "Mercury-free, biocompatible care that respects the whole body.", image: "/images/blog/how-long-do-dental-bridge-last.png", imageAlt: "Smiling patient in a bright treatment room" },
];
