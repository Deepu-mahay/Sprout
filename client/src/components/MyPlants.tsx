interface Plant {
  id: string;
  name: string;
  room: string;
  moisture: number;
  status: "water" | "overdue" | "ok";
}

interface MyPlantsProps {
  onNavigate: (pageId: string) => void;
}

const PLANTS: Plant[] = [
  { id: "1", name: "Monstera Deliciosa", room: "Living room", moisture: 62, status: "water" },
  { id: "2", name: "Snake Plant", room: "Bedroom", moisture: 24, status: "overdue" },
  { id: "3", name: "Pothos", room: "Kitchen", moisture: 80, status: "ok" },
  { id: "4", name: "Fiddle Leaf Fig", room: "Living room", moisture: 70, status: "ok" },
  { id: "5", name: "Peace Lily", room: "Balcony", moisture: 40, status: "water" },
  { id: "6", name: "ZZ Plant", room: "Bedroom", moisture: 66, status: "ok" },
];

const STATUS_LABEL: Record<Plant["status"], string> = {
  water: "Water today",
  overdue: "Overdue",
  ok: "Healthy",
};

const MyPlants = ({ onNavigate }: MyPlantsProps) => {
  return (
    <div className="page" id="page-myplants">
      <div className="topbar">
        <div className="greet">
          <h2>My Plants</h2>
          <p>14 plants across 4 rooms</p>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate("search")}>
          + Add plant
        </button>
      </div>

      <div className="filter-row">
        <div className="chip active">All rooms</div>
        <div className="chip">Living room</div>
        <div className="chip">Bedroom</div>
        <div className="chip">Balcony</div>
        <div className="chip">Kitchen</div>
      </div>

      <div className="plant-grid">
        {PLANTS.map((plant) => (
          <div className="plant-card" key={plant.id}>
            <div className="plant-img">
              <div className={`badge ${plant.status}`}>{STATUS_LABEL[plant.status]}</div>
            </div>
            <div className="plant-body">
              <h3>{plant.name}</h3>
              <div className="species">{plant.room}</div>
              <div className="moisture">
                <div
                  style={{
                    width: `${plant.moisture}%`,
                    ...(plant.status === "overdue" ? { background: "var(--ochre)" } : {}),
                  }}
                ></div>
              </div>
              <div className="moisture-label">Soil moisture · {plant.moisture}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPlants;
