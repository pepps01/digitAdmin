import Image from "next/image";
import emptyState from "../../../src/assets/image/empty.png";

const BankDetails = ({ data }: any) => {
  console.log(data);
  return (
    <div className="w-full flex flex-col items-center">
      {data?.bankName ? (
        <div className="flex flex-col items-center">
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-3">
              <div className="text-xs text-[#8487A3]">Account Name</div>
              <div className="text-base text-[#090F47]">{data?.accoutName}</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs text-[#8487A3]">Account Number</div>
              <div className="text-base text-[#090F47]">
                {data?.accoutNumber}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs text-[#8487A3]">Bank Name</div>
              <div className="text-base text-[#090F47]">{data?.bankName}</div>
            </div>
          </div>
          <div className="flex justify-between mt-5 w-full">
            <div className="flex flex-col gap-3">
              <div className="text-xs text-text">Delivery Tag</div>
              <div className="text-base text-text">{data?.bankCode}</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs text-text">Abbreviation</div>
              <div className="text-base text-text">₦ {data?.abbreviation}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto mt-10">
          <Image src={emptyState} alt="" />
          <div className="text-[#8487A3] text-xs -mt-2">
            No bank details available
          </div>
        </div>
      )}
    </div>
  );
};
export default BankDetails;
