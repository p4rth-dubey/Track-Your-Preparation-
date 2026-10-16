const list = (s) => s.split("|").map((x) => x.trim());

export const SUBJECTS = [
  {
    key: "maths", name: "Mathematics",
    chapters: list("Real Numbers|Polynomials|Pair of Linear Equations in Two Variables|Quadratic Equations|Arithmetic Progressions|Triangles|Coordinate Geometry|Introduction to Trigonometry|Some Applications of Trigonometry|Circles|Areas Related to Circles|Surface Areas and Volumes|Statistics|Probability").map((t) => ({ title: t })),
  },
  {
    key: "science", name: "Science",
    chapters: list("Chemical Reactions and Equations|Acids, Bases and Salts|Metals and Non-metals|Carbon and its Compounds|Life Processes|Control and Coordination|How do Organisms Reproduce?|Heredity|Light - Reflection and Refraction|The Human Eye and the Colourful World|Electricity|Magnetic Effects of Electric Current|Our Environment").map((t) => ({ title: t })),
  },
  {
    key: "sst", name: "Social Science",
    chapters: [
      ...list("The Rise of Nationalism in Europe|Nationalism in India|The Making of a Global World|The Age of Industrialisation|Print Culture and the Modern World").map((t) => ({ title: t, tag: "History" })),
      ...list("Resources and Development|Forest and Wildlife Resources|Water Resources|Agriculture|Minerals and Energy Resources|Manufacturing Industries|Lifelines of National Economy").map((t) => ({ title: t, tag: "Geography" })),
      ...list("Power Sharing|Federalism|Gender, Religion and Caste|Political Parties|Outcomes of Democracy").map((t) => ({ title: t, tag: "Civics" })),
      ...list("Development|Sectors of the Indian Economy|Money and Credit|Globalisation and the Indian Economy|Consumer Rights").map((t) => ({ title: t, tag: "Economics" })),
    ],
  },
  {
    key: "english", name: "English",
    chapters: [
      ...list("A Letter to God|Nelson Mandela: Long Walk to Freedom|Two Stories about Flying|From the Diary of Anne Frank|Glimpses of India|Mijbil the Otter|Madam Rides the Bus|The Sermon at Benares|The Proposal").map((t) => ({ title: t, tag: "First Flight: Prose" })),
      ...list("Dust of Snow|Fire and Ice|A Tiger in the Zoo|How to Tell Wild Animals|The Ball Poem|Amanda!|The Trees|Fog|The Tale of Custard the Dragon|For Anne Gregory").map((t) => ({ title: t, tag: "First Flight: Poetry" })),
      ...list("A Triumph of Surgery|The Thief's Story|The Midnight Visitor|A Question of Trust|Footprints without Feet|The Making of a Scientist|The Necklace|Bholi|The Book That Saved the Earth").map((t) => ({ title: t, tag: "Footprints without Feet" })),
    ],
  },
].map((s) => ({ ...s, chapters: s.chapters.map((c, i) => ({ ...c, id: `${s.key}-${i}` })) }));

export const STATUSES = [
  { key: "done", label: "Completed" },
  { key: "partial", label: "Partially done" },
  { key: "todo", label: "Not started" },
];

export const TASKS = ["Lectures", "NCERT", "Notes", "CBQs and PYQs", "Revision"];
