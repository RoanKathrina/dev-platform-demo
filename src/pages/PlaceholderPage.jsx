export default function PlaceholderPage({ title, description }) {
  return (
    <section className="placeholder-page">
      <div className="placeholder-card">
        <span className="placeholder-kicker">Coming next</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
