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
  collapsed: boolean;
  onToggleCollapsed: () => void;
  appName?: string;
}

export function Sidebar({
  items,
  activePage,
  onNavigate,
  collapsed,
  onToggleCollapsed,
  appName = "Sprout",
}: SidebarProps) {
  return (
    <nav
      className={`sidebar flex flex-col shrink-0 transition-all duration-200 ${
        collapsed ? "w-14 px-2" : "w-56 px-5"
      }`}
      aria-label="Main navigation"
    >
      {/* toggle button — always visible, rail stays a fixed width either way */}
      <button
        className="flex items-center justify-center w-8 h-8 mb-6 rounded text-[#CFE0D2] hover:bg-white/10 self-start"
        onClick={onToggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? "»" : "«"}
      </button>

      <div className={`logo flex items-center gap-2 mb-8 ${collapsed ? "justify-center px-0" : ""}`}>
        <span >🌿</span>
        {!collapsed && <span>{appName}</span>}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className= {`nav-item${item.id === activePage ? " active" : ""} ${
            collapsed ? "justify-center px-0" : ""
          }`}
          onClick={() => onNavigate(item.id)}
          role="button"
          tabIndex={0}
          title={collapsed ? item.label : undefined}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onNavigate(item.id);
          }}
        >
          <span className="nav-icon ">{item.icon}</span>
          {!collapsed && item.label}
        </div>
      ))}
    </nav>
  );
}
