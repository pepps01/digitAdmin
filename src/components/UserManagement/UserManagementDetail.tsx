import { Avatar } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import {
  Complaint,
  fetchManagedUser,
  fetchUserComplaints,
  fetchUserHistory,
  fetchUserTransactions,
  resetUserDetail,
} from "src/redux/store/features/user-management-slice"
import {
  actionButtonStyles,
  availableActions,
  openUserActionModal,
} from "./ConfirmUserAction"
import {
  Badge,
  EmptyRow,
  formatDate,
  formatNaira,
  getUserStatus,
  useUserManagementFeedback,
} from "./helpers"

type Tab = "history" | "complaints" | "transactions"

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="py-3 pr-3 font-normal">{children}</th>
)

const Stat = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="rounded-md bg-faintWhite p-3">
    <div className="text-[10px] text-textD">{label}</div>
    <div className="text-sm font-semibold">{value}</div>
  </div>
)

const HistoryTable = ({
  trips,
  loading,
  role,
}: {
  trips: any[]
  loading: boolean
  role: string
}) => (
  <table className="w-full min-w-[800px] text-left text-sm">
    <thead>
      <tr className="border-b text-xs text-text">
        <Th>Date</Th>
        <Th>{role === "rider" ? "Driver" : "Rider"}</Th>
        <Th>Pickup</Th>
        <Th>Drop-off</Th>
        <Th>Fare</Th>
        <Th>Paid</Th>
        <Th>Status</Th>
      </tr>
    </thead>
    <tbody>
      {loading ? (
        <EmptyRow colSpan={7} text="Loading trip history…" />
      ) : trips.length === 0 ? (
        <EmptyRow colSpan={7} text="No trips yet." />
      ) : (
        trips.map((trip) => {
          const other = role === "rider" ? trip.driver : trip.rider
          return (
            <tr key={trip.tripID} className="border-b last:border-0">
              <td className="py-3 pr-3 whitespace-nowrap">
                {formatDate(trip.requestDateTime || trip.tripDate)}
              </td>
              <td className="py-3 pr-3">{other?.fullName || "—"}</td>
              <td className="max-w-[200px] py-3 pr-3">{trip.pickupLocation}</td>
              <td className="max-w-[200px] py-3 pr-3">
                {trip.dropoffLocation}
              </td>
              <td className="py-3 pr-3 whitespace-nowrap">
                {formatNaira(trip.totalPrice)}
              </td>
              <td className="py-3 pr-3">
                {trip.isPaymentCompleted ? "Yes" : "No"}
              </td>
              <td className="py-3 pr-3">
                <Badge label={trip.status} />
              </td>
            </tr>
          )
        })
      )}
    </tbody>
  </table>
)

