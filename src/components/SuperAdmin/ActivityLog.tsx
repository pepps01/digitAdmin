import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import { fetchActivity } from "src/redux/store/features/super-admin-slice"
import { EmptyRow, formatDate } from "src/components/UserManagement/helpers"
import { PageHeader, useSuperAdminFeedback } from "./shared"

const PAGE_SIZE = 30

// "user_blocked" -> "User blocked"
const humanize = (action?: string) =>
  action ? action.charAt(0).toUpperCase() + action.slice(1).replace(/_/g, " ") : "—"

const ActivityLog = () => {
  const dispatch = useAppDispatch()
  const { activity, loadingActivity } = useAppSelector((state: any) => state.superAdmin)
  const [admin, setAdmin] = useState("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  useSuperAdminFeedback()

  useEffect(() => {
    dispatch(fetchActivity())
  }, [dispatch])

  useEffect(() => {
    setPage(1)
  }, [admin, search])

  const adminNames = useMemo(
    () =>
      Array.from(
        new Map(activity.map((l: any) => [l.adminUserID, l.adminName])).entries()
      ) as [string, string][],
    [activity]
  )

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return activity.filter(
      (l: any) =>
        (admin === "all" || l.adminUserID === admin) &&
        (!term ||
          [l.action, l.modelAffected, l.modelIDAffected, l.adminName]
            .filter(Boolean)
            .some((f: string) => String(f).toLowerCase().includes(term)))
    )
  }, [activity, admin, search])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Activity Log"
        subtitle="Every recorded action taken by any admin, newest first."
      />
      <div className="rounded-xl bg-white p-4">
        <div className="flex flex-col gap-2 md:flex-row">
          <select
            className="rounded-md border border-softGray px-3 py-2 text-sm outline-none"
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
          >
            <option value="all">All admins</option>
            {adminNames.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <input
            type="search"
            className="w-full rounded-md border border-softGray px-3 py-2 text-sm outline-none focus:border-darkPurple md:w-[300px]"
            placeholder="Search action or record ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b text-xs text-text">
                {["When", "Admin", "Action", "Record"].map((h) => (
                  <th key={h} className="py-3 pr-3 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loadingActivity && activity.length === 0 ? (
                <EmptyRow colSpan={4} text="Loading activity…" />
              ) : rows.length === 0 ? (
                <EmptyRow colSpan={4} text="No activity matches your filters." />
              ) : (
                rows.map((l: any) => (
                  <tr key={l.logsID} className="border-b last:border-0">
                    <td className="py-3 pr-3 whitespace-nowrap">{formatDate(l.date)}</td>
                    <td className="py-3 pr-3">{l.adminName || "—"}</td>
                    <td className="py-3 pr-3 text-grey">{humanize(l.action)}</td>
                    <td className="py-3 pr-3">
                      <span className="text-text">{l.modelAffected}</span>{" "}
                      <span className="font-mono text-xs text-text">{l.modelIDAffected}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-text">
          <span>{filtered.length.toLocaleString()} entries</span>
          <div className="flex items-center gap-2">
            <button className="rounded-md border px-3 py-1 disabled:opacity-40" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>
            <span>Page {page} of {pageCount}</span>
            <button className="rounded-md border px-3 py-1 disabled:opacity-40" disabled={page >= pageCount} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityLog
