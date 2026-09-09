import React from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import OutlineTextInput from "./OutlinedTextInput";
import deleteIcon from "../assets/image/delete-icon.svg";
import userPic from "../assets/image/userPic.svg";

const UploadInputButton = ({
  classes,
  handleChange,
  inputValue,
  inputName,
  isFilePicked,
  data,
  saveData,
  onDelete,
  setIsFilePicked,
  selectedFile,
  required,
  helpText,
}: any) => {
  return (
    <>
      <Button variant="text" component="label">
        <div className="flex flex-col items-center">
          <div style={{ display: "none" }}>
            <OutlineTextInput
              handleChange={handleChange}
              inputName={inputName}
              inputLabel=""
              InputHelper="Select"
              inputType="file"
              inputShrink
              inputValue={inputValue}
              required={required}
            />
          </div>
          <Image src={userPic} alt={""} />
          <div className="text-darkPurple capitalize text-xs">
            Browse for a file to upload.
          </div>
          <div className="text-darkPurple text-[8px]">
            {helpText ||
              "Only image files are supported : JPEG, JPG, PNG. Max file size: 2mb"}
          </div>
        </div>
        <input type="file" hidden />
      </Button>

      {data ? (
        <div className="flex justify-center w-[120px] h-[120px]">
          {/* <object
            data={data}
            width="200"
            height="200"
            style={{ marginTop: "10px", objectFit: "cover" }}
          ></object> */}
          <Image
            src={data}
            width="200"
            height="200"
            style={{ marginTop: "10px", objectFit: "cover" }}
            alt=""
          />
          {data ? (
            <div onClick={onDelete}>
              <Image src={deleteIcon} alt="" />
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default UploadInputButton;
