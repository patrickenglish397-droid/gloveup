import { useEffect, useRef } from "react";

// Cloudflare Turnstile widget. Renders explicitly (vs class="cf-turnstile"
// auto-render) so we can re-render on retry and reset between attempts.
//
// The script tag is loaded in index.html. We poll for `window.turnstile` to
// avoid a hard ordering dependency between the script and React mount.

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

type Props = {
  onVerify: (token: string) => void;
  onError?: () => void;
};

export default function Turnstile({ onVerify, onError }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const sitekey = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) ?? "";

  useEffect(() => {
    if (!sitekey || !containerRef.current) return;

    let cancelled = false;
    const tryRender = () => {
      if (cancelled) return;
      const ts = window.turnstile;
      if (!ts) {
        // Script still loading; check again shortly.
        setTimeout(tryRender, 100);
        return;
      }
      if (widgetIdRef.current || !containerRef.current) return;
      widgetIdRef.current = ts.render(containerRef.current, {
        sitekey,
        callback: onVerify,
        "error-callback": onError,
        "expired-callback": onError,
        theme: "dark",
      });
    };
    tryRender();

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
    // sitekey is from env at build time; onVerify is stable per render but we
    // want to capture it. Deliberate empty deps to render exactly once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!sitekey) {
    return (
      <div className="text-sm text-amber-400 border border-amber-400/40 rounded-md px-3 py-2">
        Turnstile site key not configured (VITE_TURNSTILE_SITE_KEY). Bot check is disabled in this build.
      </div>
    );
  }
  return <div ref={containerRef} />;
}
