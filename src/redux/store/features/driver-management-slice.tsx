import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl, tripApi, userApi } from "src/components/api"
import { errorFunction } from "src/utils/helperFunctions"

export type DriverAction =
  | "approve"
  | "reject"
  | "verify-licence"
  | "reject-licence"
  | "verify-vehicle"
  | "reject-vehicle"
  | "suspend"
  | "lift-suspension"
  | "activate"
  | "deactivate"

// read the token per request so a fresh login is picked up without a reload
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("accessToken") || ""}`,
  },
})

const driverApi = `${baseUrl}/driver`

export const fetchDrivers = createAsyncThunk(
  "driverManagement/fetchDrivers",
  async (_: void, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${userApi}/users-by-role/driver`,
        authHeader()
      )
      return response.data.data ?? []
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchDriver = createAsyncThunk(
  "driverManagement/fetchDriver",
  async (id: string, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${userApi}/single-user/${id}`,
        authHeader()
      )
      return response.data.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchDriverTrips = createAsyncThunk(
  "driverManagement/fetchDriverTrips",
  async (id: string, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${tripApi}/trips-by-driver/${id}`,
        authHeader()
      )
      return response.data.data ?? []
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchDriverReviews = createAsyncThunk(
  "driverManagement/fetchDriverReviews",
  async (id: string, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${driverApi}/reviews/${id}`,
        authHeader()
      )
      return response.data.data ?? []
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const actionRequest = (
  id: string,
  action: DriverAction,
  note?: string,
  until?: string
) => {
  switch (action) {
    case "approve":
      return axios.post(`${driverApi}/approve/${id}`, { note }, authHeader())
    case "reject":
      return axios.post(`${driverApi}/reject/${id}`, { note }, authHeader())
    case "verify-licence":
    case "reject-licence":
      return axios.post(
        `${driverApi}/verify-documents/${id}`,
        { status: action === "verify-licence" ? "verified" : "rejected", note },
        authHeader()
      )
    case "verify-vehicle":
    case "reject-vehicle":
      return axios.post(
        `${driverApi}/verify-vehicle/${id}`,
        { status: action === "verify-vehicle" ? "verified" : "rejected", note },
        authHeader()
      )
    case "suspend":
      return axios.post(
        `${driverApi}/suspend/${id}`,
        { reason: note, until: until || null },
        authHeader()
      )
    case "lift-suspension":
      return axios.post(`${driverApi}/lift-suspension/${id}`, {}, authHeader())
    case "activate":
      return axios.get(`${userApi}/activate-user/${id}`, authHeader())
    case "deactivate":
      return axios.get(`${userApi}/deactivate-user/${id}`, authHeader())
  }
}

export const runDriverAction = createAsyncThunk(
  "driverManagement/runDriverAction",
  async (
    {
      id,
      action,
      note,
      until,
    }: { id: string; action: DriverAction; note?: string; until?: string },
    thunkAPI: any
  ) => {
    try {
      const response = await actionRequest(id, action, note, until)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

interface DriverManagementState {
  drivers: any[]
  driver: any
  trips: any[]
  reviews: any[]
  loadingList: boolean
  loadingDriver: boolean
  loadingTrips: boolean
  loadingReviews: boolean
  loadingAction: boolean
  error: string
  message: string
}

const initialState: DriverManagementState = {
  drivers: [],
  driver: null,
  trips: [],
  reviews: [],
  loadingList: false,
  loadingDriver: false,
  loadingTrips: false,
  loadingReviews: false,
  loadingAction: false,
  error: "",
  message: "",
}

const driverManagementSlice = createSlice({
  name: "driverManagement",
  initialState,
  reducers: {
    clearDriverManagementError: (state) => {
      state.error = ""
    },
    clearDriverManagementMessage: (state) => {
      state.message = ""
    },
    resetDriverDetail: (state) => {
      state.driver = null
      state.trips = []
      state.reviews = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDrivers.pending, (state) => {
      state.loadingList = true
    })
    builder.addCase(
      fetchDrivers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingList = false
        state.drivers = action.payload
      }
    )
    builder.addCase(
      fetchDrivers.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingList = false
        state.error = errorFunction(action.payload)
      }
    )

    builder.addCase(fetchDriver.pending, (state) => {
      state.loadingDriver = true
    })
    builder.addCase(
      fetchDriver.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingDriver = false
        state.driver = action.payload
      }
    )
    builder.addCase(
      fetchDriver.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingDriver = false
        state.error = errorFunction(action.payload)
      }
    )

    builder.addCase(fetchDriverTrips.pending, (state) => {
      state.loadingTrips = true
    })
    builder.addCase(
      fetchDriverTrips.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingTrips = false
        state.trips = action.payload
      }
    )
    builder.addCase(fetchDriverTrips.rejected, (state) => {
      state.loadingTrips = false
      state.trips = []
    })

    builder.addCase(fetchDriverReviews.pending, (state) => {
      state.loadingReviews = true
    })
    builder.addCase(
      fetchDriverReviews.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingReviews = false
        state.reviews = action.payload
      }
    )
    builder.addCase(fetchDriverReviews.rejected, (state) => {
      state.loadingReviews = false
      state.reviews = []
    })

    builder.addCase(runDriverAction.pending, (state) => {
      state.loadingAction = true
    })
    builder.addCase(
      runDriverAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingAction = false
        state.message = action.payload.message
        const updated = action.payload.data
        if (updated?.userID) {
          if (state.driver?.userID === updated.userID) state.driver = updated
          state.drivers = state.drivers.map((d) =>
            d.userID === updated.userID ? updated : d
          )
        }
      }
    )
    builder.addCase(
      runDriverAction.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingAction = false
        state.error = errorFunction(action.payload)
      }
    )
  },
})

export const {
  clearDriverManagementError,
  clearDriverManagementMessage,
  resetDriverDetail,
} = driverManagementSlice.actions

export default driverManagementSlice.reducer
