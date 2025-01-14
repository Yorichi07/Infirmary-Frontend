import { useState, ReactElement } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartLegendContent,
  ChartLegend,
} from "@/components/ui/chart";

// Types
type ViewType = "daily" | "monthly" | "yearly";

interface DataPoint {
  bidholi: number;
  kandoli: number;
  [key: string]: string | number;
}

interface DailyData extends DataPoint {
  day: string;
}

interface MonthlyData extends DataPoint {
  month: string;
}

interface YearlyData extends DataPoint {
  year: string;
}

interface MedicineData extends DataPoint {
  medicine: string;
}

interface DoctorData {
  name: string;
  patientCount: number;
}

interface ResidenceData {
  type: string;
  count: number;
}

interface SchoolData {
  name: string;
  count: number;
}

// Data
const dailyData: DailyData[] = [
  { day: "01", bidholi: 50, kandoli: 40 },
  { day: "02", bidholi: 30, kandoli: 25 },
  { day: "03", bidholi: 70, kandoli: 60 },
  { day: "04", bidholi: 45, kandoli: 35 },
  { day: "05", bidholi: 55, kandoli: 45 },
  { day: "06", bidholi: 55, kandoli: 45 },
  { day: "07", bidholi: 55, kandoli: 45 },
];

const monthlyData: MonthlyData[] = [
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

const yearlyData: YearlyData[] = [
  { year: "2020", bidholi: 3600, kandoli: 3200 },
  { year: "2021", bidholi: 3700, kandoli: 3300 },
  { year: "2022", bidholi: 3900, kandoli: 3400 },
  { year: "2023", bidholi: 4100, kandoli: 3600 },
  { year: "2024", bidholi: 4300, kandoli: 3800 },
];

const medicineData: MedicineData[] = [
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

const doctorData: DoctorData[] = [
  { name: "Dr. Smith", patientCount: 150 },
  { name: "Dr. Johnson", patientCount: 120 },
  { name: "Dr. Williams", patientCount: 180 },
  { name: "Dr. Brown", patientCount: 90 },
  { name: "Dr. Davis", patientCount: 140 },
];

const residenceData: ResidenceData[] = [
  { type: "Bidholi Campus", count: 450 },
  { type: "Kandoli Campus", count: 350 },
  { type: "Day Scholar", count: 250 },
  { type: "Other", count: 120 },
  { type: "Guest House (Kandoli)", count: 80 },
  { type: "Guest House (Bidholi)", count: 90 },
];

const schoolData: SchoolData[] = [
  { name: "SOCS", count: 280 },
  { name: "SOB", count: 220 },
  { name: "SOL", count: 180 },
  { name: "SOE", count: 320 },
  { name: "Guest", count: 150 },
  { name: "Non_Academics", count: 200 },
  { name: "SOHS", count: 190 },
  { name: "SOAE", count: 170 },
  { name: "SFL", count: 160 },
  { name: "SOD", count: 140 },
  { name: "SOLSM", count: 130 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const chartConfig = {
  bidholi: {
    label: "Bidholi",
    theme: {
      light: "#34D399",
      dark: "#34D399",
    },
  },
  kandoli: {
    label: "Kandoli",
    theme: {
      light: "#60A5FA",
      dark: "#60A5FA",
    },
  },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-600 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.fill }}
            />
            <span className="text-gray-700">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AnalyticsDashboard = () => {
  const [view, setView] = useState<ViewType>("daily");

  const getChartData = (view: ViewType) => {
    switch (view) {
      case "daily":
        return dailyData;
      case "monthly":
        return monthlyData;
      case "yearly":
        return yearlyData;
      default:
        return dailyData;
    }
  };

  const getDataKey = (view: ViewType) => {
    switch (view) {
      case "daily":
        return "day";
      case "monthly":
        return "month";
      case "yearly":
        return "year";
      default:
        return "day";
    }
  };

  const renderPatientVisitsChart = (): ReactElement => (
    <div className="w-full h-[400px]">
      <ChartContainer
        config={chartConfig}
        className="w-full h-full p-6 bg-background rounded-lg shadow-md"
      >
        <>
          <h2 className="text-lg font-semibold mb-4">Patient Visits</h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getChartData(view)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={getDataKey(view)}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis />
                <Tooltip
                  content={CustomTooltip}
                  cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  name="Bidholi"
                  dataKey="bidholi"
                  fill="var(--color-bidholi)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  name="Kandoli"
                  dataKey="kandoli"
                  fill="var(--color-kandoli)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      </ChartContainer>
    </div>
  );

  const renderMedicineChart = (): ReactElement => (
    <div className="w-full h-[400px]">
      <ChartContainer
        config={chartConfig}
        className="w-full h-full p-6 bg-background rounded-lg shadow-md"
      >
        <>
          <h2 className="text-lg font-semibold mb-4">
            Top 10 Medicines Prescribed (Current Month)
          </h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={medicineData}
                margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="medicine"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={0}
                />
                <YAxis />
                <Tooltip
                  cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                          <p className="font-semibold text-gray-600 mb-2">
                            {label}
                          </p>
                          {payload.map((entry: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.fill }}
                              />
                              <span className="text-gray-700">
                                {entry.name}: {entry.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  name="Bidholi"
                  dataKey="bidholi"
                  fill="var(--color-bidholi)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  name="Kandoli"
                  dataKey="kandoli"
                  fill="var(--color-kandoli)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      </ChartContainer>
    </div>
  );

  const renderDoctorChart = (): ReactElement => (
    <div className="w-full h-[400px]">
      <ChartContainer
        config={chartConfig}
        className="w-full h-full p-6 bg-background rounded-lg shadow-md"
      >
        <>
          <h2 className="text-lg font-semibold mb-4">
            Doctor-wise Patient Count
          </h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={doctorData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis />
                <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
                <Bar
                  dataKey="patientCount"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      </ChartContainer>
    </div>
  );

  const renderSchoolChart = (): ReactElement => (
    <div className="w-full h-[400px]">
      <ChartContainer
        config={chartConfig}
        className="w-full h-full p-6 bg-background rounded-lg shadow-md"
      >
        <>
          <h2 className="text-lg font-semibold mb-4">
            School-wise Patient Distribution
          </h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={schoolData}
                margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
                <Bar dataKey="count" fill="#FF8042" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      </ChartContainer>
    </div>
  );

  const renderResidenceChart = (): ReactElement => (
    <div className="w-full h-[400px]">
      <ChartContainer
        config={chartConfig}
        className="w-full h-full p-6 bg-background rounded-lg shadow-md"
      >
        <>
          <h2 className="text-lg font-semibold mb-4">
            Residence-wise Patient Distribution
          </h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={residenceData}
                margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="type"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
                <Bar dataKey="count" fill="#00C49F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      </ChartContainer>
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center bg-[#ECECEC] min-h-[84svh] overflow-hidden max-lg:min-h-[93svh] p-8 gap-4">
      <div className="flex items-center justify-start w-full">
        <h1 className="text-lg font-semibold bg-background p-4 rounded-lg shadow-md">
          Total Patient Count : 864
        </h1>
      </div>

      {/* Original charts section */}
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-end gap-2">
          <Button
            variant={view === "daily" ? "default" : "outline"}
            onClick={() => setView("daily")}
          >
            Daily
          </Button>
          <Button
            variant={view === "monthly" ? "default" : "outline"}
            onClick={() => setView("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={view === "yearly" ? "default" : "outline"}
            onClick={() => setView("yearly")}
          >
            Yearly
          </Button>
        </div>
        {renderPatientVisitsChart()}
      </div>

      {/* New charts grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderDoctorChart()}
        {renderResidenceChart()}
        {renderSchoolChart()}
        {renderMedicineChart()}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
