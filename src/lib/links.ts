export const GITHUB = 'https://github.com/cpsi-labs';
export function officialLink(value: string): string | undefined {
  try {
    const url = new URL(value);
    if (url.origin !== 'https://github.com' || url.username || url.password || url.port) return;
    if (url.pathname === '/cpsi-labs' || url.pathname.startsWith('/cpsi-labs/')) return url.href;
  } catch {
    /* Invalid catalogue links are never rendered. */
  }
}
export function localAsset(value: string): string | undefined {
  if (
    !/^\/(?:apps|brand)\/[a-zA-Z0-9/_ .-]+\.(?:png|webp|jpg|jpeg|avif|svg)$/.test(value) ||
    value.includes('..')
  )
    return;
  return value;
}
