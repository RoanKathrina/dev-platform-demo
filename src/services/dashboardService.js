const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export async function getDashboard({ signal } = {}) {
  const response = await fetch(`${API_BASE_URL}/api/dev-platform-dashboard`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Dashboard request failed with HTTP ${response.status}`);
  }

  const payload = await response.json();
  if (payload.status !== 200 || !payload.response_body) {
    throw new Error(payload.response_message || 'Invalid dashboard response');
  }

  return payload;
}
