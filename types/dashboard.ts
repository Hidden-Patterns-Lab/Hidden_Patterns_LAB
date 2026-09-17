export type DashboardCategory = "housing" | "credit" | "markets" | "economy";

export type DashboardSeries = {
  id: string;
  label: string;
  unit: string;
  definition: string;
  source: string;
  color: string;
  values: readonly number[];
  insight: string;
};

export type DashboardDataset = {
  id: DashboardCategory;
  label: string;
  description: string;
  headline: string;
  takeaway: string;
  watch: string;
  series: readonly DashboardSeries[];
};
