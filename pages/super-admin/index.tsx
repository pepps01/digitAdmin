import { useRouter } from "next/router"
import { useEffect } from "react"

const SuperAdminIndex = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace("/super-admin/overview")
  }, [router])
  return null
}

export default SuperAdminIndex
