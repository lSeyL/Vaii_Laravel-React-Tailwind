import { useEffect, useState } from "react";
import api from "../../services/api";
import dayjs from "dayjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AdminSummary() {
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/admin/get-orders`);
        console.log("☝️ API Response:", response);

        const fetchedOrders = response.data.data;
        setOrders(fetchedOrders);
        const groupedSales = groupSalesByDay(fetchedOrders);
        const totalRevenue = fetchedOrders.reduce(
          (sum, order) => sum + (parseFloat(order.price) || 0),
          0
        );
        setTotalRevenue(totalRevenue);
        setTotalOrders(fetchedOrders.length);
        setSalesData(groupedSales);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const groupSalesByDay = (orders) => {
    const salesMap = new Map();

    orders.forEach((order) => {
      const date = dayjs(order.created_at).format("YYYY-MM-DD");
      const price = parseFloat(order.price) || 0;
      if (salesMap.has(date)) {
        salesMap.set(date, salesMap.get(date) + price);
      } else {
        salesMap.set(date, price);
      }
    });

    return Array.from(salesMap.entries())
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h2 className="text-xl font-bold">Sales</h2>

      <div style={{ fontSize: "18px", marginBottom: "20px" }}>
        <p>
          <strong>Total Revenue:</strong> {totalRevenue.toFixed(2)}€
        </p>
        <p>
          <strong>Total Orders:</strong> {totalOrders}
        </p>
      </div>
      <h3> Daily Sales (Past Month)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <XAxis
            dataKey="date"
            tickFormatter={(date) => dayjs(date).format("DD MMM")}
          />
          <YAxis />
          <Tooltip formatter={(value) => `€${value.toFixed(2)}`} />
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#4CAF50"
            strokeWidth={2}
            name="Daily Sales (€)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AdminSummary;
