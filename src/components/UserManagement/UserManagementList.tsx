import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import { fetchManagedUsers } from "src/redux/store/features/user-management-slice"
import {
  actionButtonStyles,
  availableActions,
  openUserActionModal,
} from "./ConfirmUserAction"
import {
  Badge,
  EmptyRow,
  formatDate,
  getUserStatus,
  useUserManagementFeedback,
  UserStatus,
} from "./helpers"

export type Segment = "all" | "rider" | "driver"

const PAGE_SIZE = 20

const segments: { key: Segment; label: string; route: string }[] = [
  { key: "all", label: "All Users", route: "/user-management/all" },
  { key: "rider", label: "Riders", route: "/user-management/riders" },
  { key: "driver", label: "Drivers", route: "/user-management/drivers" },
]

const countByStatus = (users: any[]) => {
  const counts = { Active: 0, Suspended: 0, Blocked: 0 }
  users.forEach((u) => counts[getUserStatus(u)]++)
  return counts
}

const matchesSearch = (user: any, term: string) =>
  [user.fullName, user.email, user.phone, user.userID]
    .filter(Boolean)
    .some((field: string) => String(field).toLowerCase().includes(term))

const SegmentCard = ({
  title,
  users,
  href,
  active,
}: {
  title: string
  users: any[]
  href: string
  active: boolean
}) => {
  const counts = countByStatus(users)
  return (
    <Link href={href} legacyBehavior>
      <a
        className={`flex-1 rounded-xl border bg-white p-4 transition hover:shadow-md ${
          active ? "border-darkPurple" : "border-transparent"
        }`}
      >
        <div className="text-xs text-text">{title}</div>
        <div className="mt-1 text-2xl font-semibold text-grey">
          {users.length.toLocaleString()}
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-text">
          <span>
            <span className="text-green-700">●</span> {counts.Active} active
          </span>
          <span>
            <span className="text-amber-600">●</span> {counts.Suspended}{" "}
            suspended
          </span>
          <span>
            <span className="text-red-600">●</span> {counts.Blocked} blocked
          </span>
        </div>
      </a>
    </Link>
  )
}

const UserManagementList = ({ segment }: { segment: Segment }) => {
  const dispatch = useAppDispatch()
  const { riders, drivers, loadingList } = useAppSelector(
    (state: any) => state.userManagement
  )
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<"all" | UserStatus>("all")
  const [page, setPage] = useState(1)

  useUserManagementFeedback()

  useEffect(() => {
    dispatch(fetchManagedUsers())
  }, [dispatch])

  useEffect(() => {
    setPage(1)
  }, [search, status, segment])

  const segmentUsers: any[] = useMemo(() => {
    if (segment === "rider") return riders
    if (segment === "driver") return drivers
    return [...riders, ...drivers].sort(
      (a, b) =>
        new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime()
    )
  }, [segment, riders, drivers])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return segmentUsers.filter(
      (u) =>
        (status === "all" || getUserStatus(u) === status) &&
        (!term || matchesSearch(u, term))
    )
  }, [segmentUsers, search, status])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-grey">User Management</h1>
        <p className="text-sm text-text">
          Search, review and moderate riders and drivers.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <SegmentCard
          title="All Users"
          users={[...riders, ...drivers]}
          href="/user-management/all"
          active={segment === "all"}
        />
        <SegmentCard
          title="Riders"
          users={riders}
          href="/user-management/riders"
          active={segment === "rider"}
        />
        <SegmentCard
          title="Drivers"
          users={drivers}
          href="/user-management/drivers"
          active={segment === "driver"}
        />
      </div>

      <div className="rounded-xl bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-1 rounded-lg bg-lightGray p-1">
            {segments.map((s) => (
              <Link key={s.key} href={s.route} legacyBehavior>
                <a
                  className={`rounded-md px-3 py-1.5 text-xs ${
                    segment === s.key
                      ? "bg-white font-medium text-grey shadow-sm"
                      : "text-text"
                  }`}
                >
                  {s.label}
                </a>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 md:flex-row">
            <input
              type="search"
              className="w-full rounded-md border border-softGray px-3 py-2 text-sm outline-none focus:border-darkPurple md:w-[280px]"
              placeholder="Search name, email, phone or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="rounded-md border border-softGray px-3 py-2 text-sm outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="all">All statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b text-xs text-text">
                <th className="py-3 pr-3 font-normal">Name</th>
                <th className="py-3 pr-3 font-normal">Type</th>
                <th className="py-3 pr-3 font-normal">Phone</th>
                <th className="py-3 pr-3 font-normal">Joined</th>
                <th className="py-3 pr-3 font-normal">Status</th>
                <th className="py-3 text-right font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loadingList && segmentUsers.length === 0 ? (
                <EmptyRow colSpan={6} text="Loading users…" />
              ) : rows.length === 0 ? (
                <EmptyRow colSpan={6} text="No users match your filters." />
              ) : (
                rows.map((user) => (
                  <tr key={user.userID} className="border-b last:border-0">
                    <td className="py-3 pr-3">
                      <div className="font-medium text-grey">
                        {user.fullName}
                      </div>
                      <div className="text-xs text-text">{user.email}</div>
                    </td>
                    <td className="py-3 pr-3 capitalize">{user.role}</td>
                    <td className="py-3 pr-3">{user.phone || "—"}</td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      {formatDate(user.dateJoined)}
                    </td>
                    <td className="py-3 pr-3">
                      <Badge label={getUserStatus(user)} />
                    </td>
                    <td className="py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/user-management/${user.userID}`}
                          legacyBehavior
                        >
                          <a className="rounded-md bg-darkPurple px-3 py-1 text-xs text-white">
                            View
                          </a>
                        </Link>
                        {availableActions(user).map((action) => (
                          <button
                            key={action}
                            className={`rounded-md border px-3 py-1 text-xs capitalize ${actionButtonStyles[action]}`}
                            onClick={() =>
                              openUserActionModal(dispatch, user, action)
                            }
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-text">
          <span>
            {filtered.length.toLocaleString()} user
            {filtered.length === 1 ? "" : "s"}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="rounded-md border px-3 py-1 disabled:opacity-40"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
            <span>
              Page {page} of {pageCount}
            </span>
            <button
              className="rounded-md border px-3 py-1 disabled:opacity-40"
              disabled={page >= pageCount}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagementList
