import React from "react";
import Style from "./index.scss";

const PageWrapper = (props) => {
  const { children } = props;

  return <div className="pagewrapper">{children}</div>;
};

export default PageWrapper;
