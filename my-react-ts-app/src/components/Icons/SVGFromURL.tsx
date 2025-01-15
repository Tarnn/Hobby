import React from "react";
import { ReactSVG } from "react-svg";

interface SVGFromURLProps {
  url: string;
}

const SVGFromURL: React.FC<SVGFromURLProps> = ({ url }) => {
  return (
    <ReactSVG
      className={`svg-url-class`}
      src={url}
      onError={(error) => {
        console.error("Error loading SVG:", error);
      }}
    />
  );
};

export default SVGFromURL;
