import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Notify, NotifyType } from "src/components/HotToast";
import { useAppDispatch } from "./use-redux";
import { uiActions } from "src/redux/store/ui-slice";
import SuccessfulModal from "src/components/ModalContent/SuccessfulModal";

const useHTTPGet = () => {
  const dispatch = useAppDispatch();

  const request = async (
    { url, accessToken }: any,
    dataFunction: any,
    alert: any = "dont"
  ) => {
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        dataFunction(res);
        if (alert === "send") {
          dispatch(
            uiActions.openToastAndSetContent({
              toastContent: res.data.message,
              backgroundColor: "rgba(24, 160, 251, 1)",
            })
          );
        }
      })
      .catch((error: any) => {
        if (error.response) {
          dispatch(
            uiActions.openToastAndSetContent({
              toastContent: error.response.data.message,
              backgroundColor: "red",
            })
          );
        } else if (error.request) {
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
      });
  };

  return request;
};

export default useHTTPGet;
