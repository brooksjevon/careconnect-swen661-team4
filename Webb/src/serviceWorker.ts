/**
 * Registers the PWA service worker (public/service-worker.js).
 * Production builds only — in development it would cache files and hide your changes.
 */
export function registerServiceWorker() {
  if (!import.meta.env.PROD || !("serviceWorker" in navigator)) return

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => {
      // Registration can fail on http:// or in private mode; the app still works online.
    })
  })
}
