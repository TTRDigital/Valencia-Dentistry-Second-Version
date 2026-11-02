/**
 * Photos from the practice's first site (valencia-dentistry.vercel.app),
 * limited to images that show no identifiable dentist. Alt text describes
 * what is actually in each picture.
 */
export const officeImages = {
  cleaning: { src: "/images/office/cleaning.jpg", alt: "Hygienist cleaning a patient's teeth in a bright treatment room" },
  treatmentRoom: { src: "/images/office/treatment-room.jpg", alt: "Treatment room with a dental chair, monitors and large arched windows" },
  treatmentRoom2: { src: "/images/office/treatment-room-2.jpg", alt: "Calm treatment room with natural light and a modern dental chair" },
  implantModel: { src: "/images/office/implant-model-hands.jpg", alt: "Dentist showing a patient how an implant and crown fit on a model" },
  dentureCloseup: { src: "/images/office/denture-closeup.jpg", alt: "Close-up of a full-arch implant denture model" },
  aligner: { src: "/images/office/aligner-patient.jpg", alt: "Smiling patient holding a clear aligner and its case" },
  aligner2: { src: "/images/office/aligner-patient-2.jpg", alt: "Patient smiling while placing a clear aligner" },
  smileMirror: { src: "/images/office/veneer-smile.jpg", alt: "Patient checking her smile in a hand mirror" },
  smileTryIn: { src: "/images/office/veneer-tryin.jpg", alt: "Patient smiling in the dental chair during a cosmetic visit" },
  scan: { src: "/images/office/scan-closeup.jpg", alt: "Digital intraoral scan of a patient's teeth shown on a monitor" },
} as const;

export type OfficeImageKey = keyof typeof officeImages;
