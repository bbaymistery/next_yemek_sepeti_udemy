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
      console.log(err);
    }
  }

  if (method === "POST") {
    try {
      userValidationSchema.parse(req.body);
    } catch (error) {
      res.status(400).json({ message: "Validation error", errors: error.errors });
      return;
    }

    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
