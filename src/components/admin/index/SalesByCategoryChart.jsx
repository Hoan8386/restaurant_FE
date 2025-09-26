import { Bar } from "react-chartjs-2";

const SalesByCategoryChart = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Doanh thu theo danh mục" },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md mb-6 mt-3">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SalesByCategoryChart;
