import { supportingDocument } from "../../utils/analytics";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import Image from "next/image";
import emptyState from "../../../src/assets/image/empty.png";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import { useState } from "react";
const SupportingDocuments = ({ data }: any) => {
  const [showModal, setShowModal] = useState({
    show: false,
    value: "",
  });
  return (
    <>
      {data?.cacNumber ||
      data?.identityType ||
      data?.cacDocument ||
      data?.identityDocument ? (
        <div className="">
          {data?.cacNumber && (
            <div>
              <div className="text-xs font-semibold">CAC Number</div>
              <div className="text-[10px] font-light text-[#8487A3]">
                {data?.cacNumber}
              </div>
            </div>
          )}
          {data?.identityType && (
            <div>
              <div className="text-xs font-semibold">Identity Type</div>
              <div className="text-[10px] font-light text-[#8487A3]">
                {data?.identityType}
              </div>
            </div>
          )}

          <div className="flex gap-[30px]">
            {data?.cacDocument && (
              <div
                className="w-[250px] flex flex-col "
                onMouseOver={() =>
                  setShowModal({
                    ...showModal,
                    show: true,
                    value: "CAC Document",
                  })
                }
              >
                <div className="relative w-full">
                  {showModal.value === "CAC Document" && (
                    <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,.2)] z-10 flex items-center justify-center">
                      <div className="bg-darkPurple text-white px-[20px] py-[10px] w-[150px] text-sm rounded-lg">
                        View Document
                      </div>
                    </div>
                  )}
                  <Image
                    src={data?.cacDocument}
                    className="object-cover w-full"
                    alt={""}
                  />
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="text-xs font-semibold">CAC Document</div>
                  </div>
                  <ActionMenuBase
                    items={
                      <>
                        <ActionMenuItem name="View Document" />
                      </>
                    }
                  />
                </div>
              </div>
            )}
            {data?.identityDocument && (
              <div
                className="w-[250px] flex flex-col "
                onMouseOver={() =>
                  setShowModal({
                    ...showModal,
                    show: true,
                    value: "Identity Document",
                  })
                }
              >
                <div className="relative w-full">
                  {showModal.value === "Identity Document" && (
                    <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,.2)] z-10 flex items-center justify-center">
                      <div className="bg-darkPurple text-white px-[20px] py-[10px] w-[150px] text-sm rounded-lg">
                        View Document
                      </div>
                    </div>
                  )}
                  <Image
                    src={data?.identityDocument}
                    className="object-cover w-full"
                    alt={""}
                  />
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="text-xs font-semibold">
                      Identity Document
                    </div>
                  </div>
                  <ActionMenuBase
                    items={
                      <>
                        <ActionMenuItem name="View Document" />
                      </>
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto mt-10">
          <Image src={emptyState} alt="" />
          <div className="text-[#8487A3] text-xs -mt-2">
            Nothing to show here
          </div>
        </div>
      )}
    </>
  );
};
export default SupportingDocuments;
