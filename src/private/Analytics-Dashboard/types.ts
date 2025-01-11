export type ViewType = "daily" | "monthly" | "yearly";

export interface DataPoint {
  bidholi: number;
  kandoli: number;
  [key: string]: string | number;
}

export interface DailyData extends DataPoint {
  day: string;
}

export interface MonthlyData extends DataPoint {
  month: string;
}

export interface YearlyData extends DataPoint {
  year: string;
}

export interface MedicineData extends DataPoint {
  medicine: string;
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}
