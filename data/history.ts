import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";

export type HistoricalState = {
  id: string;
  name: string;
  capital: string;
  period: string;
  description: string;
  events: string[];
  achievements: string[];
  color: string;
};

export type Era = {
  id: string;
  slug: string;
  name: string;
  years: string;
  startYear: number;
  endYear: number;
  summary: string;
  states: HistoricalState[];
};

type RegionGeometry = Polygon | MultiPolygon;

type RegionFeature = {
  type: "Feature";
  properties: {
    id: string;
    eraId: string;
    stateId: string;
    name: string;
    capital: string;
    color: string;
  };
  geometry: RegionGeometry;
};

const poly = (coordinates: number[][]): Polygon => ({
  type: "Polygon",
  coordinates: [coordinates]
});

export const eras: Era[] = [
  {
    id: "gojoseon",
    slug: "gojoseon",
    name: "Gojoseon",
    years: "c. 2333-108 BCE",
    startYear: -2333,
    endYear: -108,
    summary:
      "An early Korean polity remembered through foundation traditions and archaeology across Liaodong and the northern Korean peninsula.",
    states: [
      {
        id: "gojoseon-core",
        name: "Gojoseon",
        capital: "Wanggeom-seong (traditionally near Pyongyang)",
        period: "c. 2333-108 BCE",
        description:
          "A confederated early state associated with bronze culture, walled settlements, and the Dangun foundation tradition.",
        events: ["Dangun foundation tradition", "Expansion of bronze dagger culture", "Conquest by Han China in 108 BCE"],
        achievements: ["Mumun and bronze-age material culture", "Early state formation", "Foundation mythology central to Korean identity"],
        color: "#62d2a2"
      }
    ]
  },
  {
    id: "three-kingdoms",
    slug: "three-kingdoms",
    name: "Three Kingdoms Period",
    years: "57 BCE-668 CE",
    startYear: -57,
    endYear: 668,
    summary:
      "Goguryeo, Baekje, and Silla competed and exchanged ideas with Gaya, Chinese dynasties, and Yamato Japan.",
    states: [
      {
        id: "goguryeo",
        name: "Goguryeo",
        capital: "Jolbon, Gungnae, then Pyongyang",
        period: "37 BCE-668 CE",
        description:
          "A powerful northern kingdom spanning Manchuria and northern Korea, known for cavalry warfare and monumental tomb murals.",
        events: ["King Gwanggaeto's expansion", "Transfer of capital to Pyongyang in 427", "Fall to Silla-Tang forces in 668"],
        achievements: ["Tomb murals", "Fortress networks", "Distinct military aristocracy"],
        color: "#6ea8fe"
      },
      {
        id: "baekje",
        name: "Baekje",
        capital: "Hanseong, Ungjin, then Sabi",
        period: "18 BCE-660 CE",
        description:
          "A southwestern kingdom with refined court culture and strong maritime links to China and Japan.",
        events: ["Move to Ungjin after Goguryeo attack", "Sabi cultural florescence", "Fall to Silla-Tang forces in 660"],
        achievements: ["Buddhist art and temple architecture", "Diplomatic exchange with Japan", "Elegant gilt-bronze craftsmanship"],
        color: "#d973a5"
      },
      {
        id: "silla",
        name: "Silla",
        capital: "Geumseong (Gyeongju)",
        period: "57 BCE-935 CE",
        description:
          "A southeastern kingdom that consolidated aristocratic institutions before unifying most of the peninsula.",
        events: ["Adoption of Buddhism in 527", "Alliance with Tang China", "Unification wars of the 7th century"],
        achievements: ["Gold crowns", "Hwarang institution", "Gyeongju royal tomb culture"],
        color: "#d5a853"
      }
    ]
  },
  {
    id: "unified-silla",
    slug: "unified-silla",
    name: "Unified Silla",
    years: "668-935",
    startYear: 668,
    endYear: 935,
    summary:
      "Silla ruled most of the peninsula while Balhae controlled much of the former Goguryeo sphere to the north.",
    states: [
      {
        id: "unified-silla-state",
        name: "Unified Silla",
        capital: "Geumseong (Gyeongju)",
        period: "668-935",
        description:
          "A Buddhist monarchy that integrated conquered territories and built internationally connected elite culture.",
        events: ["Silla-Tang War", "Administrative nine-province system", "Late Silla rebellions"],
        achievements: ["Bulguksa and Seokguram", "Woodblock printing traditions", "Cosmopolitan Buddhist scholarship"],
        color: "#d5a853"
      },
      {
        id: "balhae",
        name: "Balhae",
        capital: "Sanggyeong",
        period: "698-926",
        description:
          "A northern kingdom founded after Goguryeo's fall, linking Manchuria, northern Korea, and regional trade networks.",
        events: ["Founded by Dae Joyeong", "Recognition in Tang records", "Conquered by the Khitan Liao in 926"],
        achievements: ["Multicultural administration", "Goguryeo successor identity", "Northern trade diplomacy"],
        color: "#72b7ff"
      }
    ]
  },
  {
    id: "goryeo",
    slug: "goryeo",
    name: "Goryeo Dynasty",
    years: "918-1392",
    startYear: 918,
    endYear: 1392,
    summary:
      "The dynasty that gave Korea its English name, famous for Buddhist statecraft, celadon, and the Tripitaka Koreana.",
    states: [
      {
        id: "goryeo-state",
        name: "Goryeo",
        capital: "Gaegyeong (Kaesong)",
        period: "918-1392",
        description:
          "A centralized dynasty balancing aristocratic families, Buddhist institutions, military power, and Mongol pressure.",
        events: ["Unification of Later Three Kingdoms", "Khitan and Mongol invasions", "Transition to Joseon in 1392"],
        achievements: ["Goryeo celadon", "Tripitaka Koreana", "Metal movable type printing"],
        color: "#62d2a2"
      }
    ]
  },
  {
    id: "joseon",
    slug: "joseon",
    name: "Joseon Dynasty",
    years: "1392-1897",
    startYear: 1392,
    endYear: 1897,
    summary:
      "A long Confucian dynasty centered on Hanyang, remembered for Hangul, state examinations, scholarship, and resilient institutions.",
    states: [
      {
        id: "joseon-state",
        name: "Joseon",
        capital: "Hanyang (Seoul)",
        period: "1392-1897",
        description:
          "A Neo-Confucian state that reshaped law, education, social status, and court culture for five centuries.",
        events: ["Founding by Yi Seong-gye", "Creation of Hangul in 1443", "Imjin War, 1592-1598"],
        achievements: ["Hangul script", "Annals of the Joseon Dynasty", "Confucian academies and practical learning"],
        color: "#6ea8fe"
      }
    ]
  },
  {
    id: "occupation",
    slug: "japanese-occupation",
    name: "Japanese Occupation",
    years: "1910-1945",
    startYear: 1910,
    endYear: 1945,
    summary:
      "Korea was colonized by Imperial Japan, producing forced assimilation, extraction, industrialization, and independence movements.",
    states: [
      {
        id: "colonial-korea",
        name: "Korea under Japanese rule",
        capital: "Keijo (Seoul)",
        period: "1910-1945",
        description:
          "Colonial rule transformed land, labor, education, and identity while Koreans organized independence movements at home and abroad.",
        events: ["Annexation Treaty of 1910", "March First Movement in 1919", "Liberation on August 15, 1945"],
        achievements: ["Independence press and schools", "Provisional Government activism", "Modern nationalist literature"],
        color: "#d973a5"
      }
    ]
  },
  {
    id: "modern",
    slug: "modern-korea",
    name: "Modern North/South Korea",
    years: "1948-present",
    startYear: 1948,
    endYear: 2026,
    summary:
      "The peninsula is divided between the Republic of Korea and the Democratic People's Republic of Korea after liberation and war.",
    states: [
      {
        id: "south-korea",
        name: "Republic of Korea",
        capital: "Seoul",
        period: "1948-present",
        description:
          "A democratic, high-income state shaped by war recovery, industrial growth, civic movements, and global culture.",
        events: ["Republic founded in 1948", "Korean War, 1950-1953", "June Democratic Struggle in 1987"],
        achievements: ["Semiconductors and shipbuilding", "Korean Wave", "Democratization movements"],
        color: "#62d2a2"
      },
      {
        id: "north-korea",
        name: "Democratic People's Republic of Korea",
        capital: "Pyongyang",
        period: "1948-present",
        description:
          "A socialist one-party state in the northern peninsula, shaped by division, militarization, and dynastic leadership.",
        events: ["DPRK founded in 1948", "Armistice signed in 1953", "Nuclear diplomacy and sanctions era"],
        achievements: ["Mass mobilization systems", "Monumental socialist architecture", "Distinct performing arts institutions"],
        color: "#6ea8fe"
      }
    ]
  }
];

