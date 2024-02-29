import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="loading m-40">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="loadingcolor posistion-absolute top-0 bottom-0 start-0 end-0"
        
      />
    </div>
  );
}
