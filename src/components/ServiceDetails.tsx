import Image from "next/image";
import { send } from "process";
import { useEffect, useState } from "react";
import { FaTools } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import useHTTPPost from "src/Hooks/use-httppost";
import { useAppDispatch } from "src/Hooks/use-redux";
import { getMyproduct } from "src/redux/store/features/product-slice";
import { getMyservice } from "src/redux/store/features/service-slice";
import { uiActions } from "src/redux/store/ui-slice";
import productPic from "../assets/image/productpic.svg";
import { productApi, serviceApi } from "./api";
import DrawerWrapper from "./DrawerWrapper";
import ModalAction from "./ModalContent/ModalAction";

const ServiceDetails = ({ data }: any) => {
  const send = useHTTPPost();
  const remove = useHTTPDelete();
  const dispatch = useAppDispatch();
  const [primary, setPrimary] = useState({} as any);
  const [secondary, setSecondary] = useState([]);
  const [showModal, setShowModal] = useState({
    show: false,
    value: "",
  });
  console.log(data);
  useEffect(() => {
    const primaryImage = data.images.filter((item: any) => {
      return item.isPrimary === true;
    });
    setPrimary(primaryImage[0]);
    const secondaryImages = data.images.filter((item: any) => {
      return item.isPrimary === false;
    });
    setSecondary(secondaryImages);
  }, [data.images]);

  const setImageAsPrimary = (imageID: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `${serviceApi}/set-primary-image/${data.id}/${imageID}`;
    const dataFunction = () => {
      dispatch(uiActions.closedrawer());
      dispatch(getMyservice(accessToken));
    };
    send({ url, accessToken }, dataFunction);
  };

  const deleteImage = (imageID: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `${serviceApi}/remove-service-image/${imageID}`;

    const dataFunction = () => {
      dispatch(uiActions.closedrawer());
      dispatch(getMyservice(accessToken));
    };
    dispatch(
      uiActions.openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <>
            <ModalAction
              action="Delete"
              item="Image"
              actionFunction={() => remove({ url, accessToken }, dataFunction)}
            />
          </>
        ),
      })
    );
  };
  return (
    <DrawerWrapper title="Service Details">
      <div className="flex flex-col items-center">
        {primary?.image && (
          <div className="mx-auto mb-4 rounded-[50%] w-[100px] h-[100px]">
            <Image
              src={primary?.image}
              width={100}
              height={100}
              className="rounded-[50%] w-full h-full object-cover border border-darkPurple"
              alt={""}
            />
          </div>
        )}

        <div className="w-full max-h-[300px] overflow-y-auto flex flex-wrap gap-2 items-center justify-center my-4 p-3">
          {secondary?.map((image: any) => (
            <div
              key={image.imageID}
              className="rounded-xl w-[100px] h-[100px] relative"
              onMouseOver={() =>
                setShowModal({ ...showModal, show: true, value: image.imageID })
              }
            >
              <Image
                src={image.image}
                alt=""
                width={100}
                height={100}
                className="rounded-xl w-full h-full object-cover"
              />
              <span
                className="absolute top-0 right-0 text-white bg-darkPurple font-bold"
                onClick={() => deleteImage(image.imageID)}
              >
                <RiDeleteBinLine />
              </span>
              {showModal.value === image.imageID && (
                <div className="w-full h-full bg-[rgba(0,0,0,0.4)] absolute top-0 left-0 z-10 flex items-center justify-center">
                  <button
                    className="text-[8px] text-white bg-darkPurple"
                    onClick={() => setImageAsPrimary(image.imageID)}
                  >
                    Set as Primary Image
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between w-full">
          <div className="flex flex-col items-center gap-3 w-[120px]">
            <div className="text-[10px] text-[#8487A3]">Service Name</div>
            <div className="text-xs text-center text-[#090F47]">
              {data?.serviceName}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-[120px]">
            <div className="text-[10px] text-center  text-[#8487A3] ">
              Service ID
            </div>
            <div className="text-xs text-center text-[#090F47] ">
              {data?.id}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-[120px]">
            <div className="text-[10px] text-center  text-[#8487A3]">
              Location
            </div>
            <div className="text-xs text-center  text-[#090F47]">
              {data?.location}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-5 w-full">
          <div className="flex flex-col gap-3 w-[120px]">
            <div className="text-[10px] text-center text-text">
              {" "}
              Phone Number
            </div>
            <div className="text-xs text-center  text-[#090F47]">
              {data?.phoneNumber}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-[120px]">
            <div className="text-[10px] text-center  text-text">
              Category Name
            </div>
            <div className="text-xs text-center  text-[#090F47]">
              {data?.categoryName}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-[120px]">
            <div className="text-[10px] text-center  text-text">Price </div>
            <div className="text-xs text-center  text-[#090F47]">
              ₦ {data?.pricing}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-5 w-full">
          <div className="flex flex-col gap-3 w-[120px]">
            <div className="text-[10px] text-center  text-text">
              Date Posted
            </div>
            <div className="text-xs text-center  text-[#090F47]">
              {data?.datePosted}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center gap-3 ">
          <div className="text-[10px] text-center  text-text">Description</div>
          <div className="text-xs text-center  text-[#090F47]">
            {data.description}
          </div>
        </div>
        {data?.otherDetails?.length !== 0 ? (
          <div className=" mt-5 w-full">
            <div className="text-darkPurple text-lg text-center">
              Other Details
            </div>
            <div className="flex justify-around mt-5 w-full">
              {data?.otherDetails?.map((item: any, index: any) => (
                <div className="mt-5" key={index}>
                  <div className="text-xs text-text mb-5">{item?.title}</div>
                  <div className="text-sm text-[#090F47]">{item?.value}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="w-full mt-6">
          <div className="text-darkPurple text-lg text-center mb-3">
            Merchant Details
          </div>
          <div className="flex justify-between gap-4 w-full">
            <div className="flex flex-col gap-3 max-w-[120px]">
              <div className="text-[10px] text-center text-[#8487A3]">
                Merchant Name
              </div>
              <div className="text-xs text-center text-[#090F47]">
                {data?.merchant?.fullName}
              </div>
            </div>
            <div className="flex flex-col gap-3 max-w-[120px]">
              <div className="text-[10px] text-center text-[#8487A3]">
                Merchant Phone Number
              </div>
              <div className="text-xs text-center text-[#090F47]">
                {data?.merchant?.phone}
              </div>
            </div>
            <div className="flex flex-col gap-3 max-w-[120px]">
              <div className="text-[10px] text-center text-[#8487A3]">
                Merchant Email Address
              </div>
              <div className="text-xs text-center text-[#090F47]">
                {data?.merchant?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DrawerWrapper>
  );
};
export default ServiceDetails;
