import React, { useEffect, useRef, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ActionMenuItems from "./ActionMenuItems";
import { useDispatch, useSelector } from "react-redux";
// import { openLoader } from "../../../redux/actions/loader/loaderActions";

const ActionMenuBase = ({ items, text = <MoreHorizIcon />, type }: any) => {
  const [showMenu, setShowMenu] = useState(false);

  const openActionMenuHandler = () => {
    setShowMenu(prev => !prev);
  };

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          openActionMenuHandler();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <div className="relative h-full flex items-center justify-center cursor-pointer">
      <div
        className={`${
          type === "export"
            ? ""
            : "text-darkPurple flex items-center justify-center w-full hover:text-lightPurple hover:bg-[#4356e31a] hover:rounded-[50%] hover:w-[35px] hover:h-[35px]"
        }`}
        onClick={openActionMenuHandler}
      >
        {text}
      </div>
      {showMenu && (
        <span ref={wrapperRef}>
          {" "}
          <ActionMenuItems items={items} />{" "}
        </span>
      )}
    </div>
  );
};
export default ActionMenuBase;
