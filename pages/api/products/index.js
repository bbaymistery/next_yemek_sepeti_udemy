import { errorHandler } from '../../../util/errorHandler';
import Product from "../../../models/Product";
import dbConnect from "../../../util/dbConnect";
import { productValidationSchema } from "../../../schema/validations";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      errorHandler(res, err);
    }
  }

  if (method === "POST") {
    try {
      productValidationSchema.parse(req.body);
    } catch (error) {
      error.statusCode = 400;
      error.message = (error.issues || error.errors || []).map(e => e.message).join(" | ");
      return errorHandler(res, error);
    }

    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      errorHandler(res, err);
    }
  }
};

export default handler;
