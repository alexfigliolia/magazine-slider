import { ForwardedRef, forwardRef } from "react";
import { MagazineContextProvider } from "./Context";
import { Magazine } from "./Magazine";
import { IMagazineContext, IMagazineProps } from "./types";

export const MagazineSlider = forwardRef(function MagazineSlider(
  props: IMagazineProps,
  ref: ForwardedRef<IMagazineContext>,
) {
  return (
    <MagazineContextProvider>
      <Magazine ref={ref} {...props} />
    </MagazineContextProvider>
  );
});
