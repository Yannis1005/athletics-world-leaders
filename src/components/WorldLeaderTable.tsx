import { useState } from "react";
import type { WorldLeader } from "../types/worldLeader";

interface WorldLeaderTableProps {
  leaders: WorldLeader[];
}

export default function WorldLeaderTable({
  leaders,
}: WorldLeaderTableProps) {
  const [expandedYears, setExpandedYears] = useState<number[]>([]);

  const groupedByYear = leaders.reduce<Record<number, WorldLeader[]>>(
    (groups, leader) => {
      if (!groups[leader.year]) {
        groups[leader.year] = [];
      }

      groups[leader.year].push(leader);

      return groups;
    },
    {},
  );

  const years = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const toggleYear = (year: number) => {
    setExpandedYears((current) =>
      current.includes(year)
        ? current.filter((item) => item !== year)
        : [...current, year],
    );
  };

  return (
    <div className="table-container">
      <table className="leader-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Athlete</th>
            <th>Country</th>
            <th>Performance</th>
          </tr>
        </thead>

        <tbody>
          {years.map((year) => {
            const yearLeaders = groupedByYear[year];
            const hasMultipleLeaders = yearLeaders.length > 1;
            const isExpanded = expandedYears.includes(year);
            const mainLeader = yearLeaders[0];

            return (
              <>
                <tr key={year}>
                  <td className="year">{year}</td>

                  <td className="athlete">
                    {hasMultipleLeaders ? (
                      <div className="multiple-leaders">
                        <span>{yearLeaders.length} athletes tied</span>

                        <button
                          className={`expand-button ${
                            isExpanded ? "expanded" : ""
                          }`}
                          onClick={() => toggleYear(year)}
                          aria-label={
                            isExpanded
                              ? `Hide athletes from ${year}`
                              : `Show athletes from ${year}`
                          }
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      mainLeader.athlete
                    )}
                  </td>

                  <td>
                    {hasMultipleLeaders ? (
                      <span className="multiple-country">—</span>
                    ) : (
                        <span className="country">{mainLeader.flag}</span>
                    )}
                  </td>

                  <td className="performance">
                    {mainLeader.performance.toFixed(2)} m
                  </td>
                </tr>

                {hasMultipleLeaders && isExpanded && (
  <tr className="expanded-row">
    <td></td>

    <td colSpan={2}>
      <div className="expanded-athletes">
        {yearLeaders.map((leader) => (
          <div
            className="expanded-athlete"
            key={`${leader.year}-${leader.athlete}`}
          >
            <span className="flag">{leader.flag}</span>
            <span className="expanded-athlete-name">
              {leader.athlete}
            </span>
          </div>
        ))}
      </div>
    </td>

    <td></td>
  </tr>
)}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
