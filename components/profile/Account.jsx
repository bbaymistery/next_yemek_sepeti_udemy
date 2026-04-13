import React from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { profileSchema } from "../../schema/profile";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Account = ({ user }) => {
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
        values
      );
      if (res.status === 200) {
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        fullName: user?.fullName || "",
        phoneNumber: user?.phoneNumber || "",
        email: user?.email || "",
        address: user?.address || "",
        job: user?.job || "",
        bio: user?.bio || "",
      },
      onSubmit,
      validationSchema: profileSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Your Full Name",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "text",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Your Address",
      value: values.address,
      errorMessage: errors.address,
      touched: touched.address,
    },
    {
      id: 5,
      name: "job",
      type: "text",
      placeholder: "Your Job",
      value: values.job,
      errorMessage: errors.job,
      touched: touched.job,
    },
    {
      id: 6,
      name: "bio",
      type: "text",
      placeholder: "Your Bio",
      value: values.bio,
      errorMessage: errors.bio,
      touched: touched.bio,
    },
  ];

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-6">
        <Title addClass="text-4xl text-secondary">Account Settings</Title>
        <p className="text-gray-400 text-sm mt-1">Manage your personal information and profile details.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          {inputs.map((input, index) => (
            <motion.div
              key={input.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Input
                {...input}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-end pt-4">
          <button 
             className="px-10 h-14 bg-primary text-secondary font-bold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase tracking-wider"
             type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;
