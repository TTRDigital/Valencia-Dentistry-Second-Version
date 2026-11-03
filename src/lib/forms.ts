import { services } from "../../content/services";

/** Options for the "What can we help with?" select. */
export const serviceOptions = ["New patient exam", "Emergency / tooth pain", ...services.map((s) => s.name), "Something else"];
