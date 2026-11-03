"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Shows the bottom bar once the visitor has scrolled past most of the first screen, and hides it while the footer is in view. */
export function MobileBarBehavior() {
  const pathname = usePathname();
  useEffect(() => {
    const bar = document.getElementById("mobile-bar");
    const footer = document.querySelector("footer");
    if (!bar) return;
    let footerVisible = false;
    const update = () => bar.toggleAttribute("data-show", window.scrollY > window.innerHeight * 0.6 && !footerVisible);
    const io = new IntersectionObserver(([e]) => {
      footerVisible = e.isIntersecting;
      update();
    });
    if (footer) io.observe(footer);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);
  return null;
}
