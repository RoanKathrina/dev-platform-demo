export default function ServiceHealth({ summary }) {
  const circumference = 2 * Math.PI * 54;
  const healthy = summary.healthy / summary.total;
  const degraded = summary.degraded / summary.total;

  return (
    <section className="panel service-health-panel">
      <header className="panel-header"><h2>Service Health <span>(All Environments)</span></h2></header>
      <div className="donut-layout">
        <div className="donut">
          <svg viewBox="0 0 140 140" role="img" aria-label={`${summary.healthy} of ${summary.total} services healthy`}>
            <circle cx="70" cy="70" r="54" className="donut-track" />
            <circle cx="70" cy="70" r="54" className="donut-healthy" strokeDasharray={`${circumference * healthy} ${circumference}`} />
            <circle cx="70" cy="70" r="54" className="donut-degraded" strokeDasharray={`${circumference * degraded} ${circumference}`} strokeDashoffset={-circumference * healthy} />
          </svg>
          <div><strong>{summary.total}</strong><small>Total Services</small></div>
        </div>
        <div className="legend">
          <p><i className="green"/>Healthy <strong>{summary.healthy} ({Math.round(healthy * 100)}%)</strong></p>
          <p><i className="orange"/>Degraded <strong>{summary.degraded} ({Math.round(degraded * 100)}%)</strong></p>
          <p><i className="red"/>Unhealthy <strong>{summary.unhealthy} (0%)</strong></p>
        </div>
      </div>
    </section>
  );
}
