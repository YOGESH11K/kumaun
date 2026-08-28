export type GalleryPhoto = {
  src: string;
  alt: string;
  category: string;
  place?: string;
  width: number;
  height: number;
};

export const galleryCategories = [
  "All",
  "Mountains",
  "Villages",
  "Forests",
  "Sunrise",
  "Sunset",
  "Local Life",
  "Mukteshwar",
  "Saliyakote Malla",
  "Saliyakote Talla",
  "Sundarkhal",
  "Dharapani",
  "Nainital",
] as const;

const PH = (path: string) => `/images/${path}.svg`;
const ratio = (w: number, h: number) => ({ width: w, height: h });

export const galleryPhotos: GalleryPhoto[] = [
  // Mountains
  { src: PH("mukteshwar/ridge-overview"), alt: "Mukteshwar Himalayan mountain landscape", category: "Mountains", place: "Mukteshwar", ...ratio(4, 3) },
  { src: PH("mukteshwar/sunrise-peaks"), alt: "Sunrise over the Himalayan peaks at Mukteshwar", category: "Sunrise", place: "Mukteshwar", ...ratio(3, 4) },
  { src: PH("saliyakote-malla/mountain-view"), alt: "Himalayan mountain view from Saliyakote Malla", category: "Mountains", place: "Saliyakote Malla", ...ratio(4, 3) },
  { src: PH("sundarkhal/mountain-views"), alt: "Layered mountain views near Sundarkhal", category: "Mountains", place: "Sundarkhal", ...ratio(3, 2) },
  // Forests
  { src: PH("mukteshwar/forest-pine"), alt: "Pine forest at Mukteshwar", category: "Forests", place: "Mukteshwar", ...ratio(3, 4) },
  { src: PH("saliyakote-malla/forest"), alt: "Forest slopes near Saliyakote Malla", category: "Forests", place: "Saliyakote Malla", ...ratio(4, 3) },
  { src: PH("sundarkhal/forest-valley"), alt: "Forest and valley at Sundarkhal", category: "Forests", place: "Sundarkhal", ...ratio(4, 3) },
  // Villages
  { src: PH("saliyakote-malla/village-lane"), alt: "Village lane in Saliyakote Malla", category: "Villages", place: "Saliyakote Malla", ...ratio(3, 4) },
  { src: PH("saliyakote-talla/village-road"), alt: "Village road in Saliyakote Talla", category: "Villages", place: "Saliyakote Talla", ...ratio(4, 3) },
  { src: PH("saliyakote-talla/houses"), alt: "Houses among the fields at Saliyakote Talla", category: "Villages", place: "Saliyakote Talla", ...ratio(4, 3) },
  { src: PH("sundarkhal/valley-village"), alt: "Valley village near Sundarkhal", category: "Villages", place: "Sundarkhal", ...ratio(3, 2) },
  { src: PH("dharapani/valley-village"), alt: "Dharapani valley village surrounded by mountains", category: "Villages", place: "Dharapani", ...ratio(4, 3) },
  // Sunrise / Sunset
  { src: PH("saliyakote-talla/sunset"), alt: "Sunset over the Saliyakote Talla hills", category: "Sunset", place: "Saliyakote Talla", ...ratio(4, 3) },
  { src: PH("sundarkhal/mountain-views"), alt: "Golden light on the Sundarkhal hills", category: "Sunset", place: "Sundarkhal", ...ratio(3, 4) },
  // Local life
  { src: PH("saliyakote-malla/local-life"), alt: "Day-to-day village life at Saliyakote Malla", category: "Local Life", place: "Saliyakote Malla", ...ratio(4, 3) },
  { src: PH("dharapani/local-life"), alt: "Local life at Dharapani", category: "Local Life", place: "Dharapani", ...ratio(3, 4) },
  { src: PH("dharapani/greenery"), alt: "Greenery in the Dharapani valley", category: "Local Life", place: "Dharapani", ...ratio(4, 3) },
  // Mukteshwar
  { src: PH("mukteshwar/temple-cliff"), alt: "Mukteshwar Mahadev temple on the cliff", category: "Mukteshwar", place: "Mukteshwar", ...ratio(3, 4) },
  { src: PH("mukteshwar/orchard"), alt: "Orchard landscape at Mukteshwar", category: "Mukteshwar", place: "Mukteshwar", ...ratio(4, 3) },
  // Sundarkhal
  { src: PH("sundarkhal/roads"), alt: "Quiet road through the hills at Sundarkhal", category: "Sundarkhal", place: "Sundarkhal", ...ratio(3, 2) },
  { src: PH("sundarkhal/greenery"), alt: "Green landscape near Sundarkhal", category: "Sundarkhal", place: "Sundarkhal", ...ratio(4, 3) },
  // Dharapani
  { src: PH("dharapani/surrounding-mountains"), alt: "Mountains surrounding the Dharapani valley", category: "Dharapani", place: "Dharapani", ...ratio(4, 3) },
  // Nainital
  { src: PH("nainital/lake-hills"), alt: "Nainital Naini Lake surrounded by mountains", category: "Nainital", place: "Nainital", ...ratio(4, 3) },
  { src: PH("nainital/naina-temple"), alt: "Naina Devi Temple at the lake in Nainital", category: "Nainital", place: "Nainital", ...ratio(3, 4) },
  { src: PH("nainital/mall-road"), alt: "Mall Road lakeside promenade in Nainital", category: "Nainital", place: "Nainital", ...ratio(4, 3) },
  { src: PH("nainital/tiffin-top"), alt: "View from Tiffin Top above Nainital", category: "Nainital", place: "Nainital", ...ratio(3, 2) },
];
