import type { Faq } from "./types";

/** Home page FAQs (rewritten from the current site; the location answer corrected to Valencia). */
export const homeFaqs: Faq[] = [
  { q: "What makes Valencia Smile Expert different?", a: "You see Dr. Moezzi herself at every visit, with time to talk. Care is holistic and integrative: biocompatible materials, a focus on prevention and attention to how your mouth affects the rest of your body." },
  { q: "Do you accept insurance?", a: "Yes. We accept most major PPO plans and will verify your benefits before treatment so you know what to expect. Flexible financing is available for anything your plan does not cover." },
  { q: "What happens at my first visit?", a: "We review your health history, take digital X-rays, complete a thorough exam and spend time understanding your goals. You leave with a clear, written plan. New patients pay $59 for the exam and X-rays." },
  { q: "Do you offer cosmetic treatments like veneers or Invisalign?", a: "Yes. Veneers, teeth whitening, Invisalign clear aligners and cosmetic bonding are all planned in-house around a digital scan of your smile." },
  { q: "Can I get a crown in one visit?", a: "Often, yes. We design and make custom crowns in the office, so many patients receive their final crown the same day." },
  { q: "Is holistic dentistry effective?", a: "Holistic dentistry is evidence-based dentistry with extra care in material choice and a preference for minimally invasive, preventive treatment. It does not replace medical care for health conditions." },
  { q: "Where are you located, and is there parking?", a: "We are at 27420 Tourney Rd, Suite 240, in Valencia (Santa Clarita), CA 91355, with free parking at the building and elevator access to the second floor." },
];

/** About page copy (rewritten from /about/ on the current site). */
export const about = {
  seo: { title: "About Dr. Neda Moezzi & Our Practice | Valencia Smile Expert", description: "Meet Dr. Neda Moezzi, DDS, and the team behind Valencia Smile Expert: holistic, one-on-one dentistry in Valencia, Santa Clarita since 2007." },
  hero: { eyebrow: "Our practice", title: "A dental home in Valencia since 2007", intro: "Now led by Dr. Neda Moezzi, DDS, Valencia Smile Expert pairs clinical precision and modern technology with the kind of warm, unhurried care that makes patients feel like family." },
  mission: {
    heading: "Our mission",
    paragraphs: [
      "From the beginning, Dr. Moezzi set out to make excellent dental care feel accessible, compassionate and genuinely personal. Whether you are here for a routine cleaning or a full smile restoration, you should feel comfortable, confident in the work and fully cared for.",
      "That is why there are no handoffs. Dr. Moezzi performs your exam, explains your options and plans your care herself, and the same small team greets you at every visit.",
    ],
  },
  values: [
    { title: "Individual attention", text: "Every patient, every visit, gets our full focus." },
    { title: "Holistic approach", text: "We look past symptoms to the cause and consider your whole-body health." },
    { title: "Long-term outlook", text: "Prevention, education and lasting solutions over quick fixes." },
    { title: "Comfort and clarity", text: "Sedation options, plain-language explanations and a calm, friendly space." },
    { title: "Excellence", text: "Advanced technology and proven techniques, with no shortcuts." },
    { title: "Honesty", text: "Options and costs explained up front, so there are no surprises." },
    { title: "Community", text: "Proud to care for Santa Clarita families, many of them for years." },
    { title: "Flexibility", text: "Appointment times that fit real lives, including same-day care." },
  ],
  technology: {
    heading: "Comfort meets innovation",
    text: "The office is equipped with 3D CBCT imaging, iTero digital scanning, intraoral cameras, PRF therapy and laser dentistry, so care is safe, efficient and as minimally invasive as possible. Combined with a calming environment and sedation options, it changes what going to the dentist feels like.",
  },
  team: {
    heading: "A small team you will get to know",
    text: "Our front desk, hygienists and assistants have one job: to make every visit smooth and every patient feel known. Expect the same faces, the same warm welcome and a team that remembers the details.",
  },
};

