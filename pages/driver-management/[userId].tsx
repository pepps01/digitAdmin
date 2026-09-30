import { useRouter } from "next/router"
import ParentContainer from "src/components/ParentContainer"
import DriverManagementDetail from "src/components/DriverManagement/DriverManagementDetail"

const ManagedDriver = () => {
  const { query, isReady } = useRouter()
  const userID = typeof query.userId === "string" ? query.userId : ""

  return (
    <ParentContainer>
      {isReady && userID && <DriverManagementDetail userID={userID} />}
    </ParentContainer>
  )
}

export default ManagedDriver
