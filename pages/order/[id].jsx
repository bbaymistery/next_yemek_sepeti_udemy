import axios from "axios";
import Image from "next/image";
import Title from "../../components/ui/Title";
import { useState } from "react";
import { toast } from "react-toastify";

const Order = ({ order }) => {
  const [status, setStatus] = useState(order?.status);

  const getStatusState = (index) => {
    if (index - status < 1) return "completed";
    if (index - status === 1) return "active";
    if (index - status > 1) return "pending";
  };

  const steps = [
    { title: "Payment", image: "/images/paid.png" },
    { title: "Preparing", image: "/images/bake.png" },
    { title: "On the way", image: "/images/bike.png" },
    { title: "Delivered", image: "/images/delivered.png" },
  ];

  const handleNextStage = async () => {
    if (status >= 3) return;
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${order?._id}`,
        { status: status + 1 }
      );
      if (res.status === 200 || res.status === 201) {
        setStatus(status + 1);
        toast.success("Order status updated!");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_433px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Title addClass="text-4xl text-gray-800 font-extrabold tracking-tight mb-8">Order Status</Title>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Order Details Receipt */}
          <div className="flex-1 w-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 pb-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-800">Order Information</h3>
              <p className="text-sm text-gray-500 mt-1">Details and shipping for your recent purchase</p>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 mb-8">
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order ID</span>
                  <span className="block text-gray-800 font-semibold">{order?._id}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Customer</span>
                  <span className="block text-gray-800 font-semibold">{order?.customer}</span>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Delivery Address</span>
                  <span className="block text-gray-800 font-semibold">{order?.address}</span>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-gray-200 pt-6">
                <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                  <span>Total Amount</span>
                  <span className="text-2xl text-primary">${order?.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Status */}
          <div className="w-full md:w-[350px] shrink-0 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-8 border-b border-gray-100 pb-4">Track Delivery</h3>
            
            <div className="flex flex-col gap-8 relative flex-1">
              {/* Vertical connecting line */}
              <div className="absolute left-8 top-8 bottom-8 w-1 bg-gray-100 rounded-full z-0"></div>

              {steps.map((step, index) => {
                const state = getStatusState(index);
                
                return (
                  <div key={index} className="flex items-center gap-6 relative z-10">
                    <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center border-4 transition-all duration-500 bg-white
                      ${state === 'completed' ? 'border-success shadow-lg shadow-success/20' : ''}
                      ${state === 'active' ? 'border-primary animate-pulse shadow-lg shadow-primary/20' : ''}
                      ${state === 'pending' ? 'border-gray-100 opacity-50 grayscale' : ''}
                    `}>
                      <Image src={step.image} alt={step.title} width={32} height={32} objectFit="contain" />
                      
                      {state === 'completed' && (
                        <div className="absolute -bottom-2 -right-2 bg-success text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                          <i className="fa fa-check text-xs"></i>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col">
                      <span className={`font-bold text-lg transition-colors duration-500
                        ${state === 'completed' ? 'text-success' : ''}
                        ${state === 'active' ? 'text-primary' : ''}
                        ${state === 'pending' ? 'text-gray-400' : ''}
                      `}>
                        {step.title}
                      </span>
                      <span className="text-xs font-medium text-gray-400 mt-0.5">
                        {state === 'completed' ? 'Finished' : (state === 'active' ? 'In Progress' : 'Pending')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Advance Status Action */}
            {status < 3 && (
              <div className="pt-8 mt-4 border-t border-gray-100">
                <button
                  onClick={handleNextStage}
                  className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:-translate-y-1 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                >
                  Move to Next Stage <i className="fa fa-arrow-right ml-1"></i>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params?.id}`
  );

  return {
    props: {
      order: res.data ? res.data : null,
    },
  };
};

export default Order;
