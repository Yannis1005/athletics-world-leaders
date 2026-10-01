import {
  LineChart,
  ReferenceLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { WorldLeader } from "../types/worldLeader";

interface PerformanceChartProps {
  leaders: WorldLeader[];
  reference?: number;
  referenceLabel?: string;
  unit: string;
  lowerIsBetter?: boolean;
  tickStep?: number;
}

export default function PerformanceChart({
  leaders,
  reference,
  referenceLabel,
  unit,
  lowerIsBetter = false,
  tickStep = 0.05,
}: PerformanceChartProps) {
  const data = leaders
    .reduce<WorldLeader[]>((result, leader) => {
      const existing = result.find(
        (item) => item.year === leader.year
      );

      const isBetter =
        !existing ||
        (lowerIsBetter
          ? leader.performance < existing.performance
          : leader.performance > existing.performance);

      if (isBetter) {
        return [
          ...result.filter((item) => item.year !== leader.year),
          leader,
        ];
      }

      return result;
    }, [])
    .sort((a, b) => a.year - b.year);

  const minPerformance = Math.min(
    ...data.map((item) => item.performance)
  );

  const maxPerformance = Math.max(
    ...data.map((item) => item.performance)
  );

  const yAxisMin =
    Math.floor(minPerformance / tickStep) * tickStep;

  const yAxisMax =
    Math.ceil(maxPerformance / tickStep) * tickStep;

  const ticks: number[] = [];

  for (
    let value = yAxisMin;
    value <= yAxisMax + tickStep / 2;
    value += tickStep
  ) {
    ticks.push(Number(value.toFixed(2)));
  }

  return (
    <div className="performance-chart">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 80, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="year"
            type="number"
            domain={["dataMin", "dataMax"]}
            tickCount={8}
          />

          <YAxis
            domain={[yAxisMin, yAxisMax]}
            ticks={ticks}
            tickFormatter={(value) =>
              `${Number(value).toFixed(2)} ${unit}`
            }
          />

          <Tooltip
            formatter={(value) => [
              `${Number(value).toFixed(2)} ${unit}`,
              "Performance",
            ]}
            labelFormatter={(year) => `Year ${year}`}
          />

          {reference !== undefined && (
            <ReferenceLine
              y={reference}
              stroke="red"
              strokeWidth={2}
              label={{
                value:
                  referenceLabel ??
                  `${reference.toFixed(2)} ${unit}`,
                position: "right",
                fill: "red",
                fontSize: 13,
                fontWeight: "bold",
                dx: 10,
              }}
            />
          )}

          <Line
            type="monotone"
            dataKey="performance"
            stroke="#171717"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}