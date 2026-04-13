import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

export const isAdmin = async (req) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  if (token && token.role === "admin") {
    return true;
  }
  return false;
};
