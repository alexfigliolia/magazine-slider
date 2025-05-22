"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagazineContextProvider = exports.MagazineContext = void 0;
const react_1 = require("react");
exports.MagazineContext = (0, react_1.createContext)({
    current: 0,
    setCurrent: () => { },
});
const MagazineContextProvider = ({ children }) => {
    const [current, setCurrent] = (0, react_1.useState)(0);
    const value = (0, react_1.useMemo)(() => ({ current, setCurrent }), [current]);
    return <exports.MagazineContext value={value}>{children}</exports.MagazineContext>;
};
exports.MagazineContextProvider = MagazineContextProvider;
