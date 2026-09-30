import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl, logApi } from "src/components/api"
import { errorFunction } from "src/utils/helperFunctions"

// read the token per request so a fresh login is picked up without a reload
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("accessToken") || ""}`,
  },
})

const superAdminApi = `${baseUrl}/superadmin`

export const fetchOverview = createAsyncThunk(
  "superAdmin/fetchOverview",
  async (_: void, thunkAPI: any) => {
    try {
      const response = await axios.get(`${superAdminApi}/overview`, authHeader())
      return response.data.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchAdmins = createAsyncThunk(
  "superAdmin/fetchAdmins",
  async (_: void, thunkAPI: any) => {
    try {
      const response = await axios.get(`${superAdminApi}/admins`, authHeader())
      return response.data.data ?? []
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchActivity = createAsyncThunk(
  "superAdmin/fetchActivity",
  async (_: void, thunkAPI: any) => {
    try {
      const response = await axios.get(`${logApi}/all-logs`, authHeader())
      return response.data.data ?? []
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export type NewAdmin = {
  firstname: string
  lastname: string
  email: string
  password: string
  role: "admin" | "superadmin"
}

export const createAdmin = createAsyncThunk(
  "superAdmin/createAdmin",
  async (data: NewAdmin, thunkAPI: any) => {
    try {
      const response = await axios.post(`${superAdminApi}/admins`, data, authHeader())
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const changeAdminRole = createAsyncThunk(
  "superAdmin/changeAdminRole",
  async ({ id, role }: { id: string; role: NewAdmin["role"] }, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${superAdminApi}/admins/${id}/role`,
        { role },
        authHeader()
      )
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const setAdminAccess = createAsyncThunk(
  "superAdmin/setAdminAccess",
  async ({ id, active }: { id: string; active: boolean }, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${superAdminApi}/admins/${id}/access`,
        { active },
        authHeader()
      )
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

interface SuperAdminState {
  overview: any
  admins: any[]
  activity: any[]
  loadingOverview: boolean
  loadingAdmins: boolean
  loadingActivity: boolean
  loadingAction: boolean
  error: string
  message: string
}

const initialState: SuperAdminState = {
  overview: null,
  admins: [],
  activity: [],
  loadingOverview: false,
  loadingAdmins: false,
  loadingActivity: false,
  loadingAction: false,
  error: "",
  message: "",
}

// admin mutations return the updated user; merge it into the team list
const upsertAdmin = (state: SuperAdminState, updated: any) => {
  if (!updated?.userID) return
  const existing = state.admins.find((a) => a.userID === updated.userID)
  if (existing) {
    state.admins = state.admins.map((a) =>
      a.userID === updated.userID ? { ...a, ...updated } : a
    )
  } else {
    state.admins = [{ ...updated, actionCount: 0, lastAction: null }, ...state.admins]
  }
}

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState,
  reducers: {
    clearSuperAdminError: (state) => {
      state.error = ""
    },
    clearSuperAdminMessage: (state) => {
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOverview.pending, (state) => {
      state.loadingOverview = true
    })
    builder.addCase(fetchOverview.fulfilled, (state, action: PayloadAction<any>) => {
      state.loadingOverview = false
      state.overview = action.payload
    })
    builder.addCase(fetchOverview.rejected, (state, action: PayloadAction<any>) => {
      state.loadingOverview = false
      state.error = errorFunction(action.payload)
    })

    builder.addCase(fetchAdmins.pending, (state) => {
      state.loadingAdmins = true
    })
    builder.addCase(fetchAdmins.fulfilled, (state, action: PayloadAction<any>) => {
      state.loadingAdmins = false
      state.admins = action.payload
    })
    builder.addCase(fetchAdmins.rejected, (state, action: PayloadAction<any>) => {
      state.loadingAdmins = false
      state.error = errorFunction(action.payload)
    })

    builder.addCase(fetchActivity.pending, (state) => {
      state.loadingActivity = true
    })
    builder.addCase(fetchActivity.fulfilled, (state, action: PayloadAction<any>) => {
      state.loadingActivity = false
      state.activity = action.payload
    })
    builder.addCase(fetchActivity.rejected, (state, action: PayloadAction<any>) => {
      state.loadingActivity = false
      state.error = errorFunction(action.payload)
    })

    for (const thunk of [createAdmin, changeAdminRole, setAdminAccess]) {
      builder.addCase(thunk.pending, (state) => {
        state.loadingAction = true
      })
      builder.addCase(thunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loadingAction = false
        state.message = action.payload.message
        upsertAdmin(state, action.payload.data)
      })
      builder.addCase(thunk.rejected, (state, action: PayloadAction<any>) => {
        state.loadingAction = false
        state.error = errorFunction(action.payload)
      })
    }
  },
})

export const { clearSuperAdminError, clearSuperAdminMessage } = superAdminSlice.actions

export default superAdminSlice.reducer
