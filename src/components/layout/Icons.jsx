export function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    cube: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z"/><path d="m4.3 7.7 7.7 4.4 7.7-4.4M12 12.1V21"/></>,
    rocket: <><path d="M4.5 16.5c-1.4 1.3-1.8 3-1.5 4.5 1.5.3 3.2-.1 4.5-1.5"/><path d="M9 15 5 11l5.8-5.8c2.5-2.5 5.8-2.7 8.2-2.2.5 2.4.3 5.7-2.2 8.2Z"/><circle cx="14.5" cy="7.5" r="1.5"/><path d="m9 15 6-6M7 17l-2-2"/></>,
    audit: <><path d="M6 3h12v18H6z"/><path d="M9 7h6M9 11h6M9 15h3"/><path d="m14.5 16.5 1.5 1.5 3-3"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    warning: <><path d="M12 3 2.8 20h18.4Z"/><path d="M12 9v4M12 17h.01"/></>,
    refresh: <><path d="M20 6v5h-5"/><path d="M4 18v-5h5"/><path d="M18.5 9A7 7 0 0 0 6.2 6.2L4 11M5.5 15A7 7 0 0 0 17.8 17.8L20 13"/></>,
    server: <><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01"/></>,
    pulse: <><path d="M3 12h4l2-5 4 10 2-5h6"/></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3"/><path d="M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/></>,
  };

  return <svg {...common}>{paths[name] ?? paths.cube}</svg>;
}
