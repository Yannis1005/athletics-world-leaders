import PerformanceChart from "../components/PerformanceChart";
import WorldLeaderTable from "../components/WorldLeaderTable";
import type { WorldLeader } from "../types/worldLeader";

interface DisciplinePageProps {
  title: string;
  subtitle: string;
  leaders: WorldLeader[];
  reference: number;
  referenceLabel: string;
  unit: string;
  lowerIsBetter?: boolean;
  tickStep: number;
}

export default function DisciplinePage({
  title,
  subtitle,
  leaders,
  reference,
  referenceLabel,
  unit,
  lowerIsBetter = false,
  tickStep,
}: DisciplinePageProps) {
  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">ATHLETICS WORLD LEADERS</p>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </header>

      <section className="content">
        <div className="section-heading">
          <div>
            <h2>World Leaders</h2>
            <p>{subtitle}</p>
          </div>
        </div>

        <PerformanceChart
          leaders={leaders}
          reference={reference}
          referenceLabel={referenceLabel}
          unit={unit}
          lowerIsBetter={lowerIsBetter}
          tickStep={tickStep}
        />

        <WorldLeaderTable leaders={leaders} />
      </section>
    </main>
  );
}