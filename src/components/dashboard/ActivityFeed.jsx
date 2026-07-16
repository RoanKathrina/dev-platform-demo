import { Icon } from '../layout/Icons';

export default function ActivityFeed({ activities }) {
  return (
    <section className="panel activity-panel">
      <header className="panel-header"><h2>Activity Feed</h2></header>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <article key={`${activity.title}-${index}`}>
            <span className={`activity-icon ${activity.type}`}><Icon name={activity.type === 'success' ? 'check' : 'warning'} size={17}/></span>
            <div><strong>{activity.title}</strong><small>{activity.timestamp}</small></div>
          </article>
        ))}
      </div>
    </section>
  );
}
