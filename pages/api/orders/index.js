import { errorHandler } from '../../../util/errorHandler';
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
      errorHandler(res, err);
    }
  }

  if (method === "POST") {
    try {
      orderValidationSchema.parse(req.body);
    } catch (error) {
      error.statusCode = 400;
      error.message = (error.issues || error.errors || []).map(e => e.message).join(" | ");
      return errorHandler(res, error);
    }

    try {
      const newOrder = await Order.create(req.body);
      res.status(201).json(newOrder);
    } catch (err) {
      errorHandler(res, err);
    }
  }
};

export default handler;
