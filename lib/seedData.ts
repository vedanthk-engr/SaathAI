export const SEED_CRAFT_TRADITIONS = [
  {
    id: "madhubani",
    name: "Madhubani Painting",
    region: "Mithila",
    state: "Bihar",
    giTagNumber: "GI-145",
    unescoStatus: "Intangible Heritage Nominee",
    description: "Intricate folk art with natural pigments and bamboo nib pens.",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "warli",
    name: "Warli Art",
    region: "Palghar",
    state: "Maharashtra",
    giTagNumber: "GI-209",
    unescoStatus: "Recognized Tribal Folk Heritage",
    description: "Geometric tribal paintings using rice paste on terracotta backgrounds.",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "pashmina",
    name: "Kashmiri Pashmina",
    region: "Srinagar",
    state: "Jammu & Kashmir",
    giTagNumber: "GI-46",
    unescoStatus: "UNESCO Craft & Folk Arts City",
    description: "Ultra-fine hand-woven goat cashmere shawl with intricate needlework.",
    imageUrl: "https://images.unsplash.com/photo-1606760227091-3dd858d97240?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dhokra",
    name: "Dhokra Metal Casting",
    region: "Bastar",
    state: "Chhattisgarh",
    giTagNumber: "GI-108",
    unescoStatus: "Ancient Lost-Wax Tradition",
    description: "Non-ferrous brass casting created through handcrafted wax thread molds.",
    imageUrl: "https://images.unsplash.com/photo-1567016526105-22da7c13161a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "kanjivaram",
    name: "Kanjivaram Silk",
    region: "Kanchipuram",
    state: "Tamil Nadu",
    giTagNumber: "GI-27",
    unescoStatus: "National Heritage Weaving Craft",
    description: "Lustrous mulberry silk saree with pure gold and silver Zari weaving.",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
  }
];

export const SEED_ARTISANS = [
  {
    id: "artisan-1",
    userId: "user-artisan-1",
    name: "Sita Devi Mithila",
    craftTradition: "Madhubani Painting",
    regionState: "Bihar",
    district: "Madhubani",
    yearsActive: 28,
    languagesSpoken: ["Hindi", "Maithili", "Bhojpuri"],
    bio: "Master artisan Sita Devi inherited the sacred art of Madhubani painting from her grandmother. Over 28 years, she has represented Indian folk art globally and preserved natural mineral pigment recipes.",
    voiceIntroUrl: "https://actions.google.com/sounds/v1/speech/greeting.ogg",
    isVerified: true,
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    createdAt: new Date().toISOString()
  },
  {
    id: "artisan-2",
    userId: "user-artisan-2",
    name: "Rameshwar Bhil",
    craftTradition: "Warli Art",
    regionState: "Maharashtra",
    district: "Palghar",
    yearsActive: 19,
    languagesSpoken: ["Hindi", "Marathi", "Warli"],
    bio: "Rameshwar is a community leader in Palghar who paints warli murals celebrating harvest cycles and forest biodiversity. His canvases feature 100% natural rice flour medium.",
    voiceIntroUrl: "https://actions.google.com/sounds/v1/speech/greeting.ogg",
    isVerified: true,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    createdAt: new Date().toISOString()
  },
  {
    id: "artisan-3",
    userId: "user-artisan-3",
    name: "Ghulam Hassan Rather",
    craftTradition: "Kashmiri Pashmina",
    regionState: "Jammu & Kashmir",
    district: "Srinagar",
    yearsActive: 35,
    languagesSpoken: ["Hindi", "Kashmiri", "Urdu"],
    bio: "Hailing from a 4th-generation weaving family in downtown Srinagar, Ghulam Hassan spins pure Changthangi cashmere and executes Sozni needlework with surgical precision.",
    voiceIntroUrl: "https://actions.google.com/sounds/v1/speech/greeting.ogg",
    isVerified: true,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    createdAt: new Date().toISOString()
  }
];

