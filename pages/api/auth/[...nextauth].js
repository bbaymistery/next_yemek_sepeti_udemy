import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import bcrypt from "bcryptjs";

// MongoDB bağlantısını başlat
dbConnect();

export default NextAuth({
    providers: [
        // GitHub ile login (OAuth)
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

        // Kendi email/username + password login sistemimiz
        CredentialsProvider({
            name: "Credentials",

            // Login formunda görünecek inputlar
            credentials: {
                identifier: { label: "Email or Username", type: "text" },
                password: { label: "Password", type: "password" },
            },

            // Login işleminin ana kontrol noktası
            async authorize(credentials) {
                const { identifier, password } = credentials;

                // Kullanıcıyı email veya username ile bul
                const user = await User.findOne({
                    $or: [
                        { email: identifier },
                        { username: identifier }
                    ]
                });

                // Kullanıcı yoksa hata fırlat
                if (!user) {
                    throw new Error("User not found");
                }

                // Şifre kontrolünü ayrı fonksiyona gönder
                return signInUser({ user, password });
            },
        }),
    ],

    // Custom login sayfası
    pages: {
        signIn: "/auth/login",
    },

    // Session güvenliği için secret
    secret: process.env.NEXTAUTH_SECRET,
});


// Şifre kontrolünü yapan yardımcı fonksiyon
const signInUser = async ({ user, password }) => {
    // Girilen şifre ile DB'deki hashlenmiş şifreyi karşılaştır
    const isMatch = await bcrypt.compare(password, user.password);

    // Şifre yanlışsa hata ver
    if (!isMatch) {
        throw new Error("Incorrect password!");
    }

    // Login başarılıysa sadece gerekli bilgileri döndür
    return {
        id: user._id,
        email: user.email,
        name: user.username,
    };
};