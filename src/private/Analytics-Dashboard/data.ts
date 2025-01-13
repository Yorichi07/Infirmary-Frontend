import { DailyData, MonthlyData, YearlyData, MedicineData } from "./types";

export const dailyData: DailyData[] = [
  { day: "01", bidholi: 50, kandoli: 40 },
  { day: "02", bidholi: 30, kandoli: 25 },
  { day: "03", bidholi: 70, kandoli: 60 },
  { day: "04", bidholi: 45, kandoli: 35 },
  { day: "05", bidholi: 55, kandoli: 45 },
  { day: "06", bidholi: 55, kandoli: 45 },
  { day: "07", bidholi: 55, kandoli: 45 },
];

export const monthlyData: MonthlyData[] = [
  { month: "January", bidholi: 300, kandoli: 250 },
  { month: "February", bidholi: 280, kandoli: 220 },
  { month: "March", bidholi: 320, kandoli: 270 },
  { month: "April", bidholi: 290, kandoli: 240 },
  { month: "May", bidholi: 290, kandoli: 240 },
  { month: "June", bidholi: 290, kandoli: 240 },
  { month: "July", bidholi: 290, kandoli: 240 },
  { month: "August", bidholi: 290, kandoli: 240 },
  { month: "September", bidholi: 290, kandoli: 240 },
  { month: "October", bidholi: 290, kandoli: 240 },
  { month: "November", bidholi: 290, kandoli: 240 },
  { month: "December", bidholi: 290, kandoli: 240 },
];

export const yearlyData: YearlyData[] = [
  { year: "2020", bidholi: 3600, kandoli: 3200 },
  { year: "2021", bidholi: 3700, kandoli: 3300 },
  { year: "2022", bidholi: 3900, kandoli: 3400 },
  { year: "2023", bidholi: 4100, kandoli: 3600 },
  { year: "2024", bidholi: 4300, kandoli: 3800 },
];

export const medicineData: MedicineData[] = [
  { medicine: "Paracetamol", bidholi: 150, kandoli: 120 },
  { medicine: "Ibuprofen", bidholi: 130, kandoli: 100 },
  { medicine: "Amoxicillin", bidholi: 100, kandoli: 90 },
  { medicine: "Metformin", bidholi: 90, kandoli: 85 },
  { medicine: "Atorvastatin", bidholi: 80, kandoli: 70 },
  { medicine: "Aspirin", bidholi: 75, kandoli: 65 },
  { medicine: "Omeprazole", bidholi: 70, kandoli: 60 },
  { medicine: "Ciprofloxacin", bidholi: 60, kandoli: 55 },
  { medicine: "Hydroxychloroquine", bidholi: 50, kandoli: 45 },
  { medicine: "Doxycycline", bidholi: 40, kandoli: 35 },
];

export const chartConfig = {
  bidholi: {
    label: "Bidholi",
    color: "#34D399",
  },
  kandoli: {
    label: "Kandoli",
    color: "#60A5FA",
  },
};
