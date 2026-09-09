import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { productCategoryApi } from "src/components/api";
import { errorFunction } from "src/utils/helperFunctions";
const accessToken =
  typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : "";
interface productCategoryData {
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

export const createproductCategory = createAsyncThunk(
  "product-category/createorder",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${productCategoryApi}/create-product-category`,
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

export const updateproductCategory = createAsyncThunk(
  "product-category/updateproductCategory",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${productCategoryApi}/update-product-category/${data.id}`,
        data.payload,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMyproductCategories = createAsyncThunk(
  "product-category/getMyproductCategories",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${productCategoryApi}/all-product-categories`,
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
export const fetchProductCategory = createAsyncThunk(
  "product-category/fetchProductCategory",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${productCategoryApi}/all-product-categories`,
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
export const editproductCategory = createAsyncThunk(
  "product-category/editproductCategory",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${productCategoryApi}/${data.endpoint}/${data.productID}`,
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

export const deleteproductCategory = createAsyncThunk(
  "product-category/deleteproductCategory",
  async (id: any, thunkAPI: any) => {
    try {
      const response = await axios.delete(
        `${productCategoryApi}/delete-category/${id}`,
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
interface productCategoryState {
  productCategories: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: productCategoryState = {
  productCategories: [],
  success: false,
  loading: false,
  error: "",
  message: "",
};

const productCategorySlice = createSlice({
  name: "productCategory",
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
    builder.addCase(createproductCategory.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      createproductCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      createproductCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
    builder.addCase(getMyproductCategories.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getMyproductCategories.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.productCategories = action.payload.data;
      }
    );
    builder.addCase(
      fetchProductCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.productCategories = action.payload.data;
      }
    );
    builder.addCase(
      getMyproductCategories.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        console.log(action.payload);
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
    builder.addCase(updateproductCategory.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      updateproductCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      updateproductCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
    builder.addCase(
      deleteproductCategory.pending,
      (state, action: PayloadAction<any>) => {
        state.loading = true;
      }
    );
    builder.addCase(
      deleteproductCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      deleteproductCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
    builder.addCase(
      editproductCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      editproductCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
  },
});
export const { clearMessage, clearError } = productCategorySlice.actions;

export default productCategorySlice.reducer;
