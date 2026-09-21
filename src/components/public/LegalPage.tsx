import { ReactNode } from "react";
import PublicLayout from "./PublicLayout";

export const PageHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <section className="bg-cue text-white">
    <div className="mx-auto max-w-6xl px-6 pb-14 pt-8">
      <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
      {subtitle && <p className="mt-4 max-w-2xl text-white/85">{subtitle}</p>}
    </div>
  </section>
);

const LegalPage = ({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: ReactNode }[];
}) => (
  <PublicLayout title={title}>
    <PageHeader title={title} subtitle={`Last updated: ${updated}`} />
    <div className="mx-auto max-w-3xl px-6 py-12">
      {sections.map(s => (
        <section key={s.heading} className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">{s.heading}</h2>
          <div className="leading-relaxed text-grey90/75">{s.body}</div>
        </section>
      ))}
      <p className="mt-10 rounded-lg bg-lightGray p-4 text-sm text-grey90/70">
        This is placeholder copy and should be reviewed by legal counsel before
        publication.
      </p>
    </div>
  </PublicLayout>
);

export default LegalPage;
