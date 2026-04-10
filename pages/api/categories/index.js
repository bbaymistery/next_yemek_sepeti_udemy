import { errorHandler } from '../../../util/errorHandler';
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
      errorHandler(res, err);
    }
  }

  if (method === "POST") {
    try {
      categoryValidationSchema.parse(req.body);
    } catch (error) {
      error.statusCode = 400;
      error.message = (error.issues || error.errors || []).map(e => e.message).join(" | ");
      return errorHandler(res, error);
    }

    try {
      const newCategory = await Category.create(req.body);
      res.status(200).json(newCategory);
    } catch (err) {
      errorHandler(res, err);
    }
  }
};

export default handler;
