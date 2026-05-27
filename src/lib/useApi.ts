import { useEffect, useState } from "react";
import type { Boxer } from "../data/boxers";
import { fetchAthletes, fetchMatch, type ApiMatchProposal } from "./api";

type Async<T> = { data: T | null; loading: boolean; error: Error | null };

export function useAthletes(): Async<Boxer[]> {
  const [state, setState] = useState<Async<Boxer[]>>({ data: null, loading: true, error: null });
  useEffect(() => {
    let cancelled = false;
    fetchAthletes()
      .then((data) => !cancelled && setState({ data, loading: false, error: null }))
      .catch((error) => !cancelled && setState({ data: null, loading: false, error }));
    return () => { cancelled = true; };
  }, []);
  return state;
}

export function useMatch(primaryId: string | null): Async<ApiMatchProposal> {
  const [state, setState] = useState<Async<ApiMatchProposal>>({ data: null, loading: true, error: null });
  useEffect(() => {
    if (!primaryId) return;
    let cancelled = false;
    setState((s) => ({ ...s, loading: true }));
    fetchMatch(primaryId)
      .then((data) => !cancelled && setState({ data, loading: false, error: null }))
      .catch((error) => !cancelled && setState({ data: null, loading: false, error }));
    return () => { cancelled = true; };
  }, [primaryId]);
  return state;
}
