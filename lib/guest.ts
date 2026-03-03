export function getGuest() {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem("guest");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
