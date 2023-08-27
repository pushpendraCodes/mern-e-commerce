import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
const Loader = ({loaderColor,textColor}) => {
  return (
    <div>
      <div className="w-36 h-9 gap-3   flex   items-center rounded-sm  ">
        <ClipLoader size={30} color={loaderColor||"white"} />
        <p style={{color:textColor||"black"}} className="text-xl font-semibold">loading...</p>
      </div>
    </div>
  );
};

export default Loader;
