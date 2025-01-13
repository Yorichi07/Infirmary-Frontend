import { useState, ReactElement } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartLegendContent,
  ChartLegend,
} from "@/components/ui/chart";
import { ViewType } from "./types";
import { dailyData, monthlyData, yearlyData, medicineData } from "./data";

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
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="medicine"
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

  return (
    <div className="flex flex-col justify-center items-center bg-[#ECECEC] min-h-[84svh] overflow-hidden max-lg:min-h-[93svh] p-8 gap-8">
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
      {renderMedicineChart()}
    </div>
  );
};

export default AnalyticsDashboard;
