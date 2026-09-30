import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import { fetchDrivers } from "src/redux/store/features/driver-management-slice"
import {
  Badge,
  EmptyRow,
  formatDate,
} from "src/components/UserManagement/helpers"
import {
  getAccountStatus,
  getRating,
  getRegistrationStage,
  onboardingSteps,
  Stars,
  useDriverManagementFeedback,
} from "./helpers"

export type DriverView = "registrations" | "drivers" | "ratings"

const PAGE_SIZE = 20
const LOW_RATING = 3.5

const viewCopy: Record<DriverView, { title: string; subtitle: string }> = {
  registrations: {
    title: "Driver Registrations",
    subtitle:
      "New and unapproved drivers. Verify their licence and vehicle, then approve or reject.",
  },
  drivers: {
    title: "All Drivers",
    subtitle: "Every registered driver with their verification and account status.",
  },
  ratings: {
    title: "Driver Ratings",
    subtitle: "Ratings riders have given each driver. Low-rated drivers come first.",
  },
}

const filterOptions: Record<DriverView, { value: string; label: string }[]> = {
  registrations: [
    { value: "all", label: "All applications" },
    { value: "Awaiting review", label: "Awaiting review" },
    { value: "Incomplete", label: "Incomplete" },
    { value: "rejected", label: "Rejected" },
  ],
  drivers: [
    { value: "all", label: "All drivers" },
    { value: "approved", label: "Approved" },
    { value: "pending", label: "Pending approval" },
    { value: "rejected", label: "Rejected" },
    { value: "Suspended", label: "Suspended" },
    { value: "Deactivated", label: "Deactivated" },
    { value: "Blocked", label: "Blocked" },
  ],
  ratings: [
    { value: "all", label: "All rated drivers" },
    { value: "low", label: `Below ${LOW_RATING} ★` },
    { value: "unrated", label: "No ratings yet" },
  ],
}

const matchesFilter = (view: DriverView, filter: string, d: any) => {
  if (filter === "all") return view !== "ratings" || getRating(d) !== null
  if (view === "registrations") return getRegistrationStage(d) === filter
  if (view === "ratings") {
    const rating = getRating(d)
    return filter === "low"
      ? rating !== null && rating < LOW_RATING
      : rating === null
  }
  return (
    d.profile?.approvalStatus === filter || getAccountStatus(d) === filter
  )
}

const matchesSearch = (d: any, term: string) =>
  [
    d.fullName,
    d.email,
    d.phone,
    d.userID,
    d.profile?.driversLicenceNumber,
    d.profile?.vehicle?.plate_number,
  ]
    .filter(Boolean)
    .some((field: string) => String(field).toLowerCase().includes(term))

const SummaryCard = ({
  label,
  value,
  href,
}: {
  label: string
  value: React.ReactNode
  href?: string
}) => {
  const body = (
    <div className="flex-1 rounded-xl bg-white p-4">
      <div className="text-xs text-text">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-grey">{value}</div>
    </div>
  )
  return href ? (
    <Link href={href} legacyBehavior>
      <a className="flex flex-1 transition hover:shadow-md">{body}</a>
    </Link>
  ) : (
    body
  )
}

const DriverCell = ({ driver }: { driver: any }) => (
  <>
    <div className="font-medium text-grey">{driver.fullName}</div>
    <div className="text-xs text-text">{driver.email}</div>
  </>
)

const ViewLink = ({ driver, label = "View" }: { driver: any; label?: string }) => (
  <Link href={`/driver-management/${driver.userID}`} legacyBehavior>
    <a className="rounded-md bg-darkPurple px-3 py-1 text-xs text-white">
      {label}
    </a>
  </Link>
)

const Progress = ({ driver }: { driver: any }) => {
  const steps = onboardingSteps(driver)
  const done = steps.filter((s) => s.done).length
  const next = steps.find((s) => !s.done)
  return (
    <div className="w-[160px]">
      <div className="h-1.5 rounded-full bg-lightGray">
        <div
          className="h-1.5 rounded-full bg-darkPurple"
          style={{ width: `${(done / steps.length) * 100}%` }}
        />
      </div>
      <div className="mt-1 text-[11px] text-text">
        {done}/{steps.length} · {next ? `Next: ${next.label}` : "Complete"}
      </div>
    </div>
  )
}

