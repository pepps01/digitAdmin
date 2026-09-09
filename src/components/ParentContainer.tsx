import { collection, onSnapshot, query } from "firebase/firestore"
import { ReactNode, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import { getMyProfile } from "src/redux/store/auth-slice"
import { setActiveTrips } from "src/redux/store/features/trip-slice"
import { setDriversLocation } from "src/redux/store/features/user-slice"
import { db } from "../../firebase"

import SideNav from "./SideNav"
import TopNav from "./TopNav"

const ParentContainer = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const [showNav, setShowNav] = useState<boolean>()
  const { adminDetails } = useAppSelector((state) => state.auth)
  useEffect(() => {
    const watchDrivers = () => {
      console.log()
      const unsub = onSnapshot(query(collection(db, "driver")), (s) => {
        if (s.empty) return

        let set = s.docs.map((i) => {
          const data = i.data()

          return {
            id: data.profile?.driverID,
            userID: data.profile?.userID,
            name: data?.fullName,
            image:
              data.image ||
              "https://easy.unikmarketing.org/storage/profile/VhGIKKDrWcjFxwKx1MyS",
            currentLocation: {
              lat: data?.currentLocation?.latitude,
              lng: data?.currentLocation?.longitude,
            },
          }
        })

        console.log(set)
        dispatch(setDriversLocation(set))
      })
      return unsub
    }
    const watchTrips = () => {
      console.log()
      const unsub2 = onSnapshot(query(collection(db, "trips")), (s) => {
        if (s.empty) return

        let set = s.docs.map((i) => {
          const data = i.data()
          console.log("all", data)
          return {
            id: data?.tripID,
            riderName: data?.rider?.fullName,
            riderImage: data?.rider?.image || "",
            riderId: data?.rider?.profile?.riderID || "",
            driver: {
              name: data?.driver?.fullName,
              image: data?.driver?.image,
              userID: data?.driver?.userID,
              id:
                data?.driver?.profile?.driverID ||
                "99e44c74-66ad-473a-9e65-4f187947c3a1",
            },
            pickup: data?.pickup,
            pickupLocation: data?.pickupLocation,
            dropoffLocation: data?.dropoffLocation,
            dropoff: {
              lat: data?.dropoff?.latitude,
              lng: data?.dropoff?.longitude,
            },
            currentLocation: {
              lat: data?.currentLocation?.latitude,
              lng: data?.currentLocation?.longitude,
            },
            status: data?.status,
            vehicleStatus: data?.driver?.profile?.vehicle?.status || "Economy",
          }
        })

        console.log(set)
        dispatch(setActiveTrips(set))
      })
      return unsub2
    }

    const unsub = watchDrivers()
    const unsub2 = watchTrips()
    return () => {
      unsub()
      unsub2()
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(getMyProfile({}))
  }, [dispatch])

  return (
    <div className="flex flex-row w-full max-w-screen relative h-screen overflow-x-hidden">
      <SideNav showNav={showNav} setShowNav={setShowNav} />
      <TopNav showNav={showNav} setShowNav={setShowNav} />

      <div className="mt-[60px] md:mt-[67px] w-[calc(100vw-0px)] md:w-[calc(100vw-265px)] bg-lightGray md:ml-[265px] p-[10px] md:p-[20px] overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}

export default ParentContainer
