import React, { useEffect, useState } from "react";
import { Notify, NotifyType } from "../HotToast";
import Image from "next/image";
import deleteIcon from "../../assets/image/delete-icon.svg";
import axios from "axios";
import UploadInputButton from "../UploadInputButtons";
import DrawerWrapper from "../DrawerWrapper";
import { createproductCategory } from "src/redux/store/features/product-category-slice";
import SuccessfulModal from "../ModalContent/SuccessfulModal";
import { uiActions } from "src/redux/store/ui-slice";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { serviceApi } from "../api";
import userPic from "../../assets/image/userPic.svg";
import { fetchService } from "src/redux/store/features/service-slice";

const AddServiceImages = ({ id }: any) => {
  const [images, setImages] = useState<any>([]);
  const [profilePic, setProfilePic] = useState<any>([]);
  const dispatch = useAppDispatch();

  const onFileSelect = (event: any) => {
    console.log(event.target.files[0]);
    const reader = new FileReader();
    let fileString;
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = file => {
      fileString = file?.target?.result;
      console.log(file);
      if (event?.target?.files[0]?.size > 2000000) {
        dispatch(
          uiActions.openToastAndSetContent({
            toastContent: "File size to big, File must not be more than 2mb",
          })
        );
      } else {
        setImages([...images, event.target.files[0]]);
        setProfilePic([...profilePic, file?.target?.result]);
      }
      console.log(profilePic);
    };
  };
  const onDelete = (index: any) => {
    const newImage = [...images];
    const newPP = [...profilePic];
    newImage.splice(index, 1);
    setImages(newImage);
    newPP.splice(index, 1);
    setProfilePic(newPP);
  };

  const formData = new FormData();
  formData.append("images", images);

  const payload = {
    image: images,
  };
  console.log(images);
  const sendImages = async (e: any) => {
    e.preventDefault();
    const accessToken = sessionStorage.getItem("accessToken");
    dispatch(uiActions.openLoader());
    try {
      const res = await axios.post(
        `${serviceApi}/add-service-images/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      dispatch(uiActions.closedrawer());
      dispatch(uiActions.closeLoader());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: res.data.message,
          backgroundColor: "#49D3BA",
        })
      );
      dispatch(fetchService(accessToken));
    } catch (err: any) {
      dispatch(uiActions.closeLoader());
      if (err.response) {
        dispatch(
          uiActions.openToastAndSetContent({
            toastContent: err.response.data.message,
            backgroundColor: "red",
          })
        );
      } else if (err.request) {
        dispatch(
          uiActions.openToastAndSetContent({
            toastContent: "A Error occured on our end",
            backgroundColor: "red",
          })
        );
      } else {
        dispatch(
          uiActions.openToastAndSetContent({
            toastContent: "A Error occured",
            backgroundColor: "red",
          })
        );
      }
    }
  };
  return (
    <DrawerWrapper title="Create Service Images">
      <form className="w-full h-full flex flex-col" onSubmit={sendImages}>
        <label className=" text-[10px] text-[#1D2939] bg-white mx-auto ">
          <Image src={userPic} alt="" />
          <input
            type="file"
            multiple
            onChange={onFileSelect}
            className="hidden"
          />
        </label>
        <div className="flex flex-wrap gap-1 w-full  overflow-y-auto">
          {" "}
          {profilePic.map((data: any, index: any) => (
            <div className="" key={index}>
              <object
                data={data}
                width="100"
                height="100"
                style={{ marginTop: "10px", objectFit: "cover" }}
              ></object>

              <div onClick={() => onDelete(index)}>
                <Image src={deleteIcon} alt="" />
              </div>
            </div>
          ))}
        </div>

        <button
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto mt-6"
          type="submit"
        >
          Add Images
        </button>
      </form>
    </DrawerWrapper>
  );
};

export default AddServiceImages;
