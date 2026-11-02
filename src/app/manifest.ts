import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Valencia Dentistry",
    short_name: "Valencia Smile",
    description: "Holistic, one-on-one dentistry in Valencia, Santa Clarita.",
    start_url: "/",
    display: "browser",
    background_color: "#FAF7F1",
    theme_color: "#1C1B19",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
