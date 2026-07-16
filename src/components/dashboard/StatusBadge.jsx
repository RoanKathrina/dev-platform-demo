export default function StatusBadge({ status, label }) {
  return <span className={`badge badge-${status}`}><i />{label}</span>;
}
