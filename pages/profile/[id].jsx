import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Account from "../../components/profile/Account";
import Order from "../../components/profile/Order";
import Password from "../../components/profile/Password";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaKey, FaShoppingBag, FaSignOutAlt, FaCamera, FaTimes, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const Profile = ({ user }) => {
  const { data: session } = useSession();
  const [tabs, setTabs] = useState(0);
  const { push } = useRouter();
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(user.image || `https://ui-avatars.com/api/?name=${user.fullName}&background=random&color=fff`);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      signOut({ redirect: false });
      push("/auth/login");
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setShowConfirmModal(true); // Open confirmation modal after selecting image
    };
    reader.readAsDataURL(selectedFile);
  };

  const confirmUpdateImage = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "food-ordering");
    formData.append("folder", "food-ordering");

    try {
      toast.info("Uploading new profile picture...");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dyplegxqx/image/upload",
        formData
      );
      
      const { url } = uploadRes.data;
      
      // Update User in DB using dedicated API
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/profile-image`, {
        id: user._id,
        image: url
      });

      if (res.status === 200) {
        toast.success("Profile picture updated!");
        setShowConfirmModal(false);
        // Sayfayı yenilemek yerine local state güncellemesi yaptık, 
        // ama tam senkronizasyon için bir refresh veya router.replace yapılabilir.
        push(`/profile/${user._id}`);
      }
    } catch (err) {
      toast.error("Failed to update image.");
      console.error(err);
      setImagePreview(user.image || `https://ui-avatars.com/api/?name=${user.fullName}&background=random&color=fff`);
    } finally {
      setLoading(false);
    }
  };

  const cancelUpdateImage = () => {
    setShowConfirmModal(false);
    setImagePreview(user.image || `https://ui-avatars.com/api/?name=${user.fullName}&background=random&color=fff`);
    setFile(null);
  };

  useEffect(() => {
    if (!session) {
      push("/auth/login");
    }
  }, [session, push]);

  const menuItems = [
    { name: "Account", icon: <FaUser />, id: 0 },
    { name: "Password", icon: <FaKey />, id: 1 },
    { name: "Orders", icon: <FaShoppingBag />, id: 2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Modern Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-80 w-full flex-shrink-0"
        >
          <div className="bg-white shadow-xl shadow-gray-200/50 rounded-[2.5rem] overflow-hidden border border-gray-100 backdrop-blur-sm">
            <div className="relative pt-10 pb-6 flex flex-col items-center bg-gradient-to-b from-primary/5 to-white border-b border-gray-50">
              <div className="relative group">
                 <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                    <Image
                      src={imagePreview}
                      alt={user.fullName}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                 </div>
                 <label className="absolute bottom-1 right-1 bg-primary text-secondary p-2.5 rounded-full shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all border-2 border-white z-10">
                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                    <FaCamera size={14} />
                 </label>
              </div>
              <div className="text-center mt-4">
                 <h2 className="text-2xl font-extrabold text-secondary">{user.fullName}</h2>
                 <p className="text-gray-400 text-sm font-medium px-4 truncate max-w-[250px]">{user.email}</p>
              </div>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setTabs(item.id)}
                      className={`w-full flex items-center gap-x-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300
                        ${tabs === item.id 
                          ? "bg-primary text-secondary shadow-lg shadow-primary/30" 
                          : "text-gray-500 hover:bg-gray-50 hover:text-secondary"
                        }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                      {tabs === item.id && (
                        <motion.div 
                          layoutId="activeTab"
                          className="ml-auto w-1.5 h-6 bg-secondary rounded-full"
                        />
                      )}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-x-4 px-6 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-50 transition-all duration-300 mt-4 border border-dashed border-red-100 hover:border-red-200"
                  >
                    <span className="text-xl"><FaSignOutAlt /></span>
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1"
        >
          <div className="bg-white shadow-xl shadow-gray-200/50 rounded-[2.5rem] p-6 md:p-10 border border-gray-100 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={tabs}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {tabs === 0 && <Account user={user} />}
                {tabs === 1 && <Password user={user} />}
                {tabs === 2 && <Order />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Profile Image Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={cancelUpdateImage}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[3rem] p-8 md:p-10 max-w-sm w-full shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
              <div className="text-center">
                 <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20 shadow-inner">
                    <Image src={imagePreview} layout="fill" objectFit="cover" alt="Preview" />
                 </div>
                 <h3 className="text-2xl font-extrabold text-secondary mb-2">Update Photo?</h3>
                 <p className="text-gray-500 text-sm mb-8 leading-relaxed">Are you sure you want to change your profile picture to this new image?</p>
                 
                 <div className="flex gap-4">
                    <button 
                       onClick={cancelUpdateImage}
                       disabled={loading}
                       className="flex-1 h-12 flex items-center justify-center gap-2 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-all"
                    >
                       <FaTimes /> Cancel
                    </button>
                    <button 
                       onClick={confirmUpdateImage}
                       disabled={loading}
                       className="flex-1 h-12 flex items-center justify-center gap-2 bg-primary text-secondary font-bold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                    >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                        ) : (
                          <><FaCheck /> Confirm</>
                        )}
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export async function getServerSideProps({ req, params }) {
  try {
    const userRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
    );

    return {
      props: {
        user: userRes.data ? userRes.data : null,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}

export default Profile;
