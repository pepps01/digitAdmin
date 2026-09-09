import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "src/components/api";
import { errorFunction } from "src/utils/helperFunctions";
const accessToken =
  typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : "";
export const getAllSOS = createAsyncThunk(
  "sos/getAllSOS",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${baseUrl}/sos/all-sos`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllSOSReports = createAsyncThunk(
  "sos/getAllSOSReports",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${baseUrl}/sos/all-sos-reports`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
interface sosState {
  sos: any;
  sosReports: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: sosState = {
  sos: [],
  sosReports: [],
  success: false,
  loading: false,
  error: "",
  message: "",
};
const sosSlice = createSlice({
  name: "sos",
  initialState,
  reducers: {
    clearMessage: state => {
      state.message = "";
      state.success = false;
    },
    clearError: state => {
      state.error = "";
      state.success = false;
    },
  },

  extraReducers: builder => {
    builder.addCase(getAllSOS.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getAllSOS.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;

        state.sos = action.payload.data;
      }
    );
    builder.addCase(getAllSOS.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      const err = errorFunction(action.payload);
      state.error = err;
    }),
      builder.addCase(getAllSOSReports.pending, state => {
        state.loading = true;
      });
    builder.addCase(
      getAllSOSReports.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;

        state.sosReports = action.payload.data;
      }
    );
    builder.addCase(
      getAllSOSReports.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
  },
});
export const { clearMessage, clearError } = sosSlice.actions;

export default sosSlice.reducer;
