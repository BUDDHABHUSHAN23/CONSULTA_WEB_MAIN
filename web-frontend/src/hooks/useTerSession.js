import { useState } from "react";
import { terSession } from "../lib/terSession";

export default function useTerSession() {
  const [session, setSession] = useState(() => terSession.load());
  const set = (s) => { terSession.save(s); setSession(s); };
  const clear = () => { terSession.clear(); setSession(null); };
  return { session, set, clear };
}
