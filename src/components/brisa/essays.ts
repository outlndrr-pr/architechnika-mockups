// Walkthrough essays. Two short paragraphs per project, first-person-plural,
// derived strictly from the project descriptions and verified notes in
// src/data/content.ts. Nothing here adds a fact that isn't in the record.

export const essays: Record<string, [string, string]> = {
  "abitta-hotel-by-acend": [
    "Fifty-six rooms in an existing building beside the Caribe Hilton. We remodeled it to high-standard hospitality criteria — rooms rebuilt, the whole envelope reconsidered — and gave it a ground floor worth arriving at, with outdoor pool facilities and a restaurant.",
    "It is open. It operates today in Condado as the Ábitta Boutique Hotel, part of the Ascend Hotel Collection, steps from where it has always stood.",
  ],
  "aguadas-sports-complex": [
    "Reinforced concrete and steel, on the west coast, for the Municipality of Aguada. The structure is the architecture here: modern sports facilities sized for the crowds that fill them and for the weather that arrives with them.",
    "A $4,700,000 municipal project — the kind of civic work whose budget is public, whose users are everyone, and which therefore has to last.",
  ],
  "baseball-training-facilities": [
    "Twelve batting spots, all in use at once. The brief was training capacity and the plan is organised around it — the cages first, and everything else in service of them.",
    "Supporting cafeteria facilities complete the complex, so that a session can become an afternoon. Built for the Municipality of Vega Baja.",
  ],
  "bayamon-medical-center": [
    "Two hundred beds, with supporting facilities connected to a medical office building of one hundred offices and two commercial levels. A hospital is really three buildings that must behave as one, and the plan spends its effort on the joints between them.",
    "A $25,000,000 project for Hospital Hermanos Meléndez. It is the work that taught us institutional scale, and we have never designed a smaller building the same way since.",
  ],
  "bd-molding-facilities": [
    "Clean-room design and construction drawings for a Becton Dickinson plant in Columbus, Nebraska — an addition integrated into an existing pharmaceutical plant, where tolerance is measured in particles and the drawings have to be exactly right.",
    "Two hundred thousand square feet, in Nebraska. Documentation is what makes work at that distance possible.",
  ],
  "casa-caribe-boutique-hotel": [
    "Fifteen rooms in the middle of Condado. An upscale conversion held to an assigned construction budget — which is a design constraint like any other, and usually the honest one.",
    "The building gains an outdoor roof pool terrace: the room you actually remember, put where the light and the trade wind are.",
  ],
  "casa-metropolitana-i": [
    "One hundred and twenty apartments and their supporting facilities at PR-21 and Avenida De Diego in Río Piedras. Housing at this density is a city question before it is a building question.",
    "So the $24,000,000 covered the master plan and the site infrastructure as well as the building — because the two were never separable.",
  ],
  "casa-metropolitana-ii": [
    "Eighty apartments with every supporting facility elderly residents need, on eight floors. The apartments step back as the building rises, which is what lets a building of this size sit down among its neighbours instead of over them.",
    "It belongs to a residential and institutional urban master plan, and we think it is one of the best of its kind in metropolitan San Juan.",
  ],
  "eco-loiza-condo-hotel": [
    "An eco-touristic hotel of one hundred and forty rooms and fourteen villas, proposed for the town of Loíza with a budgeted construction cost of $35,000,000. Ecological architectural highlights run through it rather than sitting on top of it.",
    "It is a proposal, and we say so. The supporting facilities are drawn, the numbers are real, and the site is waiting.",
  ],
  "fine-arts-school": [
    "The conversion of an existing three-storey building into a modern school of fine arts and an electronic library, for the Municipality of Vega Baja.",
    "Conversions are our favourite kind of civic project: the structure is already standing, the address already means something, and the work is to make the inside deserve the outside.",
  ],
  "gonzi-industrial-park": [
    "An existing concrete structure, extended to one hundred and thirty thousand square feet. A warehouse and distribution centre housing cannabis and solar-panel operations, with cafeteria, administrative and parking facilities.",
    "Industrial work rewards clarity above all: where the trucks go, where the people go, and where those two things must never meet.",
  ],
  "hibird-apartment-and-suites-hotel": [
    "A reinforced seven-storey concrete structure on Avenida Ashford, updated, with twenty-seven apartments remodeled and a gym, pool, parking structure and restaurant added around them. Contemporary architecture, high-tech systems, and interiors finished to a standard the address demands.",
    "It is operating today, in Condado, as a highly-rated aparthotel — which is the only review of a hotel that finally counts.",
  ],
  "normandie-hotel": [
    "One of San Juan's most iconic historic buildings: a streamline-moderne form that has been recalling the great ocean liners since it was built. For a group of investors we modernized the interiors while preserving the ship shape and the architectural ornament of its era.",
    "A design proposal, estimated at $75M in construction. We drew it the way we would build it — because a landmark deserves a proposal that could survive contact with a contractor.",
  ],
  "raymond-dalmau-coliseum": [
    "A coliseum for up to ten thousand spectators when fully expanded. Reinforced concrete carries the main structure and structural metal does the spanning — the two materials doing what each is best at, in plain sight.",
    "Twenty-six million dollars across the first two phases, for the Municipality of Quebradillas. It is the home court of the Piratas de Quebradillas, and it carries the name of one of Puerto Rican basketball's greatest figures.",
  ],
  "the-sand-and-the-sea": [
    "High in the Cordillera Central above Cayey, a small boutique hotel crowning a mountaintop. A hacienda character shapes the structure and its restaurant — a language the island already knows, used without nostalgia.",
    "The building's real room is outdoors: a great terrace with a magnificent view of the mountains, which is the whole reason to climb up here.",
  ],
};

export function essayFor(slug: string): [string, string] | null {
  return essays[slug] ?? null;
}
