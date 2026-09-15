import './App.css'
import Dashboard from './components/Dashboard.tsx'

import MyPlants  from "./components/MyPlants.tsx"

// inside the page-switch:

// import Navbar from './components/Navbar'

import { useState } from "react";
import { Sidebar, type NavItem } from "./components/Sidebar.tsx";
import SearchPlants from './components/SearchPlants.tsx'
import CareSchedule from './components/CareSchedule.tsx';
import Journal from './components/Journal.tsx';
import Settings from './components/Settings.tsx';
import PlantNews from './components/PlantNews.tsx';


const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "⌂" },
  { id: "myplants", label: "My Plants", icon: "❖" },
  { id: "search", label: "Search Plants", icon: "⌕" },
  { id: "schedule", label: "Care Schedule", icon: "▤" },
  { id: "journal", label: "Journal", icon: "✎" },
  { id: "settings", label: "Settings", icon: "⚙" },
  { id: "news", label: "Plant News", icon: "📰" },
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
