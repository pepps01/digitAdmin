import { ReactNode, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import {
  clearSuperAdminError,
  clearSuperAdminMessage,
} from "src/redux/store/features/super-admin-slice"
import { uiActions } from "src/redux/store/ui-slice"

export const useIsSuperAdmin = (): boolean | null => {
  const role = useAppSelector((state: any) => state.auth.adminDetails?.role)
  // null while the profile is still loading
  if (!role) return null
  return role === "superadmin"
}

// hides superadmin pages from regular admins; the API refuses them regardless
export const SuperAdminGate = ({ children }: { children: ReactNode }) => {
  const isSuperAdmin = useIsSuperAdmin()
  if (isSuperAdmin === null) {
    return <div className="py-20 text-center text-sm text-text">Loading…</div>
  }
  if (!isSuperAdmin) {
    return (
      <div className="py-20 text-center">
        <div className="text-lg font-semibold text-grey">Super Admin only</div>
        <p className="mt-1 text-sm text-text">
          Ask a Super Admin if you need access to this area.
        </p>
      </div>
    )
  }
  return <>{children}</>
}

// shows toasts for the superAdmin slice's error/message and clears them
export const useSuperAdminFeedback = () => {
  const dispatch = useAppDispatch()
  const { error, message } = useAppSelector((state: any) => state.superAdmin)

  useEffect(() => {
    if (!error) return
    dispatch(
      uiActions.openToastAndSetContent({ toastContent: error, backgroundColor: "red" })
    )
    dispatch(clearSuperAdminError())
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
    dispatch(clearSuperAdminMessage())
  }, [message, dispatch])
}

export const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div>
    <h1 className="text-xl font-semibold text-grey">{title}</h1>
    <p className="text-sm text-text">{subtitle}</p>
  </div>
)
