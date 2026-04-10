import Order from "../../../models/Order";
import dbConnect from "../../../util/dbConnect";
import { orderValidationSchema } from "../../../schema/validations";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      console.log(err);
    }
  }

  if (method === "POST") {
    try {
      orderValidationSchema.parse(req.body);
    } catch (error) {
      res.status(400).json({ message: "Validation error", errors: error.errors });
      return;
    }

    try {
      const newOrder = await Order.create(req.body);
      res.status(201).json(newOrder);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
