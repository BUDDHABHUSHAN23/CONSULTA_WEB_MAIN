import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
import { createExpense, submitExpense, attachFromUrl } from "../services/terApi";
import useReveal from "../hooks/useReveal";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export default function SubmitExpense({ token }) {
  const hero = useReveal(0.1);
  const formCol = useReveal(0.15);
  const resultCol = useReveal(0.2);

  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [category, setCategory] = useState("TRAVEL");
  const [currency, setCurrency] = useState("INR");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true); setErr(""); setResult(null);
    try {
      const doc = await createExpense(token, { amount, date, category, currency, description }, Array.from(files));
      let updated = doc;
      if (url.trim()) {
        updated = await attachFromUrl(token, doc._id, [url.trim()]);
      }
      const final = await submitExpense(token, updated._id);
      setResult(final);
      setUrl("");
      setFiles([]);
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
              Submit
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Expense
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed font-light">
              Add your receipts and details below. The page matches our site styling and reveals in smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={formCol.ref}
            className={`transition-all duration-700 ${
              formCol.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <div className="bg-secondary rounded-3xl p-8 lg:p-10 max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-2">Submit Expense</h2>
              <p className="text-muted-foreground mb-6">JPG/PNG/PDF up to 10MB each.</p>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount</label>
                    <Input type="number" min="0" step="0.01"
                      value={amount} onChange={e=>setAmount(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <Input type="date" value={date} onChange={e=>setDate(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      className="w-full px-3 py-2 rounded-xl bg-card border border-border focus:ring-2 focus:ring-ring/10"
                      value={category}
                      onChange={e=>setCategory(e.target.value)}
                    >
                      <option>TRAVEL</option><option>FOOD</option><option>ACCOMMODATION</option><option>SUPPLIES</option><option>OTHER</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Currency</label>
                    <Input value={currency} onChange={e=>setCurrency(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Optional note for approver" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Attach file(s)</label>
                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center px-3 py-2 bg-card border border-border rounded-xl cursor-pointer hover:bg-white transition">
                        <Paperclip className="h-4 w-4 mr-2" /> Choose files
                        <input type="file" multiple className="hidden" onChange={e=>setFiles(e.target.files)} />
                      </label>
                      {files?.length ? <span className="text-xs text-muted-foreground">{files.length} selected</span> : null}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">…or attach by URL</label>
                    <Input placeholder="https://example.com/receipt.jpg" value={url} onChange={e=>setUrl(e.target.value)} />
                  </div>
                </div>

                {err && <div className="text-red-600 text-sm">{err}</div>}

                <Button disabled={busy} className="w-full apple-button">
                  {busy ? "Submitting…" : (<span className="inline-flex items-center">Submit <Send className="h-4 w-4 ml-2" /></span>)}
                </Button>
              </form>
            </div>
          </div>

          {result && (
            <div
              ref={resultCol.ref}
              className={`mt-6 transition-all duration-700 ${
                resultCol.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <div className="border border-border bg-card rounded-2xl p-4 max-w-3xl">
                <div className="font-semibold">Submitted ✅</div>
                <div className="text-sm text-muted-foreground">ID: {result._id}</div>
                <div className="text-sm text-muted-foreground">Status: {result.status}</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
