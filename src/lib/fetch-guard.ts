// Guard against "Cannot set property fetch of #<Window> which has only a getter"
// in sandboxed/preview iframe environments where window.fetch is configured with a getter only.
(function installFetchGuard() {
  try {
    const w =
      typeof window !== "undefined"
        ? window
        : typeof globalThis !== "undefined"
          ? globalThis
          : null;
    if (!w) return;

    const f = typeof w.fetch === "function" && w.fetch.bind ? w.fetch.bind(w) : w.fetch;
    const d = Object.getOwnPropertyDescriptor(w, "fetch");
    const p = Object.getPrototypeOf(w);
    const pd = !d && p ? Object.getOwnPropertyDescriptor(p, "fetch") : null;
    const getterOnly = Boolean((d && !d.set && !d.writable) || (pd && !pd.set && !pd.writable));

    let canAssign = true;
    if (getterOnly) {
      canAssign = false;
    } else {
      try {
        const test = w.fetch;
        // @ts-expect-error test assignment
        w.fetch = test;
      } catch {
        canAssign = false;
      }
    }

    if (!canAssign) {
      let current = f;
      Object.defineProperty(w, "fetch", {
        get: () => current,
        set: (v) => {
          current = v;
        },
        configurable: true,
        enumerable: true,
      });
    }
  } catch {
    // Fail-safe
  }
})();
