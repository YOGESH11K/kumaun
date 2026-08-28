"use client";

import { useState } from "react";
import { ExperienceProvider } from "@/components/providers/ExperienceProvider";
import { Navbar } from "@/components/navigation/Navbar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { AtmosphereSwitcher } from "@/components/ui/AtmosphereSwitcher";
import { SoundToggle } from "@/components/ui/SoundToggle";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <ExperienceProvider>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      <Navbar />

      <main>{children}</main>

      {/* floating controls */}
      <div
        aria-hidden={!loaded}
        className={`fixed bottom-6 right-5 z-40 flex flex-col items-center gap-3 transition-opacity duration-700 ${
          loaded ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <SoundToggle />
        <AtmosphereSwitcher />
      </div>
    </ExperienceProvider>
  );
}
