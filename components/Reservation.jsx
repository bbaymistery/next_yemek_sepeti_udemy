import Title from "./ui/Title";
import { useFormik } from "formik";
import { reservationSchema } from "../schema/reservation";
import Input from "./form/Input";
import {
  FaCalendarAlt,
  FaUsers,
  FaConciergeBell,
  FaClock,
} from "react-icons/fa";
import { useRef } from "react";

const Reservation = () => {
  const dateRef = useRef(null);

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    actions.resetForm();
  };

  const intial = {
    fullName: "",
    phoneNumber: "",
    email: "",
    persons: "",
    date: "",
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: intial,
      onSubmit,
      validationSchema: reservationSchema,
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
      type: "number",
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
      name: "persons",
      type: "number",
      placeholder: "How Many Persons?",
      value: values.persons,
      errorMessage: errors.persons,
      touched: touched.persons,
    },
  ];

  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="container mx-auto px-4 xl:px-0">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
            Reservation
          </span>
          <Title addClass="text-[40px] text-secondary leading-tight">
            Book A Table
          </Title>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4 mb-4"></div>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Reserve your spot and enjoy an unforgettable dining experience
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Form Side */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-8">
              <form onSubmit={handleSubmit}>
                {/* Two column layout for name and phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {inputs.slice(0, 2).map((input) => (
                    <Input
                      key={input.id}
                      {...input}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  ))}
                </div>

                {/* Email full width */}
                <div className="mb-4">
                  <Input
                    {...inputs[2]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                {/* Persons and Date side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Input
                    {...inputs[3]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {/* Custom Date Input */}
                  <div className="w-full">
                    <div
                      className={`relative h-14 w-full border rounded-xl flex items-center px-4 cursor-pointer transition-colors duration-200 ${
                        touched.date && errors.date
                          ? "border-red-500"
                          : "border-gray-200 hover:border-primary focus-within:border-primary"
                      }`}
                      onClick={() => {
                        if (dateRef.current) {
                          dateRef.current.showPicker?.();
                          dateRef.current.focus();
                        }
                      }}
                    >
                      <input
                        ref={dateRef}
                        type="date"
                        name="date"
                        value={values.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <span
                        className={`text-sm flex-1 ${
                          values.date ? "text-secondary" : "text-gray-400"
                        }`}
                      >
                        {values.date
                          ? new Date(values.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Select Date"}
                      </span>
                      <FaCalendarAlt className="text-primary" size={16} />
                    </div>
                    {touched.date && (
                      <span className="text-xs text-danger mt-1 block">
                        {errors.date}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className="w-full mt-4 py-4 rounded-xl bg-secondary text-white text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-secondary transition-all duration-300 shadow-lg hover:shadow-xl"
                  type="submit"
                >
                  Book Now
                </button>
              </form>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FaClock className="text-primary" size={16} />
                </div>
                <p className="text-secondary text-xs font-semibold">Mon - Sun</p>
                <p className="text-gray-400 text-[11px] mt-0.5">10AM - 11PM</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FaUsers className="text-primary" size={16} />
                </div>
                <p className="text-secondary text-xs font-semibold">Up to 50</p>
                <p className="text-gray-400 text-[11px] mt-0.5">Guests</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FaConciergeBell className="text-primary" size={16} />
                </div>
                <p className="text-secondary text-xs font-semibold">Premium</p>
                <p className="text-gray-400 text-[11px] mt-0.5">Service</p>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="lg:w-1/2 w-full">
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] h-[300px] lg:h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48348.66924008447!2d-74.24927437205034!3d40.766603131286395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c254b5958982c3%3A0xb6ab3931055a2612!2sEast%20Orange%2C%20New%20Jersey%2C%20Amerika%20Birle%C5%9Fik%20Devletleri!5e0!3m2!1str!2str!4v1661853137161!5m2!1str!2str"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
