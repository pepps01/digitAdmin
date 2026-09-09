import React from "react";
import Image from "next/image";

const Contacts = ({
  contactImage,
  contactName,
  activeStatus,
  onClickFunction,
}: any) => {
  return (
    <div className="flex w-full gap-6 cursor-pointer" onClick={onClickFunction}>
      <div className="w-8 h-8 rounded-[50%]">
        <Image
          src={contactImage}
          className="w-full h-full object-cover rounded-[50%]"
          alt={""}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-grey text-md">{contactName}</div>
        <div className="text-grey text-sm">
          <span className="bg-green-800 w-[8px] h-[8px] rounded-[50%]"></span>
          {activeStatus}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
