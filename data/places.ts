export type Coordinates = {
  lat: number;
  lng: number;
};

export type Highlight = {
  label: string;
  description: string;
};

export type InfoBlock = {
  heading: string;
  body: string;
  image?: string;
  imageAlt?: string;
};

export type TravelInfo = {
  howToReach: string[];
  bestTime?: string;
  duration?: string;
  notes?: string;
};

export type Place = {
  slug: string;
  name: string;
  title: string;
  tagline: string;
  heading: string;
  subheading: string;
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  heroAlt: string;
  images: string[];
  gallery: string[];
  highlights: Highlight[];
  facts: { label: string; value: string }[];
  nearbyPlaces: string[];
  activities: string[];
  travelInfo: TravelInfo;
  coordinates: Coordinates;
  visualIdentity: "forest" | "valley" | "peak" | "lake" | "village" | "hidden";
  color: string;
  content: InfoBlock[];
};

const K = (path: string, name: string) => `/images/${path}/${name}.svg`;

/**
 * CENTRAL CONTENT FILE
 * ------------------------------------------------------------------
 * All destination copy lives here. The site owner can edit, add or
 * correct local information without touching any components.
 *
 * facts / travelInfo are intentionally conservative: only widely known
 * and publicly documented figures are included (marked below). For tiny
 * localities (Saliyakote, Sundarkhal, Dharapani) information is framed as
 * local / community descriptions rather than invented official data.
 */

