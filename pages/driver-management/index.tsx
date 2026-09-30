import { useRouter } from "next/router"
import { useEffect } from "react"

const DriverManagementIndex = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace("/driver-management/registrations")
  }, [router])
  return null
}

export default DriverManagementIndex
