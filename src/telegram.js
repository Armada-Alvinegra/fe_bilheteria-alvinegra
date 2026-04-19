// Wrapper for the Telegram WebApp SDK loaded via <script> in index.html.
// Falls back to no-ops when running outside Telegram (e.g. local dev).

export const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : null;

export function initTelegram() {
  if (!tg) return;
  try {
    tg.ready();
    tg.expand();
    tg.setHeaderColor?.('#050309');
    tg.setBackgroundColor?.('#050309');
  } catch {}
}

export function getTelegramUser() {
  const u = tg?.initDataUnsafe?.user;
  if (!u) return null;
  const name = [u.first_name, u.last_name].filter(Boolean).join(' ') || u.username || 'Alvinegro';
  return {
    id: u.id,
    name,
    tgHandle: u.username ? `@${u.username}` : '',
  };
}
