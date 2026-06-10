const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const apiBaseUrl = rawApiBaseUrl ? rawApiBaseUrl.replace(/\/$/, '') : '';

export function apiUrl(path: string) {
  if (!path.startsWith('/')) {
    return `${apiBaseUrl}/${path}`;
  }

  return `${apiBaseUrl}${path}`;
}