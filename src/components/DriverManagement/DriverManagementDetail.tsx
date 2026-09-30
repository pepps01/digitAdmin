import { Avatar } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import {
  DriverAction,
  fetchDriver,
  fetchDriverReviews,
  fetchDriverTrips,
  resetDriverDetail,
} from "src/redux/store/features/driver-management-slice"
import {
  Badge,
  EmptyRow,
  formatDate,
  formatNaira,
} from "src/components/UserManagement/helpers"
import { openDriverActionModal } from "./ConfirmDriverAction"
import {
  getAccountStatus,
  getRating,
  onboardingSteps,
  Stars,
  useDriverManagementFeedback,
} from "./helpers"

type Tab = "documents" | "vehicle" | "ratings" | "trips"

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <div className="text-[11px] text-text">{label}</div>
    <div className="text-sm text-grey">{value || "—"}</div>
  </div>
)

const Photo = ({ label, src }: { label: string; src?: string | null }) => (
  <div className="flex flex-col gap-1">
    <div className="text-[11px] text-text">{label}</div>
    {src ? (
      <a href={src} target="_blank" rel="noreferrer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          className="h-[160px] w-full rounded-md border object-cover hover:opacity-90"
        />
      </a>
    ) : (
      <div className="flex h-[160px] items-center justify-center rounded-md border border-dashed text-xs text-text">
        Not uploaded
      </div>
    )}
  </div>
)

const ReviewPanel = ({
  status,
  note,
  reviewedAt,
  canReview,
  onVerify,
  onReject,
}: {
  status?: string
  note?: string | null
  reviewedAt?: string | null
  canReview: boolean
  onVerify: () => void
  onReject: () => void
}) => (
  <div className="flex flex-col gap-3 rounded-md bg-lightGray p-4 md:flex-row md:items-center md:justify-between">
    <div className="text-sm">
      <div className="flex items-center gap-2">
        Status <Badge label={status} />
      </div>
      {reviewedAt && (
        <div className="mt-1 text-xs text-text">Reviewed {formatDate(reviewedAt)}</div>
      )}
      {note && <div className="mt-1 text-xs text-text">Note: {note}</div>}
    </div>
    {canReview && (
      <div className="flex gap-2">
        {status !== "rejected" && (
          <button
            className="rounded-md border border-red-600 bg-white px-3 py-1.5 text-xs text-red-600"
            onClick={onReject}
          >
            Reject
          </button>
        )}
        {status !== "verified" && (
          <button
            className="rounded-md bg-green-600 px-3 py-1.5 text-xs text-white"
            onClick={onVerify}
          >
            Mark verified
          </button>
        )}
      </div>
    )}
  </div>
)

