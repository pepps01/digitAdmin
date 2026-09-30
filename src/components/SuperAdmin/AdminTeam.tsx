import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import {
  changeAdminRole,
  createAdmin,
  fetchAdmins,
  NewAdmin,
  setAdminAccess,
} from "src/redux/store/features/super-admin-slice"
import { uiActions } from "src/redux/store/ui-slice"
import { Badge, EmptyRow, formatDate } from "src/components/UserManagement/helpers"
import { PageHeader, useSuperAdminFeedback } from "./shared"

const roleLabel = (role: string) => (role === "superadmin" ? "Super Admin" : "Admin")

const inputClass =
  "w-full rounded-md border border-softGray px-3 py-2 text-sm outline-none focus:border-darkPurple"

const CreateAdminForm = () => {
  const dispatch = useAppDispatch()
  const { loadingAction } = useAppSelector((state: any) => state.superAdmin)
  const [form, setForm] = useState<NewAdmin>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "admin",
  })
  const set = (key: keyof NewAdmin) => (e: any) => setForm({ ...form, [key]: e.target.value })
  const valid =
    form.firstname.trim() && form.lastname.trim() && /\S+@\S+\.\S+/.test(form.email) && form.password.length >= 12

  return (
    <form
      className="flex w-[90vw] max-w-[440px] flex-col gap-3 p-6 text-left"
      onSubmit={(e) => {
        e.preventDefault()
        if (valid) dispatch(createAdmin({ ...form, email: form.email.trim() }))
      }}
    >
      <h3 className="text-lg font-semibold text-grey">Add admin</h3>
      <div className="grid grid-cols-2 gap-3">
        <input className={inputClass} placeholder="First name" value={form.firstname} onChange={set("firstname")} />
        <input className={inputClass} placeholder="Last name" value={form.lastname} onChange={set("lastname")} />
      </div>
      <input className={inputClass} type="email" placeholder="Email" value={form.email} onChange={set("email")} />
      <input
        className={inputClass}
        type="password"
        autoComplete="new-password"
        placeholder="Temporary password (min 12 characters)"
        value={form.password}
        onChange={set("password")}
      />
      <select className={inputClass} value={form.role} onChange={set("role")}>
        <option value="admin">Admin — day-to-day operations</option>
        <option value="superadmin">Super Admin — full oversight and admin management</option>
      </select>
      <p className="text-xs text-text">
        Share the temporary password privately and ask them to change it after first sign-in.
      </p>
      <div className="mt-2 flex justify-end gap-3">
        <button
          type="button"
          className="rounded-md border border-softGray px-4 py-2 text-sm"
          onClick={() => dispatch(uiActions.closeModal())}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-darkPurple px-4 py-2 text-sm text-white disabled:opacity-50"
          disabled={!valid || loadingAction}
        >
          {loadingAction ? "Creating…" : "Create admin"}
        </button>
      </div>
    </form>
  )
}

const Confirm = ({
  title,
  body,
  confirm,
  danger,
  onConfirm,
}: {
  title: string
  body: string
  confirm: string
  danger?: boolean
  onConfirm: () => void
}) => {
  const dispatch = useAppDispatch()
  const { loadingAction } = useAppSelector((state: any) => state.superAdmin)
  return (
    <div className="w-[90vw] max-w-[420px] p-6 text-left">
      <h3 className="text-lg font-semibold text-grey">{title}</h3>
      <p className="mt-2 text-sm text-text">{body}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          className="rounded-md border border-softGray px-4 py-2 text-sm"
          onClick={() => dispatch(uiActions.closeModal())}
        >
          Cancel
        </button>
        <button
          className={`rounded-md px-4 py-2 text-sm text-white disabled:opacity-50 ${danger ? "bg-red-600" : "bg-darkPurple"}`}
          disabled={loadingAction}
          onClick={onConfirm}
        >
          {loadingAction ? "Please wait…" : confirm}
        </button>
      </div>
    </div>
  )
}

