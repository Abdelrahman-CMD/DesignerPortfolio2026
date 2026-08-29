import Image from "next/image";

export type CaseStyleGuideData = {
  project: string;
  logo: string;
  logoAlt: string;
  displayFont: string;
  displayUse: string;
  interfaceFont: string;
  interfaceUse: string;
  colors: { name: string; value: string; ink: string }[];
  variant: "tareeqi" | "guidance" | "ayn" | "bayn";
};

export function CaseStyleGuide({ data }: { data: CaseStyleGuideData }) {
  return (
    <div className={`tc-style-board tc-style-board-${data.variant}`}>
      <header className="tc-style-board-head">
        <span>05 / VISUAL SYSTEM</span>
        <Image src={data.logo} alt={data.logoAlt} width={420} height={140} />
      </header>

      <div className="tc-style-type" aria-label={`${data.project} typografie`}>
        <article>
          <strong>Aa</strong>
          <div><b>{data.displayFont}</b><span>{data.displayUse}</span></div>
        </article>
        <article>
          <strong>Aa</strong>
          <div><b>{data.interfaceFont}</b><span>{data.interfaceUse}</span></div>
        </article>
      </div>

      <div className="tc-style-colors" aria-label={`${data.project} kleurenpalet`}>
        {data.colors.map((color) => (
          <div key={color.value} style={{ background: color.value, color: color.ink }}>
            <b>{color.name}</b><span>{color.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
