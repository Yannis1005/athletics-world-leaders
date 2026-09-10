import WorldLeaderTable from "../components/WorldLeaderTable";
import { highJumpMen } from "../data/highJumpMen";

export default function Home() {
  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">ATHLETICS WORLD LEADERS</p>

        <h1>Men's High Jump</h1>

        <p className="subtitle">
          The best performances by year
        </p>
      </header>

      <section className="content">
        <div className="section-heading">
          <div>
            <h2>World Leaders</h2>
            <p>
              Men's high jump · outdoor & indoor
            </p>
          </div>
        </div>

        <WorldLeaderTable leaders={highJumpMen} />
      </section>
    </main>
  );
}