const AdminTeam = () => {
  const dispatch = useAppDispatch()
  const { admins, loadingAdmins } = useAppSelector((state: any) => state.superAdmin)
  const me = useAppSelector((state: any) => state.auth.adminDetails?.userID)
  const [search, setSearch] = useState("")

  useSuperAdminFeedback()

  useEffect(() => {
    dispatch(fetchAdmins())
  }, [dispatch])

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase()
    return admins.filter(
      (a: any) =>
        !term ||
        [a.fullName, a.email].filter(Boolean).some((f: string) => f.toLowerCase().includes(term))
    )
  }, [admins, search])

  const openModal = (content: React.ReactNode) =>
    dispatch(uiActions.openModalAndSetContent({ modalContent: content }))

  const superCount = admins.filter((a: any) => a.role === "superadmin").length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <PageHeader
          title="Admin Team"
          subtitle={`${admins.length} admins · ${superCount} Super Admin${superCount === 1 ? "" : "s"}. Only Super Admins can see this page.`}
        />
        <button
          className="rounded-md bg-darkPurple px-4 py-2 text-sm text-white"
          onClick={() => openModal(<CreateAdminForm />)}
        >
          Add admin
        </button>
      </div>

      <div className="rounded-xl bg-white p-4">
        <input
          type="search"
          className={`${inputClass} md:w-[280px]`}
          placeholder="Search name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b text-xs text-text">
                {["Admin", "Role", "Access", "Actions logged", "Last action", "Added", ""].map((h) => (
                  <th key={h} className="py-3 pr-3 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loadingAdmins && admins.length === 0 ? (
                <EmptyRow colSpan={7} text="Loading admins…" />
              ) : rows.length === 0 ? (
                <EmptyRow colSpan={7} text="No admins match your search." />
              ) : (
                rows.map((a: any) => {
                  const isMe = a.userID === me
                  const nextRole = a.role === "superadmin" ? "admin" : "superadmin"
                  return (
                    <tr key={a.userID} className="border-b last:border-0">
                      <td className="py-3 pr-3">
                        <div className="font-medium text-grey">
                          {a.fullName} {isMe && <span className="text-xs text-text">(you)</span>}
                        </div>
                        <div className="text-xs text-text">{a.email}</div>
                      </td>
                      <td className="py-3 pr-3">{roleLabel(a.role)}</td>
                      <td className="py-3 pr-3">
                        <Badge label={a.isActive ? "Active" : "Deactivated"} />
                      </td>
                      <td className="py-3 pr-3">{(a.actionCount ?? 0).toLocaleString()}</td>
                      <td className="py-3 pr-3 whitespace-nowrap">{formatDate(a.lastAction)}</td>
                      <td className="py-3 pr-3 whitespace-nowrap">{formatDate(a.dateJoined)}</td>
                      <td className="py-3">
                        {!isMe && (
                          <div className="flex justify-end gap-2">
                            <button
                              className="rounded-md border border-softGray px-3 py-1 text-xs"
                              onClick={() =>
                                openModal(
                                  <Confirm
                                    title={nextRole === "superadmin" ? "Make Super Admin" : "Change to Admin"}
                                    body={
                                      nextRole === "superadmin"
                                        ? `${a.fullName} will get full oversight, including managing other admins.`
                                        : `${a.fullName} will lose access to the Super Admin area.`
                                    }
                                    confirm="Change role"
                                    onConfirm={() => dispatch(changeAdminRole({ id: a.userID, role: nextRole }))}
                                  />
                                )
                              }
                            >
                              {nextRole === "superadmin" ? "Make Super Admin" : "Make Admin"}
                            </button>
                            <button
                              className={`rounded-md border px-3 py-1 text-xs ${
                                a.isActive ? "border-red-600 text-red-600" : "border-green-600 text-green-700"
                              }`}
                              onClick={() =>
                                openModal(
                                  <Confirm
                                    title={a.isActive ? "Revoke access" : "Restore access"}
                                    body={
                                      a.isActive
                                        ? `${a.fullName} will be signed out everywhere and unable to use the dashboard.`
                                        : `${a.fullName} will be able to sign in to the dashboard again.`
                                    }
                                    confirm={a.isActive ? "Revoke" : "Restore"}
                                    danger={a.isActive}
                                    onConfirm={() => dispatch(setAdminAccess({ id: a.userID, active: !a.isActive }))}
                                  />
                                )
                              }
                            >
                              {a.isActive ? "Revoke access" : "Restore access"}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminTeam
