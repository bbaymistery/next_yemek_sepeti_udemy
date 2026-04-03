import Image from "next/image";
import Title from "../../components/ui/Title";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Cart = ({ userList }) => {
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = userList?.find((user) => user.email === session?.user?.email);
  const router = useRouter();

  const newOrder = {
    customer: user?.fullName,
    address: user?.address ? user?.address : "No address",
    total: cart.total,
    method: 0,
  };

  const createOrder = async () => {
    try {
      if (session) {
        if (confirm("Are you sure to order?")) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            newOrder
          );
          if (res.status === 201) {
            router.push(`/order/${res.data._id}`);
            dispatch(reset());
            toast.success("Order created successfully", {
              autoClose: 1000,
            });
          }
        }
      } else {
        toast.error("Please login first.", {
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_88px)] bg-[#f8f8fb] py-16 relative overflow-hidden">
      {/* Absolute Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Checkout Process</span>
            <Title addClass="text-5xl md:text-6xl text-gray-900 font-black tracking-tighter">Your Food Cart</Title>
          </div>
          {cart?.products?.length > 0 && (
            <button 
              onClick={() => {
                if(confirm("Are you sure you want to empty your cart?")) dispatch(reset());
              }} 
              className="text-sm font-semibold text-red-500 hover:text-white transition-colors flex items-center gap-2 bg-red-50 hover:bg-red-500 px-5 py-2.5 rounded-xl mb-2"
            >
              <i className="fa fa-trash"></i> Empty Cart
            </button>
          )}
        </div>

        {/* Layout */}
        <div className="flex flex-col xl:flex-row gap-10 items-start">
          
          {/* Cart Items List */}
          <div className="flex-1 w-full flex flex-col gap-6">
            {cart?.products?.length > 0 ? (
              <div className="flex flex-col gap-5">
                {cart.products.map((product, index) => (
                  <div key={index} className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 flex flex-col sm:flex-row items-center gap-8 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-primary/20 transition-all duration-300">
                    
                    {/* Image */}
                    <div className="relative w-32 h-32 shrink-0 rounded-[20px] overflow-hidden bg-gray-50 flex items-center justify-center p-3 border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                      <Image src={product?.img} alt={product.name} layout="fill" objectFit="contain" className="drop-shadow-xl" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col w-full text-center sm:text-left">
                      <h3 className="text-2xl font-extrabold text-gray-800">{product.name}</h3>
                      
                      <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                        {product.extras?.length > 0 ? (
                          product.extras.map((item) => (
                            <span key={item.id} className="bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/80"></span> {item.text}
                            </span>
                          ))
                        ) : (
                          <span className="bg-gray-50 border border-gray-100 text-gray-400 px-3 py-1.5 rounded-lg text-xs font-semibold">Standard Configuration</span>
                        )}
                      </div>
                    </div>

                    {/* Price & Qty */}
                    <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center w-full sm:w-auto gap-4 sm:gap-4 px-4 bg-gray-50/50 sm:bg-transparent rounded-2xl py-4 sm:py-0">
                      <div className="text-center sm:text-right">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Price</span>
                        <span className="text-2xl font-black text-gray-800">${product.price.toFixed(2)}</span>
                      </div>
                      
                      <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
                      
                      <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Qty</span>
                        <div className="bg-primary/10 text-primary font-black w-14 h-10 rounded-xl flex items-center justify-center text-lg">
                          {product.quantity}
                        </div>
                      </div>
                    </div>
                    
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[40px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-20 flex flex-col items-center justify-center text-center">
                 <div className="relative w-48 h-48 mb-8">
                   <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20"></div>
                   <div className="absolute inset-0 bg-gray-50 rounded-full border-8 border-white flex items-center justify-center shadow-inner">
                     <i className="fa fa-shopping-basket text-7xl text-gray-300"></i>
                   </div>
                 </div>
                 <h3 className="text-4xl font-black text-gray-800 mb-5 tracking-tight">Your cart is feeling lonely</h3>
                 <p className="text-gray-500 max-w-md text-lg mb-10 leading-relaxed font-medium">It looks like you haven't added any delicious food to your cart yet. Let's fix that!</p>
                 <button onClick={() => router.push('/menu')} className="px-12 py-5 text-xl rounded-2xl bg-primary text-white font-bold hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(200,20,20,0.2)] transition-all duration-300">
                   Discover Menu
                 </button>
              </div>
            )}
          </div>

          {/* Configuration and Summary Section */}
          <div className="w-full xl:w-[420px] shrink-0 sticky top-10">
            <div className="bg-[#1e1e2d] rounded-[36px] shadow-[0_20px_50px_rgb(0,0,0,0.2)] overflow-hidden relative border border-gray-700/50">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-primary/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
              
              <div className="p-10">
                <Title addClass="text-3xl text-white font-extrabold tracking-tight mb-8">Order Summary</Title>
                
                {/* Promo Code Input */}
                <div className="mb-10 relative group">
                  <input type="text" placeholder="Have a promo code?" className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 font-medium text-sm rounded-2xl px-5 py-4 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all" />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all">Apply</button>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center text-gray-400 font-semibold">
                    <span>Subtotal</span>
                    <span className="text-white font-bold text-xl">${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400 font-semibold">
                    <span>Discount</span>
                    <span className="text-white font-bold text-xl">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400 font-semibold">
                    <span>Delivery Fee</span>
                    <span className="font-extrabold text-[11px] uppercase tracking-widest bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-3 py-1.5 rounded-lg shadow-lg shadow-emerald-500/20">Free</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-8 mb-10 relative">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-gray-400 font-semibold block mb-1">Total to pay</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-extrabold">Taxes Included</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-400">${cart.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  className={`w-full py-5 rounded-2xl text-xl font-extrabold text-white shadow-xl transition-all flex items-center justify-center gap-3 relative overflow-hidden group ${
                    cart?.products?.length === 0 
                      ? 'bg-gray-800 opacity-50 cursor-not-allowed shadow-none border border-gray-700'
                      : 'bg-primary hover:-translate-y-1 hover:shadow-primary/50 active:scale-[0.98]'
                  }`}
                  onClick={createOrder}
                  disabled={cart?.products?.length === 0}
                >
                  {/* Subtle shine effect for active button */}
                  {cart?.products?.length !== 0 && (
                     <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:translate-x-[400%] transition-transform duration-1000"></div>
                  )}
                  <i className="fa fa-credit-card text-2xl"></i>
                  Complete Checkout
                </button>
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-gray-500 text-xs font-extrabold uppercase tracking-widest">
              <span className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><i className="fa fa-lock text-green-600 text-sm"></i></div> SSL Secure</span>
              <span className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><i className="fa fa-truck text-blue-600 text-sm"></i></div> 24/7 Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};

export default Cart;