const DriverManagementList = ({ view }: { view: DriverView }) => {
  const dispatch = useAppDispatch()
  const { drivers, loadingList } = useAppSelector(
    (state: any) => state.driverManagement
  )
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [page, setPage] = useState(1)

  useDriverManagementFeedback()

  useEffect(() => {
    dispatch(fetchDrivers())
  }, [dispatch])

  useEffect(() => {
    setFilter("all")
  }, [view])

  useEffect(() => {
    setPage(1)
  }, [search, filter, view])

  const summary = useMemo(() => {
    const rated = drivers.map(getRating).filter((r: number | null) => r !== null)
    return {
      total: drivers.length,
      awaiting: drivers.filter(
        (d: any) =>
          d.profile?.approvalStatus !== "approved" &&
          getRegistrationStage(d) === "Awaiting review"
      ).length,
      approved: drivers.filter(
        (d: any) => d.profile?.approvalStatus === "approved"
      ).length,
      suspended: drivers.filter(
        (d: any) => getAccountStatus(d) === "Suspended"
      ).length,
      avgRating: rated.length
        ? rated.reduce((s: number, r: number) => s + r, 0) / rated.length
        : null,
    }
  }, [drivers])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    let list = drivers.filter(
      (d: any) =>
        (view !== "registrations" ||
          d.profile?.approvalStatus !== "approved") &&
        matchesFilter(view, filter, d) &&
        (!term || matchesSearch(d, term))
    )
    if (view === "ratings") {
      list = [...list].sort(
        (a, b) => (getRating(a) ?? 6) - (getRating(b) ?? 6)
      )
    } else {
      list = [...list].sort(
        (a, b) =>
          new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime()
      )
    }
    return list
  }, [drivers, view, filter, search])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const columns =
    view === "registrations"
      ? ["Driver", "Signed up", "Progress", "Licence", "Vehicle", "Stage", ""]
      : view === "drivers"
      ? ["Driver", "Vehicle", "Approval", "Account", "Online", "Rating", ""]
      : ["Driver", "Rating", "Reviews", "Completed trips", "Account", ""]

  const renderRow = (d: any) => {
    const p = d.profile ?? {}
    if (view === "registrations") {
      return (
        <>
          <td className="py-3 pr-3"><DriverCell driver={d} /></td>
          <td className="py-3 pr-3 whitespace-nowrap">{formatDate(d.dateJoined)}</td>
          <td className="py-3 pr-3"><Progress driver={d} /></td>
          <td className="py-3 pr-3">
            <Badge label={p.driversLicenceFront ? p.licenceStatus : "Not uploaded"} />
          </td>
          <td className="py-3 pr-3">
            <Badge label={p.vehicle ? p.vehicle.verificationStatus : "Not added"} />
          </td>
          <td className="py-3 pr-3"><Badge label={getRegistrationStage(d)} /></td>
          <td className="py-3 text-right"><ViewLink driver={d} label="Review" /></td>
        </>
      )
    }
    if (view === "drivers") {
      return (
        <>
          <td className="py-3 pr-3"><DriverCell driver={d} /></td>
          <td className="py-3 pr-3">
            {p.vehicle ? (
              <>
                <div>
                  {[p.vehicle.manufacturer, p.vehicle.model].filter(Boolean).join(" ") || "—"}
                </div>
                <div className="text-xs text-text">{p.vehicle.plate_number}</div>
              </>
            ) : (
              <span className="text-text">None</span>
            )}
          </td>
          <td className="py-3 pr-3"><Badge label={p.approvalStatus} /></td>
          <td className="py-3 pr-3"><Badge label={getAccountStatus(d)} /></td>
          <td className="py-3 pr-3">
            <Badge label={p.isOnline ? "Online" : "Offline"} />
          </td>
          <td className="py-3 pr-3"><Stars rating={getRating(d)} /></td>
          <td className="py-3 text-right"><ViewLink driver={d} /></td>
        </>
      )
    }
    return (
      <>
        <td className="py-3 pr-3"><DriverCell driver={d} /></td>
        <td className="py-3 pr-3"><Stars rating={getRating(d)} /></td>
        <td className="py-3 pr-3">{p.reviewCount ?? p.reviews?.length ?? 0}</td>
        <td className="py-3 pr-3">{p.numOfCompletedRides ?? 0}</td>
        <td className="py-3 pr-3"><Badge label={getAccountStatus(d)} /></td>
        <td className="py-3 text-right"><ViewLink driver={d} /></td>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-grey">{viewCopy[view].title}</h1>
        <p className="text-sm text-text">{viewCopy[view].subtitle}</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <SummaryCard label="Total drivers" value={summary.total} href="/driver-management/drivers" />
        <SummaryCard
          label="Awaiting review"
          value={summary.awaiting}
          href="/driver-management/registrations"
        />
        <SummaryCard label="Approved" value={summary.approved} />
        <SummaryCard label="Suspended" value={summary.suspended} />
        <SummaryCard
          label="Average rating"
          value={<Stars rating={summary.avgRating} />}
          href="/driver-management/ratings"
        />
      </div>

      <div className="rounded-xl bg-white p-4">
        <div className="flex flex-col gap-2 md:flex-row md:justify-end">
          <input
            type="search"
            className="w-full rounded-md border border-softGray px-3 py-2 text-sm outline-none focus:border-darkPurple md:w-[320px]"
            placeholder="Search name, email, phone, licence or plate"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="rounded-md border border-softGray px-3 py-2 text-sm outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {filterOptions[view].map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b text-xs text-text">
                {columns.map((c, i) => (
                  <th key={i} className="py-3 pr-3 font-normal">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loadingList && drivers.length === 0 ? (
                <EmptyRow colSpan={columns.length} text="Loading drivers…" />
              ) : rows.length === 0 ? (
                <EmptyRow colSpan={columns.length} text="No drivers match your filters." />
              ) : (
                rows.map((d: any) => (
                  <tr key={d.userID} className="border-b last:border-0">
                    {renderRow(d)}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-text">
          <span>
            {filtered.length.toLocaleString()} driver{filtered.length === 1 ? "" : "s"}
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

export default DriverManagementList
