const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const apiBaseUrl = rawApiBaseUrl ? rawApiBaseUrl.replace(/\/$/, '') : '';

export function apiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!apiBaseUrl) {
    return normalizedPath;
  }

  if (apiBaseUrl.endsWith('/api') && normalizedPath.startsWith('/api')) {
    return `${apiBaseUrl}${normalizedPath.slice(4)}`;
  }

  if(normalizedPath.startsWith('/api') && rawApiBaseUrl == 'http://localhost:3003') {
    return `${apiBaseUrl}${normalizedPath.slice(4)}`;
  }

  return `${apiBaseUrl}${normalizedPath}`;
}