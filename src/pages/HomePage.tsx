import Nav from "../components/Nav";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import ProfilePreview from "../components/ProfilePreview";
import MatchmakingDemo from "../components/MatchmakingDemo";
import OddsPreview from "../components/OddsPreview";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Waitlist from "../components/Waitlist";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <ProfilePreview />
        <MatchmakingDemo />
        <OddsPreview />
        <Pricing />
        <FAQ />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