export const SEED_PRODUCTS = [
  {
    id: "prod-1",
    artisanId: "artisan-1",
    artisanName: "Sita Devi Mithila",
    status: "PUBLISHED",
    photoUrls: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
    ],
    rawMaterialCost: 850,
    titleEn: "Hand-painted Sacred Tree of Life Madhubani Canvas",
    descriptionEn: "Exquisite hand-painted Madhubani artwork on handloom cotton canvas. Depicts the sacred Tree of Life surrounded by dancing peacocks and blooming lotus flowers, created with natural indigo, turmeric, and vermillion pigments using traditional bamboo nib pens.",
    bulletPoints: [
      "100% Handloom cotton canvas backing",
      "Natural mineral and botanical dye pigments",
      "Created with fine bamboo nib sticks",
      "Signed by Master Karigar Sita Devi",
      "Includes Certificate of Authenticity"
    ],
    searchTags: ["madhubani", "tree of life", "peacock painting", "bihar art", "natural dyes", "gi tagged"],
    recommendedPriceMin: 4500,
    recommendedPriceMax: 6200,
    listedPrice: 5200,
    craftTradition: "Madhubani Painting",
    craftRegion: "Madhubani District, Bihar",
    giTagStatus: "GI-145 (Madhubani Paintings)",
    platformStatus: {
      amazonKarigar: "published",
      etsy: "published",
      ondc: "published",
      instagram: "published"
    },
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prod-2",
    artisanId: "artisan-2",
    artisanName: "Rameshwar Bhil",
    status: "PUBLISHED",
    photoUrls: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80"
    ],
    rawMaterialCost: 400,
    titleEn: "Tarpa Dance Celebration Warli Tribal Canvas",
    descriptionEn: "Authentic Warli tribal painting depicting the iconic Tarpa dance circle where village folk move in harmony around a central musician. Painted with crushed rice paste and natural gum on terracotta primed fabric.",
    bulletPoints: [
      "Painted with natural rice paste medium",
      "Terracotta primed canvas ground",
      "Depicts traditional Tarpa village celebration",
      "Handcrafted in Palghar, Maharashtra"
    ],
    searchTags: ["warli art", "tribal painting", "tarpa dance", "maharashtra craft", "gi tagged"],
    recommendedPriceMin: 2800,
    recommendedPriceMax: 3800,
    listedPrice: 3200,
    craftTradition: "Warli Art",
    craftRegion: "Palghar, Maharashtra",
    giTagStatus: "GI-209 (Warli Painting)",
    platformStatus: {
      amazonKarigar: "published",
      etsy: "published",
      ondc: "published",
      instagram: "published"
    },
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prod-3",
    artisanId: "artisan-3",
    artisanName: "Ghulam Hassan Rather",
    status: "PUBLISHED",
    photoUrls: [
      "https://images.unsplash.com/photo-1606760227091-3dd858d97240?auto=format&fit=crop&w=800&q=80"
    ],
    rawMaterialCost: 9500,
    titleEn: "Royal Sozni Hand-Embroidered Pure Pashmina Shawl",
    descriptionEn: "Hand-spun 100% Changthangi Pashmina cashmere shawl featuring royal Jama needlework. Intricately embroidered with silk threads depicting paisley (Kalka) motifs and chinar leaves by master artisan Ghulam Hassan.",
    bulletPoints: [
      "100% Pure hand-spun Changthangi Cashmere",
      "Intricate hand needlework (Sozni Kaari)",
      "Featherlight warmth and softness",
      "GI Certified Pashmina Hallmark tag included"
    ],
    searchTags: ["pashmina shawl", "kashmiri cashmere", "sozni needlework", "royal shawl", "gi certified"],
    recommendedPriceMin: 28000,
    recommendedPriceMax: 36000,
    listedPrice: 32000,
    craftTradition: "Kashmiri Pashmina",
    craftRegion: "Srinagar, Jammu & Kashmir",
    giTagStatus: "GI-46 (Kashmiri Pashmina)",
    platformStatus: {
      amazonKarigar: "published",
      etsy: "published",
      ondc: "published",
      instagram: "published"
    },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prod-4",
    artisanId: "artisan-1",
    artisanName: "Bastar Metal Guild",
    status: "PUBLISHED",
    photoUrls: [
      "https://images.unsplash.com/photo-1567016526105-22da7c13161a?auto=format&fit=crop&w=800&q=80"
    ],
    rawMaterialCost: 1200,
    titleEn: "Tribal Musician Band Dhokra Lost-Wax Brass Sculpture",
    descriptionEn: "Authentic Dhokra bell-metal sculpture depicting tribal musicians performing with folk instruments. Cast using the 4,000-year-old lost-wax process with beeswax threads and clay molds.",
    bulletPoints: [
      "Handcrafted using 4000-year-old lost wax technique",
      "Solid brass & bell-metal alloy construction",
      "Rustic antique patina finish",
      "Unique one-of-a-kind mold"
    ],
    searchTags: ["dhokra", "brass sculpture", "lost wax metal art", "bastar craft", "gi tagged"],
    recommendedPriceMin: 4200,
    recommendedPriceMax: 5500,
    listedPrice: 4800,
    craftTradition: "Dhokra Metal Casting",
    craftRegion: "Bastar, Chhattisgarh",
    giTagStatus: "GI-108 (Bastar Dhokra)",
    platformStatus: {
      amazonKarigar: "published",
      etsy: "published",
      ondc: "published",
      instagram: "published"
    },
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prod-5",
    artisanId: "artisan-3",
    artisanName: "Kanchipuram Guild",
    status: "PUBLISHED",
    photoUrls: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
    ],
    rawMaterialCost: 14000,
    titleEn: "Temple Peacock Zari Handloom Kanjivaram Pure Silk Saree",
    descriptionEn: "Regal Royal Blue Kanjivaram silk saree with heavy pure Zari gold pallu. Hand-woven on pit looms using Korvai interlocking technique featuring temple Mayil (peacock) motifs.",
    bulletPoints: [
      "100% Pure Mulberry Silk with Silk Mark certification",
      "Pure silver Zari electroplated with 24k gold",
      "Korvai interlocking handloom weave",
      "Woven in Kanchipuram, Tamil Nadu"
    ],
    searchTags: ["kanjivaram silk", "silk saree", "gold zari", "silk mark", "gi tagged"],
    recommendedPriceMin: 38000,
    recommendedPriceMax: 48000,
    listedPrice: 42000,
    craftTradition: "Kanjivaram Silk",
    craftRegion: "Kanchipuram, Tamil Nadu",
    giTagStatus: "GI-27 (Kanchipuram Silk)",
    platformStatus: {
      amazonKarigar: "published",
      etsy: "published",
      ondc: "published",
      instagram: "published"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const SEED_ORDERS = [
  {
    id: "ord-1",
    productId: "prod-1",
    buyerId: "user-buyer-1",
    buyerName: "Ananya Sharma",
    buyerEmail: "ananya@example.com",
    amount: 5200,
    status: "PAID",
    razorpayId: "pay_HaathDemo101",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];
