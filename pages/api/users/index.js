import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";

const handler = async (req, res) => {
  try {
    await dbConnect();
    console.log("Database connected successfully");
    const { method } = req;

    if (method === "GET") {
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        console.log(err);
      }
    }

    if (method === "POST") {
      try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Failed to connect to the database" });
  }
};

export default handler;