export const emergency = {
  seo: { title: "Emergency Dentist in Valencia, Santa Clarita | Same-Day Care", description: "Tooth pain, a broken tooth or a lost crown? Valencia Smile Expert offers same-day emergency dental care in Valencia. Call (661) 254-5200 now." },
  hero: { eyebrow: "Emergency dental care", title: "In pain? We will see you today", intro: "Same-day appointments for toothaches, broken teeth, lost crowns, swelling and injuries. Call us and we will tell you exactly what to do next." },
  situations: [
    { title: "Severe toothache", text: "Rinse with warm water, floss gently to remove anything trapped, and take an over-the-counter pain reliever as directed. Do not place aspirin on the gum." },
    { title: "Knocked-out tooth", text: "Hold it by the crown, not the root. Rinse briefly, keep it moist in milk or saliva and call us right away. The sooner we see you, the better the chance of saving it." },
    { title: "Chipped or broken tooth", text: "Save any pieces, rinse your mouth, apply a cold compress for swelling and avoid chewing on that side until we see you." },
    { title: "Lost crown or filling", text: "Keep the crown if you have it. Avoid sticky or hard foods and call us; a temporary fix is usually quick." },
    { title: "Swelling or abscess", text: "Swelling with fever or difficulty swallowing needs care the same day. Call us, or go to the nearest emergency room if you cannot breathe or swallow normally." },
    { title: "Soft-tissue injury", text: "Apply gentle pressure with clean gauze. If bleeding does not stop within 15 minutes, call us or seek urgent care." },
  ],
  faqs: [
    { q: "Do I need to be an existing patient?", a: "No. We welcome new patients for emergency care and will do our best to see you the same day." },
    { q: "What should I do if the office is closed?", a: "Call our office line and follow the instructions. For a life-threatening emergency, swelling that affects breathing, or uncontrolled bleeding, go to the nearest emergency room." },
    { q: "Will the visit hurt?", a: "Our first priority is to get you comfortable. We use local anesthetic and offer sedation options when appropriate." },
    { q: "How much does an emergency visit cost?", a: "We will explain the cost of the exam and any treatment before we begin. Most major PPO plans are accepted and financing is available." },
  ],
};

export const offer = {
  seo: { title: "$59 New Patient Special: Exam & X-Rays | Valencia Smile Expert", description: "New to Valencia Smile Expert? Start with a complete exam and digital X-rays for $59, plus unhurried time with Dr. Neda Moezzi, DDS. Book online today." },
  hero: { eyebrow: "New patient special", title: "Your first visit, $59", intro: "A complete exam, digital X-rays and a real conversation with Dr. Moezzi about your goals. No pressure and no surprises." },
  includes: ["Comprehensive exam with Dr. Moezzi", "Digital X-rays (low radiation)", "Oral cancer screening", "A written treatment plan with clear priorities", "Insurance benefits check before any treatment"],
  steps: [
    { title: "Book online or call", text: "Pick a time that suits you. Same-day visits are often available." },
    { title: "Short forms, done your way", text: "Complete new-patient forms at home or when you arrive." },
    { title: "Meet Dr. Moezzi", text: "Exam, X-rays and time to talk through what you want for your smile." },
    { title: "Leave with a plan", text: "Clear next steps and costs in writing, whether that is a cleaning or something more." },
  ],
  faqs: [
    { q: "Who qualifies for the $59 special?", a: "New patients of Valencia Smile Expert. The offer covers the exam and X-rays and cannot be combined with insurance or other offers." },
    { q: "Does it include a cleaning?", a: "The special covers the exam and X-rays. A cleaning can usually be scheduled the same day if your gums are healthy; we will give you the cost before we begin." },
    { q: "What if I have insurance?", a: "We will verify your benefits before your visit. If your plan covers the exam and X-rays, we will bill your plan instead." },
  ],
};
