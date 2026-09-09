import { memo } from "react"
import Map from "src/components/Map"
import ParentContainer from "src/components/ParentContainer"

import useLocation from "src/components/useLocation"

const Tracking = () => {
  const { location } = useLocation()
  const address = {
    latitude: location?.latitude,
    longitude: location?.longitude,
  }

  return (
    <ParentContainer>
      <div className="w-full h-full">
        <Map address={address} name="Admin" type="track" />
      </div>
    </ParentContainer>
  )
}
export default memo(Tracking)