export const regionFeatures: RegionFeature[] = [
  {
    type: "Feature",
    properties: { id: "gojoseon-core", eraId: "gojoseon", stateId: "gojoseon-core", name: "Gojoseon", capital: "Wanggeom-seong", color: "#62d2a2" },
    geometry: poly([[124.1, 41.8], [126.5, 43.2], [128.8, 41.4], [127.1, 39.2], [124.6, 39.5], [124.1, 41.8]])
  },
  {
    type: "Feature",
    properties: { id: "goguryeo", eraId: "three-kingdoms", stateId: "goguryeo", name: "Goguryeo", capital: "Pyongyang", color: "#6ea8fe" },
    geometry: poly([[122.4, 43.4], [126.5, 45.8], [131.5, 43.0], [129.4, 38.5], [126.5, 37.7], [124.3, 40.2], [122.4, 43.4]])
  },
  {
    type: "Feature",
    properties: { id: "baekje", eraId: "three-kingdoms", stateId: "baekje", name: "Baekje", capital: "Sabi", color: "#d973a5" },
    geometry: poly([[125.3, 37.5], [127.3, 37.4], [128.1, 35.7], [126.8, 34.2], [124.9, 34.5], [125.3, 37.5]])
  },
  {
    type: "Feature",
    properties: { id: "silla", eraId: "three-kingdoms", stateId: "silla", name: "Silla", capital: "Geumseong", color: "#d5a853" },
    geometry: poly([[127.6, 37.2], [129.3, 37.2], [130.4, 35.0], [128.5, 34.3], [126.9, 35.3], [127.6, 37.2]])
  },
  {
    type: "Feature",
    properties: { id: "unified-silla-state", eraId: "unified-silla", stateId: "unified-silla-state", name: "Unified Silla", capital: "Geumseong", color: "#d5a853" },
    geometry: poly([[125.0, 38.8], [128.7, 39.0], [130.5, 36.0], [129.4, 34.0], [126.0, 33.2], [124.5, 35.5], [125.0, 38.8]])
  },
  {
    type: "Feature",
    properties: { id: "balhae", eraId: "unified-silla", stateId: "balhae", name: "Balhae", capital: "Sanggyeong", color: "#72b7ff" },
    geometry: poly([[124.5, 39.6], [129.3, 45.9], [134.4, 47.6], [134.8, 43.2], [129.5, 39.0], [124.5, 39.6]])
  },
  {
    type: "Feature",
    properties: { id: "goryeo-state", eraId: "goryeo", stateId: "goryeo-state", name: "Goryeo", capital: "Gaegyeong", color: "#62d2a2" },
    geometry: poly([[124.6, 40.8], [128.6, 41.6], [130.6, 37.1], [129.3, 34.1], [126.0, 33.2], [124.4, 35.7], [124.6, 40.8]])
  },
  {
    type: "Feature",
    properties: { id: "joseon-state", eraId: "joseon", stateId: "joseon-state", name: "Joseon", capital: "Hanyang", color: "#6ea8fe" },
    geometry: poly([[124.4, 42.0], [129.9, 42.5], [130.8, 37.5], [129.4, 34.1], [126.1, 33.1], [124.2, 36.0], [124.4, 42.0]])
  },
  {
    type: "Feature",
    properties: { id: "colonial-korea", eraId: "occupation", stateId: "colonial-korea", name: "Korea under Japanese rule", capital: "Keijo", color: "#d973a5" },
    geometry: poly([[124.4, 42.0], [129.9, 42.5], [130.8, 37.5], [129.4, 34.1], [126.1, 33.1], [124.2, 36.0], [124.4, 42.0]])
  },
  {
    type: "Feature",
    properties: { id: "north-korea", eraId: "modern", stateId: "north-korea", name: "North Korea", capital: "Pyongyang", color: "#6ea8fe" },
    geometry: poly([[124.4, 42.0], [129.9, 42.5], [129.8, 39.1], [126.4, 38.1], [124.9, 39.2], [124.4, 42.0]])
  },
  {
    type: "Feature",
    properties: { id: "south-korea", eraId: "modern", stateId: "south-korea", name: "South Korea", capital: "Seoul", color: "#62d2a2" },
    geometry: poly([[126.4, 38.1], [129.8, 39.1], [130.7, 37.2], [129.4, 34.1], [126.1, 33.1], [124.9, 35.5], [126.4, 38.1]])
  }
];

export const getEraBySlug = (slug: string) => eras.find((era) => era.slug === slug);

export const getEraById = (id: string) => eras.find((era) => era.id === id) ?? eras[0];

export const getEraFeatureCollection = (eraId: string): FeatureCollection<RegionGeometry, RegionFeature["properties"]> => ({
  type: "FeatureCollection",
  features: regionFeatures.filter((feature) => feature.properties.eraId === eraId)
});
