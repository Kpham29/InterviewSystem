import React from "react";
import Footer from "../component/footer";
import Header from "../component/header";
import { useLocation } from "react-router-dom";
import { ROUTERS } from "../utils/routers";

const MasterLayout = ({ children, ...props }) => {
  const location = useLocation();
  const paths = [
    ROUTERS.COMMON.RESET_PASSWORD,
    ROUTERS.COMMON.FORGOT_PASSWORD,
    ROUTERS.COMMON.LOGIN,
  ];
  const isCommonPage = paths.includes(location.pathname);
  return (
    <div {...props}>
      {!isCommonPage && <Header />}
      {children}
      {!isCommonPage && <Footer />}
    </div>
  );
};

export default MasterLayout;
