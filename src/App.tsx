import './App.css'
import Dashboard from './components/Dashboard.tsx'

import MyPlants  from "./components/MyPlants.tsx"

// inside the page-switch:

// import Navbar from './components/Navbar'

import { useState } from "react";
import { Sidebar, type NavItem } from "./components/Sidebar";
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

function App() {

   const [activePage, setActivePage] = useState("dashboard");



  return (
   <>
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar items={NAV_ITEMS} activePage={activePage} onNavigate={setActivePage} />
        
      <main style={{ flex: 1, padding: "32px 36px" }}>
        {activePage === "dashboard" && <h2>   <Dashboard/> </h2>}
       {activePage === "myplants" && <MyPlants onNavigate={setActivePage} />}
        {activePage === "search" && <SearchPlants onAddPlant={(plant) => console.log("add", plant)} />}
        {activePage === "schedule" && <CareSchedule/>}
        {activePage === "journal" &&  <Journal/>}
        {activePage === "settings" && <Settings/>}
           {activePage === "news" && <PlantNews/>}
      </main>
    </div>
  

   </>
  )
}

export default App
