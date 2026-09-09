import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import useHTTPGet from "src/Hooks/use-httpget";
import useHTTPPost from "src/Hooks/use-httppost";
import { useAppDispatch } from "src/Hooks/use-redux";
import { getMyproduct } from "src/redux/store/features/product-slice";
import { uiActions } from "src/redux/store/ui-slice";
import { formatData } from "src/utils/helperFunctions";
import { productApi } from "./api";
import DrawerWrapper from "./DrawerWrapper";
import ModalAction from "./ModalContent/ModalAction";

const ProductDetails = ({ id }: any) => {
  const send = useHTTPPost();
  const request = useHTTPGet();
  const remove = useHTTPDelete();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>();
  const [primary, setPrimary] = useState({} as any);
  const [secondary, setSecondary] = useState([]);
  const [showModal, setShowModal] = useState({
    show: false,
    value: "",
  });
  const fetchProduct = useCallback(
    async (id: any) => {
      const url = `${productApi}/single-product/${id}`;
      const accessToken = sessionStorage.getItem("accessToken");
      const dataFunction = (res: any) => {
        const dataa = formatData(res.data.data);
        setData(dataa);
      };
      request({ url, accessToken }, dataFunction);
    },
    [request]
  );
  useEffect(() => {
    if (data) {
      const primaryImage = data?.images.filter((item: any) => {
        return item.isPrimary === true;
      });
      setPrimary(primaryImage[0]);
      const secondaryImages = data?.images.filter((item: any) => {
        return item.isPrimary === false;
      });
      setSecondary(secondaryImages);
    }
  }, [data?.images]);

  const setImageAsPrimary = (imageID: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `${productApi}/set-primary-image/${id}/${imageID}`;
    const dataFunction = () => {
      fetchProduct(id);
    };
    send({ url, accessToken }, dataFunction);
  };

  const deleteImage = (imageID: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `${productApi}/remove-product-image/${imageID}`;

    const dataFunction = () => {
      dispatch(uiActions.closeModal());
      fetchProduct(id);
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

  useEffect(() => {
    fetchProduct(id);
  }, []);

  return (
    <DrawerWrapper title="Product Detail">
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
                src={image?.image}
                alt=""
                width={100}
                height={100}
                className="rounded-xl w-full h-full object-cover"
              />
              <span
                className="absolute top-0 right-0 text-white bg-darkPurple font-bold z-100"
                onClick={() => deleteImage(image?.imageID)}
              >
                <RiDeleteBinLine />
              </span>
              {showModal.value === image?.imageID && (
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

        <div className="flex justify-between w-full gap-2">
          <div className="flex flex-col gap-3">
            <div className="text-xs text-[#8487A3] text-center">
              Product Name
            </div>
            <div className="text-xs text-[#090F47] text-center">
              {data?.name}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-[#8487A3] text-center">
              Serial Number
            </div>
            <div className="text-xs text-[#090F47] text-center">
              {data?.serial}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-[#8487A3] text-center">
              Product Quantity
            </div>
            <div className="text-xs text-[#090F47] text-center">{`${data?.quantity} ${data?.name}`}</div>
          </div>
        </div>
        <div className="flex justify-between mt-5 w-full gap-2">
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text text-center"> Product Weight</div>
            <div className="text-xs text-[#090F47] text-center">
              {data?.weight}kg
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text text-center">Delivery Tag</div>
            <div className="text-xs text-[#090F47] text-center">
              {data?.freeDelivery}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text text-center">
              Price (per unit)
            </div>
            <div className="text-xs text-[#090F47] text-center">
              ₦ {data?.price}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-3 w-full">
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text text-center">Warranty</div>
            <div className="text-xs text-[#090F47] text-center">
              {data?.producWarranty}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center gap-2">
          <div className="text-xs text-text">Description</div>
          <div className="text-xs text-[#090F47] text-center">
            {data?.description}
          </div>
        </div>
        {data?.specifications?.length !== 0 ? (
          <div className=" mt-3 w-full">
            <div className="text-darkPurple text-lg text-center">
              Product Specification
            </div>
            <div className="flex justify-around mt-3 w-full">
              {data?.specifications?.map((item: any, index: any) => (
                <div className="mt-5" key={index}>
                  <div className="text-xs text-text mb-5">{item?.title}</div>
                  <div className="text-xs text-[#090F47]">{item?.value}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {data?.features?.length === 0 ? (
          ""
        ) : (
          <div className=" mt-3 w-full">
            <div className="text-darkPurple text-lg text-center">Features</div>
            <div className="flex justify-around mt-3 w-full gap-2">
              {data?.features?.map((item: any) => (
                <div
                  className="text-xs text-text mb-5 mt-3 capitalize"
                  key={item.featureID}
                >
                  {item?.featureName}
                </div>
              ))}{" "}
            </div>
          </div>
        )}
      </div>
    </DrawerWrapper>
  );
};
export default ProductDetails;
