import { useQuery } from "@tanstack/react-query";

import { getSpecializations } from "../api";

export function useSpecializations() {
  return useQuery({
    queryKey: ["specializations"],
    queryFn: getSpecializations,
  });
}
