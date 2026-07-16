import { Icon } from '../layout/Icons';

export default function MetricCard({ icon, title, value, detail, tone = 'blue' }) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${tone}`}><Icon name={icon} size={25} /></div>
      <div>
        <p>{title}</p>
        <strong>{value}</strong>
        <small className={tone === 'orange' ? 'negative' : 'positive'}>{detail}</small>
      </div>
    </article>
  );
}
