import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { registerSchema } from "../../schema/register";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Register = () => {
  const { push } = useRouter();

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        values
      );
      if (res.status === 200) {
        toast.success("User created successfully");
        push("/auth/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
      console.log(err);
    }
    actions.resetForm();
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: registerSchema,
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
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Your Password Again",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-100px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/food-login-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glassmorphism Card */}
        <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-[2.5rem] p-8 md:p-12 border border-white/20">
          <div className="text-center mb-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
               <Title addClass="text-5xl mb-2 text-secondary">Register</Title>
               <p className="text-gray-500 font-medium text-xs">Join our food community today!</p>
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              {inputs.map((input, index) => (
                <motion.div
                  key={input.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Input
                    {...input}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-2"
            >
              <button 
                className="w-full h-14 bg-primary text-secondary font-bold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase tracking-wider"
                type="submit"
                disabled={Object.keys(touched).length > 0 && Object.keys(errors).length > 0}
              >
                Create Account
              </button>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-5 text-center"
          >
            <Link href="/auth/login">
              <span className="text-sm font-semibold text-gray-500 hover:text-primary cursor-pointer transition-colors duration-200 underline decoration-2 underline-offset-4">
                Already have an account? Login here.
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
