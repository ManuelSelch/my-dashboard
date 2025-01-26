import React from "react";

const Placeholder = () => {
    return (
        <div className="flex flex-col gap-4 pt-5">
          <div className="skeleton h-4"></div>
          <div className="skeleton h-4"></div>
          <div className="skeleton h-32 w-full"></div>
        </div>
    );
};

export default Placeholder;