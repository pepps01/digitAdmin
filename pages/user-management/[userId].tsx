import { useRouter } from "next/router"
import ParentContainer from "src/components/ParentContainer"
import UserManagementDetail from "src/components/UserManagement/UserManagementDetail"

const ManagedUser = () => {
  const { query, isReady } = useRouter()
  const userID = typeof query.userId === "string" ? query.userId : ""

  return (
    <ParentContainer>
      {isReady && userID && <UserManagementDetail userID={userID} />}
    </ParentContainer>
  )
}

export default ManagedUser
