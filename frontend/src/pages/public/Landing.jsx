import HeroSection from "./sections/HeroSection";
import TrustStats from "./sections/TrustStats";
import FeaturesSection from "./sections/FeaturesSection";
import HowItWorks from "./sections/HowItWorks";
import SecuritySection from "./sections/SecuritySection";
import FinalCTA from "./sections/FinalCTA";

import LandingFooter from "../../components/layout/LandingFooter";
import LandingNavbar from "../../components/layout/LandingNavbar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950">

      {/* =========================
          Navigation
      ========================== */}
      <LandingNavbar />

      <main>

        {/* =========================
            Hero Section
        ========================== */}
        <HeroSection />

        {/* =========================
            Trust & Statistics
        ========================== */}
        <TrustStats />

        {/* =========================
            Features
        ========================== */}
        <FeaturesSection />

        {/* =========================
            How It Works
        ========================== */}
        <HowItWorks />

        {/* =========================
            Security
        ========================== */}
        <SecuritySection />

        {/* =========================
            Final Call To Action
        ========================== */}
        <FinalCTA />

      </main>

      {/* =========================
          Footer
      ========================== */}
      <LandingFooter />

    </div>
  );
};

export default Landing;