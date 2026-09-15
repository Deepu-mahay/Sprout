import { useMemo, useState } from "react";

interface FundingStory {
  id: string;
  company: string;
  round: string; // "Seed", "Series A", "Grant", etc.
  amount: string; // display string, e.g. "$12M"
  date: string; // ISO yyyy-mm-dd
  category: "AgTech" | "Research" | "Consumer" | "Sustainability";
  blurb: string;
  url?: string;
}

const CATEGORIES = ["All", "AgTech", "Research", "Consumer", "Sustainability"] as const;
type Category = (typeof CATEGORIES)[number];

// Placeholder data — replace with a real feed (see note below the component).
const STORIES: FundingStory[] = [
  {
    id: "f1",
    company: "RootSense",
    round: "Series A",
    amount: "$14M",
    date: "2026-08-28",
    category: "AgTech",
    blurb: "Soil-moisture sensor startup raised a Series A to expand its consumer plant-monitoring hardware line.",
  },
  {
    id: "f2",
    company: "Univ. of Wageningen Botany Lab",
    round: "Grant",
    amount: "€3.2M",
    date: "2026-08-20",
    category: "Research",
    blurb: "Received a multi-year grant to study drought-resistant houseplant cultivars for urban environments.",
  },
  {
    id: "f3",
    company: "Leafling",
    round: "Seed",
    amount: "$4.5M",
    date: "2026-08-11",
    category: "Consumer",
    blurb: "App that identifies plant diseases from photos closed a seed round led by a climate-focused fund.",
  },
  {
    id: "f4",
    company: "GreenCycle Materials",
    round: "Series B",
    amount: "$28M",
    date: "2026-07-30",
    category: "Sustainability",
    blurb: "Maker of compostable plant pots and growing media raised Series B funding to scale manufacturing.",
  },
  {
    id: "f5",
    company: "Mycora Labs",
    round: "Series A",
    amount: "$9M",
    date: "2026-07-22",
    category: "Research",
    blurb: "Mycorrhizal-fungi biotech raised funding to bring soil-health products from lab to retail.",
  },
];

const CATEGORY_COLOR: Record<FundingStory["category"], string> = {
  AgTech: "var(--moss-soft)",
  Research: "#E7E0F2",
  Consumer: "var(--ochre-soft)",
  Sustainability: "var(--red-soft)",
};
const CATEGORY_TEXT: Record<FundingStory["category"], string> = {
  AgTech: "#2C4A38",
  Research: "#4A3B72",
  Consumer: "#7A5E10",
  Sustainability: "var(--red)",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

const PlantNews = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = useMemo(() => {
    return [...STORIES]
      .filter((s) => activeCategory === "All" || s.category === activeCategory)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [activeCategory]);

  return (
    <div className="page" id="page-news">
      <div className="topbar">
        <div className="greet">
          <h2>Plant Funding &amp; News</h2>
          <p>Recent investment and research activity in the plant world</p>
        </div>
      </div>

      <div className="filter-row">
        {CATEGORIES.map((cat) => (
          <div
            key={cat}
            className={`chip${cat === activeCategory ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      {filtered.length === 0 && <div className="empty-hint">No stories in this category yet.</div>}

      {filtered.map((story) => (
        <div className="list-row" key={story.id} style={{ alignItems: "flex-start", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="title">{story.company}</span>
              <span
                className="tag"
                style={{ background: CATEGORY_COLOR[story.category], color: CATEGORY_TEXT[story.category] }}
              >
                {story.category}
              </span>
            </div>
            <span className="meta">{formatDate(story.date)}</span>
          </div>

          <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.5 }}>{story.blurb}</p>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span className="meta" style={{ fontWeight: 600, color: "var(--forest)" }}>
              {story.amount} · {story.round}
            </span>
            {story.url && (
              <a href={story.url} target="_blank" rel="noreferrer" className="meta" style={{ color: "var(--moss)" }}>
                Read more →
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlantNews;
