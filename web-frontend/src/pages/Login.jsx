import { useState } from "react";
import { Link , useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn } from "lucide-react";
import { devLogin } from "../services/terApi";
import { saveSession } from "../lib/terSession";
import useReveal from "../hooks/useReveal";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function Login({ onLoggedIn }) {
  const hero = useReveal(0.1);
  const card = useReveal(0.15);

  const [role, setRole] = useState("employee");
  const [email, setEmail] = useState("emp@consulta.in");
  const [name, setName] = useState("Employee One");
  const [id, setId] = useState("emp-001");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const loc = useLocation();

  async function go(e) {
    e.preventDefault();
    setBusy(true); setErr("");
    try {
      const res = await devLogin({ email, name, role, id });
      saveSession(res);
      nav(loc.state?.from?.pathname || "/ter/submit", { replace: true });
      onLoggedIn?.(res);
    } catch (e) {
      setErr(String(e.message || e));
    } finally { setBusy(false); }
  }

  return (
    <div className="min-h-screen surface">
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={hero.ref}
            className={`transition-all duration-700 ${
              hero.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <Link
              to="/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 group transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>

            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Employee
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Portal Login
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed font-light">
              Dev-only login for TER MVP. This mirrors the look & feel of other pages with smooth reveal effects.
            </p>
          </div>
        </div>
      </section>

      {/* Card */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={card.ref}
            className={`transition-all duration-700 ${
              card.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <div className="bg-secondary rounded-3xl p-8 lg:p-10 max-w-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <LogIn className="h-6 w-6 mr-2 text-gray-700" />
                Dev Login
              </h2>

              <form onSubmit={go} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@consulta.in" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">User ID</label>
                    <Input value={id} onChange={e=>setId(e.target.value)} placeholder="emp-001" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <select
                      className="w-full px-3 py-2 rounded-xl bg-card border border-border focus:ring-2 focus:ring-ring/10"
                      value={role}
                      onChange={e=>setRole(e.target.value)}
                    >
                      <option value="employee">employee</option>
                      <option value="manager">manager</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                </div>

                {err && <div className="text-red-600 text-sm">{err}</div>}

                <Button disabled={busy} className="w-full apple-button">
                  {busy ? "Logging in…" : "Login"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
