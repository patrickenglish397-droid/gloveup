import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { clearSession, fetchMe, getSession, type Member } from "../lib/auth";

type Props = { children: (member: Member) => React.ReactNode };

// Wraps a protected page. Local session must exist AND /api/me must succeed —
// otherwise we wipe local state and bounce to /login.
export default function AuthGuard({ children }: Props) {
  const location = useLocation();
  const session = getSession();
  const [state, setState] = useState<
    | { kind: "checking" }
    | { kind: "ok"; member: Member }
    | { kind: "fail" }
  >({ kind: "checking" });

  useEffect(() => {
    if (!session) {
      setState({ kind: "fail" });
      return;
    }
    let cancelled = false;
    fetchMe()
      .then((member) => !cancelled && setState({ kind: "ok", member }))
      .catch(() => {
        if (cancelled) return;
        clearSession();
        setState({ kind: "fail" });
      });
    return () => { cancelled = true; };
  }, [session?.token]);

  if (state.kind === "checking") {
    return (
      <div className="min-h-screen grid place-items-center text-muted">
        Loading…
      </div>
    );
  }
  if (state.kind === "fail") {
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }
  return <>{children(state.member)}</>;
}
