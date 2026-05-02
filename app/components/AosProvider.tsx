"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export function AosProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-out",
    });
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      AOS.refresh();
    });
  }, [pathname]);

  return <>{children}</>;
}
