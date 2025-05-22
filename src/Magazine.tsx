import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MagazineContext } from "./Context";
import { Page } from "./Page";
import { IMagazinePage, IMagazineProps } from "./types";

export const Magazine = ({ images, sound }: IMagazineProps) => {
  const { current } = use(MagazineContext);
  const [deferredPage, setDeferredPage] = useState(current);
  const slides = useMemo(() => compileImages(images), [images]);
  const length = useMemo(() => slides.length, [slides.length]);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToPage = useCallback(() => {
    setDeferredPage(deferredPage => {
      if (current === deferredPage) {
        return deferredPage;
      }
      timeout.current = setTimeout(
        () => {
          goToPage();
        },
        Math.abs(current - deferredPage) > 2 ? 50 : 150,
      );
      if (current > deferredPage) {
        return deferredPage + 1;
      }
      return deferredPage - 1;
    });
  }, [current]);

  useEffect(() => {
    goToPage();
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, goToPage]);

  useEffect(() => {
    if (sound) {
      const pageTurn = new Audio("/page-flip.mp3");
      void pageTurn.play();
    }
  }, [current, sound]);

  return (
    <group rotation-y={-Math.PI / 2}>
      {slides.map((image, index) => (
        <Page
          key={index}
          {...image}
          index={index}
          current={deferredPage}
          opened={deferredPage > index}
          bookClosed={deferredPage === 0 || deferredPage === length}
        />
      ))}
    </group>
  );
};

function compileImages(images: string[]) {
  const photos: IMagazinePage[] = [];
  const { length } = images;
  for (let i = 0; i < length; i += 2) {
    photos.push({
      front: images[i % length],
      back: images[(i + 1) % length],
    });
  }
  return photos;
}
