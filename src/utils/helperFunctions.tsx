import { Box, Typography } from "@mui/material"
import moment from "moment"
import { TabPanelProps } from "src/@types/box"

export const isNotEmpty = (value: string) => value?.trim() !== ""
export const isNotEmptyNumber = (value: number) => value > 0
export const isEmail = (value: any) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}
export const is8Chars = (value: string) => value?.trim().length > 7
export const includesSubstring = (searchString: any, fullString: any) => {
  return fullString.includes(searchString)
}
export function getFirstWord(text: any) {
  // Find the position of the first and second '/'
  const firstSlash = text.indexOf("/")
  const secondSlash = text.indexOf("/", firstSlash + 1)

  // Extract the substring between the first and second '/'
  const word = text.substring(firstSlash + 1, secondSlash)

  return word
}
export function calculateAverageRating(reviews: any) {
  if (reviews?.length === 0) {
    return 0
  }

  const sum = reviews?.reduce(
    (acc: any, review: any) => acc + +review?.rating,
    0
  )
  const average = sum / reviews?.length

  return average
}
export const getLatLng = async (address: any) => {
  console.log(address, "fore")
  let result
  await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const { lat, lng } = data.results[0].geometry.location
      result = { lat, lng }

      console.log(`Latitude: ${lat}, Longitude: ${lng}`)
    })
    .catch((error) => console.error(error))

  return result
}
export const errorFunction = (err: any) => {
  let errorMessage
  if (err?.response?.data?.errors?.[0]?.message) {
    errorMessage = err?.response?.data?.errors[0]?.message
  } else if (err?.response?.data?.errors?.[0]?.password) {
    errorMessage = err?.response?.data?.errors[0]?.password
  } else if (err?.response?.data?.errors?.[0]?.email) {
    errorMessage = err?.response?.data?.errors?.[0]?.email
  } else if (err?.response?.data?.error) {
    errorMessage = err?.response?.data?.error
  } else if (err?.response?.data?.message) {
    errorMessage = err?.response?.data?.message
  } else {
    errorMessage = err?.message || "Something went wrong, Please try again"
  }
  console.log(errorMessage)

  return errorMessage
}
export const formatData = (client: any) => {
  return {
    id: client?.product?.productID,
    serial: client?.product?.serial,
    brand: client?.product?.brand || "--",
    name: client?.product?.name || "--",
    weight: client?.product?.weight || "--",
    quantity: client?.product?.quantity || "--",
    productWarranty: client?.product?.productWarranty || "--",
    price: client?.product?.price || "--",
    categoryName: client?.category?.name || "--",
    productCreationDate: moment(client?.productCreationDate).format("ll"),
    isActive: client?.product?.isActive ? "Active" : "Inactive",
    numberOfOrders: client?.product?.numberOfOrders || "--",
    freeDelivery: client?.product?.delivery?.freeDelivery || "--",
    shippingFee: client?.product?.delivery?.shippingFee || "--",
    description: client?.product?.description || "--",
    specifications: client?.product?.specifications || [],
    features: client?.product?.features || [],
    images: client?.product?.images,
  }
}

export function getMinutesDifference(dateString1: string, dateString2: string) {
  console.log(dateString1, dateString2)
  const date1: any = new Date(dateString1)
  const date2: any = new Date(dateString2)

  // Calculate the difference in milliseconds
  const differenceMs = date2 - date1

  // Convert milliseconds to minutes
  const differenceMinutes = Math.floor(differenceMs / (1000 * 60))

  return dateString2
    ? `${differenceMinutes} ${differenceMinutes > 0 ? "mins" : "min"}`
    : "ongoing"
}
export function formatNumberWithCommas(number) {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
export function getStatusByYear(year: number) {
  if (year >= 2002 && year <= 2006) {
    return { name: "economy", options: [] }
  } else if (year >= 2007 && year <= 2011) {
    return {
      name: "business",
      options: [
        { label: "Economy", value: "economy" },
        { label: "Business", value: "business" },
      ],
    }
  } else if (year >= 2012 && year <= 2023) {
    return {
      name: "luxury",
      options: [
        { label: "Economy", value: "economy" },
        { label: "Business", value: "business" },
        { label: "Luxury", value: "luxury" },
      ],
    }
  } else {
    return { name: "economy", options: [] } // If the year doesn't fall into any of the specified ranges
  }
}
export function getObjectById(array, id) {
  return array?.find((item) => item?.key === id)
}
