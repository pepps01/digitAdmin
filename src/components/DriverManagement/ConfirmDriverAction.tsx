import moment from "moment"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import {
  DriverAction,
  runDriverAction,
} from "src/redux/store/features/driver-management-slice"
import { uiActions } from "src/redux/store/ui-slice"

type Copy = {
  title: string
  body: string
  confirm: string
  color: string
  note?: "required" | "optional"
}

const copy: Record<DriverAction, Copy> = {
  approve: {
    title: "Approve driver",
    body: "The driver will be able to go online and accept trips.",
    confirm: "Approve",
    color: "bg-green-600",
    note: "optional",
  },
  reject: {
    title: "Reject application",
    body: "The driver will not be able to go online. They will see your reason.",
    confirm: "Reject",
    color: "bg-red-600",
    note: "required",
  },
  "verify-licence": {
    title: "Verify licence",
    body: "Confirm the licence number and both photos are valid and match the driver.",
    confirm: "Mark verified",
    color: "bg-green-600",
    note: "optional",
  },
  "reject-licence": {
    title: "Reject licence",
    body: "The driver will need to upload their licence again.",
    confirm: "Reject licence",
    color: "bg-red-600",
    note: "required",
  },
  "verify-vehicle": {
    title: "Verify vehicle",
    body: "Confirm the vehicle details and photos, including the plate number, are valid.",
    confirm: "Mark verified",
    color: "bg-green-600",
    note: "optional",
  },
  "reject-vehicle": {
    title: "Reject vehicle",
    body: "The driver will need to update their vehicle details or photos.",
    confirm: "Reject vehicle",
    color: "bg-red-600",
    note: "required",
  },
  suspend: {
    title: "Suspend driver",
    body: "The driver is taken offline and cannot accept trips. They can still sign in and see their history.",
    confirm: "Suspend",
    color: "bg-amber-500",
    note: "required",
  },
  "lift-suspension": {
    title: "Lift suspension",
    body: "The driver will be able to go online again.",
    confirm: "Lift suspension",
    color: "bg-green-600",
  },
  activate: {
    title: "Activate account",
    body: "The driver regains access to the app.",
    confirm: "Activate",
    color: "bg-green-600",
  },
  deactivate: {
    title: "Deactivate account",
    body: "The driver's account is locked and every request from the app is refused until reactivated.",
    confirm: "Deactivate",
    color: "bg-red-600",
  },
}

type Props = { userID: string; name: string; action: DriverAction }

const ConfirmDriverAction = ({ userID, name, action }: Props) => {
  const dispatch = useAppDispatch()
  const { loadingAction } = useAppSelector(
    (state: any) => state.driverManagement
  )
  const [note, setNote] = useState("")
  const [until, setUntil] = useState("")
  const text = copy[action]
  const missingNote = text.note === "required" && !note.trim()

  return (
    <div className="w-[90vw] max-w-[440px] p-6 text-left">
      <h3 className="text-lg font-semibold text-grey">{text.title}</h3>
      <p className="mt-2 text-sm text-text">
        <span className="font-medium text-grey">{name}</span> — {text.body}
      </p>

      {action === "suspend" && (
        <label className="mt-4 block text-xs text-text">
          Suspend until (leave empty to suspend until lifted)
          <input
            type="date"
            min={moment().add(1, "day").format("YYYY-MM-DD")}
            className="mt-1 w-full rounded-md border border-softGray p-2 text-sm outline-none focus:border-darkPurple"
            value={until}
            onChange={(e) => setUntil(e.target.value)}
          />
        </label>
      )}

      {text.note && (
        <textarea
          className="mt-4 w-full rounded-md border border-softGray p-3 text-sm outline-none focus:border-darkPurple"
          rows={3}
          maxLength={255}
          placeholder={text.note === "required" ? "Reason (required)" : "Note (optional)"}
          value={note}
          onChange={(e) => setNote(e.target.value)}
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
          disabled={loadingAction || missingNote}
          onClick={() =>
            dispatch(
              runDriverAction({
                id: userID,
                action,
                note: note.trim() || undefined,
                until: until || undefined,
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

export default ConfirmDriverAction

export const openDriverActionModal = (
  dispatch: ReturnType<typeof useAppDispatch>,
  driver: any,
  action: DriverAction
) =>
  dispatch(
    uiActions.openModalAndSetContent({
      modalContent: (
        <ConfirmDriverAction
          userID={driver.userID}
          name={driver.fullName}
          action={action}
        />
      ),
    })
  )
