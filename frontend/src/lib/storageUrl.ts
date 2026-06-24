const baseStorageBaseUrl = import.meta.env.FIREBASE_STORAGE_URL;

export const storagBaseUrl = baseStorageBaseUrl ? baseStorageBaseUrl.replace(/\/$/, '') : '';

export function storageUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!storagBaseUrl) {
    return normalizedPath;
  }

  if (storagBaseUrl.endsWith('/api') && normalizedPath.startsWith('/api')) {
    return `${storagBaseUrl}${normalizedPath.slice(4)}`;
  }
  return `${storagBaseUrl}${normalizedPath}`;
}