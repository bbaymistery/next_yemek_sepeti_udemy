/**
 * Bu endpoint artık kullanılmıyor.
 * Admin kimlik doğrulaması NextAuth üzerinden yapılıyor.
 * /api/auth/[...nextauth].js dosyasına bakın.
 */
const handler = (req, res) => {
  res.status(410).json({
    message: "Bu endpoint kaldırıldı. Admin girişi için /auth/login kullanın.",
  });
};

export default handler;
