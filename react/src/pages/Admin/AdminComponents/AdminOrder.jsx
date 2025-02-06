import { formatDate } from "../../../utils/helpers";
function AdminOrder({ order }) {
  return (
    <div key={order.id} className="border p-4 rounded-lg shadow-md">
      <p className="font-semibold">
        Ordered by: {order.user.name} | Date: {formatDate(order.created_at)}
      </p>
      <p>Items: {order.items_count}</p>

      <details className="mt-2">
        <summary className="cursor-pointer text-blue-600">View Items</summary>
        <ul className="mt-2 space-y-1">
          {order.items.map((item) => (
            <li key={item.id} className="border p-2 rounded-md">
              {item.name} - {item.price} €
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

export default AdminOrder;
