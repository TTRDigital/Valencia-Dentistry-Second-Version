import type { Service } from "../types.ts";

const service: Service = {
  slug: "tooth-extractions",
  path: "/services/oral-surgery/tooth-extractions/",
  parent: "/services/oral-surgery/",
  category: "surgery",
  name: "Tooth Extractions",
  menuDescription: "Gentle simple and surgical extractions with sedation options and clear aftercare.",
  image: "/images/blog/bone-grafting-is-it-painful.png",
  imageAlt: "Dentist preparing a patient for treatment",
  seo: {
    title: "Tooth Extractions in Valencia, CA | Valencia Dentistry",
    description:
      "Gentle tooth extractions in Valencia, Santa Clarita. Simple and surgical removal with sedation options and a clear recovery plan. Book a consultation.",
  },
  hero: {
    eyebrow: "Oral Surgery",
    title: "Tooth Extractions in Valencia",
    intro:
      "When a tooth can no longer be saved, removing it can bring real relief. Dr. Nuriel Lavi, DDS, performs simple and surgical extractions in a calm setting, with sedation options when appropriate.",
  },
  overview: {
    heading: "Comfortable tooth removal, when it is the right call",
    paragraphs: [
      "An extraction is usually the last option we reach for. When decay, infection, a crack or crowding puts the rest of your mouth at risk, taking the tooth out can protect your health and end the discomfort. We explain why we are recommending it, and what your alternatives are, before anything is scheduled.",
      "Every extraction starts with an exam and a CBCT 3D scan so Dr. Lavi can see the roots, nerves and bone around the tooth. That picture tells us whether a simple or surgical approach is needed and helps us plan a smooth procedure.",
      "You will leave with written aftercare instructions and a follow-up visit on the calendar. If the tooth should be replaced, we talk through implants, bridges and other options so there is a plan for the space.",
    ],
    highlights: [
      {
        title: "Doctor-led care",
        text: "Dr. Lavi handles your extraction personally and answers your questions without pressure.",
      },
      {
        title: "Sedation options",
        text: "Local anesthesia for every procedure, with sedation options when appropriate for anxious patients.",
      },
      {
        title: "Prompt appointments",
        text: "Urgent tooth pain is seen quickly, with same-day visits when the schedule allows.",
      },
    ],
  },
  whoFor: {
    heading: "Who may need a tooth extraction",
    intro: "Dr. Lavi may recommend removing a tooth if you have:",
    bullets: [
      "Decay too extensive for a filling, crown or root canal",
      "An infection or abscess that has reached the pulp or nearby bone",
      "An impacted wisdom tooth causing pain, swelling or shifting",
      "Advanced gum disease that has loosened the tooth",
      "Crowding that stands in the way of orthodontic treatment or a healthy bite",
      "A crack or fracture from trauma or grinding that cannot be repaired",
    ],
  },
  benefits: {
    heading: "Why removing a problem tooth can help",
    items: [
      {
        title: "Relief from pain",
        text: "Removing the source of infection, decay or pressure ends the aching that has been disrupting your days.",
      },
      {
        title: "Stops infection spreading",
        text: "Taking out a badly infected tooth helps keep bacteria from reaching neighboring teeth, gums and bone.",
      },
      {
        title: "Protects nearby teeth",
        text: "A compromised tooth can damage the teeth and gum tissue around it. Removing it protects what is healthy.",
      },
      {
        title: "Room for a better bite",
        text: "In crowded mouths, an extraction can make space for orthodontic treatment or a more comfortable bite.",
      },
      {
        title: "Sets up your next step",
        text: "A timely extraction prepares the site for an implant, bridge or denture when you are ready.",
      },
    ],
  },
  process: {
    heading: "What to expect",
    steps: [
      {
        title: "Exam and 3D scan",
        text: "We examine the tooth and take a CBCT scan to see the roots and surrounding bone. Dr. Lavi reviews your symptoms, explains your options and confirms whether extraction is the right choice.",
      },
      {
        title: "Comfortable removal",
        text: "The procedure happens in our Valencia office under local anesthesia, with sedation options when appropriate. Dr. Lavi uses careful, modern techniques whether the extraction is simple or surgical.",
      },
      {
        title: "Recovery and follow-up",
        text: "You go home with detailed aftercare instructions and a follow-up visit to check healing. Many patients feel noticeably better within a few days. If you plan to replace the tooth, we map out the next steps.",
      },
    ],
  },
  technology: ["cbct"],
  extraSections: [
    {
      eyebrow: "Types",
      heading: "Simple and surgical extractions",
      intro: "The approach depends on the condition and position of the tooth.",
      items: [
        {
          title: "Simple extraction",
          text: "For a tooth that is fully visible above the gum, such as a loose or badly damaged tooth. It is removed without an incision.",
        },
        {
          title: "Surgical extraction",
          text: "For teeth that are impacted, broken at the gumline or not fully erupted. A small opening is made in the gum, and the tooth may be divided into sections so it can be removed gently.",
        },
      ],
    },
    {
      eyebrow: "Aftercare",
      heading: "Before and after your extraction",
      intro: "A little preparation and a few days of care go a long way toward comfortable healing.",
      columns: [
        {
          title: "Before your visit",
          bullets: [
            "Skip smoking and alcohol for at least 24 hours",
            "Tell us about your medications and any health conditions",
            "Eat a light meal, unless sedation is planned",
            "Arrange a ride home if you will have sedation",
            "Brush and floss well to lower the risk of infection",
          ],
        },
        {
          title: "After your visit",
          bullets: [
            "Rest for the first 24 hours and avoid strenuous activity",
            "No straws, smoking or forceful spitting, which can dislodge the clot and cause dry socket",
            "Choose soft, cool foods such as yogurt, smoothies, scrambled eggs or mashed potatoes",
            "Use ice packs and take any prescribed medication for swelling and soreness",
            "After the first 24 hours, rinse gently with warm salt water",
          ],
        },
      ],
    },
  ],
  cost: {
    heading: "Cost of a tooth extraction",
    paragraphs: [
      "The fee depends on whether the extraction is simple or surgical and whether sedation is used. After your exam and scan, you receive a written estimate before treatment so there are no surprises.",
      "We accept most major PPO plans and offer flexible financing options. New patients can start with our $59 exam and X-rays special.",
    ],
  },
  faqs: [
    {
      q: "Is having a tooth pulled painful?",
      a: "Most patients find it quicker and more comfortable than they expected. The area is fully numbed with local anesthesia, and sedation options are available when appropriate. You may notice pressure during the procedure, but it should not hurt.",
    },
    {
      q: "How long does recovery take?",
      a: "Early healing usually takes one to three days after a simple extraction and about a week after a surgical one. Most patients are back to their normal routine within a few days when they follow the aftercare instructions.",
    },
    {
      q: "What can I eat afterward?",
      a: "For the first couple of days, stick with soft, cool foods such as yogurt, smoothies, applesauce and scrambled eggs. Avoid straws, crunchy snacks and very hot food or drinks until the site has started to heal.",
    },
    {
      q: "Do I need to replace the tooth?",
      a: "Usually, yes, unless it was a wisdom tooth. An empty space lets neighboring teeth drift and can change your bite. At your follow-up we can talk through implants, bridges and partial dentures.",
    },
    {
      q: "What is the difference between a simple and a surgical extraction?",
      a: "A simple extraction removes a tooth that is fully visible above the gum, without an incision. A surgical extraction is for teeth that are impacted, broken at the gumline or not fully erupted, and involves a small opening in the gum.",
    },
    {
      q: "Can I be sedated for my extraction?",
      a: "Yes. Every extraction is done with local anesthesia, and sedation options are available when appropriate for patients who feel anxious. Dr. Lavi will go over what makes sense for you at your consultation.",
    },
    {
      q: "What is dry socket, and how do I avoid it?",
      a: "Dry socket happens when the blood clot protecting the site is lost too early, which can be painful. Avoid straws, smoking and forceful spitting for the first few days, rest, and follow the aftercare instructions we give you.",
    },
  ],
  related: ["wisdom-teeth-removal", "dental-implants", "bone-grafting", "dental-bridges"],
  cta: {
    heading: "Relief starts with a consultation",
    text: "Call (661) 254-5200 or book online to see Dr. Lavi in Valencia and find out whether an extraction is the right step.",
  },
  flags: [
    "Source promises 'same-day appointments & emergency availability'; softened to 'same-day visits when the schedule allows'. Confirm the practice offers same-day emergency extractions.",
    "Source says 'most patients recover quickly and experience significant relief within just a few days'; softened to 'many patients feel noticeably better within a few days'.",
    "Source mentions '3D imaging' without naming the unit; mapped to the practice's CBCT scanner.",
    "Source FAQ states you feel 'pressure, but not pain'; softened to 'should not hurt'.",
  ],
};

export default service;
