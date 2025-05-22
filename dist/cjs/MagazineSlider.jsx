"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagazineSlider = void 0;
const Context_1 = require("./Context");
const Magazine_1 = require("./Magazine");
const MagazineSlider = (props) => {
    return (<Context_1.MagazineContextProvider>
      <Magazine_1.Magazine {...props}/>
    </Context_1.MagazineContextProvider>);
};
exports.MagazineSlider = MagazineSlider;
