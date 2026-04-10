import { errorHandler } from '../../../util/errorHandler';
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import { userValidationSchema } from "../../../schema/validations";
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
      userValidationSchema.partial().parse(req.body);
    } catch (error) {
      error.statusCode = 400;
      error.message = (error.issues || error.errors || []).map(e => e.message).join(" | ");
      return errorHandler(res, error);
    }

    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.confirmPassword = await bcrypt.hash(
          req.body.confirmPassword,
          10
        );
      }
      const users = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(users);
    } catch (err) {
      errorHandler(res, err);
    }
  }
};

export default handler;
