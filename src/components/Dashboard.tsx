const Dashboard = () => {
    return (
        <div>
            {/* <!-- ===================== DASHBOARD ===================== --> */}
    <div className="page active" id="page-dashboard">
      <div className="topbar">
        <div className="greet"><h2>Good morning, Riya</h2><p>3 plants need attention today</p></div>
        <div className="avatar">RS</div>
      </div>
      <div className="stat-row">
        <div className="stat-card"><div className="num">14</div><div className="label">Total plants</div></div>
        <div className="stat-card"><div className="num">3</div><div className="label">Needs water today</div></div>
        <div className="stat-card"><div className="num">92%</div><div className="label">Healthy</div></div>
      </div>
      <div className="section-title">Your plants</div>
      <div className="plant-grid">
        <div className="plant-card"><div className="plant-img"><div className="badge water">Water today</div></div>
          <div className="plant-body"><h3>Monstera Deliciosa</h3><div className="species">Swiss cheese plant</div>
          <div className="moisture"><div style={{width:"62%"}}></div></div><div className="moisture-label">Soil moisture · 62%</div></div></div>
        <div className="plant-card"><div className="plant-img"><div className="badge overdue">Overdue</div></div>
          <div className="plant-body"><h3>Snake Plant</h3><div className="species">Dracaena trifasciata</div>
          <div className="moisture"><div style={{width:"24%", background:"var(--ochre)"}}></div></div><div className="moisture-label">Soil moisture · 24%</div></div></div>
        <div className="plant-card"><div className="plant-img"><div className="badge ok">Healthy</div></div>
          <div className="plant-body"><h3>Pothos</h3><div className="species">Epipremnum aureum</div>
          <div className="moisture"><div style={{width:"80%"}}></div></div><div className="moisture-label">Soil moisture · 80%</div></div></div>
      </div>
    </div>
        </div>
    );
}

export default Dashboard;
