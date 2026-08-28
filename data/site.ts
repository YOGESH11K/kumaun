import { img } from "@/lib/imageSource";

export const siteConfig = {
  title: "Kumaun — Discover Mukteshwar, Saliyakote & Nainital",
  shortTitle: "KUMAUN",
  description:
    "Explore the mountains, villages, forests and landscapes of Kumaon through an immersive digital journey across Mukteshwar, Saliyakote, Sundarkhal, Dharapani and Nainital.",
  url: "https://kumaun.vercel.app",
  domain: "kumaun.vercel.app",
  ogImage: img("/images/landscapes/hero-panorama"),
  author: "Yogesh Kumar",
  phone: "8923145213",
  keywords: [
    "Kumaon",
    "Mukteshwar",
    "Saliyakote",
    "Sundarkhal",
    "Dharapani",
    "Nainital",
    "Uttarakhand tourism",
    "Himalaya",
    "Kumaon villages",
    "Nainital lake",
  ],
  nav: [
    { label: "Home", href: "#home" },
    { label: "Mukteshwar", href: "#mukteshwar" },
    { label: "Saliyakote", href: "#saliyakote" },
    { label: "Sundarkhal", href: "#sundarkhal" },
    { label: "Dharapani", href: "#dharapani" },
    { label: "Nainital", href: "#nainital" },
    { label: "Gallery", href: "#gallery" },
  ],
};
