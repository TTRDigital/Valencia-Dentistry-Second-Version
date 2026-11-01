"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { cmsConfigured } from "../../../../sanity/env";

export function Studio() {
  if (!cmsConfigured) {
    return (
      <main style={{ fontFamily: "system-ui", padding: "4rem 2rem", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
        <h1 style={{ fontSize: "1.5rem" }}>CMS not connected yet</h1>
        <p>The site is serving its built-in content. To connect the Studio, set the practice&apos;s Sanity project ID in <code>sanity/env.ts</code>, add this site&apos;s URL to the project&apos;s CORS origins, then run <code>npm run seed</code> to load the content. See the README.</p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
