"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Line } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card"; // Shadcn Card
import { Button } from "@/components/ui/button"; // Shadcn Button
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Home() {
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
          backgroundColor: "rgba(34, 197, 94, 0.2)", // greenish background
          borderColor: "rgba(34, 197, 94, 1)",
          tension: 0.4,
        },
      ],
    };
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-[25%] bg-white shadow-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold text-center mb-6 text-green-600">
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
              <h3 className="text-2xl font-bold mb-4 text-green-700">
                {selectedCompany} Overview
              </h3>
              <Line data={getChartData()} />
            </CardContent>
          </Card>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-lg">
              Please select an index to view the chart 📈
            </p>
          </div>
        )}
      </div>
    </div>
  );
}



