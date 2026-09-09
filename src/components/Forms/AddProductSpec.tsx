import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import useHTTPPost from "src/Hooks/use-httppost";
import { useAppDispatch } from "src/Hooks/use-redux";
import { fetchProduct } from "src/redux/store/features/product-slice";
import { productApi } from "../api";
import DrawerWrapper from "../DrawerWrapper";
import MultipleInput from "../MultipleInput";

const AddProductSpec = ({ id, title, existingSpec }: any) => {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<any[]>([]);
  const send = useHTTPPost();

  let handleChange = (index: any, e: any) => {
    if (items.length === 0) return;
    let newItems = [...items];

    if (e?.target?.name.startsWith("title")) {
      newItems[index].title = e?.target?.value;
    } else if (e?.target?.name.startsWith("value")) {
      newItems[index].value = e?.target?.value;
    }
    setItems(newItems);
  };

  let addFormFields = () => {
    setItems([...items, { title: "", value: "" }]);
  };
  let removeFormFields = (i: any) => {
    let newItems = [...items];
    newItems.splice(i, 1);
    setItems(newItems);
  };
  console.log(items);

  const submitFormHandler = (e: any) => {
    const payload = {
      spec: items,
    };
    console.log(payload);
    e.preventDefault();

    if (title === "Add Product Specification") {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = `${productApi}/add-product-specs/${id}`;
      const dataFunction = (res: any) => {
        dispatch(fetchProduct(accessToken));
      };
      send({ url, values: payload, accessToken }, dataFunction);
    }

    if (title === "Edit Product Specification") {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = `${productApi}/edit-product-spec/${id}`;
      const dataFunction = (res: any) => {
        dispatch(fetchProduct(accessToken));
      };
      send({ url, values: payload, accessToken }, dataFunction);
    }
  };

  useEffect(() => {
    if (title === "Edit Product Specification") {
      setItems([...existingSpec]);
    }
  }, [title]);

  return (
    <DrawerWrapper title={title}>
      <form onSubmit={submitFormHandler}>
        {items?.map((element, index: any) => (
          <MultipleInput
            index={index}
            key={index}
            element={element}
            handleChange={handleChange}
            removeFormFields={removeFormFields}
          />
        ))}

        <div>
          <div
            onClick={addFormFields}
            className="text-xs flex text-gray-600 mt-1"
          >
            <div className="mr-1 text-darkPurple ">
              <RiAddCircleLine />
            </div>{" "}
            <div> Add Items</div>
          </div>
        </div>

        <button
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto mt-6"
          type="submit"
        >
          Add Specification
        </button>
      </form>{" "}
    </DrawerWrapper>
  );
};

export default AddProductSpec;
