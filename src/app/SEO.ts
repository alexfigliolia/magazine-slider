import { Metadata } from "next";
import { SEOBase } from "Tools/SEOBase";

export const SEO: Metadata = {
  title: "Behind The Matches",
  keywords: [
    "matchbook art",
    "art",
    "workshops",
    "team events",
    "birthdays",
    "art shop",
  ],
  openGraph: {
    siteName: "Behind The Matches",
    locale: "en_US",
    title: "Behind The Matches",
    type: "website",
    url: "https://behindthematches.com",
    images: {
      url: "/box-14.png",
      type: "image/png",
      alt: "New York City Restaurants Shadow Box",
    },
    description: "Matchbook artwork designed to relive your journies",
  },
  appleWebApp: {
    title: "Behind The Matches",
    statusBarStyle: "default",
    capable: true,
  },
  description: "Matchbook artwork designed to relive your journies",
  ...SEOBase,
};
