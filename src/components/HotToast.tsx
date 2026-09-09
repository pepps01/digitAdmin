import toast from "react-hot-toast";

export enum NotifyType {
  error = "error",
  success = "success",
  warning = "warning",
}

type NotifyProps = {
  title?: string;
  message: any;
  type?: NotifyType;
};

const NotifStlye = {
  height: "70px",
  paddingLeft: "2rem",
  paddingRight: "2rem",
  zIndex: "50000",
};
const defaultErrorMessage = "An error occured on our end";
const defaultSuccessessage = "Successful";

export const Notify = ({
  type = NotifyType.error,
  message,
}: Partial<NotifyProps>) => {
  return type === NotifyType.error
    ? toast.error(message || defaultErrorMessage, {
        style: NotifStlye,
        duration: 5000,
      })
    : type === NotifyType.warning
    ? toast(message, { style: { ...NotifStlye }, duration: 5000, icon: "⚠️" })
    : toast.success(message || defaultSuccessessage, {
        style: NotifStlye,
        duration: 5000,
      });
};
