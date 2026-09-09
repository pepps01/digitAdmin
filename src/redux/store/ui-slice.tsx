import { AttractionsRounded } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FunctionComponent } from "react";
import { RootState } from ".";

// Define a type for the slice state
interface uiState {
  modalContent: string | Element | JSX.Element | FunctionComponent;
  modalStyles: {};
  backgroundColor: string;
  modalOpened: boolean;
  drawerContent: string;
  drawerStyles: {};
  drawerOpened: boolean;
  loaderOpened: boolean;
  toastOpened: boolean;
  toastContent: string | Element | JSX.Element | FunctionComponent;
}
// Define the initial state using that type
const initialState: uiState = {
  modalContent: "",
  modalStyles: {},
  modalOpened: false,
  drawerContent: "",
  drawerStyles: {},
  drawerOpened: false,
  loaderOpened: false,
  toastOpened: false,
  toastContent: "",
  backgroundColor: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModalAndSetContent(state, action: PayloadAction<any>) {
      return {
        ...state,
        modalOpened: true,
        modalContent: action.payload.modalContent,
        modalStyles: { ...state.modalStyles, ...action.payload.modalStyles },
      };
    },
    closeModal(state) {
      return { ...state, modalOpened: false };
    },
    openDrawerAndSetContent(state, action: PayloadAction<any>) {
      return {
        ...state,
        drawerOpened: true,
        drawerContent: action.payload.drawerContent,
      };
    },
    closedrawer(state) {
      return { ...state, drawerOpened: false };
    },
    openLoader(state) {
      return { ...state, loaderOpened: true };
    },
    closeLoader(state) {
      return { ...state, loaderOpened: false };
    },
    openToastAndSetContent(state, action: PayloadAction<any>) {
      return {
        ...state,
        toastOpened: true,
        backgroundColor: action.payload.backgroundColor,
        toastContent: action.payload.toastContent,
      };
    },
    closeToast(state) {
      return {
        ...state,
        toastOpened: false,
        toastContent: "",
      };
    },
  },
});
export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
