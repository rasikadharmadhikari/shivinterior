/**
 * API configuration for frontend
 * Handles both development (localhost) and production (Render) environments
 */

export function getApiBaseUrl(): string {
  // In production on Render, the frontend and backend are served from the same domain
  // So we can use a relative path or the full URL
  
  // Get the current origin (protocol + domain + port)
  const origin = window.location.origin;
  
  // On localhost, always use relative paths
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
    return '';
  }
  
  // On production (Render), use relative paths too since they're on the same domain
  return '';
}

export function getApiUrl(path: string): string {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${path}`;
}
