import { useState } from "react"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import {
  changeUserStatus,
  UserAction,
} from "src/redux/store/features/user-management-slice"
import { uiActions } from "src/redux/store/ui-slice"

const copy: Record<
  UserAction,
  { title: string; body: string; confirm: string; color: string }
> = {
  suspend: {
    title: "Suspend user",
    body: "The user will be unable to use the app until they are reactivated.",
    confirm: "Suspend",
    color: "bg-amber-500",
  },
  reactivate: {
    title: "Reactivate user",
    body: "The user will regain access to the app.",
    confirm: "Reactivate",
    color: "bg-green-600",
  },
  block: {
    title: "Block user",
    body: "The user will be signed out of every device and cannot log in again until unblocked.",
    confirm: "Block",
    color: "bg-red-600",
  },
  unblock: {
    title: "Unblock user",
    body: "The block will be lifted and the user's account reactivated.",
    confirm: "Unblock",
    color: "bg-green-600",
  },
}

type Props = {
  userID: string
  name: string
  action: UserAction
}

const ConfirmUserAction = ({ userID, name, action }: Props) => {
  const dispatch = useAppDispatch()
  const { loadingAction } = useAppSelector((state: any) => state.userManagement)
  const [reason, setReason] = useState("")
  const text = copy[action]

  return (
    <div className="w-[90vw] max-w-[420px] p-6 text-left">
      <h3 className="text-lg font-semibold text-grey">{text.title}</h3>
      <p className="mt-2 text-sm text-text">
        <span className="font-medium text-grey">{name}</span> — {text.body}
      </p>

      {action === "block" && (
        <textarea
          className="mt-4 w-full rounded-md border border-softGray p-3 text-sm outline-none focus:border-darkPurple"
          rows={3}
          maxLength={255}
          placeholder="Reason for blocking (optional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      )}

      <div className="mt-6 flex justify-end gap-3">
        <button
          className="rounded-md border border-softGray px-4 py-2 text-sm"
          onClick={() => dispatch(uiActions.closeModal())}
        >
          Cancel
        </button>
        <button
          className={`rounded-md px-4 py-2 text-sm text-white disabled:opacity-50 ${text.color}`}
          disabled={loadingAction}
          onClick={() =>
            dispatch(
              changeUserStatus({
                id: userID,
                action,
                reason: reason.trim() || undefined,
              })
            )
          }
        >
          {loadingAction ? "Please wait…" : text.confirm}
        </button>
      </div>
    </div>
  )
}

export default ConfirmUserAction

// the actions available for a user in their current state
export const availableActions = (user: any): UserAction[] => {
  if (user?.isBlocked) return ["unblock"]
  return user?.isActive ? ["suspend", "block"] : ["reactivate", "block"]
}

export const actionButtonStyles: Record<UserAction, string> = {
  suspend: "border-amber-500 text-amber-600 hover:bg-amber-50",
  reactivate: "border-green-600 text-green-700 hover:bg-green-50",
  block: "border-red-600 text-red-600 hover:bg-red-50",
  unblock: "border-green-600 text-green-700 hover:bg-green-50",
}

export const openUserActionModal = (
  dispatch: ReturnType<typeof useAppDispatch>,
  user: any,
  action: UserAction
) =>
  dispatch(
    uiActions.openModalAndSetContent({
      modalContent: (
        <ConfirmUserAction
          userID={user.userID}
          name={user.fullName}
          action={action}
        />
      ),
    })
  )
