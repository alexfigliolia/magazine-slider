import { Dispatch, SetStateAction } from "react";
import { OptionalChildren } from "./types";
export declare const MagazineContext: import("react").Context<IMagazineContext>;
export declare const MagazineContextProvider: ({ children }: OptionalChildren) => import("react").JSX.Element;
interface IMagazineContext {
    current: number;
    setCurrent: Dispatch<SetStateAction<number>>;
}
export {};
