import { errorHandler } from '../../../util/errorHandler';
import Order from "../../../models/Order";
import dbConnect from "../../../util/dbConnect";
import { orderValidationSchema } from "../../../schema/validations";

const handler = async (req, res) => {
  await dbConnect();
  const {
    method,
    query: { id },
  } = req;

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (err) {
      errorHandler(res, err);
    }
  }

  if (method === "DELETE") {
    try {
      const order = await Order.findByIdAndDelete(id);
      res.status(200).json(order);
    } catch (err) {
      errorHandler(res, err);
    }
  }

  if (method === "PUT") {
    try {
      orderValidationSchema.partial().parse(req.body);
    } catch (error) {
      error.statusCode = 400;
      error.message = (error.issues || error.errors || []).map(e => e.message).join(" | ");
      return errorHandler(res, error);
    }

    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      errorHandler(res, err);
    }
  }
};

export default handler;
