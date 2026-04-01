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
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
      <Title addClass="text-[40px]">Footer Settings</Title>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-between md:items-center md:flex-row flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Link Address"
            onChange={(e) => setLinkAddress(e.target.value)}
            value={linkAddress}
          />

          <Input
            placeholder="Icon Name"
            onChange={(e) => setIconName(e.target.value)}
            value={iconName}
          />

          <button className="btn-primary" type="button" onClick={handleCreate}>
            Add
          </button>
        </div>

        <ul className="flex items-center gap-6 flex-wrap">
          {socialMediaLinks?.map((item, index) => (
            <li key={index} className="flex items-center">
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center"
              >
                <i className={`${item.icon} text-2xl`}></i>
              </a>

              <button
                className="text-danger"
                onClick={() => handleDeleteSocial(index)}
                type="button"
              >
                <i className="fa fa-trash text-xl ml-2"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button className="btn-primary mt-4" type="submit">
        {footerData?._id ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default Footer;