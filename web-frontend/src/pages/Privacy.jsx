import React from "react";

export default function Privacy() {
  return (
    <div className="min-h-screen surface">
      <section className="pt-28 pb-10 bg-gradient-to-b from-secondary to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Effective date: September 2025</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl shadow-sm p-8 lg:p-10">
            <div className="prose prose-gray lg:prose-lg dark:prose-invert">
          <h2>Overview</h2>
          <p>
            We respect your privacy. This policy explains what data we collect, why we
            collect it, and how we handle it.
          </p>

          <h3>Information we collect</h3>
          <ul>
            <li>Contact details you submit via forms (name, email, phone, company)</li>
            <li>Communications you send to us</li>
            <li>Basic analytics and diagnostic data</li>
          </ul>

          <h3>How we use information</h3>
          <ul>
            <li>To respond to enquiries and provide services</li>
            <li>To operate, protect, and improve our website</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h3>Data sharing</h3>
          <p>
            We do not sell your personal information. We may share data with service
            providers who process it on our behalf under contracts and appropriate
            safeguards.
          </p>

          <h3>Retention</h3>
          <p>
            We retain personal data only as long as necessary for the purposes above or as
            required by law.
          </p>

          <h3>Your choices</h3>
          <ul>
            <li>Request access, correction, or deletion of your personal data</li>
            <li>Opt out of non-essential communications</li>
          </ul>

          <h3>Contact</h3>
          <p>
            For privacy questions, contact us at <a href="mailto:info@consulta.in">info@consulta.in</a>.
          </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


