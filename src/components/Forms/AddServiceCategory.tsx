import React, { useEffect, useState } from "react";
import useInput from "src/Hooks/use-input";
import userPic from "../../assets/image/userPic.svg";
import cardImage from "../../assets/image/cardImage.jpg";
import { Notify, NotifyType } from "../HotToast";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { uiActions } from "src/redux/store/ui-slice";
import useHTTPPost from "src/Hooks/use-httppost";
import DeleteIcon from "../../assets/image/delete-icon.svg";
import Image from "next/image";
import SuccessfulModal from "../ModalContent/SuccessfulModal";
import UploadInputButton from "../UploadInputButtons";
import DrawerWrapper from "../DrawerWrapper";
import {
  clearError,
  clearMessage,
  createserviceCategory,
  fetchServiceCategories,
  updateserviceCategory,
} from "src/redux/store/features/service-category-slice";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { serviceCategoryApi } from "../api";
import useHTTPGet from "src/Hooks/use-httpget";

const AddServiceCategory = ({ type, id }: any) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const request = useHTTPGet();
  const [name, setName] = React.useState("");
  const [profilePic, setProfilePic] = React.useState<any>("");
  const [profilePict, saveProfilePict] = React.useState<any>("");
  const [selectedFile, setSelectedFile] = useState<any>("");
  const { success, loading, error, message } = useAppSelector(
    (state: any) => state.serviceCategory
  );

  const dispatch = useAppDispatch();

  const updateProps = (event: any) => {
    const newValue = event?.target?.value;
    const reader = new FileReader();
    let fileString;
    if (event.target.files[0]) {
      console.log(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = file => {
      fileString = file?.target?.result;
      console.log(file);
      if (event?.target?.files[0]?.size > 2000000) {
        Notify({
          type: NotifyType.warning,
          message: "File size to big, File must not be more than 2mb",
        });
      } else {
        saveProfilePict(fileString);
        setSelectedFile(event.target.files[0]);
        console.log(profilePict);
      }
    };
    setProfilePic(newValue);
    console.log(profilePict);
    console.log(profilePic);
  };

  const formData = new FormData();
  {
    selectedFile && formData.append("image", selectedFile);
  }
  formData.append("name", name);

  const createCategory = () => {
    dispatch(createserviceCategory(formData));
  };

  const updateCategory = async () => {
    const data = {
      payload: formData,
      id,
    };

    dispatch(updateserviceCategory(data));
  };

  const submitFormHandler = (e: any) => {
    e.preventDefault();
    if (type === "edit") {
      updateCategory();
    } else {
      createCategory();
    }
  };
  useEffect(() => {
    if (type === "edit") {
      const getMyCategory = async () => {
        const url = `${serviceCategoryApi}/single-service-category/${id}`;
        const dataFunction = (res: any) => {
          setName(res.data.data.name);
          saveProfilePict(res.data.data.image);
        };
        request({ url, accessToken }, dataFunction);
      };
      getMyCategory();
    }
  }, [accessToken]);

  useEffect(() => {
    if (loading === true) {
      dispatch(uiActions.openLoader());
    }
    if (loading === false) {
      dispatch(uiActions.closeLoader());
    }
    if (error.length > 0) {
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: error,
          backgroundColor: "red",
        })
      );
      setTimeout(() => {
        dispatch(clearError());
        dispatch(uiActions.closeToast());
      }, 10000);
    }
    if (success) {
      dispatch(uiActions.closedrawer());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "#49D3BA",
        })
      );
      dispatch(fetchServiceCategories(accessToken));
      setTimeout(() => {
        dispatch(clearMessage());
        dispatch(uiActions.closeToast());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, accessToken]);

  return (
    <DrawerWrapper
      title={
        type === "edit" ? "Edit Service Category" : "Create Service Category"
      }
    >
      <form
        className="w-full h-full flex flex-col"
        onSubmit={submitFormHandler}
      >
        <label className=" text-[10px] text-[#1D2939] bg-white">
          Category Image{" "}
        </label>
        <UploadInputButton
          handleChange={updateProps}
          inputValue={profilePic}
          data={profilePict}
          inputName="profilePict"
          onDelete={() => {
            saveProfilePict(undefined);
          }}
          required={profilePict ? false : true}
        />
        <div className="mt-[10px]">
          <label
            htmlFor="serviceName"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Category Name
          </label>
          <input
            type="text"
            name="serviceName"
            value={name}
            id="serviceName"
            onChange={e => setName(e.target.value)}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Category Name"
          />
        </div>
        <button
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto mt-6"
          type="submit"
        >
          {type === "edit" ? "Update Category" : " Add Category"}
        </button>
      </form>
    </DrawerWrapper>
  );
};

export default AddServiceCategory;
