export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false; // SSR guard
  return Boolean(localStorage.getItem('userId'));
}
