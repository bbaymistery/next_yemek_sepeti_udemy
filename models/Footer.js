import mongoose from "mongoose";

const FooterSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      default: "",
    },
    phoneNumber: {
      type: String,
      required: true,
      default: "",
    },
    desc: {
      type: String,
      required: true,
      default: "",
    },
    socialMedia: {
      type: [
        {
          icon: { type: String, default: "" },
          link: { type: String, default: "" },
        },
      ],
      default: [],
    },
    openingHours: {
      day: { type: String, default: "" },
      hour: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Footer || mongoose.model("Footer", FooterSchema);