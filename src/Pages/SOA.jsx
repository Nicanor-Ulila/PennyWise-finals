import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import DbHeader from "../Components/DbHeader";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const SOA = () => {
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    const storedTransactions = JSON.parse(sessionStorage.getItem("transactions")) || [];

    // Exclude removed transactions
    const filteredTransactions = storedTransactions.filter((tx) => !tx.removed);

    const data = filteredTransactions.reduce((acc, tx) => {
      const month = new Date(tx.date).toLocaleString("default", { month: "long", year: "numeric" });

      if (!acc[month]) {
        acc[month] = { income: 0, expense: 0, savings: 0 };
      }

      if (tx.type === "income") {
        acc[month].income += parseFloat(tx.amount);
      } else if (tx.type === "expense") {
        acc[month].expense += parseFloat(tx.amount);
      } else if (tx.type === "Savings") {
        acc[month].savings += parseFloat(tx.amount);
      }

      return acc;
    }, {});

    Object.keys(data).forEach((month) => {
      const { income, expense, savings } = data[month];
      data[month].others = income - (expense + savings); // Remaining income
    });

    setMonthlyData(data);
  }, []);

  const getJudgment = (monthData) => {
    const { income, expense, savings, others } = monthData;

    const expensePercent = (expense / income) * 100;
    const savingsPercent = (savings / income) * 100;
    const othersPercent = (others / income) * 100;

    let overallJudgment = {
      summary: "Your financial distribution needs improvement.",
      advice: "Consider reducing discretionary spending and prioritizing savings to improve long-term stability.",
    };

    if (expensePercent <= 50 && savingsPercent >= 20 && othersPercent <= 30) {
      overallJudgment = {
        summary: "Excellent financial management!",
        advice: "Keep up the good work and continue building your savings for future financial goals.",
      };
    } else if (expensePercent <= 60 && savingsPercent >= 10 && othersPercent <= 40) {
      overallJudgment = {
        summary: "Good financial performance.",
        advice: "You’re doing well, but try to increase your savings slightly to prepare for emergencies or investments.",
      };
    }

    return {
      overall: overallJudgment,
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const monthData = Object.values(monthlyData)[context.dataIndex];
            const category = context.dataset.label.replace(" (%)", "");
            const total = monthData.income;
            let absoluteValue;

            if (category === "Expenses") absoluteValue = monthData.expense;
            if (category === "Savings") absoluteValue = monthData.savings;
            if (category === "Others") absoluteValue = monthData.others;

            return `${category}: ₱${absoluteValue.toLocaleString()} (${context.raw.toFixed(2)}%)`;
          },
        },
      },
      legend: { position: "top" },
      title: { display: true, text: "Monthly Budget Analysis" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (value) => `${value}%` },
      },
    },
  };

  return (
    <div className="flex w-full h-screen bg-[#f5e8c7]">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        {/* Fixed DbHeader */}
        <div className="pt-6">
          <DbHeader />
        </div>
        {/* Scrollable Content */}
        <div className="flex flex-col items-center mt-6 px-6 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Monthly Budget Report</h2>
          {Object.keys(monthlyData).length > 0 ? (
            <div className="space-y-10 w-full">
              {Object.entries(monthlyData).map(([month, data], index) => {
                const judgment = getJudgment(data);

                // Prepare chart data for each month
                const chartData = {
                  labels: ["Expenses", "Savings", "Others"],
                  datasets: [
                    {
                      label: `${month} Breakdown`,
                      data: [
                        (data.expense / data.income) * 100,
                        (data.savings / data.income) * 100,
                        (data.others / data.income) * 100,
                      ],
                      backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(75, 192, 192, 0.6)"],
                    },
                  ],
                };

                return (
                  <div key={index} className="flex flex-col gap-4 items-center w-full sm:flex-row sm:justify-between">
                    {/* Monthly Report */}
                    <div className="bg-[#435585] text-white p-4 rounded-lg shadow-lg w-full sm:w-[45%] mb-6 sm:mb-0">
                      <h3 className="font-bold text-lg mb-3">{month}</h3>
                      <p>Total Income: ₱{data.income.toLocaleString()}</p>
                      <p>
                        Expenses: ₱{data.expense.toLocaleString()} (
                        {((data.expense / data.income) * 100).toFixed(2)}%)
                      </p>
                      <p>
                        Savings: ₱{data.savings.toLocaleString()} (
                        {((data.savings / data.income) * 100).toFixed(2)}%)
                      </p>
                      <p>
                        Others: ₱{data.others.toLocaleString()} (
                        {((data.others / data.income) * 100).toFixed(2)}%)
                      </p>
                      <div className="mt-3">
                        <p className="text-lg font-semibold">Overall:</p>
                        <p>{judgment.overall.summary}</p>
                        <p className="text-sm mt-2 italic text-yellow-200">
                          {judgment.overall.advice}
                        </p>
                      </div>
                    </div>
                    {/* Bar Chart */}
                    <div className="relative w-full sm:w-[45%]">
                      <div className="h-[300px] overflow-hidden">
                        <Bar
                          data={chartData}
                          options={{
                            ...chartOptions,
                            maintainAspectRatio: true, // Make chart responsive
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">No transaction data available for the graph.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOA;
