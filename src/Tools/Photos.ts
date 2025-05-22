import { IMagazinePage } from "Components/MagazineSlider";

const IMAGE_LIST = [
  "/photo-1.jpg",
  "/photo-2.jpg",
  "/photo-3.jpg",
  "/photo-4.jpg",
  "/photo-5.jpg",
  "/photo-6.jpg",
  "/photo-7.jpg",
  "/photo-8.jpg",
  "/photo-9.jpg",
  "/photo-1.jpg",
] as const;

const { length: total } = IMAGE_LIST;

export const Photos: IMagazinePage[] = [];

Photos.push({
  front: "/book-cover.jpg",
  back: IMAGE_LIST[0],
});

for (let i = 1; i < total - 1; i += 2) {
  Photos.push({
    front: IMAGE_LIST[i % total],
    back: IMAGE_LIST[(i + 1) % total],
  });
}

Photos.push({
  front: IMAGE_LIST[total - 1],
  back: "/book-back.jpg",
});
