import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { registerSchema } from "../../schema/register";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import Image from "next/image";
import { FaCloudUploadAlt, FaShieldAlt } from "react-icons/fa";

const Register = () => {
  const { push } = useRouter();
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState();

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

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    setLoading(true);
    let imageUrl = "";

    try {
      if (file) {
        console.log("Uploading image to Cloudinary...");
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "food-ordering");
        data.append("folder", "food-ordering");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dyplegxqx/image/upload",
          data
        );
        imageUrl = uploadRes.data.secure_url || uploadRes.data.url;
        console.log("Image uploaded successfully:", imageUrl);
      }

      console.log("Sending registration data:", { ...values, image: imageUrl });
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        { ...values, image: imageUrl }
      );

      console.log({ res });

      if (res.status === 200) {
        toast.success("Account created successfully!");
        push("/auth/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed!");
      console.log(err);
    } finally {
      setLoading(false);
    }
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

  // Password Strength Logic
  const passwordStrength = useMemo(() => {
    const pass = values.password;
    if (!pass) return { score: 0, label: "", color: "bg-gray-200" };
    
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 20, label: "Weak", color: "bg-red-500" };
    if (score <= 3) return { score: 60, label: "Medium", color: "bg-yellow-500" };
    return { score: 100, label: "Strong", color: "bg-green-500" };
  }, [values.password]);

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
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/food-login-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="bg-white/95 backdrop-blur-2xl shadow-2xl rounded-[3rem] p-8 md:p-12 border border-white/30">
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Title addClass="text-5xl mb-2 text-secondary">Join Us</Title>
              <p className="text-gray-500 font-medium">Create your profile to start ordering.</p>
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <label className="relative group cursor-pointer">
                <input type="file" onChange={handleOnChange} className="hidden" accept="image/*" />
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-primary/40 group-hover:border-primary bg-primary/5 flex items-center justify-center overflow-hidden transition-all duration-300 shadow-inner">
                  {imageSrc ? (
                    <Image src={imageSrc} layout="fill" objectFit="cover" alt="Avatar" className="rounded-full" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <FaCloudUploadAlt className="text-2xl text-primary/60 group-hover:text-primary mb-1" />
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Avatar</span>
                    </div>
                  )}
                </div>
                {imageSrc && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    <FaCloudUploadAlt className="text-white text-xl" />
                  </div>
                )}
              </label>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inputs.map((input, index) => (
                <motion.div
                  key={input.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="relative"
                >
                  <Input
                    {...input}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {input.name === "password" && values.password && (
                     <div className="mt-2 px-1">
                        <div className="flex items-center justify-between mb-1">
                           <span className="text-[10px] uppercase font-bold text-gray-400">Strength: {passwordStrength.label}</span>
                           <FaShieldAlt className={`text-xs ${passwordStrength.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${passwordStrength.score}%` }}
                              className={`h-full ${passwordStrength.color} transition-all duration-500`}
                           />
                        </div>
                     </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-2"
            >
              <button
                className="w-full h-14 bg-primary text-secondary font-bold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase tracking-wider flex items-center justify-center gap-x-2"
                type="submit"
                disabled={loading || Boolean(Object.keys(touched).length > 0 && Object.keys(errors).length > 0)}
              >
                {loading ? (
                   <div className="w-6 h-6 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                ) : (
                  "Create Account"
                )}
              </button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          >
            <Link href="/auth/login">
              <span className="text-sm font-semibold text-gray-500 hover:text-primary cursor-pointer transition-colors duration-200 underline decoration-2 underline-offset-4">
                Already member? Login now
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
