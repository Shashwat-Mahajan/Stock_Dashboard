"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Line } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "next-themes";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function StocksPage() {
  const { theme } = useTheme();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    fetch("/dump.csv")
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const data = result.data;
            const uniqueCompanies = [...new Set(data.map((d) => d.index_name))];
            setCompanies(uniqueCompanies);
            setCompanyData(data);
          },
        });
      });
  }, []);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const getChartData = () => {
    const filtered = companyData.filter(
      (d) => d.index_name === selectedCompany
    );
    return {
      labels: filtered.map((d) => d.index_date),
      datasets: [
        {
          label: selectedCompany || "",
          data: filtered.map((d) => parseFloat(d.closing_index_value)),
          fill: true,
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          borderColor: "rgba(34, 197, 94, 1)",
          tension: 0.4,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: theme === "dark" ? "#fff" : "#000",
        },
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
        titleColor: theme === "dark" ? "#fff" : "#000",
        bodyColor: theme === "dark" ? "#d1d5db" : "#111827",
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme === "dark" ? "#d1d5db" : "#374151",
        },
        grid: {
          color: theme === "dark" ? "#374151" : "#e5e7eb",
        },
      },
      y: {
        ticks: {
          color: theme === "dark" ? "#d1d5db" : "#374151",
        },
        grid: {
          color: theme === "dark" ? "#374151" : "#e5e7eb",
        },
      },
    },
  };

  return (
    <div
      className={`flex h-screen transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`w-[25%] p-4 overflow-y-auto shadow-lg ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl font-semibold text-center mb-6 ${
            theme === "dark" ? "text-green-400" : "text-green-600"
          }`}
        >
          Indexes
        </h2>
        <div className="space-y-2">
          {companies.map((company) => (
            <Button
              key={company}
              variant={selectedCompany === company ? "default" : "outline"}
              className="w-full"
              onClick={() => handleCompanyClick(company)}
            >
              {company}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 p-6 overflow-auto">
        {selectedCompany ? (
          <Card className="shadow-xl rounded-2xl p-6">
            <CardContent>
              <h3
                className={`text-2xl font-bold mb-4 ${
                  theme === "dark" ? "text-green-400" : "text-green-700"
                }`}
              >
                {selectedCompany} Overview
              </h3>
              <Line data={getChartData()} options={chartOptions} />
            </CardContent>
          </Card>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg opacity-70">📈 Please select an index</p>
          </div>
        )}
      </div>
    </div>
  );
}
