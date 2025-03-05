import { Grid } from "@chakra-ui/react";
import { MetricsGridProps } from "@/app/utils/types/metrics";
import MetricCard from "./MetricCard";

export default function MetricCards({
  metrics,
  columns = { base: 2, lg: 3, xl: 4 },
}: MetricsGridProps) {
  return (
    <Grid
      templateColumns={{
        base: `repeat(${columns.base || 2}, 1fr)`,
        md: `repeat(${columns.md || 2}, 1fr)`,
        lg: `repeat(${columns.lg || 3}, 1fr)`,
        xl: `repeat(${columns.xl || 4}, 1fr)`,
      }}
      gap={8}
      mb={8}
    >
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} animationDelay={index * 0.1} />
      ))}
    </Grid>
  );
}
