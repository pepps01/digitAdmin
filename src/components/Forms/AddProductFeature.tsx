import { ConstructionOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import useHTTPPost from "src/Hooks/use-httppost";
import DrawerWrapper from "../DrawerWrapper";
import { RiAddCircleLine } from "react-icons/ri";
import { productApi } from "../api";
import { fetchProduct } from "src/redux/store/features/product-slice";
import { useAppDispatch } from "src/Hooks/use-redux";

const AddProductFeature = ({ id, title, existingFeature }: any) => {
  const dispatch = useAppDispatch();
  const [feature, setFeature] = useState<string>();
  const [items, setItems] = useState<any[]>([]);
  const send = useHTTPPost();

  console.log(existingFeature?.keys());
  const newFeature = existingFeature?.map((item: any) => {
    return item.featureName;
  });

  const handleChange = (e: any) => {
    setFeature(e.target.value);
    console.log(feature);
  };
  const addFeature = () => {
    setItems([...items, feature]);
    setFeature("");
    console.log(items);
  };
  const removeFeature = (i: any) => {
    items.splice(i, 1);
  };

  const submitFormHandler = (e: any) => {
    const payload = {
      feature: items,
    };
    console.log(payload);
    e.preventDefault();
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `${productApi}/add-product-feature/${id}`;
    const dataFunction = (res: any) => {
      dispatch(fetchProduct(accessToken));
    };
    send({ url, values: payload, accessToken }, dataFunction);
  };

  useEffect(() => {
    if (title === "Edit Product Feature") {
      setItems(newFeature);
    }
  }, [title]);

  return (
    <DrawerWrapper title={title}>
      <form onSubmit={submitFormHandler}>
        <div className="mt-[10px] relative">
          <label className=" text-[10px] text-[#1D2939] bg-white">
            Feature
          </label>
          <input
            type="text"
            name="text"
            value={feature}
            onChange={handleChange}
            className="border-[0.5px]  border-lightGrey rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
          />
          <div
            className="text-white text-[8px] bg-darkPurple w-7 h-7 rounded-[50%] absolute top-1/2 right-1 flex items-center justify-center"
            onClick={addFeature}
          >
            Add
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mt-2">
          {items?.map((item, index) => (
            <div
              className=" text-white bg-lightPurple text-xs rounded-full p-1 flex items-center"
              key={index}
            >
              {item}
              <span
                className="text-xl text-white cursor-pointer ml-1"
                onClick={() => removeFeature(index)}
              >
                -
              </span>
            </div>
          ))}
        </div>

        <button
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto mt-6"
          type="submit"
        >
          Add Feature
        </button>
      </form>{" "}
    </DrawerWrapper>
  );
};

export default AddProductFeature;
