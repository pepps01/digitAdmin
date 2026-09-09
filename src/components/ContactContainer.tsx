import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Contacts from "./Contacts";

const ContactContainer = ({ contacts, setDetails }: any) => {
  return (
    <div className=" w-1/3 bg-white p-[10px]  min-h-[72vh] max-h-[73vh] overflow-auto rounded-sm">
      <input
        className="w-full bg-transparent placeholder:text-text placeholder:text-sm text-grey text-sm focus:outline-none border-2 border-grey rounded-md p-2 mb-4"
        placeholder="Search Here"
      />

      <div className="flex flex-col gap-5">
        {contacts?.map((item: any) => (
          <Contacts
            contactImage={item.contactImage}
            contactName={item.contactName}
            activeStatus={item.activeStatus}
            onClickFunction={() => setDetails(item)}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactContainer;
