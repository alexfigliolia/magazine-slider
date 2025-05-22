import { Dispatch, SetStateAction } from "react";
import { Texture } from "three";

export interface IMagazineContext {
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
}

export interface IMagazinePage {
  front: string;
  back: string;
}

export interface IMagazineProps {
  sound?: boolean;
  images: IMagazinePage[];
}

export interface PageScope {
  index: number;
  totalLength: number;
  frontImage: Texture;
  backImage: Texture;
  coverRoughness: Texture;
}
