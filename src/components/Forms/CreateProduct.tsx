import { uiActions } from "../../redux/store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { useEffect, useState, useCallback } from "react";
import useHTTPPost from "src/Hooks/use-httppost";

import useHTTPGet from "src/Hooks/use-httpget";
import { delivery } from "src/utils/analytics";
import DrawerWrapper from "../DrawerWrapper";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  createproduct,
  fetchProduct,
  updateproduct,
} from "src/redux/store/features/product-slice";

import { productApi } from "../api";
import { getMyproductCategories } from "src/redux/store/features/product-category-slice";

const CreateProduct = ({ title, id, merchantID }: any) => {
  const dispatch = useAppDispatch();
  const request = useHTTPGet();
  const { success, loading, error, message } = useAppSelector(
    (state: any) => state.product
  );
  const accessToken = sessionStorage.getItem("accessToken");
  const [data, setData] = useState({
    name: "",
    description: "",
    discountAvailable: "",
    discountPercentage: "",
    quantity: "",
    brand: "",
    price: null,
    deliveryTag: "",
    deliveryFee: "",
    weight: "",
    warranty: "",
    category: "",
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { productCategories } = useSelector(
    (state: any) => state.productCategory
  );

  const payload = {
    name: data.name,
    brand: data.brand,
    price: data.price,
    description: data.description,
    quantity: data.quantity,
    free_delivery: data.deliveryTag,
    shipping_fee: data.deliveryFee,
    category_id: data.category,
    product_waranty: data.warranty,
    discount_available: data.discountAvailable,
    discount_percentage: data.discountPercentage,
    weight: data.weight,
  };

  const createProduct = async () => {
    dispatch(createproduct({ payload, id: merchantID }));
  };
  const updateProduct = () => {
    const url = `${productApi}/update-product/${id}`;
    dispatch(updateproduct({ payload, id }));
  };

  const submitFormHandler = (e: any) => {
    e.preventDefault();

    if (title === "Update Product") {
      updateProduct();
    } else {
      createProduct();
    }
  };

  useEffect(() => {
    if (title === "Update Product") {
      const getAProduct = () => {
        const url = `${productApi}/single-product/${id}`;
        const dataFunction = (res: any) => {
          setData({
            ...data,
            name: res.data.data.product.name,
            description: res.data.data.product.description,
            discountAvailable:
              res.data.data.product.discount.isDiscountAvailable,
            discountPercentage:
              res.data.data.product.discount.discountPercentage,
            quantity: res.data.data.product.quantity,
            brand: res.data.data.product.brand,
            price: res.data.data.product.price,
            deliveryTag: res.data.data.product.delivery.freeDelivery,
            deliveryFee: res.data.data.product.delivery.shippingFee,
            weight: res.data.data.product.weight,
            warranty: res.data.data.product.productWarranty,
            category: res.data.data.category.categoryID,
          });
        };

        request({ url, accessToken }, dataFunction);
      };
      getAProduct();
    }
  }, [accessToken]);

  useEffect(() => {
    dispatch(getMyproductCategories(accessToken));
  }, [dispatch, getMyproductCategories, accessToken]);
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
      dispatch(fetchProduct(accessToken));
      setTimeout(() => {
        dispatch(clearMessage());
        dispatch(uiActions.closeToast());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);
  return (
    <DrawerWrapper title={title}>
      <form
        className="w-full h-full flex flex-col"
        onSubmit={submitFormHandler}
      >
        <div className="mt-[10px]">
          <label
            htmlFor="productName"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={data.name}
            id="productName"
            onChange={handleChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Product Name "
          />
        </div>

        <div className="mt-[10px]">
          <label
            htmlFor="brand"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={data.brand}
            id="brand"
            onChange={handleChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Brand"
          />
        </div>
        <div className=" mt-[10px]">
          <label
            htmlFor="productQuantity"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Product Quantity
          </label>

          <input
            type="number"
            name="quantity"
            value={data?.quantity}
            id="productQuantity"
            onChange={handleChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Product Quantity"
          />
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="productWarranty"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Product Warranty
          </label>
          <input
            type="text"
            name="warranty"
            value={data.warranty}
            id="productWarranty"
            onChange={handleChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Product Warranty"
          />
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="productWeight"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Product Weight(in kg)
          </label>
          <input
            type="number"
            name="weight"
            value={data.weight}
            id="productweight"
            onChange={handleChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Product weight"
          />
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="category"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Category
          </label>

          <select
            name="category"
            value={data.category}
            id="category"
            onChange={(e: any) => {
              setData({
                ...data,
                [e.target.name]: e.target.value,
              });
            }}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Category"
          >
            {productCategories?.map((item: any) => (
              <option
                value={item.categoryID}
                key={item.categoryID}
                className=" text-[10px] text-[#1D2939] bg-white"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="discount"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Discount Available
          </label>

          <select
            name="discountAvailable"
            value={data.discountAvailable}
            id="discount"
            onChange={(e: any) => {
              setData({
                ...data,
                [e.target.name]: e.target.value,
                discountPercentage: "1",
              });
            }}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="discount"
          >
            {delivery?.map((item: any) => (
              <option
                value={item.name}
                key={item.id}
                className=" text-[10px] text-[#1D2939] bg-white"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {data.discountAvailable === "Yes" && (
          <div className=" mt-[30px]">
            <label
              htmlFor="discountPercentage"
              className=" text-[10px] text-[#1D2939] bg-white"
            >
              Discount Percentege
            </label>
            <input
              type="number"
              name="discountPercentage"
              value={data.discountPercentage}
              id="discountPercentage"
              onChange={handleChange}
              className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
              placeholder="Discount Percentege"
            />
          </div>
        )}

        <div className=" mt-[30px]">
          <label
            htmlFor="price"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Price
          </label>
          <NumericFormat
            name="enteredPrice"
            value={data.price || ""}
            allowNegative={false}
            thousandSeparator={true}
            required
            prefix={"₦"}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            onValueChange={(values: any, sourceInfo: any) => {
              const { formattedValue, value } = values;
              const { event, source } = sourceInfo;

              setData({ ...data, price: value });
            }}
          />
        </div>

        <div className=" mt-[30px]">
          <label
            htmlFor="role"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Delivery Tag
          </label>

          <select
            name="deliveryTag"
            value={data.deliveryTag}
            id="delivery"
            onChange={(e: any) => {
              setData({
                ...data,
                [e.target.name]: e.target.value,
                deliveryFee: "0",
              });
            }}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Delivery Tag"
          >
            {delivery?.map((item: any) => (
              <option
                value={item.name}
                key={item.id}
                className=" text-[10px] text-[#1D2939] bg-white"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {data.deliveryTag === "No" && (
          <div className=" mt-[30px]">
            <label
              htmlFor="deliveryFee"
              className=" text-[10px] text-[#1D2939] bg-white"
            >
              Delivery Fee
            </label>
            <NumericFormat
              name="deliveryFee"
              value={data.deliveryFee || ""}
              allowNegative={false}
              thousandSeparator={true}
              required
              prefix={"₦"}
              className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
              onValueChange={(values: any, sourceInfo: any) => {
                const { formattedValue, value } = values;

                const { event, source } = sourceInfo;

                setData({ ...data, deliveryFee: value });
              }}
            />
          </div>
        )}

        <div className=" mt-[30px]">
          <label
            htmlFor="description"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            value={data.description}
            id="description"
            onChange={handleChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Description"
          />
        </div>

        <button
          type="submit"
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto mt-4"
        >
          {title === "Update Product" ? "Update Product" : "Create Product"}
        </button>
      </form>
    </DrawerWrapper>
  );
};
export default CreateProduct;
