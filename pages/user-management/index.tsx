import { useRouter } from "next/router"
import { useEffect } from "react"

const UserManagementIndex = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace("/user-management/all")
  }, [router])
  return null
}

export default UserManagementIndex
