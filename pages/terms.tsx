import LegalPage from "src/components/public/LegalPage";

const Terms = () => (
  <LegalPage
    title="Terms & Conditions"
    updated="September 2026"
    sections={[
      {
        heading: "Using Cue",
        body: "By using the Cue app you agree to these terms and to use the service lawfully and respectfully.",
      },
      {
        heading: "Riders",
        body: "Riders are responsible for accurate pickup information and for payment of fares and applicable fees.",
      },
      {
        heading: "Drivers",
        body: "Drivers must hold valid documents, maintain their vehicle and follow Cue safety standards.",
      },
      {
        heading: "Safety and conduct",
        body: "Cue may suspend accounts involved in unsafe or abusive behaviour.",
      },
    ]}
  />
);

export default Terms;
