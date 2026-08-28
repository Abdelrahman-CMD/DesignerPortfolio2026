import type { Metadata } from "next";
import { PlaygroundExperience } from "../components/PlaygroundExperience";

export const metadata: Metadata = {
  title: "Playground",
  description: "Een atmosferische ruimte voor experimenten, schetsen en ideeën die nog niet in een case hoeven te passen.",
  openGraph: {
    title: "Playground — Abdelrahman",
    description: "Een atmosferische ruimte voor experimenten, schetsen en ideeën in ontwikkeling.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Playground — Abdelrahman",
    description: "Een atmosferische ruimte voor experimenten, schetsen en ideeën in ontwikkeling.",
    images: [],
  },
};

export default function PlaygroundPage() {
  return <PlaygroundExperience />;
}