export const places: Place[] = [
  {
    slug: "mukteshwar",
    name: "Mukteshwar",
    title: "MUKTESHWAR",
    tagline: "The Himalayan house on the ridge",
    heading: "MUKTESHWAR",
    subheading: "Where the Himalaya bends toward the sky.",
    shortDescription:
      "A quiet hill town at roughly 2,286 m and about 51 km from Nainital, wrapped in coniferous forest and fruit orchards, with a wide open Himalayan panorama from its famous temple ridge.",
    longDescription:
      "Mukteshwar is a hill town in Nainital district, named after the 350-year-old Mukteshwar Mahadev (Lord Shiva) temple that sits high on a cliff. It is best known for its uninterrupted views of the snow-covered Himalayan peaks, its surrounding pine and deodar forests, and its famous fruit orchards — locally grown through a community that has long farmed the steep slopes. The lawns and viewpoint near the temple are a beloved local spot to watch sunrise over the range. It is also home to an important veterinary research institute, a legacy of the town's quieter past. Because so much of Mukteshwar's charm is about the open air, the walking trails and the orchards, it has a calmer, more unhurried character than the busier lake towns below.",
    heroImage: K("mukteshwar", "ridge-overview"),
    heroAlt: "Mukteshwar Himalayan mountain landscape at sunrise",
    images: [
      K("mukteshwar", "ridge-overview"),
      K("mukteshwar", "temple-cliff"),
      K("mukteshwar", "forest-pine"),
      K("mukteshwar", "orchard"),
    ],
    gallery: [
      K("mukteshwar", "ridge-overview"),
      K("mukteshwar", "temple-cliff"),
      K("mukteshwar", "forest-pine"),
      K("mukteshwar", "orchard"),
      K("mukteshwar", "sunrise-peaks"),
    ],
    highlights: [
      {
        label: "Himalayan panorama",
        description:
          "A wide ridge-top view across the snow peaks — best in the clear morning hours before the haze gathers.",
      },
      {
        label: "Mukteshwar Mahadev Temple",
        description:
          "An old Shiva temple perched on a cliff above the valley, reached by a short walk and surrounded by lawns and forest.",
      },
      {
        label: "Orchards & forests",
        description:
          "Coniferous forest and fruit orchards frame the town, giving Mukteshwar its gentle, scented, fruit-tree character.",
      },
    ],
    facts: [
      { label: "Approx. altitude", value: "2,286 m" },
      { label: "From Nainital", value: "~51 km" },
      { label: "Setting", value: "Coniferous forest & orchards" },
    ],
    nearbyPlaces: ["Sundarkhal", "Saliyakote Malla", "Saliyakote Talla", "Nainital"],
    activities: [
      "Sunrise at the temple viewpoint",
      "Walking the orchard and forest trails",
      "Photographing the Himalayan panorama",
      "Quiet forest walks among pines and deodars",
    ],
    travelInfo: {
      howToReach: [
        "By road from Nainital (about 51 km) via Bhowali, on the way the road climbs through forested slopes.",
        "The nearest major rail and air gateways are Kathgodam and Pantnagar respectively, with road connections onward.",
      ],
      bestTime: "Clearer mountain views are best in the cooler, drier months.",
      duration: "A day trip or an overnight stay to catch the morning panorama.",
    },
    coordinates: { lat: 29.4603, lng: 79.6445 },
    visualIdentity: "peak",
    color: "#aec9d8",
    content: [
      {
        heading: "A Himalayan setting",
        body: "Mukteshwar sits high on a ridge of the Kumaon hills, with the Himalaya stretching along the northern horizon. Its height gives it cool air, wide light, and the rare feeling of being above the smaller valleys.",
      },
      {
        heading: "The temple on the cliff",
        body: "The Mukteshwar Mahadev temple is the town's heart — a stone shrine on the edge of a cliff, reached through forest and open lawns. Locals come to light lamps and watch the day open over the peaks.",
      },
      {
        heading: "Forests, orchards and calm",
        body: "Pine and deodar forest covers the slopes, while terraced fruit orchards — a long tradition of the local community — soften the landscape. Everything here moves at a gentler pace.",
      },
    ],
  },
  {
    slug: "saliyakote-malla",
    name: "Saliyakote Malla",
    title: "SALIYAKOTE MALLA",
    tagline: "A quieter side of the Kumaon hills",
    heading: "SALIYAKOTE MALLA",
    subheading: "A quieter side of the Kumaon hills.",
    shortDescription:
      "A peaceful village above the Dharapani valley, where forested slopes, fields and simple village lanes face the Himalaya. Local/community information is presented here and best confirmed by the owner.",
    longDescription:
      "Saliyakote Malla is a small village in the hills above Dharapani, one of the quieter pieces of the Kumaon landscape. It is a place of village lanes, modest stone and mud-plaster houses, terraced fields, and long views over forested ridges toward the Himalaya. Life here is tied to the seasons — rain-fed fields, forest wood for the hearth, and the slow rhythm of a hillside village. There is little organised tourism; the reward is exactly that absence. This description is deliberately local and open to correction — the owner knows this village best and should refine the details here.",
    heroImage: K("saliyakote-malla", "village-lane"),
    heroAlt: "Saliyakote Malla village landscape with hills and houses",
    images: [
      K("saliyakote-malla", "village-lane"),
      K("saliyakote-malla", "fields"),
      K("saliyakote-malla", "mountain-view"),
      K("saliyakote-malla", "forest"),
    ],
    gallery: [
      K("saliyakote-malla", "village-lane"),
      K("saliyakote-malla", "fields"),
      K("saliyakote-malla", "mountain-view"),
      K("saliyakote-malla", "forest"),
      K("saliyakote-malla", "local-life"),
    ],
    highlights: [
      {
        label: "Village lanes",
        description:
          "Quiet footpaths and lanes threading past houses, fields and groves — a glimpse of everyday hillside life.",
      },
      {
        label: "Fields above the valley",
        description:
          "Terraced fields rising from the valley toward the forest, changing colour with the seasons.",
      },
      {
        label: "Himalayan views",
        description: "On clear days the village holds long views toward the high Himalaya to the north.",
      },
    ],
    facts: [
      { label: "Type", value: "Hillside village" },
      { label: "Setting", value: "Forest, fields & mountain views" },
      { label: "Note", value: "Local information — editable" },
    ],
    nearbyPlaces: ["Dharapani", "Saliyakote Talla", "Sundarkhal", "Mukteshwar"],
    activities: [
      "Walking the village lanes",
      "Exploring the surrounding forests",
      "Photographing village life and mountain views",
    ],
    travelInfo: {
      howToReach: [
        "Reached by local roads climbing into the hills above Dharapani; best checked with local residents for the current track and road conditions.",
      ],
      notes: "Roads in the high hills can be narrow and seasonal — confirm access locally before travelling.",
    },
    coordinates: { lat: 29.436, lng: 79.553 },
    visualIdentity: "village",
    color: "#7d8682",
    content: [
      {
        heading: "The village",
        body: "Saliyakote Malla is a working hillside village — homes, hearths, tools and terraces rather than a staged destination. Its quiet makes it feel closer to the mountains than busier stops.",
      },
      {
        heading: "The landscape",
        body: "Forest climbs the higher slopes, fields fill the gentler ground, and the Himalaya hangs along the horizon. Rain, mist and clear days each give the village a different mood.",
      },
      {
        heading: "Local life",
        body: "The rhythms of the village follow the sun and the rain — work in the fields, wood for the winter, and long evenings. Community and seasonal traditions shape the year here.",
      },
    ],
  },
  {
    slug: "saliyakote-talla",
    name: "Saliyakote Talla",
    title: "SALIYAKOTE TALLA",
    tagline: "The lower village among the fields",
    heading: "SALIYAKOTE TALLA",
    subheading: "Greenery, roads, and the way down to the valley.",
    shortDescription:
      "The lower settlement of the Saliyakote area — a quieter, greener counterpoint to its neighbour above, with fields, village roads and sweeping mountain scenery. Content is local/community and open to the owner's editing.",
    longDescription:
      "Saliyakote Talla is the lower village of the Saliyakote hill country, reached along the switchback roads that drop toward Dharapani and the valley below. It is greener and more open than its upper neighbour, with fields, groves, village roads and houses spread across the slopes. It shares the same broad mountain scenery, but framed from lower down — the valley closer, the hills rising on all sides. There is no official tourist listing here; this page is built as a home for the owner's own photographs and knowledge of their village.",
    heroImage: K("saliyakote-talla", "village-road"),
    heroAlt: "Saliyakote Talla village road through green hills",
    images: [
      K("saliyakote-talla", "village-road"),
      K("saliyakote-talla", "greenery"),
      K("saliyakote-talla", "houses"),
      K("saliyakote-talla", "sunset"),
    ],
    gallery: [
      K("saliyakote-talla", "village-road"),
      K("saliyakote-talla", "greenery"),
      K("saliyakote-talla", "houses"),
      K("saliyakote-talla", "sunset"),
      K("saliyakote-talla", "mountain-scenery"),
    ],
    highlights: [
      {
        label: "Greenery & groves",
        description: "Open fields and groves give the lower village a softer, greener character.",
      },
      {
        label: "Village roads",
        description: "Quiet roads winding between houses and fields, framed by the surrounding hills.",
      },
      {
        label: "Mountain scenery",
        description: "Views across the valley with the hills rising on every side.",
      },
    ],
    facts: [
      { label: "Type", value: "Lower village" },
      { label: "Setting", value: "Green fields, roads & hills" },
      { label: "Note", value: "Local information — editable" },
    ],
    nearbyPlaces: ["Saliyakote Malla", "Dharapani", "Sundarkhal"],
    activities: [
      "Morning and evening walks along the village roads",
      "Photographing sunrise and sunset over the hills",
      "Exploring the fields and groves",
    ],
    travelInfo: {
      howToReach: [
        "By local road, below Saliyakote Malla on the descent toward Dharapani; confirm the current track locally.",
      ],
      notes: "Narrow hill roads — drive with care and check conditions locally.",
    },
    coordinates: { lat: 29.432, lng: 79.558 },
    visualIdentity: "village",
    color: "#4a7c5a",
    content: [
      {
        heading: "A greener counterpoint",
        body: "Lower in the hills, Saliyakote Talla is surrounded by fields and greenery, with the forest and upper village above it and the valley below.",
      },
      {
        heading: "Roads and houses",
        body: "Simple village roads link the houses and fields, carrying the everyday life of the lower settlement — a quieter echo of the village above.",
      },
      {
        heading: "Light on the hills",
        body: "Morning mist and evening gold move across the same slopes through the day, making this a rewarding place to watch the light change.",
      },
    ],
  },
  {
    slug: "sundarkhal",
    name: "Sundarkhal",
    title: "SUNDARKHAL",
    tagline: "A hidden corner of the Kumaon hills",
    heading: "SUNDARKHAL",
    subheading: "From forest to valley to a quiet village.",
    shortDescription:
      "A lesser-known stretch of the Kumaon hills — forested ridges, valleys and a small village settlement that sits out of the way of the main tourist trails. Local/community content, open to editing.",
    longDescription:
      "Sundarkhal sits in the hills between the better-known towns, a short road away yet a world apart in pace. It is a place of forested slopes, green valleys and a small settlement whose life is bound to the surrounding ridges. Because it is not on the main tourist route, the experience here is one of quiet roads, birdsong and long landscape views rather than attractions or crowds. It works beautifully as a stop along the way — a chance to step off the main road and into the heart of the hills. The details that follow are local and community-level; the owner is best placed to refine them.",
    heroImage: K("sundarkhal", "forest-valley"),
    heroAlt: "Sundarkhal forested valley landscape",
    images: [
      K("sundarkhal", "forest-valley"),
      K("sundarkhal", "valley-village"),
      K("sundarkhal", "roads"),
      K("sundarkhal", "greenery"),
    ],
    gallery: [
      K("sundarkhal", "forest-valley"),
      K("sundarkhal", "valley-village"),
      K("sundarkhal", "roads"),
      K("sundarkhal", "greenery"),
      K("sundarkhal", "mountain-views"),
    ],
    highlights: [
      {
        label: "Hidden & unhurried",
        description: "Off the main route, Sundarkhal rewards the visitor who steps aside from the crowds.",
      },
      {
        label: "Forest and valley",
        description: "A transition from forested ridges down into green valleys and a small settlement.",
      },
      {
        label: "Quiet roads",
        description: "Long open stretches of road with layered views over the surrounding hills.",
      },
    ],
    facts: [
      { label: "Type", value: "Quiet hillside locality" },
      { label: "Setting", value: "Forest, valleys & village" },
      { label: "Note", value: "Local information — editable" },
    ],
    nearbyPlaces: ["Mukteshwar", "Dharapani", "Saliyakote"],
    activities: [
      "Photography of forest and valley landscapes",
      "Quiet drives and walks along the hill roads",
      "Observing local life in the settlement",
    ],
    travelInfo: {
      howToReach: [
        "Located by local roads off the main routes in the Mukteshwar / Bhowali hill area; confirm directions locally.",
      ],
      notes: "A stop along the way rather than a destination hub — best combined with nearby places.",
    },
    coordinates: { lat: 29.423, lng: 79.566 },
    visualIdentity: "hidden",
    color: "#4f7a52",
    content: [
      {
        heading: "A hidden gem",
        body: "Sundarkhal's quiet is its character. Away from the main trails, it offers the hills people drive past but rarely stop to notice.",
      },
      {
        heading: "Forest to valley",
        body: "The road moves from dense forest down into open valley, where fields and a village settlement come into view.",
      },
      {
        heading: "Landscape views",
        body: "From the ridges, the view stretches across layered green hills toward the higher Himalaya — best in clear, golden light.",
      },
    ],
  },
  {
    slug: "dharapani",
    name: "Dharapani",
    title: "DHARAPANI",
    tagline: "The little valley below the villages",
    heading: "DHARAPANI",
    subheading: "Village atmosphere among surrounding mountains.",
    shortDescription:
      "A small valley community in the local hills — greenery, a gentle village atmosphere and the surrounding mountains rising in every direction. Local/community content, kept editable for the owner.",
    longDescription:
      "Dharapani is a small valley locality below the Saliyakote villages, a green pocket of fields, groves and a handful of homes set among the surrounding mountains. Its name comes from the local landscape of water and streams. It has little infrastructure built for visitors; instead it offers the experience of a village that still lives close to the land — water carried from springs, fields farmed by hand, and the changing face of the mountains through the day. It is a natural base from which to explore the villages above and a place worth its own quiet hour. All detail here is local and open to the owner's editing.",
    heroImage: K("dharapani", "valley-village"),
    heroAlt: "Dharapani valley village surrounded by green mountains",
    images: [
      K("dharapani", "valley-village"),
      K("dharapani", "greenery"),
      K("dharapani", "surrounding-mountains"),
      K("dharapani", "local-life"),
    ],
    gallery: [
      K("dharapani", "valley-village"),
      K("dharapani", "greenery"),
      K("dharapani", "surrounding-mountains"),
      K("dharapani", "local-life"),
    ],
    highlights: [
      {
        label: "Valley setting",
        description: "A green valley floor with fields and groves, ringed by the surrounding hills.",
      },
      {
        label: "Village atmosphere",
        description: "Everyday life of a small hill community — simple, seasonal and close to the land.",
      },
      {
        label: "Surrounding mountains",
        description: "The peaks and ridges close in from every side, shaping the light and the weather.",
      },
    ],
    facts: [
      { label: "Type", value: "Small valley community" },
      { label: "Setting", value: "Greenery among mountains" },
      { label: "Note", value: "Local information — editable" },
    ],
    nearbyPlaces: ["Saliyakote Malla", "Saliyakote Talla", "Sundarkhal"],
    activities: [
      "Exploring the valley on foot",
      "Photographing village life and mountain light",
      "Resting in the quiet green environment",
    ],
    travelInfo: {
      howToReach: [
        "Below the Saliyakote villages, reached by the descending hill roads; confirm the current route locally.",
      ],
      notes: "Small valley communities have limited facilities — plan food and fuel accordingly.",
    },
    coordinates: { lat: 29.428, lng: 79.545 },
    visualIdentity: "valley",
    color: "#5a7a4a",
    content: [
      {
        heading: "A green valley",
        body: "Dharapani is a low, green bowl among the hills — fields and groves that collect the morning mist and the evening light.",
      },
      {
        heading: "Village life",
        body: "Life here follows the seasons: springs, fields and hearths. There is no performance of village life — only the real thing.",
      },
      {
        heading: "The mountains close in",
        body: "Ridges surround the valley on every side, so the mountains feel present and intimate here in a way the open ridges do not.",
      },
    ],
  },
  {
    slug: "nainital",
    name: "Nainital",
    title: "NAINITAL",
    tagline: "The Lake District of the Himalaya",
    heading: "NAINITAL — THE LAKE DISTRICT",
    subheading: "Seven hills gathered around one lake.",
    shortDescription:
      "A Himalayan lake town set among seven hills, with Naini Lake at its centre, colonial-era Mall Road, mountain viewpoints and a rich local culture.",
    longDescription:
      "Nainital is a Himalayan lake town in the Kumaon region, nestled among seven hills with Naini Lake at its centre. It has been a beloved hill station since the colonial era, and its Mall Road — the lakeside promenade — is still the social heart of the town. Around the lake: the Naina Devi Temple at its northern end, boating on the water, and lanes that climb into pine-covered hills. Above the town, viewpoints like Snow View and Tiffin Top open onto sweeping mountain scenery and, on clear days, the high Himalaya. Beyond the lake, Eco Cave Gardens and woodland trails offer natural escapes. Nainital is both a gateway to the hills of Kumaon and a complete destination in its own right.",
    heroImage: K("nainital", "lake-hills"),
    heroAlt: "Nainital Naini Lake surrounded by mountains",
    images: [
      K("nainital", "lake-hills"),
      K("nainital", "naina-temple"),
      K("nainital", "mall-road"),
      K("nainital", "snow-view"),
    ],
    gallery: [
      K("nainital", "lake-hills"),
      K("nainital", "naina-temple"),
      K("nainital", "mall-road"),
      K("nainital", "snow-view"),
      K("nainital", "tiffin-top"),
    ],
    highlights: [
      {
        label: "Naini Lake",
        description: "A crescent-shaped lake at the town's centre, ringed by hills and the lakeside promenade.",
      },
      {
        label: "Naina Devi Temple",
        description: "A Hindu temple at the northern end of the lake, one of the town's most important spiritual landmarks.",
      },
      {
        label: "Mall Road & viewpoints",
        description: "The lakeside Mall Road promenade, with viewpoints like Snow View and Tiffin Top in the hills above.",
      },
    ],
    facts: [
      { label: "Setting", value: "Himalayan lake town" },
      { label: "Surrounded by", value: "Seven hills" },
      { label: "Heart", value: "Naini Lake" },
    ],
    nearbyPlaces: ["Mukteshwar", "Sundarkhal", "Saliyakote"],
    activities: [
      "Boating and walks around Naini Lake",
      "Visiting the Naina Devi Temple",
      "Taking the promenade along Mall Road",
      "Views from Snow View Point and Tiffin Top",
      "Exploring Eco Cave Gardens and woodland trails",
    ],
    travelInfo: {
      howToReach: [
        "Nainital is a well-connected hill town in Kumaon; the nearest railhead is Kathgodam, with road access through the surrounding hills.",
      ],
      bestTime: "Pleasant in the cooler months; the lake and viewpoints draw visitors year-round.",
      duration: "A full day or an overnight stay to see the lake by day and the viewpoints by morning.",
    },
    coordinates: { lat: 29.3919, lng: 79.4542 },
    visualIdentity: "lake",
    color: "#5b7f96",
    content: [
      {
        heading: "The lake district",
        body: "Seven hills close around a single crescent lake, giving Nainital its unmistakable landmark — the town built around water.",
      },
      {
        heading: "Around the lake",
        body: "The Naina Devi Temple, the Mall Road promenade and the boats on the water together form the town's living centre.",
      },
      {
        heading: "Above the town",
        body: "Snow View, Tiffin Top and the pine-covered hills offer a change in height — and, on clear days, the high Himalaya.",
      },
    ],
  },
];

export const getPlace = (slug: string) => places.find((p) => p.slug === slug);

export const featuredPlaces = places.filter((p) => p.slug !== "saliyakote-malla");
