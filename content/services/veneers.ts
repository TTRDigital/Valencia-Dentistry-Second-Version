import type { Service } from "../types.ts";

const service: Service = {
  slug: "veneers",
  path: "/services/cosmetic-dentistry/veneers/",
  parent: "/services/cosmetic-dentistry/",
  category: "cosmetic",
  name: "Veneers",
  menuDescription: "Thin porcelain or composite shells that cover chips, gaps and stains for an even smile.",
  image: "/images/office/veneer-smile.jpg",
  imageAlt: "Patient checking her smile in a hand mirror",
  seo: {
    title: "Porcelain Veneers in Santa Clarita | Valencia Dentistry",
    description:
      "Custom porcelain and composite veneers in Valencia, Santa Clarita. Cover chips, gaps and stains with a natural-looking smile. Book a veneer consultation.",
  },
  hero: {
    eyebrow: "Veneers",
    title: "Custom Veneers in Santa Clarita",
    intro:
      "Thin, hand-finished shells designed by Dr. Nuriel Lavi, DDS to cover chips, gaps and stains while still looking like you.",
  },
  overview: {
    heading: "What veneers are and what they fix",
    paragraphs: [
      "Veneers are thin, custom shells of porcelain or composite resin bonded to the front of your teeth. They change the shape, color and alignment of what shows when you smile, without the more extensive work a crown requires.",
      "At our Valencia practice, Dr. Lavi designs each veneer around your facial features, tooth proportions and the shade you want. An iTero scan and intraoral camera images help us preview the result before any tooth is touched.",
      "Veneers can correct chipped or cracked teeth, worn or uneven edges, small gaps, minor misalignment and deep discoloration that whitening cannot lift.",
    ],
    highlights: [
      { title: "Smile design", text: "Shape and shade planned to suit your face." },
      { title: "Minimal preparation", text: "Only a thin layer of enamel is adjusted, and only when needed." },
      { title: "Two materials", text: "Porcelain for longevity, composite for speed and value." },
    ],
  },
  whoFor: {
    heading: "Is veneer treatment right for you?",
    intro: "Veneers may be a good fit if you:",
    bullets: [
      "Have healthy teeth and gums",
      "Want to fix chips, gaps or stains",
      "Would like a more even, symmetrical smile",
      "Have minor alignment issues you prefer not to treat with braces",
      "Want a long-lasting result that looks natural",
      "Are an adult looking for a lasting cosmetic change",
    ],
  },
  benefits: {
    heading: "Benefits of veneers",
    items: [
      {
        title: "Natural look",
        text: "Porcelain mimics the translucency and texture of enamel, so the result reads as real teeth.",
      },
      {
        title: "Brighter shade",
        text: "Veneers cover deep stains that whitening cannot reach, at the shade you choose.",
      },
      {
        title: "Better symmetry",
        text: "Uneven edges and mismatched tooth sizes are balanced for a more harmonious smile.",
      },
      {
        title: "Stain resistant",
        text: "Porcelain resists coffee and wine stains and is built for daily use.",
      },
      {
        title: "Easy upkeep",
        text: "Brush, floss and keep regular checkups, just as you would with natural teeth.",
      },
      {
        title: "Lasting confidence",
        text: "Smile, speak and laugh without thinking about your teeth.",
      },
    ],
  },
  process: {
    heading: "Your veneer journey",
    steps: [
      {
        title: "Consultation and smile design",
        text: "Dr. Lavi checks your oral health, listens to your goals and designs the plan. A digital preview helps you choose the veneer type and shade.",
      },
      {
        title: "Preparation and impressions",
        text: "If needed, a thin layer of enamel is gently removed. We take a precise scan and fit temporary veneers to protect your teeth while the final ones are crafted.",
      },
      {
        title: "Placement and reveal",
        text: "Your veneers are bonded in place, adjusted for fit and bite, and polished. You leave that visit with your new smile.",
      },
    ],
  },
  technology: ["itero", "intraoral-camera"],
  extraSections: [
    {
      eyebrow: "Materials",
      heading: "Porcelain vs. composite veneers",
      intro: "Both can look natural. They differ in how they are made, how long they last and what they cost.",
      columns: [
        {
          title: "Porcelain veneers",
          bullets: [
            "Crafted in a dental lab from your scan",
            "Highly stain resistant",
            "Lifelike translucency",
            "Often last 10 to 15 years or more with care",
            "Usually two visits",
          ],
        },
        {
          title: "Composite veneers",
          bullets: [
            "Sculpted directly on the tooth",
            "Often completed in a single visit",
            "Lower upfront cost",
            "Easier to repair if chipped",
            "Typically last around 5 to 7 years",
          ],
        },
      ],
    },
    {
      eyebrow: "Aftercare",
      heading: "Caring for your veneers",
      intro: "Veneers are low maintenance. A few habits protect your investment.",
      columns: [
        {
          title: "Do",
          bullets: [
            "Brush twice a day with a soft-bristled brush",
            "Floss gently once a day",
            "Visit us every six months for a cleaning and exam",
            "Wear a night guard if you grind your teeth",
            "Limit coffee, red wine and other staining drinks",
          ],
        },
        {
          title: "Don't",
          bullets: [
            "Use abrasive toothpaste or hard bristles",
            "Skip flossing",
            "Put off checkups or follow-up visits",
            "Clench or grind without protection",
            "Smoke or overdo staining drinks",
          ],
        },
      ],
      image: "/images/office/veneer-tryin.jpg",
      imageAlt: "Patient smiling in the dental chair during a cosmetic visit",
    },
  ],
  showGallery: true,
  cost: {
    heading: "Cost and financing",
    paragraphs: [
      "The cost of veneers depends on the material and how many teeth are treated. Veneers are usually considered cosmetic, so insurance rarely covers them, though we accept most major PPO plans and will check your benefits.",
      "You receive a written estimate before treatment begins, and flexible financing options can spread the cost over time. New patients may begin with our $59 exam and X-ray special.",
    ],
  },
  faqs: [
    {
      q: "How long do veneers last?",
      a: "Porcelain veneers often last 10 to 15 years or longer with good care. Composite veneers tend to last around 5 to 7 years. Daily brushing, flossing and regular visits help either type last.",
    },
    {
      q: "Do veneers look like natural teeth?",
      a: "Yes. Each veneer is designed to match the color, shape and texture of your natural teeth and to suit your face. Most people see only a nice smile, not dental work.",
    },
    {
      q: "Is getting veneers painful?",
      a: "The procedure is minimally invasive and usually comfortable with local anesthetic. Some patients feel mild sensitivity after enamel preparation, which generally fades within days.",
    },
    {
      q: "Are veneers reversible?",
      a: "Porcelain veneers are not reversible because a small amount of enamel is usually removed. They are a long-term commitment, which is why we plan them carefully with you.",
    },
    {
      q: "How much do veneers cost in Santa Clarita?",
      a: "It depends on the material and the number of teeth. After your consultation we give you a clear written estimate and go over flexible financing options.",
    },
    {
      q: "How many veneers will I need?",
      a: "Some patients treat one chipped tooth. Others choose six to ten for a full smile makeover. Dr. Lavi recommends the number that gives a balanced result when you smile.",
    },
  ],
  related: ["cosmetic-dentistry", "teeth-whitening", "invisalign", "dental-crowns"],
  cta: {
    heading: "Design your new smile",
    text: "Book a veneer consultation in Valencia and preview what custom veneers could do for you.",
  },
  flags: [
    "Source says veneers 'permanently conceal' stains; changed to 'cover'.",
    "Longevity figures (porcelain 10-15 years, composite 5-7 years) kept from the source as typical ranges.",
    "Added a FAQ on how many veneers are needed (not in source).",
    "Source mentions 'digital tools' for a smile preview; mapped to itero and intraoral-camera. Verify a digital smile preview is actually offered.",
  ],
};

export default service;
