import type { Service } from "../types.ts";
import cosmeticDentistry from "./cosmetic-dentistry.ts";
import compositeFilling from "./composite-filling.ts";
import invisalign from "./invisalign.ts";
import teethWhitening from "./teeth-whitening.ts";
import veneers from "./veneers.ts";
import dentalCrowns from "./dental-crowns.ts";
import dentalImplants from "./dental-implants.ts";
import holisticDentistry from "./holistic-dentistry.ts";
import oralSurgery from "./oral-surgery.ts";
import allOn4 from "./all-on-4-implants.ts";
import boneGrafting from "./bone-grafting.ts";
import toothExtractions from "./tooth-extractions.ts";
import wisdomTeeth from "./wisdom-teeth-removal.ts";
import restorativeDentistry from "./restorative-dentistry.ts";
import dentalBridges from "./dental-bridges.ts";
import tmj from "./tmj-treatments.ts";
import preventive from "./preventive-dentistry.ts";
import family from "./family-dentistry.ts";

/** Every service page, in menu order. */
export const services: Service[] = [
  preventive,
  family,
  cosmeticDentistry,
  veneers,
  teethWhitening,
  invisalign,
  compositeFilling,
  restorativeDentistry,
  dentalCrowns,
  dentalBridges,
  dentalImplants,
  allOn4,
  oralSurgery,
  boneGrafting,
  toothExtractions,
  wisdomTeeth,
  holisticDentistry,
  tmj,
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const serviceByPath = (path: string) => services.find((s) => s.path === path);
