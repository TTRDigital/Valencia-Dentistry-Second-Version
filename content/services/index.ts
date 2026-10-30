import type { Service } from "../types";
import cosmeticDentistry from "./cosmetic-dentistry";
import compositeFilling from "./composite-filling";
import invisalign from "./invisalign";
import teethWhitening from "./teeth-whitening";
import veneers from "./veneers";
import dentalCrowns from "./dental-crowns";
import dentalImplants from "./dental-implants";
import holisticDentistry from "./holistic-dentistry";
import oralSurgery from "./oral-surgery";
import allOn4 from "./all-on-4-implants";
import boneGrafting from "./bone-grafting";
import toothExtractions from "./tooth-extractions";
import wisdomTeeth from "./wisdom-teeth-removal";
import restorativeDentistry from "./restorative-dentistry";
import dentalBridges from "./dental-bridges";
import tmj from "./tmj-treatments";
import preventive from "./preventive-dentistry";
import family from "./family-dentistry";

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
