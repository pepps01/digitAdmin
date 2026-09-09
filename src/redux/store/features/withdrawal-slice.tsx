import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { withdrawalApi } from "src/components/api";
import { errorFunction } from "src/utils/helperFunctions";
const accessToken =
  typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : "";

interface withdrawalData {
  name: string;
  price: string;
  description: string;
  _id: number;
  quantity: number;
  free_delivery: string;
  shipping_fee: number;
  discount_available: string;
  discount_percentage: number;
  brand: string;
  product_warranty: string;
  weight: number;
  productID: number;
}

export const createwithdrawal = createAsyncThunk(
  "withdrawal/createwithdrawal",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${withdrawalApi}/create-withdrawal`,
        data,
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

export const updatewithdrawal = createAsyncThunk(
  "withdrawal/updatewithdrawal",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${withdrawalApi}/update-withdrawal/${data.withdrawalID}`,
        data,
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

export const getMywithdrawal = createAsyncThunk(
  "withdrawal/getMywithdrawal",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${withdrawalApi}/all-withdrawals`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchMywithdrawal = createAsyncThunk(
  "withdrawal/fetchMywithdrawal",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${withdrawalApi}/all-withdrawals`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editwithdrawal = createAsyncThunk(
  "withdrawal/editwithdrawal",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${withdrawalApi}/${data.endpoint}/${data.withdrawalID}`,
        data.data,

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

export const deletewithdrawal = createAsyncThunk(
  "withdrawal/deletewithdrawal",
  async (id: any, thunkAPI: any) => {
    try {
      const response = await axios.delete(
        `${withdrawalApi}/delete-withdrawal/${id}`,
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
interface withdrawalState {
  withdrawals: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: withdrawalState = {
  withdrawals: [],
  success: false,
  loading: false,
  error: "",
  message: "",
};

const withdrawalSlice = createSlice({
  name: "withdrawal",
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
    builder.addCase(createwithdrawal.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      createwithdrawal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      createwithdrawal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = errorFunction(action.payload);
      }
    );
    builder.addCase(getMywithdrawal.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getMywithdrawal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.withdrawals = action.payload.data;
      }
    );
    builder.addCase(
      fetchMywithdrawal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.withdrawals = action.payload.data;
      }
    );
    builder.addCase(
      getMywithdrawal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = errorFunction(action.payload);
      }
    );
    builder.addCase(updatewithdrawal.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      updatewithdrawal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      updatewithdrawal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = errorFunction(action.payload);
      }
    );
    builder.addCase(
      deletewithdrawal.pending,
      (state, action: PayloadAction<any>) => {
        state.loading = true;
      }
    );
    builder.addCase(
      deletewithdrawal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      deletewithdrawal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = errorFunction(action.payload);
      }
    );
    builder.addCase(
      editwithdrawal.pending,
      (state, action: PayloadAction<any>) => {
        state.loading = true;
      }
    );
    builder.addCase(
      editwithdrawal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      editwithdrawal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (action.payload.response) {
          state.error = action.payload.response.data.message;
        } else if (action.payload.request) {
          state.error = "An Error occured on our end";
        } else {
          state.error = "An Error";
        }
      }
    );
  },
});
export const { clearMessage, clearError } = withdrawalSlice.actions;

export default withdrawalSlice.reducer;
