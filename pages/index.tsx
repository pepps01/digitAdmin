import Link from "next/link";
import PublicLayout from "src/components/public/PublicLayout";

const services = [
  {
    title: "Rides",
    text: "Request in seconds, ride in minutes.",
    cta: "Get started",
    href: "#download",
    style: "bg-cueDark text-white",
  },
  {
    title: "Safety tools",
    text: "Live trip tracking and an in-app SOS button for every ride.",
    cta: "Learn more",
    href: "/faq",
    style: "bg-cue text-white",
  },
  {
    title: "Drive with Cue",
    text: "Go online when it suits you and earn from every completed trip.",
    cta: "Earn with Cue",
    href: "/earn-with-cue",
    style: "bg-[#0B1B4D] text-white",
  },
];

const StoreButton = ({ top, name }: { top: string; name: string }) => (
  <a
    href="#"
    className="inline-flex flex-col rounded-lg bg-black px-5 py-2 text-white"
  >
    <span className="text-[10px] uppercase tracking-wide">{top}</span>
    <span className="text-lg font-semibold leading-tight">{name}</span>
  </a>
);

const Home = () => (
  <PublicLayout title="Home" hero>
    <section className="bg-cue text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-36 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Enjoy safer rides when you ride on Cue
          </h1>
          <p className="mt-6 max-w-md text-white/85">
            Safety and security is our watchword when it comes to ride hailing.
            At Cue we ensure both the commuter and the driver are the utmost
            priority.
          </p>
          <div id="download" className="mt-8 flex flex-wrap gap-4">
            <StoreButton top="Get it on" name="Google Play" />
            <StoreButton top="Download on the" name="App Store" />
          </div>
        </div>
        <div className="relative flex h-72 items-center justify-center rounded-3xl bg-gradient-to-br from-cueDark to-[#0B1B4D] md:h-[28rem]">
          {/* Replace with a hero photo, e.g. <Image src="/hero.jpg" fill /> */}
          <div className="flex h-28 w-28 rotate-12 items-center justify-center rounded-full border-4 border-cueGold bg-cueGold/90 p-3 text-center text-xs font-bold uppercase text-white">
            Ride hailing · Safe &amp; easy
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          Our services
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-grey90/60">
          Products and features vary by location. Some features listed here may
          not be available in your app.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map(s => (
            <div
              key={s.title}
              className={`flex min-h-[18rem] flex-col rounded-3xl p-8 ${s.style}`}
            >
              <h3 className="text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/80">{s.text}</p>
              <Link
                href={s.href}
                className="mt-auto w-fit rounded-lg bg-white px-5 py-2.5 font-medium text-cueDark"
              >
                {s.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PublicLayout>
);

export default Home;
