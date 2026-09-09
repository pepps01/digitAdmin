import { Formik } from "formik"
import MuiPhoneNumber from "material-ui-phone-number"
import { useEffect, useRef, useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import useHTTPGet from "src/Hooks/use-httpget"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import {
  clearError,
  clearMessage,
  createuser,
  fetchMyuser,
  getMerchantCategory,
  getStates,
  updateuser,
} from "src/redux/store/features/user-slice"
import { gender, merchantType, role } from "src/utils/analytics"
import { errorFunction } from "src/utils/helperFunctions"
import * as yup from "yup"
import { uiActions } from "../../redux/store/ui-slice"
import { userApi } from "../api"
import DrawerWrapper from "../DrawerWrapper"
import SelectInput from "../SelectInput"
import TextInput from "../TextInput"

const AddUser = ({ title, id, user = "user" }: any) => {
  const formRef = useRef<any>()
  const accessToken = sessionStorage.getItem("accessToken")
  const request = useHTTPGet()
  const [selectedDate, setSelectedDate] = useState()
  const dispatch = useAppDispatch()
  const {
    success,
    loading,
    loadingCategory,
    loadingState,
    error,
    message,
    states,
    merchantCategory,
  } = useAppSelector((state: any) => state.user)
  const [defaultState, setDefaultState] = useState<any>({})
  const [defaultlga, setDefaultLga] = useState<any>({})
  const [defaultGender, setDefaultGender] = useState<any>({})
  const [defaultRole, setDefaultRole] = useState<any>({})
  const [defaultCategory, setDefaultCategory] = useState<any>({})
  const [defaultType, setDefaultType] = useState<any>({})
  const [load, setLoad] = useState(false)
  const [err, setErr] = useState("")
  const [phoneNumber, setPhoneNumber] = useState(0)
  const [localGovernments, setLocalGovernments] = useState<any[]>([])
  const dateString: any = selectedDate
  const date = new Date(dateString)
  const [currentRole, setCurrentRole] = useState<string>(
    formRef?.current?.values?.role || ""
  )

  const minDate = new Date()
  minDate?.setFullYear(minDate?.getFullYear() - 19)
  const [initialValues, setInitialValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    category: "",
    application_name: "",
    gender: "",
    Type: "",
    state: "",
    lga: "",
    phone: 0,
    address: "",
    merchantType: "",
    country_id: "",
    dateOfBirth: minDate,
  })

  const merchantSchema = yup.object().shape({
    firstname: yup.string().required("Please enter first name"),
    lastname: yup.string().required("Please enter last name"),
    phone: yup
      .string()
      .matches(
        /^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/,
        "Invalid Phone Number"
      )
      .required("A phone number is required"),
    email: yup
      .string()
      .trim()
      .email("Invalid Email")
      .required("Email is required"),

    role: yup.string().required("Role field should not be empty"),
    gender: yup.string().required(" gender should not be empty"),
    // application_name: yup
    //   .string()
    //   .required("Application name should not be empty"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password should not be empty"),
    category: yup.string().required("Category should not be empty"),
    merchantType: yup.string().required("Merchant type should not be empty"),
  })

  const consumerSchema = yup.object().shape({
    firstname: yup.string().required("Please enter first name"),
    lastname: yup.string().required("Please enter last name"),
    phone: yup
      .string()
      .matches(
        /^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/,
        "Invalid Phone Number"
      )
      .required("A phone number is required"),
    email: yup
      .string()
      .trim()
      .email("Invalid Email")
      .required("Email is required"),

    role: yup.string().required("Role field should not be empty"),
    gender: yup.string().required(" gender should not be empty"),
    // application_name: yup
    //   .string()
    //   .required("Application name should not be empty"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password should not be empty"),
  })

  const riderSchema = yup.object().shape({
    firstname: yup.string().required("Please enter first name"),
    lastname: yup.string().required("Please enter last name"),
    phone: yup
      .string()
      .matches(
        /^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/,
        "Invalid Phone Number"
      )
      .required("A phone number is required"),
    email: yup
      .string()
      .trim()
      .email("Invalid Email")
      .required("Email is required"),

    price: yup
      .number()
      .positive("Please enter a positive number")
      .integer("Please enter a number"),

    role: yup.string().required("Role field should not be empty"),
    gender: yup.string().required(" gender should not be empty"),
    application_name: yup
      .string()
      .required("Application name should not be empty"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password should not be empty"),
    state: yup.string().required("State name should not be empty"),
    address: yup.string().required("Address should not be empty"),
    dateOfBirth: yup.string().required("Date of birth should not be empty"),
  })

  const submitFormHandler = (values: any) => {
    console.log(values)

    const payloadConsumer = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      role: values.role || currentRole,
      application_name: values.application_name,
      gender: values.gender,
      phone: values.phone,
    }

    const payloadRider = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      role: values.role || currentRole,
      application_name: values.application_name,
      gender: values.gender,
      phone: values.phone,
      country_id: "160",
      state_id: values.state,
      lga_id: values.lga,
      address: values.address,
      date_of_birth: values.dateOfBirth,
    }
    const payloadDriver = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      role: values.role || currentRole,
      application_name: values.application_name,
      gender: values.gender,
      phone: values.phone,
      country_id: "160",
      state_id: values.state,
      lga_id: values.lga,
      address: values.address,
      date_of_birth: values.dateOfBirth,
    }
    const payloadMerchant = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      role: values.role || currentRole,
      application_name: values.application_name,
      gender: values.gender,
      category: values.category,
      merchant_type: values.merchantType,
      phone: values.phone,
    }
    console.log(payloadMerchant)
    const createUserFunction = () => {
      if (values.role === "merchant") {
        dispatch(createuser(payloadMerchant))
      }
      if (values.role === "consumer") {
        dispatch(createuser(payloadConsumer))
      }
      if (values.role === "rider") {
        dispatch(createuser(payloadRider))
      }
      if (values.role === "driver") {
        dispatch(createuser(payloadDriver))
      }
    }

    const updateUserFunction = () => {
      if (values.role === "merchant") {
        dispatch(updateuser({ payload: payloadMerchant, id }))
      }
      if (values.role === "consumer") {
        dispatch(updateuser({ payload: payloadConsumer, id }))
      }
      if (values.role === "rider") {
        dispatch(updateuser({ payload: payloadRider, id }))
      }
      if (values.role === "driver") {
        dispatch(updateuser({ payload: payloadDriver, id }))
      }
    }

    if (title.includes("Add")) {
      createUserFunction()
    }
    if (title === "Update User") {
      updateUserFunction()
    }
  }

  console.log(formRef?.current?.values)
  const fetchLocalGovernments = async (id: string) => {
    setLoad(true)
    try {
      const response = await fetch(
        `https://easy.unikmarketing.org/api/lgas/${id}`
      )
      const data = await response.json()
      setLoad(false)
      setLocalGovernments(data.data)
    } catch (error) {
      const errorMessage = errorFunction(error)
      setErr(errorMessage)
      setLoad(false)
    }
  }
  useEffect(() => {
    if (title === "Update User") {
      const getAUser = () => {
        const url = `${userApi}/single-user/${id}`
        const dataFunction = (res: any) => {
          console.log(res)
          const response = res?.data?.data
          setInitialValues({
            ...initialValues,
            firstname: response?.firstName || "",
            lastname: response?.lastName || "",
            email: response?.email || "",
            role: response?.role || "",
            application_name: response?.applicationName || "",
            gender: response?.gender || "",
            password: response?.password || "",
            category: response?.category || "",
            state: response?.state?.stateName || "",
            lga: response?.lga?.lgaName || "",
            address: response.address || "",
            merchantType: response?.profile?.merchantType || "",
            dateOfBirth: response?.dateOfBirth || "",
            phone: response?.phone || 0,
          })

          // setSelectedDate(isoDateString);
        }

        request({ url, accessToken }, dataFunction)
      }
      getAUser()
    }
  }, [accessToken])
  useEffect(() => {
    if (loading === true) {
      dispatch(uiActions.openLoader())
    }
    if (loading === false) {
      dispatch(uiActions.closeLoader())
    }
    if (error.length > 0) {
      window.scrollTo(0, 0)
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: error,
          backgroundColor: "red",
        })
      )
      setTimeout(() => {
        dispatch(clearError())
        dispatch(uiActions.closeToast())
      }, 10000)
    }
    if (success) {
      window.scrollTo(0, 0)
      dispatch(uiActions.closedrawer())
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "#49D3BA",
        })
      )
      dispatch(fetchMyuser(accessToken))
      setTimeout(() => {
        dispatch(clearMessage())
        dispatch(uiActions.closeToast())
      }, 10000)
    }
  }, [loading, error, message, success, dispatch])
  console.log(currentRole)
  useEffect(() => {
    if (user === "merchant" || currentRole === "merchant") {
      dispatch(getMerchantCategory({}))
    }
    dispatch(getStates({}))
    if (user !== "user") {
      const role = user?.toLowerCase()
      setCurrentRole(role)
    }
  }, [])

  return (
    <DrawerWrapper title={title}>
      <Formik
        initialValues={initialValues}
        innerRef={formRef}
        onSubmit={(values, { setSubmitting }) => {
          submitFormHandler(values)
        }}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
        validationSchema={
          currentRole === "merchant"
            ? merchantSchema
            : currentRole === "consumer"
            ? consumerSchema
            : riderSchema
        }
      >
        {({ errors, setFieldValue, values, handleSubmit }) => {
          console.log(errors, "ee", values)
          return (
            <form
              className="w-full h-full flex flex-col"
              onSubmit={handleSubmit}
            >
              {user === "user" ? (
                <SelectInput
                  label="Role"
                  // value={values.role}
                  defaultInputValue={values?.role}
                  onChange={(value) => {
                    setFieldValue("role", value.value)
                    setCurrentRole(value?.value)

                    if (
                      value?.value === "merchant" ||
                      value?.value === "consumer"
                    ) {
                      setFieldValue("application_name", "flip")
                    } else {
                      setFieldValue("application_name", "cue")
                    }
                  }}
                  error={errors.role}
                  options={role}
                />
              ) : null}
              <TextInput
                label="First Name"
                value={values.firstname}
                onChange={(e) => {
                  setFieldValue("firstname", e.target.value)
                  setFieldValue("role", currentRole)
                  if (user !== "user" && currentRole) {
                    if (
                      currentRole === "merchant" ||
                      currentRole === "consumer"
                    ) {
                      setFieldValue("application_name", "flip")
                    } else {
                      setFieldValue("application_name", "cue")
                    }
                  }
                }}
                error={errors.firstname}
                placeholder="First Name"
              />
              <TextInput
                label="Last Name"
                value={values.lastname}
                onChange={(e) => setFieldValue("lastname", e.target.value)}
                error={errors.lastname}
                placeholder="Last Name"
              />
              <SelectInput
                label="Gender"
                // value={values.gender}
                onChange={(value) => setFieldValue("gender", value.value)}
                error={errors.gender}
                options={gender}
                defaultInputValue={values?.gender}
              />
              <TextInput
                label="Email Address"
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
                error={errors.email}
                placeholder="Email address"
              />
              <TextInput
                label="Password"
                value={values.password}
                onChange={(e) => setFieldValue("password", e.target.value)}
                error={errors.password}
                placeholder="Password"
              />
              {values?.application_name === "cue" ? (
                <div className=" mt-[30px]">
                  <label
                    htmlFor="date"
                    className=" text-[10px] text-[#1D2939] bg-white"
                  >
                    Date of Birth
                  </label>
                  <TextInput
                    type="date"
                    value={values?.dateOfBirth}
                    onChange={(e) => {
                      console.log(e.target.value)
                      setFieldValue("dateOfBirth", e.target.value)
                    }}
                  />

                  {errors.dateOfBirth ? (
                    <h6 className="text-[8px]  text-red-500">
                      {/* {errors.dateOfBirth} */}
                    </h6>
                  ) : null}
                </div>
              ) : null}
              <div className=" mt-[30px]">
                <label
                  htmlFor="phone"
                  className=" text-[10px] text-[#1D2939] bg-white"
                >
                  Phone Number
                </label>
                <MuiPhoneNumber
                  defaultCountry={"ng"}
                  name="businessPhoneNumber"
                  sx={{
                    svg: {
                      height: "20px",
                    },
                  }}
                  value={values.phone}
                  onChange={(value) => {
                    console.log()
                    value
                    setFieldValue("phone", value)
                  }}
                  autoComplete="off"
                  className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3"
                  required
                />
                {errors.phone ? (
                  <h6 className="text-[8px]  text-red-500">{errors.phone}</h6>
                ) : null}
              </div>

              {values?.role === "merchant" ? (
                <>
                  <SelectInput
                    label="Category"
                    // value={values.category}
                    onChange={(value) => {
                      setFieldValue("category", value.value)
                    }}
                    isLoading={loadingCategory}
                    error={errors.category}
                    options={merchantCategory?.map((item) => ({
                      label: item.categoryName,
                      value: item.categoryID,
                    }))}
                    defaultInputValue={values?.category}
                  />
                  <SelectInput
                    label="Merchant Type"
                    // value={values.merchantType}
                    onChange={(value) => {
                      setFieldValue("merchantType", value?.value)
                    }}
                    error={errors.merchantType}
                    options={merchantType}
                    defaultInputValue={values?.merchantType}
                  />
                </>
              ) : null}
              {values?.application_name === "cue" ? (
                <>
                  <SelectInput
                    label="State"
                    // value={values.state}
                    onChange={(value) => {
                      console.log(value)
                      setFieldValue("state", value.value)
                      fetchLocalGovernments(value.value)
                    }}
                    isLoading={loadingState}
                    error={errors.state}
                    options={states?.map((item) => ({
                      label: item.stateName,
                      value: item.stateID,
                    }))}
                    defaultInputValue={values?.state}
                  />
                  <SelectInput
                    label="LGA"
                    // value={values.lga}
                    onChange={(value) => {
                      setFieldValue("lga", value.value)
                    }}
                    isLoading={load}
                    error={errors.lga}
                    options={localGovernments?.map((item) => ({
                      label: item.lgaName,
                      value: item.lgaID,
                    }))}
                    defaultInputValue={values?.lga}
                  />

                  <TextInput
                    label="Address"
                    value={values.address}
                    onChange={(e) => setFieldValue("address", e.target.value)}
                    error={errors.address}
                    placeholder="Address"
                  />
                </>
              ) : null}

              <button
                className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto mt-2"
                type="submit"
              >
                {loading ? "Submitting" : title}
              </button>
            </form>
          )
        }}
      </Formik>
    </DrawerWrapper>
  )
}
export default AddUser
