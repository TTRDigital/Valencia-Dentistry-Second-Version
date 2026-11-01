import type { Service } from "../types.ts";

const service: Service = {
  slug: "dental-bridges",
  path: "/services/restorative-dentistry/dental-bridges/",
  parent: "/services/restorative-dentistry/",
  category: "restorative",
  name: "Dental Bridges",
  menuDescription: "Fixed, natural-looking bridges that replace one or more missing teeth without surgery.",
  image: "/images/practice/consult-chair.png",
  imageAlt: "Dr. Moezzi in consultation with a seated patient",
  seo: {
    title: "Dental Bridges in Valencia, CA | Valencia Smile Expert",
    description:
      "Replace missing teeth with a custom dental bridge in Valencia, Santa Clarita. Natural-looking, fixed and no surgery required. Book a consultation today.",
  },
  hero: {
    eyebrow: "Restorative Dentistry",
    title: "Dental Bridges in Valencia",
    intro:
      "A missing tooth makes chewing and speaking harder and lets its neighbors drift. A custom bridge fills the gap with a fixed, natural-looking tooth, usually without surgery.",
  },
  overview: {
    heading: "A fixed solution for missing teeth",
    paragraphs: [
      "A dental bridge replaces one or more missing teeth with an artificial tooth, called a pontic, anchored to the teeth or implants on either side of the gap. Because it is cemented in place, it stays put when you eat and talk, unlike a removable partial denture.",
      "Each bridge is made for you. Dr. Neda Moezzi, DDS, matches the shade, size and shape to your surrounding teeth so the result blends in. Digital scanning gives the lab a precise model for a comfortable fit.",
      "Bridges are a good fit when the neighboring teeth are healthy and you want to restore function in weeks rather than months. If an implant would serve you better, Dr. Moezzi will tell you and explain why.",
    ],
    highlights: [
      {
        title: "Fixed, not removable",
        text: "A bridge is cemented in place, so there is nothing to take out at night.",
      },
      {
        title: "Natural match",
        text: "Shade, shape and size are matched to the teeth around it.",
      },
      {
        title: "Fewer visits",
        text: "Typically completed in a few appointments, with no surgery or long healing time.",
      },
    ],
  },
  whoFor: {
    heading: "Who is a good candidate for a bridge",
    intro: "A bridge may be a good option if you:",
    bullets: [
      "Are missing one or more teeth with healthy teeth or implants next to the gap",
      "Prefer a fixed restoration over a removable partial denture",
      "Have healthy gums and strong neighboring teeth to support the bridge",
      "Want to restore chewing quickly, with fewer visits and less healing than an implant",
      "Are weighing cost, durability and appearance together",
      "Would rather avoid surgery, or are not a candidate for implants right now",
    ],
  },
  benefits: {
    heading: "Benefits of a dental bridge",
    items: [
      {
        title: "Chew and speak normally",
        text: "Filling the gap restores biting function and can make certain words easier to pronounce.",
      },
      {
        title: "Keeps teeth in place",
        text: "Neighboring teeth tend to drift into an empty space. A bridge holds them where they belong.",
      },
      {
        title: "Supports your face",
        text: "Missing teeth can change the way your face looks over time. A bridge helps maintain its natural shape.",
      },
      {
        title: "Looks like your own",
        text: "Custom shading and shaping let the bridge blend in with the rest of your smile.",
      },
      {
        title: "Confidence to smile",
        text: "Many patients feel more at ease smiling, talking and eating out once the gap is closed.",
      },
    ],
  },
  process: {
    heading: "Getting a dental bridge",
    steps: [
      {
        title: "Consultation",
        text: "Dr. Moezzi examines your teeth and gums, takes digital images and talks through your goals to decide whether a bridge, and which type, fits best.",
      },
      {
        title: "Preparation and temporary bridge",
        text: "The supporting teeth are shaped and a digital scan is taken to design your bridge. A temporary bridge protects the area and keeps you comfortable while the lab makes the final one.",
      },
      {
        title: "Final placement",
        text: "Your custom bridge is checked for fit, bite and shade, then cemented in place. You leave with care instructions and a follow-up visit.",
      },
    ],
  },
  technology: ["itero", "cbct"],
  extraSections: [
    {
      eyebrow: "Types",
      heading: "Types of dental bridges",
      intro: "Different designs suit different gaps. Dr. Moezzi will recommend the one that fits your teeth and goals.",
      items: [
        {
          title: "Traditional bridge",
          text: "A pontic held by crowns on the natural teeth on both sides of the gap. The most common design.",
        },
        {
          title: "Cantilever bridge",
          text: "Supported by a crown on one side only, used in select situations where there is a healthy tooth on just one side of the gap.",
        },
        {
          title: "Maryland bridge",
          text: "A pontic bonded to the backs of the neighboring teeth with small wings, which preserves more of those teeth. Suited to areas with lighter bite forces.",
        },
        {
          title: "Implant-supported bridge",
          text: "Anchored to dental implants instead of natural teeth, so the neighboring teeth are left untouched. Often used when several teeth in a row are missing.",
        },
      ],
    },
    {
      eyebrow: "Aftercare",
      heading: "Caring for your bridge",
      intro: "With a steady routine, a bridge can serve you for many years and keep the teeth around it healthy.",
      items: [
        {
          title: "Brush twice a day",
          text: "Use a soft brush and fluoride toothpaste around the bridge and along the gumline.",
        },
        {
          title: "Floss underneath",
          text: "A floss threader or interdental brush cleans beneath the pontic, where food tends to collect.",
        },
        {
          title: "Keep your checkups",
          text: "Regular visits let Dr. Moezzi check the fit of your bridge and the health of the supporting teeth.",
        },
        {
          title: "Mind hard and sticky foods",
          text: "Limiting ice, hard candy and sticky sweets reduces stress on the bridge and helps prevent damage.",
        },
      ],
      image: "/images/practice/exam-mirror.png",
      imageAlt: "Close-up of a dental mirror exam of a patient's smile",
    },
  ],
  showGallery: true,
  cost: {
    heading: "Cost of a dental bridge",
    paragraphs: [
      "The fee depends on the type of bridge, the number of teeth being replaced and the material. After your consultation you receive a written estimate before treatment begins.",
      "We accept most major PPO plans, and many plans cover a portion of a bridge when it is needed to restore function. Flexible financing options are available, and new patients can start with our $59 exam and X-rays special.",
    ],
  },
  faqs: [
    {
      q: "How long does a dental bridge last?",
      a: "Many bridges serve for years and some much longer, depending on the materials, the health of the supporting teeth and your home care. Daily cleaning and regular checkups make the biggest difference.",
    },
    {
      q: "Will my bridge look natural?",
      a: "Yes. Your bridge is custom made to match the color, size and shape of the teeth around it, so it blends in with your smile.",
    },
    {
      q: "Is getting a bridge painful?",
      a: "The procedure is generally comfortable. The area is numbed with local anesthesia, and sedation options are available when appropriate. Some mild sensitivity in the prepared teeth can occur for a few days.",
    },
    {
      q: "Bridge or implant: what is the difference?",
      a: "A bridge rests on the neighboring teeth or on implants and is usually finished in a few weeks. An implant is a standalone post placed in the jawbone and needs time to heal. Dr. Moezzi will explain both so you can choose what suits your mouth, timeline and budget.",
    },
    {
      q: "How do I care for my bridge?",
      a: "Brush twice a day, clean under the pontic daily with a floss threader or interdental brush, and keep your regular visits. Go easy on very hard or sticky foods.",
    },
    {
      q: "What are my other options for missing teeth?",
      a: "Dental implants, which are anchored in the jawbone, and removable partial dentures are the main alternatives. The right choice depends on your oral health, timeline, budget and goals. We will review all of them with you.",
    },
    {
      q: "Does insurance cover dental bridges?",
      a: "Many PPO plans cover a portion of a bridge when it is needed to restore function. Coverage varies by policy, so our team reviews your benefits and explains any out-of-pocket cost before treatment starts.",
    },
  ],
  related: ["dental-implants", "dental-crowns", "restorative-dentistry", "tooth-extractions"],
  cta: {
    heading: "Close the gap in your smile",
    text: "Call (661) 254-5200 or book online for a bridge consultation with Dr. Moezzi in Valencia.",
  },
  flags: [
    "Source FAQ says bridges last '5 to 15 years, some longer'; replaced with 'many years' (no specific lifespan).",
    "Source references a chart of bridge types that was not in the extract; the four types listed (traditional, cantilever, Maryland, implant-supported) are standard options, not confirmed from the source. Confirm the practice offers each.",
    "Source page contains misplaced Invisalign/aligner content (iTero scan, clear aligners); ignored. iTero kept in technology since the page mentions the scanner. Confirm iTero is used for bridge impressions.",
    "'Typically completed in a few appointments' and 'in weeks rather than months' are general expectations, not from the source.",
  ],
};

export default service;
