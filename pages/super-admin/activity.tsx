import ParentContainer from "src/components/ParentContainer"
import ActivityLog from "src/components/SuperAdmin/ActivityLog"
import { SuperAdminGate } from "src/components/SuperAdmin/shared"

const SuperAdminActivityLog = () => (
  <ParentContainer>
    <SuperAdminGate>
      <ActivityLog />
    </SuperAdminGate>
  </ParentContainer>
)

export default SuperAdminActivityLog