const RatingsPanel = ({
  reviews,
  loading,
  average,
}: {
  reviews: any[]
  loading: boolean
  average: number | null
}) => {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }))
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="md:w-[240px]">
        <div className="text-3xl font-semibold text-grey">
          <Stars rating={average} />
        </div>
        <div className="text-xs text-text">{reviews.length} reviews</div>
        <div className="mt-4 flex flex-col gap-1.5">
          {counts.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-2 text-xs">
              <span className="w-6">{star}★</span>
              <div className="h-1.5 flex-1 rounded-full bg-lightGray">
                <div
                  className="h-1.5 rounded-full bg-amber-500"
                  style={{
                    width: reviews.length ? `${(count / reviews.length) * 100}%` : 0,
                  }}
                />
              </div>
              <span className="w-6 text-right text-text">{count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        {loading ? (
          <div className="py-10 text-center text-sm text-text">Loading reviews…</div>
        ) : reviews.length === 0 ? (
          <div className="py-10 text-center text-sm text-text">No reviews yet.</div>
        ) : (
          reviews.map((r) => (
            <div key={r.reviewID} className="rounded-md border p-3">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-grey">{r.reviewerName}</span>
                <span className="text-text">{formatDate(r.datePosted)}</span>
              </div>
              <div className="mt-1 text-amber-500">
                {"★".repeat(r.rating)}
                <span className="text-softGray">{"★".repeat(5 - r.rating)}</span>
              </div>
              {r.review && <p className="mt-1 text-sm text-grey">{r.review}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const TripsTable = ({ trips, loading }: { trips: any[]; loading: boolean }) => (
  <table className="w-full min-w-[800px] text-left text-sm">
    <thead>
      <tr className="border-b text-xs text-text">
        {["Date", "Rider", "Pickup", "Drop-off", "Fare", "Paid", "Status"].map((h) => (
          <th key={h} className="py-3 pr-3 font-normal">{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {loading ? (
        <EmptyRow colSpan={7} text="Loading trip history…" />
      ) : trips.length === 0 ? (
        <EmptyRow colSpan={7} text="No trips yet." />
      ) : (
        trips.map((trip) => (
          <tr key={trip.tripID} className="border-b last:border-0">
            <td className="py-3 pr-3 whitespace-nowrap">
              {formatDate(trip.requestDateTime || trip.tripDate)}
            </td>
            <td className="py-3 pr-3">{trip.rider?.fullName || "—"}</td>
            <td className="max-w-[200px] py-3 pr-3">{trip.pickupLocation}</td>
            <td className="max-w-[200px] py-3 pr-3">{trip.dropoffLocation}</td>
            <td className="py-3 pr-3 whitespace-nowrap">{formatNaira(trip.totalPrice)}</td>
            <td className="py-3 pr-3">{trip.isPaymentCompleted ? "Yes" : "No"}</td>
            <td className="py-3 pr-3"><Badge label={trip.status} /></td>
          </tr>
        ))
      )}
    </tbody>
  </table>
)

const DriverManagementDetail = ({ userID }: { userID: string }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("documents")
  const { driver, trips, reviews, loadingDriver, loadingTrips, loadingReviews } =
    useAppSelector((state: any) => state.driverManagement)

  useDriverManagementFeedback()

  useEffect(() => {
    dispatch(resetDriverDetail())
    dispatch(fetchDriver(userID))
    dispatch(fetchDriverTrips(userID))
    dispatch(fetchDriverReviews(userID))
  }, [dispatch, userID])

  if (!driver || driver.userID !== userID) {
    return (
      <div className="py-20 text-center text-sm text-text">
        {loadingDriver ? "Loading driver…" : "Driver not found."}
      </div>
    )
  }

  if (driver.role !== "driver") {
    return (
      <div className="py-20 text-center text-sm text-text">
        This user is not a driver.{" "}
        <Link href={`/user-management/${userID}`} legacyBehavior>
          <a className="text-darkPurple">Open in User Management</a>
        </Link>
      </div>
    )
  }

  const p = driver.profile ?? {}
  const vehicle = p.vehicle
  const account = getAccountStatus(driver)
  const act = (action: DriverAction) => openDriverActionModal(dispatch, driver, action)
  const readyToApprove =
    p.licenceStatus === "verified" && vehicle?.verificationStatus === "verified"
  const completed = trips.filter((t: any) => t.status === "Completed").length
  const cancelled = trips.filter((t: any) => t.status === "Canceled").length

  const tabs: { key: Tab; label: string; badge?: string }[] = [
    { key: "documents", label: "Documents", badge: p.licenceStatus },
    { key: "vehicle", label: "Vehicle", badge: vehicle?.verificationStatus },
    { key: "ratings", label: `Ratings (${reviews.length})` },
    { key: "trips", label: `Trip History (${trips.length})` },
  ]

  return (
    <div className="flex flex-col gap-6">
      <button className="self-start text-sm text-darkPurple" onClick={() => router.back()}>
        ← Back to list
      </button>

      <div className="flex flex-col gap-6 rounded-[20px] bg-lightPurple p-6 text-white lg:flex-row lg:justify-between">
        <div className="flex gap-4">
          <Avatar src={driver.image || undefined} alt={driver.fullName}>
            {driver.fullName?.[0]}
          </Avatar>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-medium">{driver.fullName}</span>
              <Badge label={p.approvalStatus} />
              <Badge label={account} />
              <Badge label={p.isOnline ? "Online" : "Offline"} />
            </div>
            <div>{driver.email}</div>
            <div>{driver.phone || "No phone"}</div>
            <div className="text-textD">Joined {formatDate(driver.dateJoined)}</div>
            {p.approvalNote && (
              <div className="text-textD">Approval note: {p.approvalNote}</div>
            )}
            {p.isSuspended && (
              <div className="rounded-md bg-amber-500/20 p-2 text-amber-100">
                Suspended {formatDate(p.suspendedAt)}
                {p.suspendedUntil ? ` until ${formatDate(p.suspendedUntil)}` : " until lifted"}
                {p.suspensionReason ? ` — ${p.suspensionReason}` : ""}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-white md:grid-cols-4 lg:w-[480px]">
          {[
            ["Rating", <Stars key="r" rating={getRating(driver)} />],
            ["Completed trips", completed],
            ["Cancelled trips", cancelled],
            ["Wallet balance", formatNaira(driver.wallet?.withdrawableBalance)],
          ].map(([label, value]) => (
            <div key={label as string} className="rounded-md bg-faintWhite p-3">
              <div className="text-[10px] text-textD">{label}</div>
              <div className="text-sm font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl bg-white p-4">
          <div className="text-sm font-medium text-grey">Actions</div>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:flex-wrap">
            <div className="flex flex-col gap-2">
              <div className="text-[11px] uppercase tracking-wide text-text">Approval</div>
              <div className="flex gap-2">
                {p.approvalStatus !== "approved" && (
                  <button
                    className="rounded-md bg-green-600 px-3 py-1.5 text-xs text-white disabled:opacity-40"
                    disabled={!readyToApprove}
                    title={readyToApprove ? "" : "Verify the licence and vehicle first"}
                    onClick={() => act("approve")}
                  >
                    Approve
                  </button>
                )}
                {p.approvalStatus !== "rejected" && (
                  <button
                    className="rounded-md border border-red-600 px-3 py-1.5 text-xs text-red-600"
                    onClick={() => act("reject")}
                  >
                    {p.approvalStatus === "approved" ? "Revoke approval" : "Reject"}
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[11px] uppercase tracking-wide text-text">Suspension</div>
              {p.isSuspended ? (
                <button
                  className="rounded-md border border-green-600 px-3 py-1.5 text-xs text-green-700"
                  onClick={() => act("lift-suspension")}
                >
                  Lift suspension
                </button>
              ) : (
                <button
                  className="rounded-md border border-amber-500 px-3 py-1.5 text-xs text-amber-600"
                  onClick={() => act("suspend")}
                >
                  Suspend driver
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[11px] uppercase tracking-wide text-text">Account</div>
              {driver.isBlocked ? (
                <Link href={`/user-management/${userID}`} legacyBehavior>
                  <a className="text-xs text-darkPurple">Blocked — manage in User Management</a>
                </Link>
              ) : driver.isActive ? (
                <button
                  className="rounded-md border border-red-600 px-3 py-1.5 text-xs text-red-600"
                  onClick={() => act("deactivate")}
                >
                  Deactivate account
                </button>
              ) : (
                <button
                  className="rounded-md border border-green-600 px-3 py-1.5 text-xs text-green-700"
                  onClick={() => act("activate")}
                >
                  Activate account
                </button>
              )}
            </div>
          </div>
          {p.approvalStatus !== "approved" && !readyToApprove && (
            <p className="mt-3 text-xs text-text">
              Approval unlocks once the licence and vehicle are both verified.
            </p>
          )}
        </div>

        <div className="rounded-xl bg-white p-4">
          <div className="text-sm font-medium text-grey">Registration progress</div>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {onboardingSteps(driver).map((s) => (
              <li key={s.label} className="flex items-center gap-2">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white ${
                    s.done ? "bg-green-600" : "bg-softGray"
                  }`}
                >
                  {s.done ? "✓" : ""}
                </span>
                <span className={s.done ? "text-grey" : "text-text"}>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl bg-white p-4">
        <div className="flex gap-1 overflow-x-auto border-b">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2 text-sm ${
                tab === t.key
                  ? "border-darkPurple font-medium text-grey"
                  : "border-transparent text-text"
              }`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
              {t.badge && <Badge label={t.badge} />}
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto">
          {tab === "documents" && (
            <div className="flex flex-col gap-4">
              <Field label="Driver's licence number" value={p.driversLicenceNumber} />
              <div className="grid gap-4 md:grid-cols-2">
                <Photo label="Licence — front" src={p.driversLicenceFront} />
                <Photo label="Licence — back" src={p.driversLicenceBack} />
              </div>
              <ReviewPanel
                status={p.licenceStatus}
                note={p.licenceNote}
                reviewedAt={p.licenceReviewedAt}
                canReview={!!(p.driversLicenceFront && p.driversLicenceBack)}
                onVerify={() => act("verify-licence")}
                onReject={() => act("reject-licence")}
              />
            </div>
          )}

          {tab === "vehicle" &&
            (vehicle ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                  <Field label="Make" value={vehicle.manufacturer} />
                  <Field label="Model" value={vehicle.model} />
                  <Field label="Year" value={vehicle.year} />
                  <Field label="Colour" value={vehicle.color} />
                  <Field label="Plate number" value={vehicle.plate_number} />
                  <Field label="Ride class" value={<span className="capitalize">{vehicle.status}</span>} />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <Photo label="Plate number on car" src={vehicle.plate_number_on_car_photo} />
                  <Photo label="Exterior" src={vehicle.car_exterior_photo} />
                  <Photo label="Interior" src={vehicle.car_interior_photo} />
                </div>
                <ReviewPanel
                  status={vehicle.verificationStatus}
                  note={vehicle.verificationNote}
                  reviewedAt={vehicle.verificationReviewedAt}
                  canReview
                  onVerify={() => act("verify-vehicle")}
                  onReject={() => act("reject-vehicle")}
                />
              </div>
            ) : (
              <div className="py-10 text-center text-sm text-text">
                This driver has not added a vehicle yet.
              </div>
            ))}

          {tab === "ratings" && (
            <RatingsPanel reviews={reviews} loading={loadingReviews} average={getRating(driver)} />
          )}

          {tab === "trips" && <TripsTable trips={trips} loading={loadingTrips} />}
        </div>
      </div>
    </div>
  )
}

export default DriverManagementDetail
