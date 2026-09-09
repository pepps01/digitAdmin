import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { logApi } from "src/components/api";
import { errorFunction } from "src/utils/helperFunctions";
const accessToken =
  typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : "";
export const getAdminlogs = createAsyncThunk(
  "log/getAdminlogs",
  async ({ token }: any, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${logApi}/logs-by-admin/98837152-7026-4434-b022-2f43c2eb85e3`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllLogs = createAsyncThunk(
  "log/getAllLogs",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${logApi}/all-logs`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
interface logState {
  adminLogs: any[];
  allLogs: any[];
  success: boolean;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: logState = {
  adminLogs: [],
  allLogs: [],
  success: false,
  loading: false,
  error: "",
  message: "",
};

const logSlice = createSlice({
  name: "log",
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
    builder.addCase(getAdminlogs.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getAdminlogs.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.adminLogs = action.payload.data;
      }
    );
    builder.addCase(
      getAdminlogs.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
    builder.addCase(getAllLogs.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getAllLogs.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.allLogs = action.payload.data;
      }
    );
    builder.addCase(
      getAllLogs.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
  },
});
export const { clearMessage, clearError } = logSlice.actions;

export default logSlice.reducer;
