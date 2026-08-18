export interface CraftTraditionItem {
  id: string;
  name: string;
  region: string;
  state: string;
  giTagNumber?: string;
  unescoStatus?: string;
  description: string;
  imageUrl: string;
  badgeColor: string;
}

export const CRAFT_TRADITIONS: CraftTraditionItem[] = [
  {
    id: "madhubani",
    name: "Madhubani Painting",
    region: "Mithila Region",
    state: "Bihar",
    giTagNumber: "GI-145",
    unescoStatus: "Intangible Cultural Heritage Nominee",
    description: "Traditional folk art created with natural dyes, twigs, nib-pens, and matchsticks featuring intricate geometric patterns, flora, and mythological motifs.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Madhubani_art.jpg/800px-Madhubani_art.jpg",
    badgeColor: "#E63946"
  },
  {
    id: "warli",
    name: "Warli Art",
    region: "Palghar District",
    state: "Maharashtra",
    giTagNumber: "GI-209",
    unescoStatus: "Recognized Tribal Folk Heritage",
    description: "Ancient tribal art using basic geometric shapes — circle, triangle, and square — painted with white rice paste on ochre mud walls depicting communal harmony and harvest festivals.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Warli_painting_tribal_art.jpg/800px-Warli_painting_tribal_art.jpg",
    badgeColor: "#457B9D"
  },
  {
    id: "pashmina",
    name: "Kashmiri Pashmina",
    region: "Srinagar & Changthang",
    state: "Jammu & Kashmir",
    giTagNumber: "GI-46",
    unescoStatus: "UNESCO Craft & Folk Arts City (Srinagar)",
    description: "Ultra-fine shawl woven from Changthangi goat hair, hand-spun on traditional charkhas and hand-embroidered with delicate Sozni stitch work taking months to complete.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pashmina_shawl_embroidered.jpg/800px-Pashmina_shawl_embroidered.jpg",
    badgeColor: "#9B5DE5"
  },
  {
    id: "dhokra",
    name: "Dhokra Metal Casting",
    region: "Bastar & Kondagaon",
    state: "Chhattisgarh",
    giTagNumber: "GI-108",
    unescoStatus: "4000-year-old Lost-Wax Casting Tradition",
    description: "Non-ferrous metal casting using the lost-wax technique dating back to the Indus Valley Civilization, characterized by rustic folk figures and organic thread-like metal detailing.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Dhokra_handicrafts_statue.jpg/800px-Dhokra_handicrafts_statue.jpg",
    badgeColor: "#F4A261"
  },
  {
    id: "kanjivaram",
    name: "Kanjivaram Silk",
    region: "Kanchipuram",
    state: "Tamil Nadu",
    giTagNumber: "GI-27",
    unescoStatus: "National Heritage Weaving Craft",
    description: "Pure mulberry silk sarees woven with heavy gold zari threads using the Korvai interlocking weaving technique, creating contrasting borders and temple motifs.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Kanchipuram_Silk_Saree.jpg/800px-Kanchipuram_Silk_Saree.jpg",
    badgeColor: "#2D5016"
  },
  {
    id: "bidri",
    name: "Bidriware",
    region: "Bidar District",
    state: "Karnataka",
    giTagNumber: "GI-13",
    unescoStatus: "Sultanate Royal Craft Heritage",
    description: "Metal handicraft developed in 14th century Bidar, featuring intricate pure silver sheet inlayed into a blackened zinc-copper alloy oxidized with Bidar fort soil.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Bidriware_craft_pot.jpg/800px-Bidriware_craft_pot.jpg",
    badgeColor: "#1D3557"
  },
  {
    id: "phulkari",
    name: "Phulkari Embroidery",
    region: "Amritsar & Patiala",
    state: "Punjab",
    giTagNumber: "GI-187",
    unescoStatus: "Folk Textile Heritage",
    description: "Flower work embroidery crafted on coarse hand-spun khaddar cloth using untwisted silk floss (Pat) worked entirely from the reverse side without drawn outlines.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Phulkari_dupatta_punjab.jpg/800px-Phulkari_dupatta_punjab.jpg",
    badgeColor: "#D90429"
  },
  {
    id: "pattachitra",
    name: "Odisha Pattachitra",
    region: "Raghurajpur Heritage Village",
    state: "Odisha",
    giTagNumber: "GI-114",
    unescoStatus: "UNESCO Living Heritage Village",
    description: "Cloth-based scroll painting using natural mineral colors applied on specially treated cotton canvas (Patta), depicting intricate mythological stories and floral frames.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Pattachitra_painting_odisha.jpg/800px-Pattachitra_painting_odisha.jpg",
    badgeColor: "#FB8500"
  },
  {
    id: "kalamkari",
    name: "Srikalahasti Kalamkari",
    region: "Srikalahasti",
    state: "Andhra Pradesh",
    giTagNumber: "GI-19",
    unescoStatus: "Ancient Freehand Pen Textile Art",
    description: "Freehand drawing with bamboo pens (Kalam) using vegetable dyes, milk bath treatment, and natural mordants to create rich temple wall hangings and sarees.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Kalamkari_art_tree_of_life.jpg/800px-Kalamkari_art_tree_of_life.jpg",
    badgeColor: "#023047"
  },
  {
    id: "channapatna",
    name: "Channapatna Wooden Toys",
    region: "Ramanagara District",
    state: "Karnataka",
    giTagNumber: "GI-23",
    unescoStatus: "World Crafts Council Heritage Town",
    description: "Eco-friendly wooden toys lacquered on high-speed lathes using ivory wood (Aale Mara) and 100% natural non-toxic vegetable dyes, safe for children.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Channapatna_toys.jpg/800px-Channapatna_toys.jpg",
    badgeColor: "#80B918"
  }
];

export function getCraftBadgeColor(craftName: string | null | undefined): string {
  if (!craftName) return "#6B7280";
  const normalized = craftName.toLowerCase();
  for (const c of CRAFT_TRADITIONS) {
    if (normalized.includes(c.id) || normalized.includes(c.name.toLowerCase())) {
      return c.badgeColor;
    }
  }
  return "#6B7280";
}
