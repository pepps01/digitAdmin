import moment from "moment"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import {
  clearUserManagementError,
  clearUserManagementMessage,
} from "src/redux/store/features/user-management-slice"
import { uiActions } from "src/redux/store/ui-slice"

export type UserStatus = "Active" | "Suspended" | "Blocked"

export const getUserStatus = (user: any): UserStatus => {
  if (user?.isBlocked) return "Blocked"
  if (!user?.isActive) return "Suspended"
  return "Active"
}

const statusStyles: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Suspended: "bg-amber-100 text-amber-700",
  Blocked: "bg-red-100 text-red-700",
  Completed: "bg-green-100 text-green-700",
  Resolved: "bg-green-100 text-green-700",
  success: "bg-green-100 text-green-700",
  successfull: "bg-green-100 text-green-700",
  Canceled: "bg-red-100 text-red-700",
  Rejected: "bg-red-100 text-red-700",
  Declined: "bg-red-100 text-red-700",
  failed: "bg-red-100 text-red-700",
  approved: "bg-green-100 text-green-700",
  verified: "bg-green-100 text-green-700",
  Online: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  "Awaiting review": "bg-blue-100 text-blue-700",
  Incomplete: "bg-gray-100 text-gray-700",
  rejected: "bg-red-100 text-red-700",
  Deactivated: "bg-red-100 text-red-700",
}

export const Badge = ({ label }: { label?: string | null }) => (
  <span
    className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${
      statusStyles[label ?? ""] ?? "bg-gray-100 text-gray-700"
    }`}
  >
    {label || "—"}
  </span>
)

export const formatDate = (date?: string | null) =>
  date ? moment(date).format("DD MMM YYYY, h:mm a") : "—"

export const formatNaira = (amount?: number | string | null) =>
  amount === null || amount === undefined || amount === ""
    ? "—"
    : `₦ ${Number(amount).toLocaleString("en-NG", {
        maximumFractionDigits: 2,
      })}`

export const EmptyRow = ({ colSpan, text }: { colSpan: number; text: string }) => (
  <tr>
    <td colSpan={colSpan} className="py-10 text-center text-sm text-text">
      {text}
    </td>
  </tr>
)

// shows toasts for the userManagement slice's error/message and clears them
export const useUserManagementFeedback = () => {
  const dispatch = useAppDispatch()
  const { error, message } = useAppSelector(
    (state: any) => state.userManagement
  )

  useEffect(() => {
    if (!error) return
    dispatch(
      uiActions.openToastAndSetContent({
        toastContent: error,
        backgroundColor: "red",
      })
    )
    dispatch(clearUserManagementError())
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
    dispatch(clearUserManagementMessage())
  }, [message, dispatch])
}
