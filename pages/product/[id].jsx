import Image from "next/image";
import { useState } from "react";
import Title from "../../components/ui/Title";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Index = ({ food }) => {
  const [prices, setPrices] = useState(food.prices);
  const [price, setPrice] = useState(prices[0]);
  const [size, setSize] = useState(0);
  const [extraItems, setExtraItems] = useState(food?.extraOptions);
  const [extras, setExtras] = useState([]);
  const cart = useSelector((state) => state.cart);
  const findCart = cart.products.find((item) => item._id === food._id);

  const dispatch = useDispatch();

  const handleSize = (sizeIndex) => {
    const difference = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleChange = (e, item) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(item.price);
      setExtras([...extras, item]);
    } else {
      changePrice(-item.price);
      setExtras(extras.filter((extra) => extra.id !== item.id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...food, extras, price, quantity: 1 }));
  };

  return (
    <div className="min-h-[calc(100vh_-_88px)] bg-gray-50 flex items-center justify-center py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-[40px] shadow-2xl flex flex-col md:flex-row items-stretch border border-gray-100 overflow-hidden relative">
          
          {/* Left: Image Showcase */}
          <div className="w-full md:w-1/2 p-10 flex flex-col items-center justify-center relative bg-gradient-to-br from-primary/10 to-transparent min-h-[400px]">
            {/* Soft glowing blob behind the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
            
            <div className="relative w-full max-w-md aspect-square drop-shadow-2xl hover:scale-105 transition-transform duration-500 flex items-center justify-center">
              <Image src={food?.img} alt={food?.title} layout="fill" objectFit="contain" priority className="z-10" />
            </div>
          </div>

          {/* Right: Details & Configurator */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white z-20">
            <Title addClass="text-4xl md:text-5xl lg:text-5xl text-gray-800 font-extrabold tracking-tight leading-tight">
              {food?.title}
            </Title>
            
            <span className="text-primary text-3xl font-extrabold mt-4 mb-6 inline-block">
              ${price.toFixed(2)}
            </span>
            
            <p className="text-md text-gray-500 leading-relaxed mb-10">
              {food?.desc}
            </p>

            {/* Size Selector */}
            {food.category === "pizza" && (
              <div className="mb-8">
                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-6">Choose Size</h4>
                <div className="flex items-end gap-6 h-28">
                  {/* Size Small */}
                  <div className={`relative flex flex-col items-center justify-end gap-3 cursor-pointer transition-all duration-300 ${size === 0 ? 'scale-110 opacity-100' : 'opacity-60 hover:opacity-100'}`} onClick={() => handleSize(0)}>
                    <div className="relative w-10 h-10">
                      <Image src="/images/size.png" alt="Small" layout="fill" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full transition-colors ${size === 0 ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-gray-100 text-gray-600'}`}>Small</span>
                  </div>
                  
                  {/* Size Medium */}
                  <div className={`relative flex flex-col items-center justify-end gap-3 cursor-pointer transition-all duration-300 ${size === 1 ? 'scale-110 opacity-100' : 'opacity-60 hover:opacity-100'}`} onClick={() => handleSize(1)}>
                    <div className="relative w-14 h-14">
                      <Image src="/images/size.png" alt="Medium" layout="fill" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full transition-colors ${size === 1 ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-gray-100 text-gray-600'}`}>Medium</span>
                  </div>

                  {/* Size Large */}
                  <div className={`relative flex flex-col items-center justify-end gap-3 cursor-pointer transition-all duration-300 ${size === 2 ? 'scale-110 opacity-100' : 'opacity-60 hover:opacity-100'}`} onClick={() => handleSize(2)}>
                    <div className="relative w-20 h-20">
                      <Image src="/images/size.png" alt="Large" layout="fill" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full transition-colors ${size === 2 ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-gray-100 text-gray-600'}`}>Large</span>
                  </div>
                </div>
              </div>
            )}

            {/* Extras */}
            {extraItems?.length > 0 && (
              <div className="mb-10 mt-4">
                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">Add Extras</h4>
                <div className="flex flex-wrap gap-3">
                  {extraItems.map((item) => {
                    const isChecked = extras.some((extra) => extra._id === item._id);
                    return (
                      <label key={item._id} className="relative inline-flex items-center cursor-pointer group">
                        <input type="checkbox" className="sr-only" onChange={(e) => handleChange(e, item)} checked={isChecked} />
                        <div className={`flex items-center gap-2 px-4 py-2 border-2 rounded-xl transition-all font-semibold ${isChecked ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'}`}>
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${isChecked ? 'border-primary bg-primary' : 'border-gray-300 bg-white'}`}>
                              <i className={`fa fa-check text-[10px] text-white transition-opacity ${isChecked ? 'opacity-100' : 'opacity-0'}`}></i>
                          </div>
                          <span className="text-sm">{item.text} <span className="opacity-70 font-medium text-xs ml-1">(+${item.price})</span></span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <button
                className={`w-full py-4 rounded-2xl text-lg font-bold shadow-xl transition-all flex items-center justify-center gap-3
                  ${findCart ? 'bg-gray-200 text-gray-500 shadow-none cursor-not-allowed' : 'bg-primary text-white hover:-translate-y-1 hover:shadow-primary/40 active:scale-[0.98]'}`}
                onClick={handleClick}
                disabled={findCart}
              >
                {findCart ? (
                  <>
                    <i className="fa fa-shopping-basket text-xl"></i> Already in Cart
                  </>
                ) : (
                  <>
                    <i className="fa fa-shopping-cart text-xl"></i> Add to Cart - ${price.toFixed(2)}
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
  );

  return {
    props: {
      food: res.data ? res.data : null,
    },
  };
};

export default Index;
