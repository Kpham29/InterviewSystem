/*import React from "react";
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

export default MasterLayout;*/
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../component/header";
import Footer from "../component/footer";

import { ROUTERS } from "../utils/routers";
import Sidebar from "../component/Sidebar/sidebar";

const MasterLayout = ({ children, ...props }) => {
    const location = useLocation();
    const paths = [
        ROUTERS.COMMON.RESET_PASSWORD,
        ROUTERS.COMMON.FORGOT_PASSWORD,
        ROUTERS.COMMON.LOGIN,
    ];
    const isCommonPage = paths.includes(location.pathname);
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div {...props} className="flex flex-1 flex-col min-h-screen">
            {!isCommonPage && <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />}
            <div className={`flex-1 ${!isCommonPage ? `content ${isCollapsed ? "collapsed" : ""}` : ""}`}>
                {!isCommonPage && <Header />}
                <main className="flex-1">{children}</main>
                {!isCommonPage && <Footer />}
            </div>
        </div>
    );
};

export default MasterLayout;
