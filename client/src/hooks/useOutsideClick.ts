import { MutableRefObject, Ref, useEffect } from "react";

export function useOutsideClick<T>(
  refs: { current: any }[] = [],
  cb: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      const isContained = refs.some(
        (ref) => ref.current && ref.current.contains(event.target)
      );

      if (!isContained) {
        cb();
      }
    }
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("touchstart", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
    };
  }, [refs]);
}
