
const Navbar = () => {
    return (
        <div>
            <section>
     <div className="sidebar">
    <div className="logo">🌿 <span>Sprout</span></div>
    <div className="nav-item active" data-page="dashboard"><span className="nav-icon">⌂</span> Dashboard</div>
    <div className="nav-item" data-page="myplants"><span className="nav-icon">❖</span> My Plants</div>
    <div className="nav-item" data-page="search"><span className="nav-icon">⌕</span> Search Plants</div>
    <div className="nav-item" data-page="schedule"><span className="nav-icon">▤</span> Care Schedule</div>
    <div className="nav-item" data-page="journal"><span className="nav-icon">✎</span> Journal</div>
    <div className="nav-item" data-page="settings"><span className="nav-icon">⚙</span> Settings</div>
  </div>
   </section>
        </div>
    );
}

export default Navbar;
