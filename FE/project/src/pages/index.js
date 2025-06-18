import React from "react";
import Footer from "../component/footer";
import Header from "../component/header";
import { useLocation } from "react-router-dom";
import { ROUTERS } from "../utils/routers";

const MasterLayout = ({ children, ...props }) => {
  const location = useLocation();
  const isLoginPage = location.pathname.match(ROUTERS.COMMON.LOGIN);
  return (
    <div {...props}>
      {!isLoginPage && <Header />}
      {children}
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default MasterLayout;
