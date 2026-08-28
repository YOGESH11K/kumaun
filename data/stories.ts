export type Story = {
  slug: string;
  title: string;
  place: string;
  excerpt: string;
  body: string[]; // paragraphs
  image: string;
  imageAlt: string;
  author: string;
  date: string;
  tag: string;
};

/**
 * LOCAL STORIES — editable by the owner.
 * These are placeholder/community-level articles. The owner can replace
 * the copy and add their own village history, traditions and memories.
 */

export const stories: Story[] = [
  {
    slug: "first-light-over-saliyakote",
    title: "The First Light Over Saliyakote",
    place: "Saliyakote",
    excerpt:
      "There is a short hour, just after dawn, when the village of Saliyakote turns gold before the rest of the world wakes.",
    body: [
      "Before sunrise the ridge is cold and silent, the forest still dark against a lighter sky. The Himalaya stand along the horizon like a pale wall, waiting for the light to reach them first.",
      "Then, without warning, the highest peak catches fire. The gold moves down the range, spills into the valley, and reaches the fields and the roofs of Saliyakote. For a few minutes the whole hillside glows.",
      "By the time the sun is fully up, the moment is gone — but everyone who lives here knows it happens again tomorrow, the same as it has always done.",
    ],
    image: "/images/saliyakote-malla/sunrise-peaks.svg",
    imageAlt: "Dawn light over the Saliyakote hills",
    author: "Community note",
    date: "Placeholder",
    tag: "Local memory",
  },
  {
    slug: "the-orchards-of-mukteshwar",
    title: "The Orchards of Mukteshwar",
    place: "Mukteshwar",
    excerpt:
      "Fruit trees have shaped this hillside for generations — a quiet story of the town that grows the mountains' sweetness.",
    body: [
      "Mukteshwar's fruit orchards are more than scenery. They are the working memory of the hillside, planted and tended by families who have lived here for generations.",
      "The orchards rise in terraces above the forest, catching the sun and the mountain air that gives the fruit its flavour. Through the seasons they move from blossom to fruit to bare winter branches.",
      "This is where the owner's own family story belongs — the orchard that has been in the family, the harvest rituals, the names of the fruit that grows best here.",
    ],
    image: "/images/mukteshwar/orchard.svg",
    imageAlt: "Fruit orchard in the Mukteshwar hills",
    author: "Community note",
    date: "Placeholder",
    tag: "Village tradition",
  },
  {
    slug: "the-hills-around-sundarkhal",
    title: "The Hills Around Sundarkhal",
    place: "Sundarkhal",
    excerpt:
      "Off the main road, the forest closes in and the valley opens — the story of a hidden corner of Kumaon.",
    body: [
      "Not every journey in Kumaon ends at a famous viewpoint. Some of the best ones are the stretches in between — like the road through Sundarkhal, where the forest and the valley trade turns.",
      "Here the hills feel closer and less arranged for visitors. Roads wind, birds call, and the occasional village appears in a clearing of fields.",
      "The owner knows these hidden corners best — the walk to a spring, the field with the best evening light, the family that farms the slope. This page is their canvas.",
    ],
    image: "/images/sundarkhal/forest-valley.svg",
    imageAlt: "Forested valley near Sundarkhal",
    author: "Community note",
    date: "Placeholder",
    tag: "Hidden Kumaon",
  },
];
