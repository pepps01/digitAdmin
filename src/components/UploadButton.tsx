import React from "react";
import userPic from "../assets/image/userPic.svg";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";

const UploadButton = (props: any) => {
  const wrapperRef = React.useRef(null as any);

  const [fileList, setFileList] = React.useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e: any) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList as any);
      props.onHandleChange(newFile);
    }

    //   const fileRemove = (file: any) => {

    //     props.onFileChange(undefined);
    //   };

    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className=""
            //   ref={wrapperRef}
            //   onDragEnter={onDragEnter}
            //   onDragLeave={onDragLeave}
            //   onDrop={onDrop}
          >
            <div className="w-full">
              <Image src={userPic} alt="" width={100} height={100} />
              <p>Drag & Drop your files here</p>
            </div>
            <input type="file" value="" onChange={onFileDrop} />
          </div>

          {/* {fileList.length > 0 ? (
          <div className={UploadCss.file_preview}>
            <p className={UploadCss.preview_title}>Ready to upload</p>
            {fileList.map((item: any, index) => (
              <div key={index} className={UploadCss.preview_item}>
                <Image
                  src={
                    item.type.includes("image")
                      ? URL.createObjectURL(item)
                      : FilePng
                  }
                  alt="png"
                  width={50}
                  height={50}
                />
                <div className={UploadCss.preview_item_info}>
                  <p className={UploadCss.image_name}>{item.name}</p>
                  <p className={UploadCss.image_size}>
                    {item.size > 1000000
                      ? `${(item.size / 1000000).toFixed(2)} MB`
                      : `${(item.size / 1000).toFixed(2)} KB`}
                  </p>
                </div>
                <span
                  className={UploadCss.preview_item_del}
                  onClick={() => fileRemove(item)}
                >
                  <FaTrashAlt />
                </span>
              </div>
            ))}
          </div>
        ) : null} */}
        </div>
      </>
    );
  };
};

export default UploadButton;
