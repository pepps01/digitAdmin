import ParentContainer from "src/components/ParentContainer"
import PlatformOverview from "src/components/SuperAdmin/PlatformOverview"
import { SuperAdminGate } from "src/components/SuperAdmin/shared"

const SuperAdminPlatformOverview = () => (
  <ParentContainer>
    <SuperAdminGate>
      <PlatformOverview />
    </SuperAdminGate>
  </ParentContainer>
)

export default SuperAdminPlatformOverview
