import Image from "next/image";
import productPic from "../assets/image/productpic.svg";
import DrawerWrapper from "./DrawerWrapper";

const TransactionDetails = ({ data }: any) => {
  return (
    <DrawerWrapper title="Transaction Detail">
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-3">
            <div className="text-xs text-[#8487A3]">Purpose of transaction</div>
            <div className="text-base text-[#090F47]">{data?.purpose}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-[#8487A3]">User</div>
            <div className="text-base text-[#090F47]">{data?.fullname}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-[#8487A3]">Payment Reference</div>
            <div className="text-base text-[#090F47]">
              {data?.paymentReference}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-5 w-full">
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text"> Amount</div>
            <div className="text-base text-[#090F47]">₦{data?.amount}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text">Transaction Status</div>
            <div className="text-base text-[#090F47]">{data?.status}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text">Transaction Date</div>
            <div className="text-base text-[#090F47]">₦ {data?.transDate}</div>
          </div>
        </div>
      </div>
    </DrawerWrapper>
  );
};
export default TransactionDetails;
