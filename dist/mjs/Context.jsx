import { createContext, useMemo, useState, } from "react";
export const MagazineContext = createContext({
    current: 0,
    setCurrent: () => { },
});
export const MagazineContextProvider = ({ children }) => {
    const [current, setCurrent] = useState(0);
    const value = useMemo(() => ({ current, setCurrent }), [current]);
    return <MagazineContext value={value}>{children}</MagazineContext>;
};
