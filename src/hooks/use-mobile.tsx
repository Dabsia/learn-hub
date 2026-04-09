// import * as React from "react";

// const MOBILE_BREAKPOINT = 768;

// export function useIsMobile() {
//   const [isMobile, setIsMobile] = React.useState(undefined);

//   React.useEffect(() => {
//     const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
//     const onChange = () => {
//       setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//     };
//     mql.addEventListener("change", onChange);
//     setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//     return () => mql.removeEventListener("change", onChange);
//   }, []);

//   return !!isMobile;
// }

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Handle SSR and window not defined
    if (typeof window === "undefined") return;

    // Create media query list
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Use matches directly for initial state
    const checkIsMobile = (e?: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e ? e.matches : mql.matches);
    };

    // Set initial value
    checkIsMobile(mql);

    // Modern event listener (preferred)
    mql.addEventListener("change", checkIsMobile);

    // Cleanup
    return () => mql.removeEventListener("change", checkIsMobile);
  }, []);

  return isMobile;
}
