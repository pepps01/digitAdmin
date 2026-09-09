import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { jobApi } from "src/components/api";
import { errorFunction } from "src/utils/helperFunctions";
const accessToken =
  typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : "";
interface jobData {
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

export const createjob = createAsyncThunk(
  "job/createjob",
  async (data: any, thunkAPI: any) => {
    try {
      
      const response = await axios.post(
        `${jobApi}/create-job/${data.userID}`,
        data.payload,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log(response);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatejob = createAsyncThunk(
  "job/updatejob",
  async (data: any, thunkAPI: any) => {
    try {
      
      const response = await axios.post(
        `${jobApi}/update-job/${data.id}`,
        data.payload,
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
export const editjob = createAsyncThunk(
  "job/editjob",
  async (data: any, thunkAPI: any) => {
    try {
      
      const response = await axios.post(
        `${jobApi}/${data.endpoint}/${data.jobID}`,
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

export const getMyjobs = createAsyncThunk(
  "job/getMyjobs",

  async (accessToken: any, thunkAPI: any) => {
    try {
      // 
      const response = await axios.get(`${jobApi}/all-jobs`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const fetchJob = createAsyncThunk(
//   "job/fetchJob",
//   async (accessToken: string | null, thunkAPI: any) => {
//     try {
//       const response = await axios.get(`${jobApi}/all-jobs`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const fetchJob = createAsyncThunk(
  "job/fetchJob",
  async (accessToken: any, thunkAPI) => {
    try {
      const response = await axios.get(`${jobApi}/all-jobs`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deletejob = createAsyncThunk(
  "job/deletejob",
  async (id: any, thunkAPI: any) => {
    try {
      
      const response = await axios.delete(`${jobApi}/delete-job-post/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
interface jobState {
  jobs: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: jobState = {
  jobs: [],
  success: false,
  loading: false,
  error: "",
  message: "",
};

const jobSlice = createSlice({
  name: "job",
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
    builder.addCase(createjob.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      createjob.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(createjob.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;

      const err = errorFunction(action.payload);
      state.error = err;
    });
    builder.addCase(getMyjobs.pending, state => {
      state.loading = true;
    });
    builder.addCase(getMyjobs.fulfilled, (state, action: AnyAction) => {
      state.loading = false;
      state.jobs = action.payload.data;
    });
    builder.addCase(getMyjobs.rejected, (state, action: AnyAction) => {
      state.loading = false;
      const err = errorFunction(action.payload);
      state.error = err;
    });
    builder.addCase(fetchJob.fulfilled, (state, action: PayloadAction<any>) => {
      state.jobs = action.payload.data;
    });
    builder.addCase(updatejob.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      updatejob.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(updatejob.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      const err = errorFunction(action.payload);
      state.error = err;
    });
    builder.addCase(editjob.pending, state => {
      state.loading = true;
    });
    builder.addCase(editjob.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    });
    builder.addCase(editjob.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      const err = errorFunction(action.payload);
      state.error = err;
    });
    builder.addCase(
      deletejob.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(deletejob.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;

      const err = errorFunction(action.payload);
      state.error = err;
    });
  },
});
export const { clearMessage, clearError } = jobSlice.actions;

export default jobSlice.reducer;
