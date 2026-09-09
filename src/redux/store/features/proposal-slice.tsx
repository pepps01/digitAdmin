import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { proposalApi } from "src/components/api";
import { errorFunction } from "src/utils/helperFunctions";
const accessToken =
  typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : "";
interface proposalData {
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

export const getMyproposal = createAsyncThunk(
  "order/getMyproposal",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${proposalApi}/all-proposals`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface proposalState {
  proposals: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: proposalState = {
  proposals: [],
  success: false,
  loading: false,
  error: "",
  message: "",
};

const proposalSlice = createSlice({
  name: "proposal",
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
    builder.addCase(getMyproposal.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getMyproposal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.proposals = action.payload.data;
      }
    );
    builder.addCase(
      getMyproposal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
  },
});
export const { clearMessage, clearError } = proposalSlice.actions;

export default proposalSlice.reducer;
