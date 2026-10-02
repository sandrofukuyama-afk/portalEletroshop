/*
 * Casa Blanca Portal — Service Worker de NOTIFICAÇÕES do Nebula.
 * Não intercepta requisições (sem "fetch") e não faz cache.
 * Ao tocar na notificação abre o portal com ?open=nebula, que redireciona para o Nebula
 * (o Nebula busca o QR pendente ao abrir e mostra o modal).
 */

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { body: event.data ? event.data.text() : "" };
  }
  event.waitUntil(
    self.registration.showNotification(data.title || "Nebula POS", {
      body: data.body || "Novo pagamento QR para confirmar.",
      tag: data.tag || "nebula-qr",
      renotify: true,
      requireInteraction: true,
      data: { url: "/?open=nebula" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/?open=nebula";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ("navigate" in client) {
          return client.focus().then(() => client.navigate(url)).catch(() => self.clients.openWindow(url));
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
