import React from "react";

const DrawerWrapper = ({ title, children }: any) => {
  return (
    <>
      <div className="flex py-9 px-[26px]  border-b border-softGray w-full ">
        <div className="font-bold text-darkPurple text-lg">{title}</div>
      </div>
      <div className="text-lg text-lightGray p-8"> {children}</div>
    </>
  );
};

export default DrawerWrapper;
