import { ReactNode, RefObject } from "react";

export interface Propless<T = never> {
  ref?: T extends never ? never : RefObject<T>;
}

export interface OptionalChildren {
  children?: ReactNode;
}
