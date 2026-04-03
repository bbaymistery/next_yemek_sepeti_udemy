import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { FaTimes, FaCloudUploadAlt, FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

const AddProduct = ({ setIsProductModal }) => {
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("pizza");
  const [prices, setPrices] = useState([]);

  const [extra, setExtra] = useState({ text: "", price: "" });
  const [extraOptions, setExtraOptions] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const handleExtra = (e) => {
    e.preventDefault();
    if (extra.text && extra.price) {
      setExtraOptions((prev) => [...prev, extra]);
      setExtra({ text: "", price: "" }); // Reset after adding
    }
  };

  const handleOnChange = (changeEvent) => {
    const currentFile = changeEvent.target.files[0];
    if (!currentFile) return;

    setFile(currentFile);

    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(currentFile);
  };

  const changePrice = (e, index) => {
    const currentPrices = [...prices];
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleCreate = async () => {
    if (!file) {
      toast.error("Please choose an image!");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "food-ordering");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dyplegxqx/image/upload",
        data
      );
      
      const { url } = uploadRes.data;
      const newProduct = {
        img: url,
        title,
        desc,
        category: category.toLowerCase(),
        prices,
        extraOptions,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        newProduct
      );

      if (res.status === 201) {
        setIsProductModal(false);
        toast.success("Product created successfully!");
      }
    } catch (err) {
      console.log("Cloudinary error:", err.response?.data || err);
      toast.error(
        err.response?.data?.error?.message || "Upload failed, check console"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm transition-all duration-300 p-4">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="relative w-full max-w-2xl bg-white shadow-2xl shadow-gray-900/20 border border-gray-100 rounded-[2rem] p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in-up">
          
          <button
            className="absolute top-6 right-6 text-gray-400 hover:text-danger hover:bg-red-50 p-2 rounded-full transition-all duration-300"
            onClick={() => setIsProductModal(false)}
          >
            <FaTimes size={20} />
          </button>

          <div className="mb-8">
            <Title addClass="text-4xl text-gray-800 font-extrabold tracking-tight">Add New Product</Title>
            <p className="text-gray-500 mt-2">Fill in the details below to add a new item to your menu.</p>
          </div>

          <div className="space-y-6">
            {/* Image Upload */}
            <div className="flex flex-col items-center justify-center">
              <label className="w-full flex justify-center">
                <input
                  type="file"
                  onChange={handleOnChange}
                  className="hidden"
                  accept="image/*"
                />
                <div className={`w-full group cursor-pointer border-2 border-dashed ${imageSrc ? 'border-primary/50 bg-primary/5' : 'border-gray-300 hover:border-primary bg-gray-50 hover:bg-primary/5'} rounded-2xl p-8 flex flex-col items-center justify-center transition-all duration-300`}>
                  {imageSrc ? (
                    <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-300">
                      <Image src={imageSrc} layout="fill" objectFit="cover" alt="Preview" />
                    </div>
                  ) : (
                    <>
                      <FaCloudUploadAlt className="text-5xl text-gray-400 group-hover:text-primary transition-colors duration-300 mb-3" />
                      <span className="text-gray-500 font-medium group-hover:text-primary transition-colors duration-300">Click to upload product image</span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                    </>
                  )}
                </div>
              </label>
            </div>

            {/* Basic Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 mb-2">Product Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary outline-none focus:ring-4 focus:ring-primary/10 transition-all text-gray-700 font-medium"
                  placeholder="e.g. Margherita Pizza"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 mb-2">Category</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary outline-none focus:ring-4 focus:ring-primary/10 transition-all text-gray-700 font-medium appearance-none cursor-pointer"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option value={cat.title.toLowerCase()} key={cat._id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary outline-none focus:ring-4 focus:ring-primary/10 transition-all text-gray-700 font-medium min-h-[100px] resize-y"
                placeholder="Describe your product..."
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            {/* Pricing Section */}
            <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100">
              <label className="text-sm font-bold text-gray-700 mb-4 block">Pricing Configuration</label>
              <div className="flex flex-wrap gap-4">
                {category === "pizza" ? (
                  <>
                    <div className="flex-1 min-w-[120px]">
                      <span className="text-xs text-gray-500 font-bold uppercase mb-1 block">Small</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                        <input
                          type="number"
                          className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary outline-none transition-all font-semibold"
                          placeholder="0.00"
                          onChange={(e) => changePrice(e, 0)}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-[120px]">
                      <span className="text-xs text-gray-500 font-bold uppercase mb-1 block">Medium</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                        <input
                          type="number"
                          className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary outline-none transition-all font-semibold"
                          placeholder="0.00"
                          onChange={(e) => changePrice(e, 1)}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-[120px]">
                      <span className="text-xs text-gray-500 font-bold uppercase mb-1 block">Large</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                        <input
                          type="number"
                          className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary outline-none transition-all font-semibold"
                          placeholder="0.00"
                          onChange={(e) => changePrice(e, 2)}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 min-w-[150px]">
                     <span className="text-xs text-gray-500 font-bold uppercase mb-1 block">Standard Price</span>
                     <div className="relative">
                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                       <input
                         type="number"
                         className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary outline-none transition-all font-semibold"
                         placeholder="0.00"
                         onChange={(e) => changePrice(e, 0)}
                       />
                     </div>
                  </div>
                )}
              </div>
            </div>

            {/* Extras Section */}
            <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100">
              <label className="text-sm font-bold text-gray-700 mb-4 block">Extra Ingredients</label>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary outline-none transition-all font-medium bg-white"
                    placeholder="e.g. Extra Cheese"
                    name="text"
                    value={extra.text}
                    onChange={(e) => setExtra({ ...extra, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="flex-1 sm:max-w-[150px] relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary outline-none transition-all font-medium bg-white"
                    placeholder="2.50"
                    name="price"
                    value={extra.price}
                    onChange={(e) => setExtra({ ...extra, [e.target.name]: e.target.value })}
                  />
                </div>
                <button 
                  className="px-6 py-2.5 rounded-lg text-white font-bold bg-secondary hover:bg-secondary/90 transition-all shadow-sm outline-none shrink-0" 
                  onClick={handleExtra}
                >
                  Add Extra
                </button>
              </div>

              {extraOptions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                  {extraOptions.map((item, index) => (
                    <div
                      className="group flex items-center bg-white border border-primary/30 text-primary px-3 py-1.5 rounded-full text-sm font-bold shadow-sm transition-all hover:bg-red-50 hover:border-red-200 hover:text-red-500 cursor-pointer"
                      key={index}
                      onClick={() => setExtraOptions(extraOptions.filter((_, i) => i !== index))}
                    >
                      <span>{item.text} (+${item.price})</span>
                      <FaTimes className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-6 border-t border-gray-100 flex gap-4 justify-end">
              <button
                className="px-8 py-3 rounded-xl text-gray-600 font-bold bg-gray-100 hover:bg-gray-200 transition-all outline-none"
                onClick={() => setIsProductModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-10 py-3 rounded-xl text-white font-bold bg-primary shadow-lg shadow-primary/40 hover:-translate-y-1 hover:bg-primary/95 transition-all outline-none"
                onClick={handleCreate}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddProduct;
