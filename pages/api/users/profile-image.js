import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import { errorHandler } from "../../../util/errorHandler";
import axios from "axios";
import crypto from "crypto";

const handler = async (req, res) => {
  await dbConnect();
  
  if (req.method === "PUT") {
    try {
      const { id, image } = req.body;

      if (!id || !image) {
        return res.status(400).json({ message: "Invalid data." });
      }

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // ☁️ CLOUDINARY DELETE LOGIC START
      const oldImageUrl = user.image;
      const api_key = process.env.CLOUDINARY_API_KEY;
      const api_secret = process.env.CLOUDINARY_API_SECRET;
      const cloud_name = process.env.CLOUDINARY_CLOUD_NAME || "dyplegxqx";

      if (oldImageUrl && oldImageUrl.includes("cloudinary") && api_key && api_secret) {
        try {
          // Gelişmiş Public ID ayıklama (Klasör yapısını destekler: food-ordering/abc)
          const uploadIndex = oldImageUrl.indexOf("upload/") + 7;
          const afterUpload = oldImageUrl.substring(uploadIndex);
          const parts = afterUpload.split("/");
          
          // Eğer ilk parça versiyon ise (v12345...), onu atlayıp geri kalanı alıyoruz
          let publicIdWithExtension = "";
          if (parts[0].startsWith("v")) {
            publicIdWithExtension = parts.slice(1).join("/");
          } else {
            publicIdWithExtension = parts.join("/");
          }
          
          const publicId = publicIdWithExtension.split(".")[0];

          // Güvenli imza oluşturma
          const timestamp = Math.round(new Date().getTime() / 1000);
          const signature = crypto
            .createHash("sha1")
            .update(`public_id=${publicId}&timestamp=${timestamp}${api_secret}`)
            .digest("hex");

          const deleteUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`;
          
          await axios.post(deleteUrl, {
            public_id: publicId,
            signature: signature,
            api_key: api_key,
            timestamp: timestamp,
          });

          console.log("Old image deleted correctly:", publicId);
        } catch (deleteError) {
          console.error("Cloudinary delete failed:", deleteError.message);
        }
      }
      // ☁️ CLOUDINARY DELETE LOGIC END

      user.image = image;
      await user.save();

      res.status(200).json({ 
        message: "Profile image updated and cleaned!",
        image: user.image 
      });

    } catch (err) {
      errorHandler(res, err);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
