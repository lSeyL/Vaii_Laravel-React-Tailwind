import { HiOutlineArrowDownOnSquare } from "react-icons/hi2";
import useOrders from "./hooks/useOrders";
function UserOrders() {
  const { orders, loading, error } = useOrders();

  const handleDownload = (fileUrl) => {
    if (!fileUrl) {
      alert("File is not available.");
      return;
    }
    window.open(fileUrl);
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-2 sm:p-3 md:p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders?.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4 flex flex-col items-center text-left">
          {orders?.map((order) => (
            <div
              key={order?.id}
              className="border p-4 rounded-lg shadow-md flex items-center justify-between w-full lg:w-2/3 "
            >
              <div>
                <p className="font-semibold">{order?.name}</p>
                <p>Category: {order?.category.name}</p>
                <p>Price: {order?.price} €</p>
                <p>
                  Purchased on:{" "}
                  {order?.created_at
                    ? new Date(order?.created_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {order?.image_file_path && (
                  <img
                    src={order.image_file_path}
                    alt={order.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}

                <div className="flex flex-col items-center gap-2">
                  {order?.file_url ? (
                    <button
                      onClick={() => handleDownload(order.file_url, order.name)}
                      className="icon-button"
                    >
                      <HiOutlineArrowDownOnSquare size={26} />
                    </button>
                  ) : (
                    <p className="text-red-500 text-sm">File not available</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserOrders;
