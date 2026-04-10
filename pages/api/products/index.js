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
      console.log(err);
    }
  }

  if (method === "POST") {
    try {
      productValidationSchema.parse(req.body);
    } catch (error) {
      res.status(400).json({ message: "Validation error", errors: error.errors });
      return;
    }

    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
