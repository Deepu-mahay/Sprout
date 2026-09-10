import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import type { NavItem } from "../components/Sidebar";
import Dashboard from "./Dashboard";
import MyPlants from "./MyPlants";
import SearchPlants from "./SearchPlants";
import CareSchedule from "./CareSchedule";
import Journal from "./Journal";
import Settings from "./Settings";
import PlantNews from "./PlantNews";

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "⌂" },
  { id: "myplants", label: "My Plants", icon: "❖" },
  { id: "search", label: "Search Plants", icon: "⌕" },
  { id: "schedule", label: "Care Schedule", icon: "▤" },
  { id: "journal", label: "Journal", icon: "✎" },
  { id: "news", label: "Plant News", icon: "📰" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(true); // start as a slim icon rail

  return (
    <div className="flex min-h-screen">
      <Sidebar
        items={NAV_ITEMS}
        activePage={activePage}
        onNavigate={setActivePage}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((v) => !v)}
      />

      <main className="flex-1 px-5 py-8 md:px-9">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "myplants" && <MyPlants onNavigate={setActivePage} />}
        {activePage === "search" && <SearchPlants onAddPlant={(plant) => console.log("add", plant)} />}
        {activePage === "schedule" && <CareSchedule />}
        {activePage === "journal" && <Journal />}
        {activePage === "news" && <PlantNews />}
        {activePage === "settings" && <Settings />}
      </main>
    </div>
  );
}
