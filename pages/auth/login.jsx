import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { loginSchema } from "../../schema/login";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    setLoading(true);
    const { email, password } = values;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error(result.error);
        setLoading(false);
        return;
      }

      actions.resetForm();
      const session = await getSession();

      if (session?.user?.role === "admin") {
        push("/admin/profile");
      } else {
        const usersRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users`
        );
        const currentUser = usersRes.data?.find(
          (user) => user.email === session?.user?.email
        );
        push("/profile/" + currentUser?._id);
      }
    } catch (err) {
      toast.error("Giriş sırasında bir hata oluştu.");
      console.error(err);
      setLoading(false);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit,
      validationSchema: loginSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-100px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Premium Background Image with Overlay */}
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
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
               <Title addClass="text-5xl mb-2 text-secondary">Login</Title>
               <p className="text-gray-500 font-medium text-sm">Welcome back! Please enter your details.</p>
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
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
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <button 
                className="w-full h-14 bg-primary text-secondary font-bold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase tracking-wider flex items-center justify-center gap-x-2"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                   <div className="w-6 h-6 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-[12px] font-medium">Or continue with</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button
                className="w-full h-14 bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center gap-x-3 hover:bg-slate-800 hover:scale-[1.02] transition-all duration-300 shadow-xl"
                type="button"
                onClick={() => signIn("github")}
              >
                <FaGithub className="text-2xl" />
                GitHub
              </button>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <Link href="/auth/register">
              <span className="text-sm font-semibold text-gray-500 hover:text-primary cursor-pointer transition-colors duration-200 underline decoration-2 underline-offset-4">
                Don't have an account? Join us today!
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    if (session.user.role === "admin") {
      return {
        redirect: { destination: "/admin/profile", permanent: false },
      };
    }

    try {
      const usersRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`
      );
      const user = usersRes.data?.find(
        (u) => u.email === session.user.email
      );
      if (user) {
        return {
          redirect: { destination: "/profile/" + user._id, permanent: false },
        };
      }
    } catch (_) {}
  }

  return { props: {} };
}

export default Login;
