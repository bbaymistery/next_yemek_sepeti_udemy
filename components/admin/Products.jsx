import Title from "../ui/Title";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);

  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this product?")) {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        if (res.status === 200) {
          toast.success("Product Deleted!");
          getProducts();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex-1 w-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Title addClass="text-[40px] text-gray-800">Products Inventory</Title>
          <p className="text-gray-500 mt-1">Manage your restaurant&apos;s menu items.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full relative">
        <div className="overflow-x-auto max-h-[500px] custom-scrollbar">
          <table className="w-full text-sm text-center text-gray-600 xl:min-w-[1000px]">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50/50 sticky top-0 z-10 backdrop-blur-md border-b border-gray-100">
              <tr>
                <th scope="col" className="py-5 px-6 tracking-widest font-semibold">IMAGE</th>
                <th scope="col" className="py-5 px-6 tracking-widest font-semibold">ID</th>
                <th scope="col" className="py-5 px-6 tracking-widest font-semibold">TITLE</th>
                <th scope="col" className="py-5 px-6 tracking-widest font-semibold">PRICE</th>
                <th scope="col" className="py-5 px-6 tracking-widest font-semibold right-0 sticky bg-gray-50/90 backdrop-blur-md">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    className="transition-all duration-300 hover:bg-gray-50/80 group"
                    key={product._id}
                  >
                    <td className="py-4 px-6 relative flex justify-center items-center">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                        <Image
                          src={product.img}
                          alt={product.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-gray-400">
                      {product._id.substring(0, 7)}...
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-700 text-base">
                      {product.title}
                    </td>
                    <td className="py-4 px-6 font-bold text-secondary">
                      ${product.prices[0]}
                    </td>
                    <td className="py-4 px-6 right-0 sticky bg-white/90 group-hover:bg-gray-50/90 backdrop-blur-md transition-colors">
                      <button
                        className="px-6 py-2 rounded-xl text-white font-bold bg-danger/90 hover:bg-danger shadow-md shadow-danger/20 hover:-translate-y-0.5 transition-all outline-none"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-10 text-gray-400 text-center">
                    No products found. Click the + button to add one.
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

export default Products;
