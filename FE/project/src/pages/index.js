import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../component/footer";
import Sidebar from "../component/Sidebar/sidebar";
import Navbar from "../component/Navbar/navbar"; // bạn cần đúng path
import Breadcrumd from "../component/breadcrumb/breadcrumd"; // cần đúng path


import { ROUTERS } from "../utils/routers";

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
        {!isCommonPage && (
            <>
              <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            </>
        )}

        <div
            className={`flex-1 flex flex-col ${
                !isCommonPage ? `content ${isCollapsed ? "collapsed" : ""}` : ""
            }`}
        >
          {!isCommonPage && <Navbar />}
            <main className="flex-1 p-4">{children}</main>
          {!isCommonPage && <Footer />}
        </div>
      </div>
  );
};

export default MasterLayout;
