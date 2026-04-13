import React from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { newPasswordSchema } from "../../schema/newPassword";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Password = ({ user }) => {
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
        values
      );
      if (res.status === 200) {
        toast.success("Password updated successfully");
        actions.resetForm();
      }
    } catch (err) {
      toast.error("Failed to update password!");
      console.log(err);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: newPasswordSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "New Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 2,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm New Password",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
    },
  ];

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-6">
        <Title addClass="text-4xl text-secondary">Security</Title>
        <p className="text-gray-400 text-sm mt-1">Update your password to keep your account secure.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          {inputs.map((input, index) => (
            <motion.div
              key={input.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Password;
