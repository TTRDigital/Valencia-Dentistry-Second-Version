import type { Service } from "../types.ts";

const service: Service = {
  slug: "oral-surgery",
  path: "/services/oral-surgery/",
  category: "surgery",
  name: "Oral Surgery",
  menuDescription: "Extractions, wisdom teeth, bone grafting and implant surgery in one calm office.",
  image: "/images/blog/bone-grafting-healing-timeline.png",
  imageAlt: "Dentist showing a patient her X-ray and a tooth model",
  seo: {
    title: "Oral Surgery in Santa Clarita | Valencia Dentistry",
    description:
      "Gentle oral surgery in Valencia, Santa Clarita: extractions, wisdom teeth, bone grafting and implants with 3D planning and sedation options. Book today.",
  },
  hero: {
    eyebrow: "Oral Surgery",
    title: "Oral Surgery in Santa Clarita",
    intro:
      "Whether you need a wisdom tooth removed, bone rebuilt for an implant or an infection treated, Dr. Nuriel Lavi, DDS plans each procedure in 3D and keeps you comfortable from start to finish.",
  },
  overview: {
    heading: "Surgical care, without the stress",
    paragraphs: [
      "Oral surgery covers the procedures that go beneath the gumline: removing damaged or impacted teeth, rebuilding jawbone and placing implants. At Valencia Dentistry, these treatments happen in the same calm office where you have your checkups, with a doctor you already know.",
      "Dr. Lavi performs each procedure himself. He uses CBCT 3D imaging to see bone, nerves and roots before he begins, guided surgery tools for precise placement, and PRF therapy to support healing afterward.",
      "You will never feel rushed. We walk you through your options, explain what to expect and offer sedation options when appropriate.",
    ],
    highlights: [
      {
        title: "Doctor-led surgery",
        text: "Dr. Lavi performs every surgical treatment with a focus on safety and detail.",
      },
      {
        title: "3D planning",
        text: "A CBCT scan shows us the full picture before any treatment begins.",
      },
      {
        title: "PRF for healing",
        text: "Platelet-rich fibrin from your own blood is used to support healing at the surgical site.",
      },
    ],
  },
  whoFor: {
    heading: "When oral surgery may be needed",
    intro: "Dr. Lavi may recommend a surgical procedure if you:",
    bullets: [
      "Have a tooth that is too damaged or infected to save",
      "Have impacted or painful wisdom teeth",
      "Are preparing for dental implants and need more bone",
      "Have persistent pain, swelling or jaw discomfort",
      "Have crowding that requires a tooth to be removed",
      "Want to replace missing teeth with implants or a full arch",
    ],
  },
  benefits: {
    heading: "What oral surgery can do for you",
    items: [
      {
        title: "Relief from pain",
        text: "Treating the source of infection or pressure can bring an end to chronic discomfort.",
      },
      {
        title: "Better chewing and speech",
        text: "Removing problem teeth or restoring missing ones helps your mouth work as it should.",
      },
      {
        title: "A foundation for implants",
        text: "Grafting and precise placement give implants the stable base they need to last.",
      },
      {
        title: "Preserved bone and contours",
        text: "Timely treatment helps limit bone loss and supports your natural facial shape.",
      },
      {
        title: "A healthier, fuller smile",
        text: "A complete, comfortable smile that feels like your own.",
      },
    ],
  },
  process: {
    heading: "What to expect",
    intro: "Every surgery follows a clear, personalized path from first visit to final check.",
    steps: [
      {
        title: "Consultation and 3D imaging",
        text: "We begin with an exam, a CBCT scan and a frank discussion of your symptoms and goals. Dr. Lavi explains your options and designs a surgical plan built around your anatomy.",
      },
      {
        title: "Procedure day",
        text: "Your treatment is performed in our office under local anesthesia, with sedation options when appropriate. Guided tools and a gentle technique help keep the procedure precise and your recovery smoother.",
      },
      {
        title: "Recovery and follow-up",
        text: "You leave with written aftercare instructions and a follow-up appointment. Many patients return to their normal routine within a few days, depending on the procedure.",
      },
    ],
  },
  technology: ["cbct", "guided-implants", "prf"],
  extraSections: [
    {
      eyebrow: "Our procedures",
      heading: "Oral surgery services we offer",
      intro: "Each procedure has its own page with details on candidacy, process and recovery.",
      items: [
        {
          title: "Dental implants",
          text: "Titanium posts placed in the jaw to replace missing teeth from the root up.",
        },
        {
          title: "All-on-4 implants",
          text: "A full arch of fixed teeth supported by four strategically placed implants.",
        },
        {
          title: "Tooth extractions",
          text: "Gentle removal of teeth that are damaged, infected or crowding others.",
        },
        {
          title: "Bone grafting",
          text: "Rebuilds jawbone so there is a stable foundation for implants.",
        },
        {
          title: "Wisdom teeth removal",
          text: "Removal of third molars that are impacted, crowding or causing pain.",
        },
      ],
    },
    {
      eyebrow: "Aftercare",
      heading: "Before and after your surgery",
      intro: "We give you personalized instructions for your procedure. These are the basics.",
      columns: [
        {
          title: "Before your procedure",
          bullets: [
            "Follow fasting instructions if sedation is planned",
            "Pause medications only if Dr. Lavi advises it",
            "Arrange a ride home if sedation will be used",
            "Avoid smoking and alcohol for at least 24 hours beforehand",
            "Keep your mouth clean to lower the risk of infection",
          ],
        },
        {
          title: "After your procedure",
          bullets: [
            "Rest and limit activity for the first 24 to 48 hours",
            "Eat soft, cool foods such as yogurt, smoothies and soup",
            "Do not use a straw, smoke or spit forcefully",
            "Use ice packs and prescribed medication for swelling and discomfort",
            "Keep the area clean with gentle brushing and saltwater rinses",
          ],
        },
      ],
    },
  ],
  cost: {
    heading: "Cost and financing",
    paragraphs: [
      "Fees vary by procedure, from a simple extraction to grafting or implant placement. Once Dr. Lavi has examined you and reviewed your scan, you will receive a written estimate before treatment so you know what to expect.",
      "We accept most major PPO plans and will help you understand your coverage. Flexible financing options are available, and new patients can begin with our $59 exam and X-rays special.",
    ],
  },
  faqs: [
    {
      q: "Is oral surgery painful?",
      a: "The procedure itself is done under local anesthesia, with sedation options when appropriate. Afterward, mild soreness and swelling for a few days are normal and are usually manageable with the medication we recommend.",
    },
    {
      q: "How long is recovery after oral surgery?",
      a: "Early recovery usually takes two to five days, depending on the procedure. Complete healing, especially after bone grafting or implant placement, can take several weeks to a few months.",
    },
    {
      q: "What can I eat after oral surgery?",
      a: "Soft, cool foods for the first few days: yogurt, smoothies, soup, mashed potatoes and scrambled eggs. Avoid anything crunchy, spicy or very hot until we tell you it is safe.",
    },
    {
      q: "How much does oral surgery cost?",
      a: "It depends on the procedure and your insurance. You receive a written estimate before treatment, we accept most major PPO plans, and flexible financing options are available.",
    },
    {
      q: "Do you offer sedation for anxious patients?",
      a: "Yes. Along with local anesthesia, we offer sedation options when appropriate, including nitrous oxide and oral sedation. We will talk through what suits you at your consultation.",
    },
    {
      q: "When should wisdom teeth be removed?",
      a: "Often between the late teens and mid twenties, when the roots are still forming, and especially if the teeth are impacted, crowding others or causing pain. An exam and X-rays tell us whether and when removal makes sense.",
    },
    {
      q: "How do I know if I need oral surgery?",
      a: "Persistent tooth pain, swelling, jaw discomfort or a tooth that cannot be saved are common reasons. If you are planning implants, grafting may be part of your plan. An exam with Dr. Lavi is the best way to find out.",
    },
    {
      q: "Can I have oral surgery if I have a medical condition?",
      a: "Many patients with medical conditions can be treated safely. Dr. Lavi reviews your full health history and may coordinate with your physician so the right precautions are in place.",
    },
  ],
  related: ["tooth-extractions", "wisdom-teeth-removal", "bone-grafting", "dental-implants"],
  cta: {
    heading: "Talk to Dr. Lavi about your options",
    text: "Book an oral surgery consultation in Valencia and get a clear plan for relief.",
  },
  flags: [
    "Source FAQ names nitrous oxide and oral sedation as offered; kept because the source page says so, but confirm both are currently offered.",
    "Source claimed PRF and guided tools 'promote faster healing' and 'ensure optimal results'; softened to 'support healing' and 'help keep the procedure precise'.",
    "Source said 'most patients recover quickly and return to normal activities within a few days'; softened to 'many patients'.",
  ],
};

export default service;
