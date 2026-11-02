import type { Service } from "../types.ts";

const service: Service = {
  slug: "family-dentistry",
  path: "/services/family-dentistry/",
  category: "family",
  name: "Family Dentistry",
  menuDescription: "Gentle, age-appropriate care for infants, children, teens, adults and seniors.",
  image: "/images/office/treatment-room-2.jpg",
  imageAlt: "Calm treatment room with natural light and a modern dental chair",
  seo: {
    title: "Family Dentist in Valencia, CA | Valencia Dentistry",
    description:
      "One dental home for the whole family in Valencia, Santa Clarita. Infant exams, children's and teen dentistry, sealants and care for adults. Book a visit.",
  },
  hero: {
    eyebrow: "Family Dentistry",
    title: "Family Dentistry in Valencia",
    intro:
      "From a baby's first tooth to a grandparent's crown, Dr. Nuriel Lavi, DDS cares for every age in one calm, friendly office in Valencia.",
  },
  overview: {
    heading: "One dental home for every age",
    paragraphs: [
      "Families are busy. Having one practice that can see your toddler, your teenager and you makes dental care simpler to keep up with. At Valencia Dentistry we provide age-appropriate care for infants, children, teens, adults and seniors.",
      "For younger patients that means gentle first exams, cleanings, sealants, fluoride or fluoride-free options, space maintainers and tooth-colored fillings when they are needed. For teens we add sports mouthguards and a conversation about straightening options. Adults and seniors have access to the full range of preventive, restorative and cosmetic care under the same roof.",
      "Dr. Lavi sees each family member himself. He takes time to help children feel at ease, explains things in plain language and builds trust that makes the next visit easier.",
    ],
    highlights: [
      { title: "All ages welcome", text: "Infant exams through senior care, in one office." },
      { title: "Gentle with kids", text: "A calm pace and simple explanations help children feel safe." },
      { title: "Holistic options", text: "Mercury-free fillings and fluoride-free care for families who prefer them." },
    ],
  },
  whoFor: {
    heading: "Who family dentistry is for",
    intro: "Family dentistry is for any household that wants consistent, comfortable care in one place. It is a good fit if you:",
    bullets: [
      "Want one dentist who knows your whole family's history",
      "Have a baby or toddler ready for a first dental visit",
      "Have school-age children who need cleanings, sealants or fillings",
      "Have a teen who plays sports or is thinking about straighter teeth",
      "Would like to simplify scheduling for several family members",
      "Prefer a boutique practice over a large clinic",
    ],
  },
  benefits: {
    heading: "Benefits of a family dental practice",
    intro: "Consistency is good for your teeth and good for your calendar.",
    items: [
      { title: "Continuity of care", text: "Dr. Lavi follows your family's dental history over time, so changes are easier to spot." },
      { title: "Comfortable for children", text: "A gentle introduction to the dentist helps kids build healthy habits without fear." },
      { title: "Prevention at every age", text: "Sealants and fluoride for kids, gum care and screenings for adults, all designed to prevent bigger problems." },
      { title: "Simpler scheduling", text: "One office and one phone number for everyone in the household." },
      { title: "Full range of care", text: "If someone needs a filling, crown, aligners or an implant, there is no referral to another office." },
    ],
  },
  process: {
    heading: "What to expect at a family visit",
    intro: "Every visit follows the same unhurried rhythm, adjusted to the age of the patient in the chair.",
    steps: [
      {
        title: "Welcome and history",
        text: "We review health history and any concerns. For children, we take a few minutes to show them the room and the tools so nothing feels unfamiliar.",
      },
      {
        title: "Exam and cleaning",
        text: "Dr. Lavi examines teeth, gums and bite, takes digital X-rays when appropriate for the patient's age and risk, and our hygienist cleans and polishes.",
      },
      {
        title: "Prevention and education",
        text: "Sealants, fluoride or fluoride-free treatments are applied where helpful. Kids and parents get practical brushing and flossing coaching.",
      },
      {
        title: "Plan and next visit",
        text: "If any treatment is needed, we explain the options and cost in writing. Then we set the next checkup for each family member.",
      },
    ],
  },
  technology: ["digital-xray", "intraoral-camera"],
  extraSections: [
    {
      eyebrow: "By age",
      heading: "Care for every stage",
      intro: "What your family can expect at each stage of life.",
      items: [
        { title: "Infants and toddlers", text: "A gentle first exam to check developing teeth and guide parents on cleaning, teething and habits." },
        { title: "Children", text: "Cleanings, exams, sealants, fluoride options and tooth-colored fillings or crowns when a baby tooth needs repair." },
        { title: "Teens", text: "Preventive care, sports mouthguards, wisdom tooth monitoring and a conversation about clear aligners." },
        { title: "Adults", text: "Cleanings, gum care, night guards and the full range of restorative and cosmetic treatment." },
        { title: "Seniors", text: "Attention to dry mouth, gum health, worn teeth and tooth replacement options such as implants and bridges." },
      ],
    },
    {
      eyebrow: "Children's services",
      heading: "What we offer for kids and teens",
      bullets: [
        "Infant exams",
        "Children's and teen cleanings and exams",
        "Sealants",
        "Fluoride treatments and fluoride-free alternatives",
        "Pediatric restorative dentistry, including tooth-colored fillings",
        "Space maintainers when a baby tooth is lost early",
        "Custom sports mouthguards",
        "Oral hygiene education for kids and parents",
      ],
    },
  ],
  cost: {
    heading: "Cost and insurance",
    paragraphs: [
      "Most dental plans cover preventive visits for children and adults, and we accept most major PPO plans. Our team verifies benefits for each family member before you arrive.",
      "New patients of any age can start with our $59 special, which includes an exam and X-rays. For any further treatment, you receive a written estimate first, and flexible financing options are available.",
    ],
  },
  faqs: [
    {
      q: "When should my child first see the dentist?",
      a: "A first visit around the first birthday, or within six months of the first tooth appearing, is a common recommendation. Early visits are short and gentle and help your child grow comfortable with the office.",
    },
    {
      q: "What are sealants and does my child need them?",
      a: "A sealant is a thin coating applied to the grooves of back teeth where food and bacteria collect. It helps block decay. Dr. Lavi will recommend sealants based on your child's cavity risk.",
    },
    {
      q: "What is a space maintainer?",
      a: "When a baby tooth is lost too early, a small appliance holds the gap open so the adult tooth has room to come in properly. It is removed once the new tooth is ready.",
    },
    {
      q: "My child is nervous about the dentist. How do you help?",
      a: "We go slowly. We show children the room and the tools, explain each step in simple words and never rush. Parents are welcome to stay close during the visit.",
    },
    {
      q: "Can you see several family members on the same day?",
      a: "We do our best to schedule family members close together so you make fewer trips. Let our front desk know when you book and we will work with your calendar.",
    },
    {
      q: "Are X-rays safe for children?",
      a: "We use low-dose digital X-rays and take them only when they are useful for a child's age and risk. Protective shielding is used, and we are happy to talk through any concerns.",
    },
    {
      q: "Do you offer fluoride-free care for kids?",
      a: "Yes. Families who prefer to avoid fluoride can choose alternative remineralizing treatments, and we use mercury-free, tooth-colored materials for fillings.",
    },
  ],
  related: ["preventive-dentistry", "composite-filling", "invisalign", "holistic-dentistry"],
  cta: {
    heading: "Bring the whole family",
    text: "Schedule visits for everyone in your household with Dr. Lavi in Valencia. New patients can start with the $59 exam and X-ray special.",
  },
  flags: [
    "No dedicated family dentistry page exists on the current site. Content assembled from the home and services page lists; service descriptions are generic.",
    "First-visit timing (around the first birthday / within six months of the first tooth) follows general professional guidance, not the practice's own statement. Verify.",
    "'Scheduling family members close together' and 'parents are welcome to stay close' are assumptions about office policy. Verify.",
    "'Wisdom tooth monitoring' for teens and 'clear aligners' conversation are inferred from the practice offering extractions and Invisalign; the source does not say Invisalign Teen specifically.",
    "Pediatric crowns are mentioned under children's care because the source lists 'Pediatric Restorative Dentistry'; verify the practice places pediatric crowns.",
    "Senior care items (dry mouth, implants, bridges) are generic and not from the source's family list.",
    "Technology: digital-xray and intraoral-camera included per the assignment; the source family sections do not name specific technology.",
  ],
};

export default service;
