import { errorHandler } from '../../../util/errorHandler';
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import bcrypt from "bcryptjs";
import { userValidationSchema } from "../../../schema/validations";

const handler = async (req, res) => {
  await dbConnect();
  const body = req.body;

  try {
    // Validate request body
    userValidationSchema.parse(body);

    const user = await User.findOne({ email: body.email });
    if (user) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
    }

    const newUser = await new User(body);
    // generate salt to has password
    const salt = await bcrypt.genSalt(10);
    // create hash
    newUser.password = await bcrypt.hash(newUser.password, salt);
    newUser.confirmPassword = await bcrypt.hash(newUser.confirmPassword, salt);
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    // Zod validation errors format mapping
    if (err.name === "ZodError") {
      err.statusCode = 400;
      err.message = (err.issues || err.errors || []).map(e => e.message).join(" | ");
    }
    errorHandler(res, err);
  }
};

export default handler;
