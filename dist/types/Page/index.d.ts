import { ThreeElements } from "@react-three/fiber";
import { IMagazinePage } from "../types";
export declare const Page: ({ front, back, index, opened, current, bookClosed, ...rest }: Props) => import("react").JSX.Element;
type Props = IMagazinePage & ThreeElements["group"] & {
    index: number;
    opened: boolean;
    current: number;
    bookClosed: boolean;
};
export {};
