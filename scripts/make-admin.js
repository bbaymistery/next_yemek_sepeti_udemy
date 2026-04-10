/**
 * İlk Admin Kullanıcısı Atama Script'i
 * 
 * Kullanım:
 *   node scripts/make-admin.js elgun@example.com
 * 
 * Bu script, belirtilen e-mail adresine sahip kullanıcının
 * role alanını "admin" olarak günceller.
 */

const mongoose = require("mongoose");
require("dotenv").config();

const email = process.argv[2];

if (!email) {
  console.error("❌ Lütfen bir e-mail adresi girin:");
  console.error("   node scripts/make-admin.js kullanici@email.com");
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  role: { type: String, default: "user" },
});

async function makeAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB bağlantısı başarılı.");

    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      console.error(`❌ "${email}" e-mail adresine sahip kullanıcı bulunamadı.`);
      console.error("   Önce bu e-mail ile kayıt ol, sonra bu script'i çalıştır.");
      process.exit(1);
    }

    console.log(`✅ Başarılı! "${user.fullName}" (${user.email}) artık ADMIN.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Hata:", err.message);
    process.exit(1);
  }
}

makeAdmin();
