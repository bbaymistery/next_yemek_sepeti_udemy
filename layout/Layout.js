
import React from "react";
import { useRouter } from "next/router";
import Header from "../components/layout/Header";
import Footer from "../components/Layout/Footer";

const Layout = ({ children }) => {
  const router = useRouter();
  const isAdminLogin = router.pathname === "/admin";

  if (isAdminLogin) {
    return <>{children}</>;
  }

  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;