const ComplaintsTable = ({
  complaints,
  loading,
}: {
  complaints: Complaint[]
  loading: boolean
}) => (
  <table className="w-full min-w-[800px] text-left text-sm">
    <thead>
      <tr className="border-b text-xs text-text">
        <Th>Date</Th>
        <Th>Type</Th>
        <Th>Reported by</Th>
        <Th>Details</Th>
        <Th>Status</Th>
      </tr>
    </thead>
    <tbody>
      {loading ? (
        <EmptyRow colSpan={5} text="Loading complaints…" />
      ) : complaints.length === 0 ? (
        <EmptyRow colSpan={5} text="No complaints against this user." />
      ) : (
        complaints.map((c) => (
          <tr key={c.complaintID} className="border-b last:border-0">
            <td className="py-3 pr-3 whitespace-nowrap">{formatDate(c.date)}</td>
            <td className="py-3 pr-3">
              <div className="font-medium text-grey">{c.category}</div>
              <div className="text-xs text-text">
                {c.type === "sos" ? "SOS alert" : `${c.rating}★ review`}
              </div>
            </td>
            <td className="py-3 pr-3">{c.reportedBy || "—"}</td>
            <td className="max-w-[320px] py-3 pr-3">{c.message || "—"}</td>
            <td className="py-3 pr-3">
              {c.status ? <Badge label={c.status} /> : "—"}
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
)

const TransactionsTable = ({
  transactions,
  loading,
}: {
  transactions: any[]
  loading: boolean
}) => (
  <table className="w-full min-w-[800px] text-left text-sm">
    <thead>
      <tr className="border-b text-xs text-text">
        <Th>Date</Th>
        <Th>Reference</Th>
        <Th>Purpose</Th>
        <Th>Method</Th>
        <Th>Amount</Th>
        <Th>Status</Th>
      </tr>
    </thead>
    <tbody>
      {loading ? (
        <EmptyRow colSpan={6} text="Loading transactions…" />
      ) : transactions.length === 0 ? (
        <EmptyRow colSpan={6} text="No transactions yet." />
      ) : (
        transactions.map((t) => (
          <tr key={t.transID} className="border-b last:border-0">
            <td className="py-3 pr-3 whitespace-nowrap">
              {formatDate(t.transDate)}
            </td>
            <td className="py-3 pr-3 font-mono text-xs">
              {t.paymentReference || t.serial || "—"}
            </td>
            <td className="py-3 pr-3">{t.purpose || "—"}</td>
            <td className="py-3 pr-3 capitalize">{t.paymentMethod || "—"}</td>
            <td className="py-3 pr-3 whitespace-nowrap">
              {formatNaira(t.amount)}
            </td>
            <td className="py-3 pr-3">
              <Badge label={t.status} />
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
)

const UserManagementDetail = ({ userID }: { userID: string }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("history")
  const {
    user,
    history,
    complaints,
    transactions,
    loadingUser,
    loadingHistory,
    loadingComplaints,
    loadingTransactions,
  } = useAppSelector((state: any) => state.userManagement)

  useUserManagementFeedback()

  useEffect(() => {
    dispatch(resetUserDetail())
    dispatch(fetchManagedUser(userID))
    dispatch(fetchUserComplaints(userID))
    dispatch(fetchUserTransactions(userID))
  }, [dispatch, userID])

  // trip history endpoint depends on the role, so wait for the user
  const role = user?.userID === userID ? user.role : null
  useEffect(() => {
    if (role === "rider" || role === "driver") {
      dispatch(fetchUserHistory({ id: userID, role }))
    }
  }, [dispatch, userID, role])

  if (!user || user.userID !== userID) {
    return (
      <div className="py-20 text-center text-sm text-text">
        {loadingUser ? "Loading user…" : "User not found."}
      </div>
    )
  }

  const status = getUserStatus(user)
  const completed = history.filter((t: any) => t.status === "Completed").length
  const cancelled = history.filter((t: any) => t.status === "Canceled").length
  const rating =
    role === "driver"
      ? user.profile?.avgRating
      : user.profile?.reviews?.length
      ? user.profile.reviews.reduce((s: number, r: any) => s + r.rating, 0) /
        user.profile.reviews.length
      : null

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "history", label: "Trip History", count: history.length },
    { key: "complaints", label: "Complaints", count: complaints.length },
    { key: "transactions", label: "Transactions", count: transactions.length },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <button
          className="text-sm text-darkPurple"
          onClick={() => router.back()}
        >
          ← Back to list
        </button>
        <div className="flex gap-2">
          {availableActions(user).map((action) => (
            <button
              key={action}
              className={`rounded-md border bg-white px-4 py-2 text-sm capitalize ${actionButtonStyles[action]}`}
              onClick={() => openUserActionModal(dispatch, user, action)}
            >
              {action} {role}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-[20px] bg-lightPurple p-6 text-white md:flex-row md:justify-between">
        <div className="flex gap-4">
          <Avatar src={user.image || undefined} alt={user.fullName}>
            {user.fullName?.[0]}
          </Avatar>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium">{user.fullName}</span>
              <Badge label={status} />
            </div>
            <div className="capitalize text-textD">{user.role}</div>
            <div>{user.email}</div>
            <div>{user.phone || "No phone"}</div>
            <div className="text-textD">
              Joined {formatDate(user.dateJoined)}
            </div>
            {user.isBlocked && (
              <div className="mt-1 rounded-md bg-red-500/20 p-2 text-red-100">
                Blocked {formatDate(user.blockedAt)}
                {user.blockReason ? ` — ${user.blockReason}` : ""}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:w-[360px]">
          <Stat label="Total trips" value={history.length} />
          <Stat label="Completed / Cancelled" value={`${completed} / ${cancelled}`} />
          <Stat label="Complaints" value={complaints.length} />
          <Stat
            label="Rating"
            value={rating ? `${Number(rating).toFixed(1)} ★` : "—"}
          />
          <Stat
            label="Wallet balance"
            value={formatNaira(user.wallet?.withdrawableBalance)}
          />
          <Stat
            label="Escrow balance"
            value={formatNaira(user.wallet?.escrowBalance)}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-4">
        <div className="flex gap-1 border-b">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`-mb-px border-b-2 px-4 py-2 text-sm ${
                tab === t.key
                  ? "border-darkPurple font-medium text-grey"
                  : "border-transparent text-text"
              }`}
              onClick={() => setTab(t.key)}
            >
              {t.label}{" "}
              <span className="ml-1 rounded-full bg-lightGray px-2 text-[11px]">
                {t.count}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-2 overflow-x-auto">
          {tab === "history" && (
            <HistoryTable
              trips={history}
              loading={loadingHistory}
              role={role}
            />
          )}
          {tab === "complaints" && (
            <ComplaintsTable
              complaints={complaints}
              loading={loadingComplaints}
            />
          )}
          {tab === "transactions" && (
            <TransactionsTable
              transactions={transactions}
              loading={loadingTransactions}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default UserManagementDetail
