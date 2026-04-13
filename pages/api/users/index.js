import { errorHandler } from '../../../util/errorHandler';
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import { userValidationSchema } from "../../../schema/validations";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      errorHandler(res, err);
    }
  }

  if (method === "POST") {
    try {
      userValidationSchema.parse(req.body);
    } catch (error) {
      error.statusCode = 400;
      error.message = (error.issues || error.errors || []).map(e => e.message).join(" | ");
      return errorHandler(res, error);
    }

    try {
      const { fullName, email, password, image } = req.body;
      const newUser = await User.create({ fullName, email, password, image });
      res.status(200).json(newUser);
    } catch (err) {
      errorHandler(res, err);
    }
  }
};

export default handler;
