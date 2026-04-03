import axios from "axios";
import { useEffect, useState } from "react";
import Input from "../form/Input";
import Title from "../ui/Title";

const Category = () => {
  const [inputText, setInputText] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const handleCreate = async (e) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        { title: inputText }
      );
      setCategories([...categories, res.data]);
      setInputText("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      if (confirm("Are you sure you want to delete this category?")) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
        );
        setCategories(categories.filter((cat) => cat._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Title addClass="text-[40px] text-gray-800">Categories</Title>
          <p className="text-gray-500 mt-1">Add or remove food categories.</p>
        </div>
      </div>
      
      <div className="max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col sm:flex-row gap-4 items-center transition-all hover:shadow-md">
          <div className="flex-1 w-full relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
               <i className="fa fa-tags text-gray-400 group-focus-within:text-primary transition-colors"></i>
            </div>
            <input
              type="text"
              placeholder="Add a new Category..."
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-gray-700 bg-gray-50 focus:bg-white font-medium"
            />
          </div>
          <button 
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-bold bg-primary shadow-md shadow-primary/30 hover:-translate-y-0.5 hover:bg-primary/95 transition-all outline-none whitespace-nowrap" 
            onClick={handleCreate}
          >
            Add Category
          </button>
        </div>

        <div className="max-h-[400px] overflow-auto custom-scrollbar pr-2 space-y-3">
          {categories.length > 0 ? categories.map((category) => (
            <div 
              className="flex justify-between items-center bg-gray-50/80 border border-gray-100 rounded-xl p-5 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all duration-300 group" 
              key={category._id}
            >
              <b className="text-lg text-gray-700 font-bold flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary/80 group-hover:scale-150 transition-transform duration-300" />
                {category.title}
              </b>
              <button
                className="px-5 py-2 rounded-lg text-white font-bold bg-danger/80 hover:bg-danger shadow-sm shadow-danger/20 hover:-translate-y-0.5 transition-all outline-none opacity-80 group-hover:opacity-100"
                onClick={(e) => handleDelete(e, category._id)}
              >
                Delete
              </button>
            </div>
          )) : (
            <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
              No categories found. Start by adding one above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
