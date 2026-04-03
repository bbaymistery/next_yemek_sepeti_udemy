import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../ui/Title";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const status = ["preparing", "on the way", "delivered"];
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  const handleStatus = async (id) => {
    const item = orders.find((order) => order._id === id);
    const currentStatus = item.status;

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        {
          status: currentStatus + 1,
        }
      );
      setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Title addClass="text-[40px] text-gray-800">Orders Management</Title>
          <p className="text-gray-500 mt-1">Track and update customer orders.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full relative">
        <div className="overflow-x-auto max-h-[500px] custom-scrollbar">
          <table className="w-full text-sm text-center text-gray-600 xl:min-w-[1000px]">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50/50 sticky top-0 z-10 backdrop-blur-md border-b border-gray-100">
              <tr>
                <th scope="col" className="py-5 px-6 tracking-widest font-semibold">ORDER ID</th>
                <th scope="col" className="py-5 px-6 tracking-widest font-semibold">CUSTOMER</th>
                <th scope="col" className="py-5 px-6 tracking-widest font-semibold">TOTAL</th>
                <th scope="col" className="py-5 px-6 tracking-widest font-semibold">PAYMENT</th>
                <th scope="col" className="py-5 px-6 tracking-widest font-semibold">STATUS</th>
                <th scope="col" className="py-5 px-6 tracking-widest font-semibold right-0 sticky bg-gray-50/90 backdrop-blur-md">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.length > 0 ? (
                orders
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((order) => (
                    <tr
                      className="transition-all duration-300 hover:bg-gray-50/80 group"
                      key={order?._id}
                    >
                      <td className="py-5 px-6 font-mono text-xs text-gray-400 tracking-wider">
                        {order?._id.substring(0, 8)}...
                      </td>
                      <td className="py-5 px-6 font-bold text-gray-700 text-base">
                        {order?.customer}
                      </td>
                      <td className="py-5 px-6 font-bold text-secondary text-base">
                        ${order?.total}
                      </td>
                      <td className="py-5 px-6">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          order?.method === 0 
                            ? "bg-blue-50 text-blue-600 border border-blue-100" 
                            : "bg-purple-50 text-purple-600 border border-purple-100"
                        }`}>
                          {order?.method === 0 ? "Cash" : "Card"}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          order?.status === 0 ? "bg-orange-50 text-orange-600 border border-orange-100" :
                          order?.status === 1 ? "bg-primary/20 text-yellow-700 border border-primary/30" :
                          "bg-green-50 text-green-600 border border-green-100"
                        }`}>
                          {status[order?.status]}
                        </span>
                      </td>
                      <td className="py-4 px-6 right-0 sticky bg-white/90 group-hover:bg-gray-50/90 backdrop-blur-md transition-colors">
                        <button
                          className={`px-6 py-2 rounded-xl text-white font-bold shadow-md hover:-translate-y-0.5 transition-all outline-none ${
                            order?.status > 1 
                              ? "bg-gray-300 cursor-not-allowed shadow-none hover:translate-y-0" 
                              : "bg-success/90 hover:bg-success shadow-success/20"
                          }`}
                          onClick={() => handleStatus(order?._id)}
                          disabled={order?.status > 1}
                        >
                          {order?.status > 1 ? "Completed" : "Next Stage"}
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-10 text-gray-400 text-center">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
