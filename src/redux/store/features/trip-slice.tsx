import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { tripType } from "src/@types/data";
import { tripApi } from "src/components/api";
import { errorFunction } from "src/utils/helperFunctions";
const accessToken =
  typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : "";
export const getMyTrips = createAsyncThunk(
  "trip/getMyTrips",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${tripApi}/all-trips`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getTripsByRider = createAsyncThunk(
  "trip/getTripsByRider",
  async (id: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${tripApi}/trips-by-rider/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getTripsByDriver = createAsyncThunk(
  "trip/getTripsByDriver",
  async (id: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${tripApi}/trips-by-driver/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const getActiveTrips = createAsyncThunk(
//   "trip/getActiveTrips",
//   async (data: any, thunkAPI: any) => {
//     try {
//       const response = await axios.get(`${tripApi}/trips/trips-by-status/Requested|Accepted|Arrived|Ongoing`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const fetchMyTrips = createAsyncThunk(
  "trip/fetchMyTrips",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${tripApi}/all-trips`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchATrip = createAsyncThunk(
  "trip/fetchATrips",
  async (id: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${tripApi}/single-trip/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteTrip = createAsyncThunk(
  "trip/deleteTrip",
  async (id: any, thunkAPI: any) => {
    try {
      const response = await axios.delete(`${tripApi}/delete-trip/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
interface tripState {
  trips: tripType[];
  tripsByRider: tripType[];
   tripsByDriver: tripType[];
  trip:tripType;
  activeTrips:any[];

  success: boolean;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: tripState = {
  trips: [],
   tripsByRider: [],
    tripsByDriver: [],
  trip: null,
  activeTrips: [],
  success: false,
  loading: false,
  error: "",
  message: "",
};

const tripSlice = createSlice({
  name: "trip",
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
     setActiveTrips: (state, action) => {
      state.activeTrips = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(getMyTrips.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getMyTrips.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.trips = action.payload.data;
      }
    );
      
    builder.addCase(getTripsByRider.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getTripsByRider.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.tripsByRider = action.payload.data;
      }
    );
        builder.addCase(getTripsByDriver.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getTripsByDriver.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.tripsByDriver = action.payload.data;
      }
    );
    builder.addCase(
      fetchMyTrips.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.trips = action.payload.data;
      }
    );
    builder.addCase(
      getMyTrips.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
       builder.addCase(fetchATrip.pending, state => {
      state.loading = true;
    });
      builder.addCase(
      fetchATrip.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.trip = action.payload.data;
      }
    );
      builder.addCase(fetchATrip.rejected, state => {
      state.loading = false;
    });
    builder.addCase(
      deleteTrip.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      deleteTrip.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const err = errorFunction(action.payload);
        state.error = err;
      }
    );
  },
});
export const { clearMessage, clearError, setActiveTrips } = tripSlice.actions;

export default tripSlice.reducer;
