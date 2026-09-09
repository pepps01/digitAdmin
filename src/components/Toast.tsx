import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../redux/store/ui-slice";
import { useAppDispatch } from "src/Hooks/use-redux";

const Toast = () => {
  const { toastOpened, toastContent, backgroundColor } = useSelector(
    (state: any) => state.ui
  );
  const dispatch = useAppDispatch();
  if (typeof window === "undefined") return <></>;

  const Close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(uiActions.closeToast());
  };
  const styles = {
    main: {
      backgroundColor: "rgba(137, 146, 163, 0.1)",
      zIndex: 19000,
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      overflow: "scroll",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4px",
      bgcolor: "#FFFFFF",
    } as React.CSSProperties,
    // messageBox: {
    //   width: isDesktop ? "591px" : "90%",
    //   height: "50px",
    //   overflow: "auto",
    //   borderRadius: "5px",
    //   color: "white",
    //   top: 2,
    //   right: 2,
    //   textAlign: "center",
    //   position: "absolute",
    // } as React.CSSProperties,
  };

  return (
    <>
      {toastOpened ? (
        <div
          style={{
            ...styles.main,
            left: 0,
            zIndex: 1900000,
          }}
          onClick={e => Close(e)}
        >
          <div
            style={{
              backgroundColor: backgroundColor,
            }}
            className="w-[90%] md:w-[591px] h-[50px] overflow-auto rounded-[5px] text-white top-2 right-2 absolute text-center"
          >
            <div
              onClick={e => {
                e.stopPropagation();
              }}
              style={{
                marginTop: "0px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor,
                height: "100%",
              }}
            >
              <div className="text-white text-center">{toastContent}</div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Toast;
