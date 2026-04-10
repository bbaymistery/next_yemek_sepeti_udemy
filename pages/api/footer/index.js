import { errorHandler } from '../../../util/errorHandler';
import Footer from "../../../models/Footer";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const footer = await Footer.find();
        return res.status(200).json(footer);
      } catch (err) {
        errorHandler(res, err);
        return res.status(500).json({ message: "Footer data could not be fetched." });
      }

    case "POST":
      try {
        const newFooter = await Footer.create(req.body);
        return res.status(201).json(newFooter);
      } catch (err) {
        errorHandler(res, err);
        return res.status(500).json({ message: "Footer could not be created." });
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;