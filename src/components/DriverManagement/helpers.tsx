import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import {
  clearDriverManagementError,
  clearDriverManagementMessage,
} from "src/redux/store/features/driver-management-slice"
import { uiActions } from "src/redux/store/ui-slice"

export type AccountStatus = "Active" | "Suspended" | "Deactivated" | "Blocked"

// account-level state: blocked/deactivated lock the whole account, suspension only stops driving
export const getAccountStatus = (driver: any): AccountStatus => {
  if (driver?.isBlocked) return "Blocked"
  if (!driver?.isActive) return "Deactivated"
  if (driver?.profile?.isSuspended) return "Suspended"
  return "Active"
}

export const onboardingSteps = (driver: any) => {
  const p = driver?.profile ?? {}
  return [
    { label: "Account created", done: true },
    {
      label: "Email verified",
      done: driver?.emailVerifiedStatus === "verified",
    },
    {
      label: "Licence uploaded",
      done: !!(p.driversLicenceFront && p.driversLicenceBack),
    },
    { label: "Vehicle added", done: !!p.vehicle },
    { label: "Licence verified", done: p.licenceStatus === "verified" },
    {
      label: "Vehicle verified",
      done: p.vehicle?.verificationStatus === "verified",
    },
    { label: "Approved", done: p.approvalStatus === "approved" },
  ]
}

export type RegistrationStage = "Incomplete" | "Awaiting review" | "rejected"

// where an unapproved driver sits in the registration queue
export const getRegistrationStage = (driver: any): RegistrationStage => {
  const p = driver?.profile ?? {}
  if (p.approvalStatus === "rejected") return "rejected"
  const uploaded = p.driversLicenceFront && p.driversLicenceBack && p.vehicle
  return uploaded ? "Awaiting review" : "Incomplete"
}

export const getRating = (driver: any): number | null => {
  const rating = driver?.profile?.avgRating
  return rating === null || rating === undefined ? null : Number(rating)
}

export const Stars = ({ rating }: { rating: number | null }) =>
  rating === null ? (
    <span className="text-text">No ratings</span>
  ) : (
    <span className="whitespace-nowrap">
      <span className="text-amber-500">★</span> {rating.toFixed(1)}
    </span>
  )

// shows toasts for the driverManagement slice's error/message and clears them
export const useDriverManagementFeedback = () => {
  const dispatch = useAppDispatch()
  const { error, message } = useAppSelector(
    (state: any) => state.driverManagement
  )

  useEffect(() => {
    if (!error) return
    dispatch(
      uiActions.openToastAndSetContent({
        toastContent: error,
        backgroundColor: "red",
      })
    )
    dispatch(clearDriverManagementError())
  }, [error, dispatch])

  useEffect(() => {
    if (!message) return
    dispatch(uiActions.closeModal())
    dispatch(
      uiActions.openToastAndSetContent({
        toastContent: message,
        backgroundColor: "#49D3BA",
      })
    )
    dispatch(clearDriverManagementMessage())
  }, [message, dispatch])
}
