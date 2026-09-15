import { useMemo, useState } from "react";

interface PlantResult {
  id: string;
  name: string;
  scientificName: string;
  tags: string[];
}

const FILTERS = ["All", "Low light", "Pet safe", "Easy care", "Air purifying"] as const;
type Filter = (typeof FILTERS)[number];

const PLANT_DB: PlantResult[] = [
  { id: "p1", name: "Boston Fern", scientificName: "Nephrolepis exaltata", tags: ["Low light", "High humidity", "Pet safe"] },
  { id: "p2", name: "Maidenhair Fern", scientificName: "Adiantum raddianum", tags: ["Medium light", "Frequent watering"] },
  { id: "p3", name: "Bird's Nest Fern", scientificName: "Asplenium nidus", tags: ["Low light", "Pet safe", "Easy care"] },
  { id: "p4", name: "Staghorn Fern", scientificName: "Platycerium bifurcatum", tags: ["Bright indirect", "Mount on wood"] },
  { id: "p5", name: "Snake Plant", scientificName: "Dracaena trifasciata", tags: ["Low light", "Easy care", "Air purifying"] },
  { id: "p6", name: "Pothos", scientificName: "Epipremnum aureum", tags: ["Low light", "Easy care", "Air purifying"] },
  { id: "p7", name: "Peace Lily", scientificName: "Spathiphyllum wallisii", tags: ["Low light", "Air purifying"] },
  { id: "p8", name: "ZZ Plant", scientificName: "Zamioculcas zamiifolia", tags: ["Low light", "Easy care"] },
];

interface SearchPlantsProps {
  onAddPlant?: (plant: PlantResult) => void;
}

const SearchPlants = ({ onAddPlant }: SearchPlantsProps) => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const results = useMemo(() => {
    return PLANT_DB.filter((plant) => {
      const matchesQuery =
        query.trim() === "" ||
        plant.name.toLowerCase().includes(query.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(query.toLowerCase());

      const matchesFilter = activeFilter === "All" || plant.tags.includes(activeFilter);

      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  const handleAdd = (plant: PlantResult) => {
    setAddedIds((prev) => new Set(prev).add(plant.id));
    onAddPlant?.(plant);
  };

  return (
    <div className="page" id="page-search">
      <div className="topbar">
        <div className="greet">
          <h2>Search Plants</h2>
          <p>Find a plant to add to your collection</p>
        </div>
      </div>

      <div className="search-bar">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          placeholder="Search by name, e.g. 'pothos' or 'fern'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="filter-row">
        {FILTERS.map((filter) => (
          <div
            key={filter}
            className={`chip${filter === activeFilter ? " active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </div>
        ))}
      </div>

      <div className="empty-hint">
        {results.length} result{results.length !== 1 ? "s" : ""}
        {query ? ` for "${query}"` : ""}
      </div>

      {results.length === 0 && (
        <div className="empty-hint">No plants match that search. Try a different name or filter.</div>
      )}

      {results.map((plant) => (
        <div className="result-row" key={plant.id}>
          <div className="r-thumb"></div>
          <div>
            <div className="r-name">{plant.name}</div>
            <div className="r-sci">{plant.scientificName}</div>
            <div className="r-tags">
              {plant.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleAdd(plant)}
            disabled={addedIds.has(plant.id)}
          >
            {addedIds.has(plant.id) ? "Added" : "Add"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchPlants;
