import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { accountApi, baseUrl } from "src/components/api";
import { errorFunction } from "src/utils/helperFunctions";

// Define a type for the slice state
export const getMyProfile = createAsyncThunk(
  "auth/getMyProfile",
  async (data: any, thunkAPI: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `https://easy.unikmarketing.org/api/account/my-profile`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
interface AuthState {
  token: string | null;
  adminDetails: any;
  loading: boolean;
  error: string;
  success: boolean;
  message: string;
}
// Define the initial state using that type

const initialState: AuthState = {
  token:
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null,
  // adminDetails:

  adminDetails: {},

  loading: false,
  error: "",
  success: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState(state) {
      state.error = "";
      state.message = "";
    },
    loginHandler(state, action) {
      console.log(action.payload);
      state.message = action.payload.message;
      sessionStorage.setItem("accessToken", action.payload.token);
      sessionStorage.setItem(
        "adminDetails",
        JSON.stringify(action.payload.data)
      );
      state.token = action.payload.token;

      // state.adminDetails = action.payload.data;

      window.location.href = "/dashboard/overview";
    },
    errorHandler(state, action) {
      state.error = errorFunction(action.payload);
    },
    logoutHandler(state) {
      sessionStorage.removeItem("accessToken");
      state.token = "";
      state.adminDetails = {};
      window.location.href = "/";
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getMyProfile.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.adminDetails = action.payload.data;
      }
    );
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
