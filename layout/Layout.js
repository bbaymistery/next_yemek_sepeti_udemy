
import React from "react";
import Header from "../components/layout/Header";
// import Footer from "../components/Layout/Footer";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Layout;