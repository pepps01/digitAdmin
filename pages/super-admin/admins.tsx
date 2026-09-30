import ParentContainer from "src/components/ParentContainer"
import AdminTeam from "src/components/SuperAdmin/AdminTeam"
import { SuperAdminGate } from "src/components/SuperAdmin/shared"

const SuperAdminAdminTeam = () => (
  <ParentContainer>
    <SuperAdminGate>
      <AdminTeam />
    </SuperAdminGate>
  </ParentContainer>
)

export default SuperAdminAdminTeam
