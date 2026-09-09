import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import {
  adminType,
  consumerType,
  driverType,
  merchantType,
  riderType,
} from "src/@types/data"
import { baseUrl, userApi } from "src/components/api"
import { errorFunction } from "src/utils/helperFunctions"
const accessToken =
  typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : ""
interface userData {
  name: string
  price: string
  description: string
  _id: number
  quantity: number
  free_delivery: string
  shipping_fee: number
  discount_available: string
  discount_percentage: number
  brand: string
  product_warranty: string
  weight: number
  productID: number
}

export const createuser = createAsyncThunk(
  "user/createuser",
  async (data: any, thunkAPI: any) => {
    const accessToken = sessionStorage.getItem("accessToken") || ""
    try {
      const response = await axios.post(`${userApi}/create-user`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getStates = createAsyncThunk(
  "user/getStates",
  async (data: any, thunkAPI: any) => {
    const accessToken = sessionStorage.getItem("accessToken")
    try {
      const response = await axios.get(
        `https://easy.unikmarketing.org/api/states/160`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
export const getMerchantCategory = createAsyncThunk(
  "user/getMerchantCategory",
  async (thunkAPI: any) => {
    const accessToken = sessionStorage.getItem("accessToken")
    try {
      const response = await axios.get(
        `https://easy.unikmarketing.org/api/flip/merchant/merchant-categories`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const updateuser = createAsyncThunk(
  "user/updateuser",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${userApi}/update-user/${data.id}`,
        data.payload,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getMyuser = createAsyncThunk(
  "user/getMyuser",
  async (adat: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/all-users`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const getAUser = createAsyncThunk(
  "user/getAUser",
  async (id: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/single-user/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const fetchMyuser = createAsyncThunk(
  "user/fetchMyuser",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/all-users`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const getMymerchant = createAsyncThunk(
  "user/getMymerchant",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/merchant`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const fetchMymerchant = createAsyncThunk(
  "user/fetchMymerchant",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/merchant`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const getMyConsumers = createAsyncThunk(
  "user/getMyConsumers",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/consumer`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const fetchMyConsumers = createAsyncThunk(
  "user/fetchMyConsumers",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/consumer`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const getMyRiders = createAsyncThunk(
  "user/getMyRiders",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/rider`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const fetchMyRiders = createAsyncThunk(
  "user/fetchMyRiders",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/rider`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const getMyDrivers = createAsyncThunk(
  "user/getMyDrivers",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/driver`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const fetchMyDriver = createAsyncThunk(
  "user/fetchMyDriver",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/driver`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const edituser = createAsyncThunk(
  "user/edituser",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${userApi}/${data.endpoint}/${data.userID}`,
        {},

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const changeVehicleStatus = createAsyncThunk(
  "user/changeVehicleStatus",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.post(
        `${baseUrl}/vehicle/change-status/${data.userID}/${data.status}`,
        {},

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const deleteuser = createAsyncThunk(
  "user/deleteuser",
  async (data: any, thunkAPI: any) => {
    try {
      const response = await axios.delete(`${userApi}/delete-user/${data.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
interface userState {
  users:
    | merchantType[]
    | driverType[]
    | consumerType[]
    | riderType[]
    | adminType[]
  merchants: merchantType[]
  states: any
  user: merchantType | driverType | consumerType | riderType | adminType
  merchantCategory: any[]
  drivers: driverType[]
  activeDrivers: any[]
  consumers: consumerType[]
  riders: riderType[]
  success: boolean
  loading: boolean
  loadingDelete: boolean
  loadingEdit: boolean
  loadingState: boolean
  loadingCategory: boolean
  error: string
  message: string
}

const initialState: userState = {
  users: [],
  states: [],
  activeDrivers: [],
  user: null,
  merchantCategory: [],
  merchants: [],
  drivers: [],
  consumers: [],
  riders: [],

  success: false,
  loadingState: false,
  loadingDelete: false,
  loading: false,
  loadingEdit: false,
  loadingCategory: false,
  error: "",
  message: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = ""
      state.success = false
    },
    clearError: (state) => {
      state.error = ""
      state.success = false
    },
    setDriversLocation: (state, action) => {
      state.activeDrivers = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createuser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      createuser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.success = true
        state.message = action.payload.message
      }
    )
    builder.addCase(
      createuser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = errorFunction(action.payload)
      }
    )

    builder.addCase(getMyuser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      getMyuser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.users = action.payload.data
      }
    )
    builder.addCase(getAUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getAUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.user = action.payload.data
    })
    builder.addCase(
      fetchMyuser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.users = action.payload.data
      }
    )
    builder.addCase(getMyuser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.error = errorFunction(action.payload)
    })

    builder.addCase(getMymerchant.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getStates.pending, (state, action: PayloadAction<any>) => {
      state.loadingState = true
    })
    builder.addCase(
      getStates.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingState = false
        state.states = action.payload.data
      }
    )
    builder.addCase(getStates.rejected, (state, action: PayloadAction<any>) => {
      state.loadingState = false
    })
    builder.addCase(
      getMerchantCategory.pending,
      (state, action: PayloadAction<any>) => {
        state.loadingCategory = true
      }
    )

    builder.addCase(
      getMerchantCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingCategory = false
        state.merchantCategory = action.payload.data
      }
    )
    builder.addCase(
      getMerchantCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingCategory = false
        state.error = errorFunction(action.payload)
      }
    )
    builder.addCase(
      getMymerchant.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.merchants = action.payload.data
      }
    )
    builder.addCase(
      fetchMymerchant.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.merchants = action.payload.data
      }
    )
    builder.addCase(
      getMymerchant.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = errorFunction(action.payload)
      }
    )

    builder.addCase(getMyDrivers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      getMyDrivers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.drivers = action.payload.data
      }
    )
    builder.addCase(
      fetchMyDriver.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.drivers = action.payload.data
      }
    )
    builder.addCase(
      getMyDrivers.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = errorFunction(action.payload)
      }
    )

    builder.addCase(getMyConsumers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      getMyConsumers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.consumers = action.payload.data
      }
    )
    builder.addCase(
      fetchMyConsumers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.consumers = action.payload.data
      }
    )
    builder.addCase(
      getMyConsumers.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = errorFunction(action.payload)
      }
    )

    builder.addCase(getMyRiders.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      getMyRiders.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.riders = action.payload.data
      }
    )
    builder.addCase(
      fetchMyRiders.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.riders = action.payload.data
      }
    )
    builder.addCase(
      getMyRiders.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = errorFunction(action.payload)
      }
    )

    builder.addCase(updateuser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      updateuser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.success = true
        state.message = action.payload.message
      }
    )
    builder.addCase(
      updateuser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingDelete = false
        state.loading = false
        state.error = errorFunction(action.payload)
      }
    )
    builder.addCase(changeVehicleStatus.pending, (state) => {
      state.loadingEdit = true
    })
    builder.addCase(
      changeVehicleStatus.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingEdit = false
        state.success = true
        state.message = action.payload.message
      }
    )
    builder.addCase(
      changeVehicleStatus.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingEdit = false
        state.error = errorFunction(action.payload)
      }
    )
    builder.addCase(deleteuser.pending, (state) => {
      state.loadingDelete = true
    })
    builder.addCase(
      deleteuser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingDelete = false
        state.loading = false
        state.success = true
        state.message = action.payload.message
      }
    )
    builder.addCase(
      deleteuser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingDelete = false
        state.loading = false
        state.error = errorFunction(action.payload)
      }
    )
    builder.addCase(edituser.pending, (state) => {
      state.loadingEdit = true
    })
    builder.addCase(edituser.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.loadingEdit = false
      state.success = true
      state.message = action.payload.message
    })
    builder.addCase(edituser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.loadingEdit = false
      if (action?.payload?.response) {
        state.error = action?.payload?.response?.data?.message
      } else if (action.payload.request) {
        state.error = action.payload.response.data.message
      } else {
        state.error = "An Error occured please try again"
      }
    })
  },
})
export const { clearMessage, clearError, setDriversLocation } =
  userSlice.actions

export default userSlice.reducer
