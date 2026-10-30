import type { Service } from "../types";

const service: Service = {
  slug: "preventive-dentistry",
  path: "/services/preventive-dentistry/",
  category: "preventive",
  name: "Preventive Dentistry",
  menuDescription: "Cleanings, exams, digital X-rays, sealants and screenings to keep small problems small.",
  image: "/images/practice/preventive-cleaning.png",
  imageAlt: "A hygienist cleaning a patient's teeth in a bright treatment room",
  seo: {
    title: "Preventive Dentistry in Valencia, CA | Valencia Smile Expert",
    description:
      "Cleanings, exams, digital X-rays and screenings in Valencia, Santa Clarita. Catch problems early with Dr. Moezzi. New patients: $59 exam and X-rays.",
  },
  hero: {
    eyebrow: "Preventive Dentistry",
    title: "Preventive Dentistry in Valencia",
    intro:
      "Regular cleanings and exams are the simplest way to protect your smile. Dr. Neda Moezzi, DDS and our hygiene team help you catch small issues before they become costly ones.",
  },
  overview: {
    heading: "Care that keeps problems small",
    paragraphs: [
      "Most dental trouble starts quietly. A bit of tartar below the gumline, a shallow cavity, early gum inflammation. None of it hurts at first, which is exactly why regular visits matter. A professional cleaning removes what brushing cannot, and an exam catches changes while they are still easy to treat.",
      "At Valencia Smile Expert, preventive care goes beyond a polish. Each visit includes a gum check, an oral cancer screening and digital X-rays when they are due. We offer fluoride treatments, sealants, custom night guards and sports mouthguards, as well as fluoride-free options for patients who prefer them.",
      "You see Dr. Moezzi at every visit. She reviews your exam, explains what she sees and sets a cleaning schedule based on your actual risk rather than a one-size-fits-all rule.",
    ],
    highlights: [
      { title: "Digital X-rays and CBCT", text: "Low-dose digital images and 3D scans when a closer look is needed." },
      { title: "Personalized schedule", text: "Cleaning intervals set by your gum health and history." },
      { title: "$59 new patient special", text: "An exam and X-rays for new patients." },
    ],
  },
  whoFor: {
    heading: "Who preventive dentistry is for",
    intro: "Preventive care is for everyone, whether your last cleaning was six months ago or several years back. It is especially important if you:",
    bullets: [
      "Have not had a cleaning or exam in more than a year",
      "Notice bleeding gums, bad breath or sensitivity",
      "Have crowns, fillings or implants you want to protect",
      "Grind or clench your teeth, or wake up with a sore jaw",
      "Have a history of cavities or gum disease",
      "Want a dentist who takes time to explain what is going on",
    ],
  },
  benefits: {
    heading: "Benefits of regular preventive care",
    intro: "A little time twice a year can spare you a lot of time, discomfort and expense later.",
    items: [
      { title: "Catch problems early", text: "Exams and screenings find cavities, cracks and gum changes while treatment is still simple." },
      { title: "Healthier gums", text: "Removing tartar above and below the gumline helps reverse early gum inflammation." },
      { title: "Protect your dental work", text: "Professional cleanings help prevent decay around crowns and inflammation around implants." },
      { title: "Lower long-term cost", text: "A cleaning and a small filling cost far less than a root canal and crown later on." },
      { title: "Fresher breath, less sensitivity", text: "Clearing bacterial buildup helps with breath and the sensitivity that comes with inflamed gums." },
    ],
  },
  process: {
    heading: "What happens at a preventive visit",
    intro: "A typical cleaning and exam takes about an hour. Here is what to expect.",
    steps: [
      {
        title: "Exam and gum check",
        text: "Dr. Moezzi examines your teeth and gums, measures gum pockets, screens for oral cancer and reviews digital X-rays if they are due.",
      },
      {
        title: "Cleaning",
        text: "Our hygienist removes plaque and tartar above and below the gumline with ultrasonic and hand instruments, then polishes away surface stains.",
      },
      {
        title: "Fluoride or alternatives",
        text: "When it helps, we apply fluoride or a fluoride-free remineralizing treatment to strengthen enamel and ease sensitivity.",
      },
      {
        title: "Home-care plan",
        text: "You leave with brushing and flossing tips suited to your mouth and a recommended interval for your next visit.",
      },
    ],
  },
  technology: ["digital-xray", "cbct", "intraoral-camera"],
  extraSections: [
    {
      eyebrow: "Services",
      heading: "Our preventive services",
      intro: "Everything you need to stay ahead of dental problems, in one Valencia office.",
      items: [
        { title: "Cleanings and exams", text: "Routine hygiene visits with a full exam by Dr. Moezzi." },
        { title: "Digital X-rays and CBCT", text: "Low-dose digital imaging, with 3D scans when a closer look is needed." },
        { title: "Fluoride treatments", text: "Enamel-strengthening treatments, with fluoride-free alternatives available." },
        { title: "Sealants", text: "A thin protective coating on the chewing surfaces of back teeth to help block decay." },
        { title: "Oral cancer screenings", text: "A check of your mouth, tongue and throat tissues at every exam." },
        { title: "Periodontal deep cleaning", text: "Scaling and root planing for gums that need more than a routine cleaning." },
        { title: "Custom night guards", text: "Made to fit your teeth to protect against grinding and ease TMJ strain." },
        { title: "Sports mouthguards", text: "Custom guards that fit better and protect more than store-bought versions." },
        { title: "Sleep apnea appliances", text: "Oral devices that support nighttime breathing for suitable patients." },
        { title: "Safe mercury removal", text: "Old silver fillings removed using the SMART protocol." },
      ],
    },
    {
      eyebrow: "Frequency",
      heading: "How often should you come in",
      intro: "Six months works for most people, but your schedule should match your risk. Dr. Moezzi sets yours during your exam.",
      items: [
        { title: "Healthy gums", text: "Every six months is the usual interval when gums are healthy and tartar builds slowly." },
        { title: "History of cavities or tartar", text: "Every three to four months can help keep bacteria in check." },
        { title: "Gum disease or implants", text: "Every two to three months, or as recommended after periodontal treatment." },
        { title: "Children", text: "Usually every six months, with sealants and fluoride tailored to their cavity risk." },
      ],
    },
  ],
  cost: {
    heading: "Cost and insurance",
    paragraphs: [
      "Most dental plans cover preventive cleanings and exams, often one or two per year. We accept most major PPO plans and can verify your benefits before you arrive so there are no surprises.",
      "New patients can start with our $59 special, which includes an exam and X-rays. For any further treatment, you receive a written estimate first, and flexible financing options are available.",
    ],
  },
  faqs: [
    {
      q: "How often do I need a dental cleaning?",
      a: "Most adults with healthy gums do well with a cleaning every six months. If you have gum disease, implants or other risk factors, Dr. Moezzi may suggest every two to four months. We set your schedule at your exam.",
    },
    {
      q: "Does insurance cover cleanings?",
      a: "Many plans cover one or two preventive cleanings a year. Coverage varies, so we check your benefits ahead of time and tell you what to expect before your visit.",
    },
    {
      q: "What does the $59 new patient special include?",
      a: "It covers an exam and digital X-rays for new patients. It is a simple way to meet Dr. Moezzi, get a clear picture of your oral health and plan any next steps.",
    },
    {
      q: "Are digital X-rays safe?",
      a: "Digital X-rays use a low dose of radiation compared with older film X-rays, and we only take them when they are useful. CBCT 3D scans are reserved for cases that call for more detail.",
    },
    {
      q: "What is a periodontal deep cleaning?",
      a: "Also called scaling and root planing, it cleans below the gumline where regular cleanings do not reach. It is recommended when gum pockets are deeper than normal and is a first step in treating gum disease.",
    },
    {
      q: "Do adults need fluoride treatments?",
      a: "They can help adults with sensitivity, dry mouth or a history of cavities. If you would rather avoid fluoride, we offer alternative remineralizing treatments.",
    },
    {
      q: "Should I come in sooner than my scheduled visit?",
      a: "Yes, if you notice bleeding or swollen gums, pain, loosening teeth, trouble chewing or bad breath that does not improve with brushing. Call us and we will fit you in.",
    },
  ],
  related: ["family-dentistry", "holistic-dentistry", "composite-filling", "tmj-treatments"],
  cta: {
    heading: "Due for a cleaning",
    text: "Book your exam and cleaning with Dr. Moezzi in Valencia. New patients can start with the $59 exam and X-ray special.",
  },
  flags: [
    "No dedicated preventive page exists on the current site. Content assembled from the home and services page lists, the 'Why Patients Choose' sections and the dental cleanings blog post.",
    "Cleaning frequency guidance (6 months / 3-4 months / 2-3 months) is taken from the practice's blog post; confirm the practice is comfortable publishing these intervals.",
    "'Oral cancer screening at every exam' and 'you see Dr. Moezzi at every visit' are drawn from the source's list and the 'one-on-one attention' claim; verify both.",
    "Sleep apnea appliances and safe mercury removal appear in the source's preventive lists and are kept as items; verify they belong on this page.",
    "'Visit takes about an hour' is an assumption; adjust to the practice's real appointment length.",
    "Technology: cbct and intraoral-camera were included per the assignment; the source preventive lists mention 'Digital X-Rays & CBCT Scans' but not intraoral cameras.",
  ],
};

export default service;
