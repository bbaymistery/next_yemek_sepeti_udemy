import { useEffect, useState } from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { footerSchema } from "../../schema/footer";
import axios from "axios";
import { toast } from "react-toastify";

const defaultFooterData = {
  _id: null,
  location: "",
  email: "",
  phoneNumber: "",
  desc: "",
  openingHours: {
    day: "",
    hour: "",
  },
  socialMedia: [],
};

const Footer = () => {
  const [iconName, setIconName] = useState("fa fa-");
  const [linkAddress, setLinkAddress] = useState("https://");
  const [footerData, setFooterData] = useState(defaultFooterData);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`);

        if (res.data?.length > 0) {
          const data = res.data[0];

          setFooterData({
            _id: data._id || null,
            location: data.location || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            desc: data.desc || "",
            openingHours: {
              day: data.openingHours?.day || "",
              hour: data.openingHours?.hour || "",
            },
            socialMedia: data.socialMedia || [],
          });

          setSocialMediaLinks(data.socialMedia || []);
        } else {
          setFooterData(defaultFooterData);
          setSocialMediaLinks([]);
        }
      } catch (err) {
        console.log(err);
        toast.error("Footer data could not be fetched");
      }
    };

    getFooterData();
  }, []);

  const onSubmit = async (values, actions) => {
    const payload = {
      location: values.location,
      email: values.email,
      phoneNumber: values.phoneNumber,
      desc: values.desc,
      openingHours: {
        day: values.day,
        hour: values.time,
      },
      socialMedia: socialMediaLinks,
    };

    try {
      let res;

      if (footerData?._id) {
        res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/footer/${footerData._id}`,
          payload
        );

        if (res.status === 200) {
          setFooterData((prev) => ({
            ...prev,
            ...res.data,
            openingHours: {
              day: res.data?.openingHours?.day || "",
              hour: res.data?.openingHours?.hour || "",
            },
          }));
          toast.success("Footer updated successfully");
        }
      } else {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`,
          payload
        );

        if (res.status === 201) {
          setFooterData({
            _id: res.data._id || null,
            location: res.data.location || "",
            email: res.data.email || "",
            phoneNumber: res.data.phoneNumber || "",
            desc: res.data.desc || "",
            openingHours: {
              day: res.data.openingHours?.day || "",
              hour: res.data.openingHours?.hour || "",
            },
            socialMedia: res.data.socialMedia || [],
          });

          setSocialMediaLinks(res.data.socialMedia || []);
          toast.success("Footer created successfully");
        }
      }

      actions.setSubmitting(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      actions.setSubmitting(false);
    }
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      location: footerData?.location || "",
      email: footerData?.email || "",
      phoneNumber: footerData?.phoneNumber || "",
      desc: footerData?.desc || "",
      day: footerData?.openingHours?.day || "",
      time: footerData?.openingHours?.hour || "",
    },
    onSubmit,
    validationSchema: footerSchema,
  });

  const inputs = [
    {
      id: 1,
      name: "location",
      type: "text",
      placeholder: "Your Location",
      value: values.location,
      errorMessage: errors.location,
      touched: touched.location,
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 4,
      name: "desc",
      type: "text",
      placeholder: "Your Description",
      value: values.desc,
      errorMessage: errors.desc,
      touched: touched.desc,
    },
    {
      id: 5,
      name: "day",
      type: "text",
      placeholder: "Update Day",
      value: values.day,
      errorMessage: errors.day,
      touched: touched.day,
    },
    {
      id: 6,
      name: "time",
      type: "text",
      placeholder: "Update Time",
      value: values.time,
      errorMessage: errors.time,
      touched: touched.time,
    },
  ];

  const handleCreate = () => {
    if (!iconName.trim() || iconName === "fa fa-") {
      toast.error("Please enter a valid icon class");
      return;
    }

    if (!linkAddress.trim() || linkAddress === "https://") {
      toast.error("Please enter a valid link");
      return;
    }

    setSocialMediaLinks((prev) => [
      ...prev,
      {
        icon: iconName,
        link: linkAddress,
      },
    ]);

    setLinkAddress("https://");
    setIconName("fa fa-");
  };

  const handleDeleteSocial = (index) => {
    setSocialMediaLinks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 w-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Title addClass="text-[40px] text-gray-800">Footer Settings</Title>
          <p className="text-gray-500 mt-1">Configure global footer details and social links.</p>
        </div>
      </div>

      <form className="max-w-4xl" onSubmit={handleSubmit}>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8 transition-all hover:shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">General Information</h3>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            {inputs.map((input) => (
              <div key={input.id}>
                <Input
                  {...input}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8 transition-all hover:shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Social Media Links</h3>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <Input
                placeholder="https://facebook.com"
                onChange={(e) => setLinkAddress(e.target.value)}
                value={linkAddress}
              />
            </div>
            <div className="flex-1 w-full relative">
              <Input
                placeholder="fa fa-facebook"
                onChange={(e) => setIconName(e.target.value)}
                value={iconName}
              />
            </div>
            <button 
              className="w-full md:w-auto px-8 py-4 mt-2 md:mt-0 rounded-xl text-white font-bold bg-secondary shadow-md shadow-secondary/30 hover:-translate-y-0.5 hover:bg-secondary/90 transition-all outline-none whitespace-nowrap" 
              type="button" 
              onClick={handleCreate}
            >
              Add Link
            </button>
          </div>

          {socialMediaLinks?.length > 0 && (
            <div className="mt-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <ul className="flex items-center gap-4 flex-wrap">
                {socialMediaLinks?.map((item, index) => (
                  <li key={index} className="flex items-center bg-white border border-gray-200 rounded-xl p-3 pr-4 shadow-sm group hover:border-primary transition-all">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 group-hover:bg-primary group-hover:text-white transition-colors"
                    >
                      <i className={`${item.icon} text-lg`}></i>
                    </a>
                    <div className="ml-3 mr-4 flex flex-col">
                       <span className="text-xs text-gray-400 font-bold uppercase">Link</span>
                       <span className="text-sm text-gray-700 max-w-[120px] truncate">{item.link.replace('https://', '')}</span>
                    </div>

                    <button
                      className="text-gray-400 hover:text-danger hover:bg-red-50 p-2 rounded-lg transition-colors"
                      onClick={() => handleDeleteSocial(index)}
                      type="button"
                    >
                      <i className="fa fa-trash text-lg"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button 
            className="px-10 py-4 rounded-xl text-white text-lg font-bold bg-primary shadow-lg shadow-primary/40 hover:-translate-y-1 hover:bg-primary/95 transition-all outline-none w-full md:w-auto" 
            type="submit"
          >
            {footerData?._id ? "Update Footer Settings" : "Create Footer Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Footer;