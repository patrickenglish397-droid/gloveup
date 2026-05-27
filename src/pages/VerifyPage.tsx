import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { verifyToken } from "../lib/auth";

export default function VerifyPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState<
    | { kind: "verifying" }
    | { kind: "ok" }
    | { kind: "error"; reason: string }
  >({ kind: "verifying" });

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setState({ kind: "error", reason: "missing_token" });
      return;
    }
    let cancelled = false;
    verifyToken(token)
      .then(() => {
        if (cancelled) return;
        setState({ kind: "ok" });
        // Small delay so the user sees the "Signed in" flash before redirect.
        setTimeout(() => navigate("/app", { replace: true }), 600);
      })
      .catch((err) => {
        if (cancelled) return;
        setState({ kind: "error", reason: err instanceof Error ? err.message : "verify_failed" });
      });
    return () => { cancelled = true; };
  }, [params, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-canvas/80 border border-white/10 rounded-2xl p-8 shadow-xl text-center">
        {state.kind === "verifying" && (
          <>
            <h1 className="text-2xl font-bold mb-2">Signing you in…</h1>
            <p className="text-muted">One moment.</p>
          </>
        )}
        {state.kind === "ok" && (
          <>
            <h1 className="text-2xl font-bold mb-2 text-emerald-400">Signed in</h1>
            <p className="text-muted">Redirecting to your members area…</p>
          </>
        )}
        {state.kind === "error" && (
          <>
            <h1 className="text-2xl font-bold mb-2 text-red-400">Could not sign in</h1>
            <p className="text-muted mb-6">
              {state.reason === "token_expired" && "That link has expired. Request a new one."}
              {state.reason === "token_already_used" && "That link has already been used. Request a new one."}
              {state.reason === "invalid_token" && "That link is invalid. Request a new one."}
              {state.reason === "missing_token" && "No token in URL."}
              {!["token_expired", "token_already_used", "invalid_token", "missing_token"].includes(state.reason) &&
                `Something went wrong: ${state.reason}`}
            </p>
            <Link
              to="/login"
              className="inline-block font-semibold px-4 py-2 rounded-full bg-accent text-white hover:bg-accent/90 transition"
            >
              Request a new link
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
