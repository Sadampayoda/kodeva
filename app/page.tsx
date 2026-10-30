"use client";

import LandingPage from "@/pages/LandingPage";
import useLandingPage from "@/hooks/useLandingPage";

export default function Page() {
  const landingState = useLandingPage();

  return <LandingPage {...landingState} />;
}
