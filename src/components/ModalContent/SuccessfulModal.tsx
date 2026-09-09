import sucessPic from "../../assets/image/sucessPic.svg";
import Image from "next/image";
import { uiActions } from "../../redux/store/ui-slice";
import { useDispatch } from "react-redux";

const SuccessfulModal = ({ title, message }: any) => {
  const dispatch = useDispatch();
  return (
    <div className="w-[90vw] lg:w-[340px] flex flex-col items-center justify-center py-[30px] px-[30px] gap-[15px] bg-white rounded-3xl">
      <div className="bg-red">
        <Image src={sucessPic} alt={""} />
      </div>

      <div className="text-[21px] text-darkPurple">{title}</div>
      <div className="text-[12px] text-softGray"> {message}</div>
      <button
        onClick={() => dispatch(uiActions.closeModal())}
        className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto"
      >
        Close
      </button>
    </div>
  );
};
export default SuccessfulModal;
