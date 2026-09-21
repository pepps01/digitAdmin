import LegalPage from "src/components/public/LegalPage";

const Privacy = () => (
  <LegalPage
    title="Privacy Policy"
    updated="September 2026"
    sections={[
      {
        heading: "Information we collect",
        body: "We collect account details, trip and location data, and device information needed to provide ride-hailing services.",
      },
      {
        heading: "How we use it",
        body: "To match riders and drivers, keep trips safe, process payments, provide support and improve Cue.",
      },
      {
        heading: "Sharing",
        body: "Trip details are shared between the rider and driver for the duration of a trip. We do not sell personal data.",
      },
      {
        heading: "Your choices",
        body: "You can request access to, correction of, or deletion of your data by contacting support.",
      },
    ]}
  />
);

export default Privacy;
