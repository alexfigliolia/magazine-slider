import { MagazineContextProvider } from "./Context";
import { Magazine } from "./Magazine";
import { IMagazineProps } from "./types";

export const MagazineSlider = (props: IMagazineProps) => {
  return (
    <MagazineContextProvider>
      <Magazine {...props} />
    </MagazineContextProvider>
  );
};
