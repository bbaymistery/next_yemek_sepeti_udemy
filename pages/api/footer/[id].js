import { errorHandler } from '../../../util/errorHandler';
import Footer from "../../../models/Footer";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case "PUT":
      try {
        const updatedFooter = await Footer.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!updatedFooter) {
          return res.status(404).json({ message: "Footer not found" });
        }

        return res.status(200).json(updatedFooter);
      } catch (err) {
        errorHandler(res, err);
        return res.status(500).json({ message: "Footer could not be updated." });
      }

    case "DELETE":
      try {
        const deletedFooter = await Footer.findByIdAndDelete(id);

        if (!deletedFooter) {
          return res.status(404).json({ message: "Footer not found" });
        }

        return res.status(200).json({ message: "Footer deleted successfully" });
      } catch (err) {
        errorHandler(res, err);
        return res.status(500).json({ message: "Footer could not be deleted." });
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;