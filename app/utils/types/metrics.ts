import { IconType } from "react-icons";

export interface MetricCardData {
  title: string;
  value: string;
  change?: string;
  isIncrease?: boolean;
  icon: IconType;
  color: string;
  bgGradient: string;
}

export interface MetricsGridProps {
  metrics: MetricCardData[];
  columns?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}
