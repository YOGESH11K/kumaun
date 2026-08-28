import { Hero } from "@/components/sections/Hero";
import { MapSection } from "@/components/sections/MapSection";
import { Mukteshwar } from "@/components/sections/Mukteshwar";
import { SaliyakoteMalla } from "@/components/sections/SaliyakoteMalla";
import { SaliyakoteTalla } from "@/components/sections/SaliyakoteTalla";
import { Sundarkhal } from "@/components/sections/Sundarkhal";
import { Dharapani } from "@/components/sections/Dharapani";
import { Nainital } from "@/components/sections/Nainital";
import { WhyCome } from "@/components/sections/WhyCome";
import { Discover } from "@/components/sections/Discover";
import { PhotoExperience } from "@/components/sections/PhotoExperience";
import { AtmosphereSection } from "@/components/sections/AtmosphereSection";
import { Stories } from "@/components/sections/Stories";
import { PlanVisit } from "@/components/sections/PlanVisit";
import { Credit } from "@/components/sections/Credit";
import { Footer } from "@/components/navigation/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <MapSection />
      <Mukteshwar />
      <SaliyakoteMalla />
      <SaliyakoteTalla />
      <Sundarkhal />
      <Dharapani />
      <Nainital />
      <WhyCome />
      <Discover />
      <AtmosphereSection />
      <PhotoExperience />
      <Stories />
      <PlanVisit />
      <Credit />
      <Footer />
    </>
  );
}
