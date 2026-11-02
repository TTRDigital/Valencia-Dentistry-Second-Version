import type { Service } from "../types.ts";

const service: Service = {
  slug: "holistic-dentistry",
  path: "/services/holistic-dentistry/",
  category: "holistic",
  name: "Holistic Dentistry",
  menuDescription: "Biocompatible, mercury-free care with safe amalgam removal and fluoride-free options.",
  image: "/images/office/cleaning.jpg",
  imageAlt: "Hygienist cleaning a patient's teeth in a bright treatment room",
  seo: {
    title: "Holistic Dentist in Valencia, CA | Valencia Dentistry",
    description:
      "Mercury-free, biocompatible dental care in Valencia, Santa Clarita. SMART amalgam removal and fluoride-free options. Book a consultation.",
  },
  hero: {
    eyebrow: "Holistic Dentistry",
    title: "Holistic Dentistry in Valencia",
    intro:
      "Dental care that considers the whole person. We use biocompatible, mercury-free materials, favor minimally invasive treatment and offer fluoride-free options for patients who prefer them.",
  },
  overview: {
    heading: "A whole-body view of oral health",
    paragraphs: [
      "Holistic dentistry starts from a simple idea: your mouth is part of your body, not separate from it. At Valencia Dentistry we choose materials with care, keep treatment as conservative as possible and avoid procedures you do not need.",
      "That means tooth-colored fillings made without mercury or BPA, metal-free crowns and bridges, and the SMART protocol when old silver fillings are removed. For preventive visits we offer fluoride-free cleanings with alternative remineralizing agents.",
      "Dr. Nuriel Lavi, DDS leads every appointment himself. He takes time to review your health history, understand what matters to you and build a plan that respects both your teeth and your overall wellness.",
    ],
    highlights: [
      { title: "Mercury-free", text: "Fillings and restorations made without amalgam, metals or BPA." },
      { title: "SMART removal", text: "A careful protocol for taking out old silver fillings." },
      { title: "Fluoride-free options", text: "Preventive care with alternatives for patients who ask for them." },
    ],
  },
  whoFor: {
    heading: "Who holistic dentistry is for",
    intro: "A holistic approach suits anyone who wants a gentler, more mindful way to care for their teeth. It may be a good fit if you:",
    bullets: [
      "Prefer metal-free, mercury-free and fluoride-free treatment options",
      "Have old silver fillings you would like removed with careful precautions",
      "Have sensitivities or allergies to certain dental materials",
      "Live with a chronic health condition and want your dentist to take it into account",
      "Want minimally invasive, prevention-focused care for your whole family",
    ],
  },
  benefits: {
    heading: "Benefits of holistic dental care",
    intro: "Holistic care is about thoughtful choices at every step, from the materials we use to how much treatment we recommend.",
    items: [
      { title: "Biocompatible materials", text: "We avoid mercury, metals and BPA and choose materials based on compatibility with your body." },
      { title: "Prevention first", text: "Regular care and early intervention are designed to help you keep more of your natural teeth." },
      { title: "Minimally invasive", text: "We remove only what is necessary and favor conservative treatment where it is appropriate." },
      { title: "Fewer material reactions", text: "Metal-free options can lower the chance of sensitivity or allergic reaction to dental materials." },
      { title: "Care that fits you", text: "Your health history, goals and preferences shape every treatment plan." },
    ],
  },
  process: {
    heading: "What to expect",
    intro: "Every holistic treatment plan begins with a conversation and a thorough look at your mouth and health history.",
    steps: [
      {
        title: "Evaluation",
        text: "Dr. Lavi completes a full oral exam, reviews your medical history and discusses any material sensitivities. Digital X-rays are taken only when needed.",
      },
      {
        title: "Personalized plan",
        text: "Together we build a plan around your wellness goals, favoring non-toxic materials, gentle techniques and the least invasive option that solves the problem.",
      },
      {
        title: "Long-term prevention",
        text: "We support you between visits with preventive care, home-care guidance and maintenance that fits your lifestyle.",
      },
    ],
  },
  technology: ["digital-xray", "laser"],
  extraSections: [
    {
      eyebrow: "Treatments",
      heading: "Our holistic dental treatments",
      intro: "Each treatment reflects the same commitment: safe materials, gentle technique and care tailored to you.",
      items: [
        { title: "Biocompatible fillings", text: "Tooth-colored restorations made without mercury or BPA." },
        { title: "Safe amalgam removal", text: "We follow the SMART protocol to limit mercury exposure when removing old silver fillings." },
        { title: "Fluoride-free cleanings", text: "Gentle preventive care with alternative remineralizing agents for patients who prefer no fluoride." },
        { title: "Metal-free restorations", text: "Porcelain and ceramic crowns and bridges that contain no metal." },
        { title: "Holistic gum therapy", text: "Periodontal care aimed at reducing inflammation and keeping gums healthy." },
        { title: "Ozone therapy", text: "An antibacterial option that may be used alongside certain treatments." },
        { title: "Bone and gum grafting", text: "Grafting approaches that favor biocompatible materials and your body's own healing." },
      ],
    },
    {
      eyebrow: "Principles",
      heading: "What guides our care",
      bullets: [
        "Biocompatible, mercury-free materials chosen for compatibility with your body",
        "Minimally invasive, preventive treatment whenever possible",
        "Avoiding procedures you do not need",
        "Personalized care that considers your overall health",
      ],
    },
  ],
  cost: {
    heading: "Cost and insurance",
    paragraphs: [
      "Holistic treatments are billed the same way as their conventional counterparts, so most are covered in the usual way. We accept most major PPO plans and will review your benefits before treatment.",
      "You receive a written estimate before we begin, and flexible financing options are available. New patients can start with our $59 special, which includes an exam and X-rays.",
    ],
  },
  faqs: [
    {
      q: "How is holistic dentistry different from traditional dentistry?",
      a: "Holistic dentistry considers how oral health relates to the rest of your body. It favors biocompatible, mercury-free materials, minimally invasive techniques and prevention over treatment you may not need.",
    },
    {
      q: "Is holistic dentistry suitable for children and families?",
      a: "Yes. Families who want gentle care without mercury or metal materials often choose this approach, and we offer fluoride-free options for children's preventive visits when parents prefer them.",
    },
    {
      q: "What is SMART amalgam removal?",
      a: "SMART stands for Safe Mercury Amalgam Removal Technique. It is a set of precautions, developed by the IAOMT, for removing old silver fillings while limiting exposure to mercury vapor and particles.",
    },
    {
      q: "Do you use fluoride?",
      a: "We offer fluoride-free alternatives that help remineralize teeth for patients who prefer them. If you are comfortable with fluoride, we can talk through what makes the most sense for you.",
    },
    {
      q: "Can holistic dental care help with a chronic health condition?",
      a: "Holistic dentistry does not treat or cure medical conditions. What it can do is reduce your exposure to materials you would rather avoid and keep your mouth healthy, which supports your overall well-being.",
    },
    {
      q: "Are the materials really different?",
      a: "Yes. We avoid mercury, metals and BPA, and we choose each material based on its compatibility with your body and your health history.",
    },
  ],
  related: ["composite-filling", "preventive-dentistry", "family-dentistry", "dental-crowns"],
  cta: {
    heading: "Care that respects your whole body",
    text: "Book a consultation with Dr. Lavi in Valencia to talk through mercury-free, biocompatible options for you and your family.",
  },
  flags: [
    "Ozone therapy: source lists it as a treatment that 'supports healing and reduces infection'. Kept as an item with a softened description. Verify the practice offers it.",
    "Source says the team is 'SMART-certified' and 'trained in biocompatibility' and mentions 'biocompatibility testing'. Copy says 'we follow the SMART protocol' and omits certification and testing claims. Verify.",
    "Source frames fluoride as a toxin and claims 'safer treatment for autoimmune conditions'. Rewritten as 'fluoride-free options' and 'may suit patients with sensitivities'; no medical treatment claims.",
    "'Holistic Bone & Gum Grafting' appears in the source with no description. Written generically; verify.",
    "Technology: the source page only says 'advanced dental technology'. digital-xray and laser were included from the brief's holistic list; drop either if not used in holistic care.",
  ],
};

export default service;
