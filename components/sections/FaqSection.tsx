import { faqPageLd, type QA } from "@/lib/seo";

export default function FaqSection({
  items,
  heading = "Frequently asked questions",
}: {
  items: QA[];
  heading?: string;
}) {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-border py-20 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd(items)) }}
      />
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
      <dl className="mt-10 space-y-4">
        {items.map((item) => (
          <div key={item.q} className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur">
            <dt className="font-semibold tracking-tight text-primary">{item.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-secondary">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
