import { useMemo } from "react";

const useQueryParams = () => {
  const search = window.location.search;
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const params = Object.fromEntries(searchParams.entries());
  return params;
};

export default useQueryParams;
