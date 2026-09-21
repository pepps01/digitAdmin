import PublicLayout from "src/components/public/PublicLayout";
import { PageHeader } from "src/components/public/LegalPage";

const perks = [
  {
    title: "Set your own schedule",
    text: "Go online and offline in the app whenever it suits you. Drive alongside your everyday work or in your free time.",
  },
  {
    title: "Fast payouts",
    text: "Get your earnings regularly instead of waiting until the end of the month.",
  },
  {
    title: "Large rider network",
    text: "More riders on the platform means more opportunities for ride requests.",
  },
];

const EarnWithCue = () => (
  <PublicLayout title="Earn with Cue">
    <PageHeader
      title="Earn money driving in your city"
      subtitle="Become a driver partner, go online whenever it suits you, accept nearby ride requests and earn from each completed trip."
    />
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-bold">Why drive with Cue</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {perks.map(p => (
          <div key={p.title}>
            <div className="mb-4 h-10 w-10 rounded-lg bg-cue" />
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-grey90/70">{p.text}</p>
          </div>
        ))}
      </div>
      <a
        href="#"
        className="mt-12 inline-block rounded-lg bg-cue px-6 py-3 font-medium text-white hover:bg-cueDark"
      >
        Download the Cue Driver app
      </a>
    </section>
  </PublicLayout>
);

export default EarnWithCue;
