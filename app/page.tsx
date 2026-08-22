import type { Metadata } from "next";
import { HomeExperience } from "./components/HomeExperience";

export const metadata: Metadata = {
  title: { absolute: "Abdelrahman — Senior Digital Designer" },
  description:
    "Ik ontwerp met alles wat ik onderweg leer: digitale producten op het snijvlak van strategie, menselijke waarde en doordachte vormgeving.",
};

export default function Home() {
  return <HomeExperience />;
}
