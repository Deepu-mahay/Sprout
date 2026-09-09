
import "./Sidebar.css";

export interface NavItem {
  id: string;
  label: string;
  icon: string; // emoji or icon char — swap for an icon component if you like
}

interface SidebarProps {
  items: NavItem[];
  activePage: string;
  onNavigate: (pageId: string) => void;
  appName?: string;
}

export function Sidebar({ items, activePage, onNavigate, appName = "Sprout" }: SidebarProps) {
  return (
    <nav className="sidebar" aria-label="Main navigation">
      <div className="logo">
        🌿 <span>{appName}</span>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className={`nav-item${item.id === activePage ? " active" : ""}`}
          onClick={() => onNavigate(item.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onNavigate(item.id);
          }}
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </div>
      ))}
    </nav>
  );
}
