import { Bar } from "react-chartjs-2";

const SalesByCategoryChart = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 12, weight: 600 },
          color: "#666",
          padding: 15,
        },
      },
      title: {
        display: true,
        text: "Doanh thu theo danh mục",
        font: { size: 16, weight: 700 },
        color: "#1a1a2e",
        padding: 15,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#666", font: { size: 11 } },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        ticks: { color: "#666", font: { size: 11 } },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SalesByCategoryChart;
