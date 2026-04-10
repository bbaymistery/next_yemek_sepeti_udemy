import Category from "../../../models/Category";
import dbConnect from "../../../util/dbConnect";
import { categoryValidationSchema } from "../../../schema/validations";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
    }
  }

  if (method === "POST") {
    try {
      categoryValidationSchema.parse(req.body);
    } catch (error) {
      res.status(400).json({ message: "Validation error", errors: error.errors });
      return;
    }

    try {
      const newCategory = await Category.create(req.body);
      res.status(200).json(newCategory);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
