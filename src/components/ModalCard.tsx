import { useState } from "react";
import { useDispatch } from "react-redux";

const ModalCard = ({ title, children, width }: any) => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 600);
  const dispatch = useDispatch();
  return (
    <div className="h-auto min-h-[400px] max-h-[90vh]">
      <div className="flex py-9 px-[26px]  border-b border-softGray">
        <div className="font-bold text-darkPurple text-lg">{title}</div>
        <div className="text-lg text-lightGray cursor-pointer">&times;</div>
      </div>
      <div
        style={{ width: isDesktop ? width.desktop : width.mobile }}
        className="flex items-center justify-center flex-col px-[40px] py-[30px]"
      >
        {children}
      </div>
    </div>
  );
};
export default ModalCard;
