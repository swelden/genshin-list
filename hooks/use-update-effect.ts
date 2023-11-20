// https://usehooks-ts.com/react-hook/use-update-effect

import { DependencyList, EffectCallback, useEffect } from "react";

import useIsFirstRender from "@/hooks/use-is-first-render";

function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useIsFirstRender();

  useEffect(() => {
    if (!isFirst) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useUpdateEffect;
