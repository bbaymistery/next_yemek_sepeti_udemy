import { errorHandler } from '../../../util/errorHandler';
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import { userValidationSchema, userUpdateValidationSchema } from "../../../schema/validations";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  await dbConnect();
  const {
    method,
    query: { id },
  } = req;

  if (method === "GET") {
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      errorHandler(res, err);
    }
  }

  if (method === "PUT") {
    try {
      console.log("Incoming update data:", req.body);
      userUpdateValidationSchema.parse(req.body);
    } catch (error) {
      console.log("Zod Validation Error:", error);
      error.statusCode = 400;
      error.message = (error.issues || error.errors || []).map(e => e.message).join(" | ");
      return errorHandler(res, error);
    }

    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      
      delete req.body.confirmPassword;

      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log("Database Update Error:", err);
      errorHandler(res, err);
    }
  }
};

export default handler;
