import React from "react";

const DetailsPage = ({ data, title }: any) => {
  return (
    <div>
      <div className="text-xl text-darkPurple font-bold">{title}</div>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col mt-6 gap-5">
          <div className="flex ">
            <div className="w-[200px] text-text text-[10px] md:text-xs">
              {" "}
              User ID
            </div>
            <div className="text-xs md:text-sm">{data?.userID}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-[10px] md:text-xs">
              {" "}
              Full Name
            </div>
            <div className="text-xs md:text-sm">{data?.fullName}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-[10px] md:text-xs">
              {" "}
              Email Address
            </div>
            <div className="text-xs md:text-sm">{data?.email}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-[10px] md:text-xs">
              {" "}
              Phone Number
            </div>
            <div className="text-xs md:text-sm">{data?.phone}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-[10px] md:text-xs">
              {" "}
              Gender
            </div>
            <div className="text-xs md:text-sm">{data?.gender}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-[10px] md:text-xs">
              {" "}
              Address
            </div>
            <div className="text-xs md:text-sm">{data?.address}</div>
          </div>
        </div>
        <div className="flex flex-col mt-6 gap-5">
          <div className="flex ">
            <div className="w-[200px] text-text text-[10px] md:text-xs">
              {" "}
              Role
            </div>
            <div className="text-xs md:text-sm">{data?.role}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-[10px] md:text-xs">
              {" "}
              Date Of Birth
            </div>
            <div className="text-xs md:text-sm">{data?.dateOfBirth}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-[10px] md:text-xs">
              Date Joined
            </div>
            <div className="text-xs md:text-sm">{data?.dateJoined}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-[10px] md:text-xs">
              {" "}
              Bank Account Name
            </div>
            <div className="text-xs md:text-sm">{data?.bank.accountName}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-[10px] md:text-xs">
              {" "}
              Bank Account Number
            </div>
            <div className="text-xs md:text-sm">{data?.bank.accountNumber}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-[10px] md:text-xs">
              {" "}
              Verification Status
            </div>
            <div className="text-xs md:text-sm">
              {data?.emailVerifiedStatus}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
