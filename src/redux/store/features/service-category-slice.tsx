import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { serviceCategoryApi } from "src/components/api";
import { errorFunction } from "src/utils/helperFunctions";
const accessToken =
  typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : "";

interface serviceCategoryData {
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

export const createserviceCategory = createAsyncThunk(
  "service-category/createserviceCategory",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${serviceCategoryApi}/create-service-category`,
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

export const updateserviceCategory = createAsyncThunk(
  "service-category/updateserviceCategory",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${serviceCategoryApi}/update-service-category/${data.id}`,
        data.payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMyserviceCategories = createAsyncThunk(
  "service-category/getMyserviceCategories",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${serviceCategoryApi}/all-service-categories`,
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
export const fetchServiceCategories = createAsyncThunk(
  "service-category/fetchServiceCategories",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${serviceCategoryApi}/all-service-categories`,
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
export const editserviceCategory = createAsyncThunk(
  "service-category/editserviceCategory",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${serviceCategoryApi}/${data.endpoint}/${data.serviceCategoryID}`,
        {},

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

export const deleteserviceCategory = createAsyncThunk(
  "service-category/deleteserviceCategory",
  async (id: any, thunkAPI: any) => {
    try {
      const response = await axios.delete(
        `${serviceCategoryApi}/delete-service-category/${id}`,
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
interface serviceCategoryState {
  serviceCategories: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: serviceCategoryState = {
  serviceCategories: [],
  success: false,
  loading: false,
  error: "",
  message: "",
};

const serviceCategorySlice = createSlice({
  name: "serviceCategory",
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
    builder.addCase(createserviceCategory.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      createserviceCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      createserviceCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
    builder.addCase(getMyserviceCategories.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getMyserviceCategories.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.serviceCategories = action.payload.data;
      }
    );
    builder.addCase(
      fetchServiceCategories.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.serviceCategories = action.payload.data;
      }
    );
    builder.addCase(
      getMyserviceCategories.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
    builder.addCase(updateserviceCategory.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      updateserviceCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      updateserviceCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
    builder.addCase(
      deleteserviceCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      deleteserviceCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
    builder.addCase(
      editserviceCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      editserviceCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
  },
});
export const { clearMessage, clearError } = serviceCategorySlice.actions;

export default serviceCategorySlice.reducer;
