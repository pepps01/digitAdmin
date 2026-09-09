import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { transactionApi } from "src/components/api";
import { errorFunction } from "src/utils/helperFunctions";
const accessToken =
  typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : "";
interface transactionData {
  name: string;
  price: string;
  description: string;
  category_id: number;
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

export const getMyTransactions = createAsyncThunk(
  "transaction/getMyTransactions",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${transactionApi}/all-transactions`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTransactionsbyApp = createAsyncThunk(
  "transaction/getTransactionsbyApp",
  async (app: any, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${transactionApi}/transactions-by-application/${app}`,
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
export const getWalletTransactions = createAsyncThunk(
  "transaction/getWalletTransactions",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${transactionApi}/transactions-by-payment-method/wallet`,
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
export const getPaystackTransactions = createAsyncThunk(
  "transaction/getPaystackTransactions",
  async (method: any, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${transactionApi}/transactions-by-payment-method/paystack`,
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
export const fetchWalletTransactions = createAsyncThunk(
  "transaction/fetchWalletTransactions",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${transactionApi}/transactions-by-payment-method/wallet`,
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
export const fetchPaystackTransactions = createAsyncThunk(
  "transaction/fetchPaystackTransactions",
  async (method: any, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${transactionApi}/transactions-by-payment-method/paystack`,
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
export const deleteTransaction = createAsyncThunk(
  "transaction/deleteTransaction",
  async (id: any, thunkAPI: any) => {
    try {
      const response = await axios.delete(
        `${transactionApi}/delete-transaction/${id}`,
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
interface transactionState {
  transactions: any;
  transactionsByApp: any;
  walletTransactions: any;
  paystackTransactions: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: transactionState = {
  transactions: [],
  transactionsByApp: [],
  walletTransactions: [],
  paystackTransactions: [],
  success: false,
  loading: false,
  error: "",
  message: "",
};

const transactionSlice = createSlice({
  name: "transaction",
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
    builder.addCase(getMyTransactions.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getMyTransactions.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;

        state.transactions = action.payload.data;
      }
    );
    builder.addCase(
      getMyTransactions.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );

    builder.addCase(getTransactionsbyApp.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getTransactionsbyApp.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;

        state.transactionsByApp = action.payload.data;
      }
    );
    builder.addCase(
      getTransactionsbyApp.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );

    builder.addCase(getWalletTransactions.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getWalletTransactions.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.walletTransactions = action.payload.data;
      }
    );
    builder.addCase(
      fetchWalletTransactions.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.walletTransactions = action.payload.data;
      }
    );
    builder.addCase(
      getWalletTransactions.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
    builder.addCase(getPaystackTransactions.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getPaystackTransactions.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.paystackTransactions = action.payload.data;
      }
    );
    builder.addCase(
      fetchPaystackTransactions.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.paystackTransactions = action.payload.data;
      }
    );
    builder.addCase(
      getPaystackTransactions.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
    builder.addCase(
      deleteTransaction.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      deleteTransaction.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
  },
});
export const { clearMessage, clearError } = transactionSlice.actions;

export default transactionSlice.reducer;
