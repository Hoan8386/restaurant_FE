import { UserOutlined } from "@ant-design/icons";

const TopCustomers = ({ customers }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md mt-3">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <UserOutlined /> Top khách hàng theo số đơn
      </h2>
      <table className="w-full border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Khách hàng</th>
            <th className="p-2 text-right">Số đơn</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((item, index) => (
            <tr
              key={item.username}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{item.username}</td>
              <td className="p-2 text-right">{item.totalOrders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopCustomers;
