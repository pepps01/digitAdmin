import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../redux/store/ui-slice";
import Cancel from "../assets/cancel.png";
import CloseIcon from "../assets/images/ant-design_close-circle-outlined.svg";
import { useAppDispatch } from "src/Hooks/use-redux";

const styles = {
  main: {
    backgroundColor: "rgba(137, 146, 163, 0.5)",
    zIndex: 16000000,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    overflow: "scroll",
    justifyContent: "center",
    alignItems: "center",

    bgcolor: "#FFFFFF",
  } as React.CSSProperties,
  messageBox: {
    backgroundColor: "white",
    borderRadius: "24px",
    // width: "591px",
    overflow: "auto",
    textAlign: "center",
    position: "relative",
  } as React.CSSProperties,
};

export default function Modal() {
  const dispatch = useAppDispatch();
  const modalOpened = useSelector((state: any) => state.ui.modalOpened);
  const modalContent = useSelector((state: any) => state.ui.modalContent);
  const modalStyles = useSelector((state: any) => state.ui.modalStyles);

  const Close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(uiActions.closeModal());
  };
  return (
    <>
      {modalOpened ? (
        <div
          style={{
            ...styles.main,
            left: 0,
            zIndex: 160000000,
          }}
          onClick={e => Close(e)}
        >
          <div style={{ ...styles.messageBox, ...modalStyles }}>
            <div
              onClick={e => {
                e.stopPropagation();
              }}
              style={{ marginTop: "0px", backgroundColor: "white" }}
            >
              {modalContent}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
