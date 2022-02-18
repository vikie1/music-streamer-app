import React from "react";

export const Modal = ({ children }) => {
  return (
    <>
      <div className="fixed flex items-center justify-center insert-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="shadow-lg rounded-md bg-white">
          <div className="text-center text-black">
            <div className="p-6 space-y-6">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
