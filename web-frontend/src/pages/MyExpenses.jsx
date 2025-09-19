import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, Paperclip } from "lucide-react";
import { myExpenses, attachmentUrl } from "../services/terApi";
import useReveal from "../hooks/useReveal";
import { Button } from "../components/ui/button";

export default function MyExpenses({ token }) {
  const hero = useReveal(0.1);
  const listReveal = useReveal(0.15);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  async function load() {
    try { setItems(await myExpenses(token)); }
    catch(e){ setErr(String(e.message||e)); }
  }
  useEffect(() => { load(); }, []);

  async function openAtt(eid, attId) {
    const { url } = await attachmentUrl(token, eid, attId);
    window.open(url, "_blank");
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

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-3 leading-tight">
                  My
                  <br />
                  <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Expenses
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl font-light">
                  Track submissions and statuses. Cards animate in as you scroll.
                </p>
              </div>
              <Button variant="outline" onClick={load} className="h-10">
                <RefreshCw className="h-4 w-4 mr-2" /> Refresh
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {err && <div className="text-red-600 text-sm mb-4">{err}</div>}

          <div
            ref={listReveal.ref}
            className={`grid gap-4 transition-all duration-700 ${
              listReveal.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {items.map((x, i) => (
              <div
                key={x._id}
                className="border border-border bg-card rounded-2xl p-4 transition-all duration-500 hover:shadow-md hover:scale-[1.01]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="font-medium">
                  {new Date(x.date).toLocaleDateString()} — ₹{x.amount} — {x.status}
                </div>
                <div className="text-sm text-muted-foreground">{x.description}</div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {(x.attachments || []).map(a => (
                    <Button
                      key={a._id}
                      variant="ghost"
                      onClick={() => openAtt(x._id, a._id)}
                      className="px-2 h-8 text-sm"
                    >
                      <Paperclip className="h-4 w-4 mr-1" />
                      {a.originalName || a.key?.split("/").pop() || "Open"}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            {!items.length && <div className="text-gray-600">No expenses yet.</div>}
          </div>
        </div>
      </section>
    </div>
  );
}
