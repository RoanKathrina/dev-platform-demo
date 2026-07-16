function points(values, max, width = 430, height = 130) {
  return values.map((value, index) => {
    const x = 20 + index * ((width - 40) / (values.length - 1));
    const y = height - 20 - (value / max) * (height - 40);
    return `${x},${y}`;
  }).join(' ');
}

export default function DeploymentTrend({ data }) {
  const success = data.map((item) => item.successful);
  const failed = data.map((item) => item.failed);
  const max = Math.max(...success, ...failed, 3);

  return (
    <section className="panel trend-panel">
      <header className="panel-header"><h2>Deployment Status <span>(7d)</span></h2></header>
      <div className="chart-legend"><span><i className="green"/>Successful</span><span><i className="red"/>Failed</span></div>
      <svg className="line-chart" viewBox="0 0 430 150" preserveAspectRatio="none" aria-label="Seven-day deployment status chart">
        {[30, 65, 100, 135].map((y) => <line key={y} x1="20" y1={y} x2="410" y2={y} className="grid-line" />)}
        <polyline points={points(success, max)} className="success-line" />
        <polyline points={points(failed, max)} className="failed-line" />
        {data.map((item, i) => <text key={item.day} x={20 + i * (390 / 6)} y="148" textAnchor="middle">{item.day}</text>)}
      </svg>
    </section>
  );
}
