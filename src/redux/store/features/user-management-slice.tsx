import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { transactionApi, tripApi, userApi } from "src/components/api"
import { errorFunction } from "src/utils/helperFunctions"

export type ManagedRole = "rider" | "driver"

export type Complaint = {
  complaintID: string
  type: "sos" | "review"
  category: string
  message: string | null
  rating: number | null
  reportedBy: string | null
  tripID: string | null
  status: string | null
  date: string
}

// read the token per request so a fresh login is picked up without a reload
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("accessToken") || ""}`,
  },
})

export const fetchManagedUsers = createAsyncThunk(
  "userManagement/fetchManagedUsers",
  async (_: void, thunkAPI: any) => {
    try {
      const [riders, drivers] = await Promise.all([
        axios.get(`${userApi}/users-by-role/rider`, authHeader()),
        axios.get(`${userApi}/users-by-role/driver`, authHeader()),
      ])
      return {
        riders: riders.data.data ?? [],
        drivers: drivers.data.data ?? [],
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchManagedUser = createAsyncThunk(
  "userManagement/fetchManagedUser",
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

export const fetchUserHistory = createAsyncThunk(
  "userManagement/fetchUserHistory",
  async ({ id, role }: { id: string; role: ManagedRole }, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${tripApi}/trips-by-${role}/${id}`,
        authHeader()
      )
      return response.data.data ?? []
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchUserComplaints = createAsyncThunk(
  "userManagement/fetchUserComplaints",
  async (id: string, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${userApi}/complaints/${id}`,
        authHeader()
      )
      return response.data.data ?? []
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchUserTransactions = createAsyncThunk(
  "userManagement/fetchUserTransactions",
  async (id: string, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${transactionApi}/transactions-by-user/${id}`,
        authHeader()
      )
      return response.data.data ?? []
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export type UserAction = "suspend" | "reactivate" | "block" | "unblock"

export const changeUserStatus = createAsyncThunk(
  "userManagement/changeUserStatus",
  async (
    { id, action, reason }: { id: string; action: UserAction; reason?: string },
    thunkAPI: any
  ) => {
    try {
      let response
      if (action === "suspend") {
        response = await axios.get(
          `${userApi}/deactivate-user/${id}`,
          authHeader()
        )
      } else if (action === "reactivate") {
        response = await axios.get(
          `${userApi}/activate-user/${id}`,
          authHeader()
        )
      } else {
        response = await axios.post(
          `${userApi}/${action}-user/${id}`,
          action === "block" ? { reason } : {},
          authHeader()
        )
      }
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

interface UserManagementState {
  riders: any[]
  drivers: any[]
  user: any
  history: any[]
  complaints: Complaint[]
  transactions: any[]
  loadingList: boolean
  loadingUser: boolean
  loadingHistory: boolean
  loadingComplaints: boolean
  loadingTransactions: boolean
  loadingAction: boolean
  error: string
  message: string
}

const initialState: UserManagementState = {
  riders: [],
  drivers: [],
  user: null,
  history: [],
  complaints: [],
  transactions: [],
  loadingList: false,
  loadingUser: false,
  loadingHistory: false,
  loadingComplaints: false,
  loadingTransactions: false,
  loadingAction: false,
  error: "",
  message: "",
}

// keep list rows in sync after a status change without refetching everything
const replaceUser = (list: any[], updated: any) =>
  list.map((u) => (u.userID === updated.userID ? updated : u))

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    clearUserManagementError: (state) => {
      state.error = ""
    },
    clearUserManagementMessage: (state) => {
      state.message = ""
    },
    resetUserDetail: (state) => {
      state.user = null
      state.history = []
      state.complaints = []
      state.transactions = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchManagedUsers.pending, (state) => {
      state.loadingList = true
    })
    builder.addCase(
      fetchManagedUsers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingList = false
        state.riders = action.payload.riders
        state.drivers = action.payload.drivers
      }
    )
    builder.addCase(
      fetchManagedUsers.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingList = false
        state.error = errorFunction(action.payload)
      }
    )

    builder.addCase(fetchManagedUser.pending, (state) => {
      state.loadingUser = true
    })
    builder.addCase(
      fetchManagedUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingUser = false
        state.user = action.payload
      }
    )
    builder.addCase(
      fetchManagedUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingUser = false
        state.error = errorFunction(action.payload)
      }
    )

    builder.addCase(fetchUserHistory.pending, (state) => {
      state.loadingHistory = true
    })
    builder.addCase(
      fetchUserHistory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingHistory = false
        state.history = action.payload
      }
    )
    builder.addCase(fetchUserHistory.rejected, (state) => {
      state.loadingHistory = false
      state.history = []
    })

    builder.addCase(fetchUserComplaints.pending, (state) => {
      state.loadingComplaints = true
    })
    builder.addCase(
      fetchUserComplaints.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingComplaints = false
        state.complaints = action.payload
      }
    )
    builder.addCase(fetchUserComplaints.rejected, (state) => {
      state.loadingComplaints = false
      state.complaints = []
    })

    builder.addCase(fetchUserTransactions.pending, (state) => {
      state.loadingTransactions = true
    })
    builder.addCase(
      fetchUserTransactions.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingTransactions = false
        state.transactions = action.payload
      }
    )
    builder.addCase(fetchUserTransactions.rejected, (state) => {
      state.loadingTransactions = false
      state.transactions = []
    })

    builder.addCase(changeUserStatus.pending, (state) => {
      state.loadingAction = true
    })
    builder.addCase(
      changeUserStatus.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingAction = false
        state.message = action.payload.message
        const updated = action.payload.data
        if (updated?.userID) {
          if (state.user?.userID === updated.userID) state.user = updated
          state.riders = replaceUser(state.riders, updated)
          state.drivers = replaceUser(state.drivers, updated)
        }
      }
    )
    builder.addCase(
      changeUserStatus.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingAction = false
        state.error = errorFunction(action.payload)
      }
    )
  },
})

export const {
  clearUserManagementError,
  clearUserManagementMessage,
  resetUserDetail,
} = userManagementSlice.actions

export default userManagementSlice.reducer
