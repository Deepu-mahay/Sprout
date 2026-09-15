import { useState } from "react";

interface JournalEntry {
  id: string;
  plantName: string;
  date: string; // ISO yyyy-mm-dd
  note: string;
}

const INITIAL_ENTRIES: JournalEntry[] = [
  {
    id: "j1",
    plantName: "Monstera Deliciosa",
    date: "2026-09-03",
    note: "New leaf unfurling near the top — first fenestration split visible. Moved it 30cm back from the window.",
  },
  {
    id: "j2",
    plantName: "Snake Plant",
    date: "2026-08-29",
    note: "Noticed slight yellowing on one lower leaf. Holding off watering for another week to check soil dryness.",
  },
  {
    id: "j3",
    plantName: "Pothos",
    date: "2026-08-24",
    note: "Trimmed two long vines and propagated cuttings in water. Placed on the kitchen windowsill.",
  },
];

const todayISO = () => new Date().toISOString().slice(0, 10);

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(INITIAL_ENTRIES);
  const [isAdding, setIsAdding] = useState(false);
  const [plantName, setPlantName] = useState("");
  const [note, setNote] = useState("");

  const sorted = [...entries].sort((a, b) => (a.date < b.date ? 1 : -1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plantName.trim() || !note.trim()) return;

    setEntries((prev) => [
      { id: crypto.randomUUID(), plantName: plantName.trim(), note: note.trim(), date: todayISO() },
      ...prev,
    ]);
    setPlantName("");
    setNote("");
    setIsAdding(false);
  };

  return (
    <div className="page" id="page-journal">
      <div className="topbar">
        <div className="greet">
          <h2>Journal</h2>
          <p>Notes and photos from your plant care</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAdding((v) => !v)}>
          {isAdding ? "Cancel" : "+ New entry"}
        </button>
      </div>

      {isAdding && (
        <form className="settings-card" onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
          <div className="field">
            <label>Plant</label>
            <input
              type="text"
              placeholder="e.g. Monstera Deliciosa"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="field">
            <label>Note</label>
            <input
              type="text"
              placeholder="What did you notice or do today?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <button className="btn btn-primary btn-sm" type="submit">
            Save entry
          </button>
        </form>
      )}

      {sorted.map((entry) => (
        <div className="journal-entry" key={entry.id}>
          <div className="j-thumb"></div>
          <div className="j-body">
            <div className="j-head">
              <span className="j-plant">{entry.plantName}</span>
              <span className="j-date">{entry.date}</span>
            </div>
            <p>{entry.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Journal;
