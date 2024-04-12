import { useLayoutEffect } from "react";

function useLockBodyScroll(lock: boolean = true): void {
  useLayoutEffect((): undefined | (() => void) => {
    if (!lock) return;
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow;

    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = originalStyle);
  }, [lock]);
}

export default useLockBodyScroll;
