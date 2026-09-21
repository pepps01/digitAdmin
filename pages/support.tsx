import Link from "next/link";
import PublicLayout from "src/components/public/PublicLayout";
import { PageHeader } from "src/components/public/LegalPage";

const Support = () => (
  <PublicLayout title="Support">
    <PageHeader
      title="How can we help?"
      subtitle="Find quick answers in our FAQ or get in touch with the Cue team."
    />
    <div className="mx-auto grid max-w-4xl gap-6 px-6 py-12 md:grid-cols-2">
      <div className="rounded-2xl border border-softGray/60 p-6">
        <h2 className="text-xl font-semibold">Browse the FAQ</h2>
        <p className="mt-2 text-grey90/70">
          Answers to the most common rider and driver questions.
        </p>
        <Link href="/faq" className="mt-4 inline-block font-medium text-cue">
          Go to FAQ →
        </Link>
      </div>
      <div className="rounded-2xl border border-softGray/60 p-6">
        <h2 className="text-xl font-semibold">Contact us</h2>
        <p className="mt-2 text-grey90/70">
          Email: support@cue.example (replace with real contact details)
        </p>
      </div>
    </div>
  </PublicLayout>
);

export default Support;
