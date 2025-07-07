import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ title, subTitle, path }) => {
  return (
    <nav className="flex items-center text-sm space-x-1">
      <Link
        to={path}
        className="text-[#1c1c1c] text-[24px] font-medium hover:underline hover:text-[#2563eb]"
      >
        {title}
      </Link>
      {subTitle && (
        <>
          <span>&nbsp;|&nbsp;</span>
          <span className="text-[#2563eb] text-[24px]">{subTitle}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;
