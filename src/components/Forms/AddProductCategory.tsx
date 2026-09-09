import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Notify, NotifyType } from "../HotToast";
import axios from "axios";
import UploadInputButton from "../UploadInputButtons";
import DrawerWrapper from "../DrawerWrapper";
import {
  clearError,
  clearMessage,
  createproductCategory,
  updateproductCategory,
} from "src/redux/store/features/product-category-slice";
import SuccessfulModal from "../ModalContent/SuccessfulModal";
import { uiActions } from "src/redux/store/ui-slice";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";

import { productCategoryApi } from "../api";
import useHTTPGet from "src/Hooks/use-httpget";
import useHTTPPost from "src/Hooks/use-httppost";
import { fetchProduct } from "src/redux/store/features/product-slice";

const AddProductCategory = ({ type, id }: any) => {
  const request = useHTTPGet();
  const send = useHTTPPost();
  const [name, setName] = React.useState("");
  const accessToken = sessionStorage.getItem("accessToken");
  const [profilePic, setProfilePic] = React.useState<any>("");
  const [profilePict, saveProfilePict] = React.useState<any>("");
  const [selectedFile, setSelectedFile] = useState<any>("");
  const dispatch = useAppDispatch();
  const { success, loading, error, message } = useAppSelector(
    (state: any) => state.productCategory
  );

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
          message: "File size too big, File must not be more than 2mb",
        });
      } else {
        saveProfilePict(fileString);
        setSelectedFile(event.target.files[0]);
        console.log(selectedFile);
        console.log(fileString);
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

  console.log(formData);
  const data = {
    payload: formData,
    id,
  };

  const convertToBinary = (url: string) => {
    fetch(
      "https://easy.unikmarketing.org/storage/product-category/Db95ksnxaczWr0L0mnt5"
    )
      .then(response => response.blob())
      .then(blob => {
        let reader = new FileReader();
        const file = reader.readAsArrayBuffer(blob);
        console.log(file);
        reader.onload = function () {
          let arrayBuffer = reader.result;
          console.log(arrayBuffer);
        };
      })
      .catch(error => {
        console.error(error);
      });
  };
  const updateCategory = async () => {
    dispatch(updateproductCategory(data));
  };
  const createCategory = async () => {
    dispatch(createproductCategory(formData));
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
      const getMyCategory = () => {
        const url = `${productCategoryApi}/single-product-category/${id}`;
        const dataFunction = (res: any) => {
          setName(res.data.data.name);
          saveProfilePict(res.data.data.image);

          // convertToBinary(res.data.data.image);
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
      dispatch(fetchProduct(accessToken))
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);

  return (
    <DrawerWrapper
      title={
        type === "edit" ? "Edit Product Category" : "Create Product Category"
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
            htmlFor="productName"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Category Name
          </label>
          <input
            type="text"
            name="productName"
            value={name}
            id="productName"
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

export default AddProductCategory;
