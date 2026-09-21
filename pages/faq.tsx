import PublicLayout from "src/components/public/PublicLayout";
import { PageHeader } from "src/components/public/LegalPage";

const faqs = [
  {
    q: "What is Cue?",
    a: "Cue is a ride-hailing service built around the safety of both commuters and drivers.",
  },
  {
    q: "How do I request a ride?",
    a: "Download the Cue app, set your pickup and destination, and confirm your request.",
  },
  {
    q: "What safety features does Cue offer?",
    a: "Trips can be tracked live, and an SOS button lets you alert the Cue team if something goes wrong.",
  },
  {
    q: "How do I become a driver?",
    a: "Visit the Earn with Cue page, download the driver app and complete registration and document verification.",
  },
  {
    q: "How do I contact support?",
    a: "Use the Support page to reach our team.",
  },
];

const FAQ = () => (
  <PublicLayout title="FAQ">
    <PageHeader title="Frequently asked questions" />
    <div className="mx-auto max-w-3xl px-6 py-12">
      {faqs.map(f => (
        <details key={f.q} className="border-b border-softGray/60 py-4">
          <summary className="cursor-pointer text-lg font-medium">
            {f.q}
          </summary>
          <p className="mt-3 text-grey90/70">{f.a}</p>
        </details>
      ))}
    </div>
  </PublicLayout>
);

export default FAQ;
