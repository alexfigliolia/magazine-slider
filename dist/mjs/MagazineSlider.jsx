import { MagazineContextProvider } from "./Context.js";
import { Magazine } from "./Magazine.js";
export const MagazineSlider = (props) => {
    return (<MagazineContextProvider>
      <Magazine {...props}/>
    </MagazineContextProvider>);
};
