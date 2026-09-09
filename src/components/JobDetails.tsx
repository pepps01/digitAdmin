import Image from "next/image";
import { send } from "process";
import { useEffect, useState } from "react";
import { FaTools } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import useHTTPPost from "src/Hooks/use-httppost";
import { getMyproduct } from "src/redux/store/features/product-slice";
import { uiActions } from "src/redux/store/ui-slice";
import productPic from "../assets/image/productpic.svg";
import { productApi } from "./api";
import DrawerWrapper from "./DrawerWrapper";
import ModalAction from "./ModalContent/ModalAction";

const JobDetails = ({ data }: any) => {
  return (
    <DrawerWrapper title="Job Detail">
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-3">
            <div className="text-xs text-[#8487A3]">Headline</div>
            <div className="text-base text-[#090F47]">{data.headline}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-[#8487A3]">Experience Level</div>
            <div className="text-base text-[#090F47]">
              {data.experienceLevel}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-[#8487A3]">Job Scope</div>
            <div className="text-base text-[#090F47]">{data.jobScope} </div>
          </div>
        </div>
        <div className="flex justify-between mt-5 w-full">
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text"> Duration</div>
            <div className="text-base text-[#090F47]">{data.duration}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text">Date Posted</div>
            <div className="text-base text-[#090F47]">{data.datePosted}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text">Budget</div>
            <div className="text-base text-[#090F47]">₦ {data.budget}</div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center gap-3">
          <div className="text-xs text-text">Description</div>
          <div className="text-base text-[#090F47]">{data.description}</div>
        </div>
        {data?.skillsNeeded?.length !== 0 ? (
          <div className=" mt-5 w-full">
            <div className="text-darkPurple text-lg text-center">
              Skills Needed
            </div>
            <div className="flex justify-between mt-5 w-full">
              {data?.skillsNeeded?.map((item: any, index: any) => (
                <div className="mt-5" key={index}>
                  <div className="text-xs text-text mb-5">{item?.title}</div>
                  <div className="text-base text-[#090F47]">{item?.value}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </DrawerWrapper>
  );
};
export default JobDetails;
