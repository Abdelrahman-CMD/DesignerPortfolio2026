import type { Metadata } from "next";
import Image from "next/image";

/* Sinds een onbekende case een echte 404 geeft in plaats van een lege pagina
   met status 200, komt een bezoeker hier terecht. Zonder dit bestand is dat de
   standaardpagina van het framework: zwart op wit, systeemfont, Engels, en
   zonder weg terug. Dit is dezelfde 404 voor Google, maar wel een pagina van
   deze site.

   De stijl .not-found stond al in globals.css. */

export const metadata: Metadata = {
  title: { absolute: "Pagina niet gevonden · Abdelrahman Ahmed" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="not-found">
      <Image src="/merk.svg" alt="" width={1737} height={1472} unoptimized style={{ width: "auto", height: "3rem", margin: "0 auto" }} />
      <p>Deze pagina bestaat niet.</p>
      <a href="/nl#werk">Terug naar het werk</a>
    </main>
  );
}
