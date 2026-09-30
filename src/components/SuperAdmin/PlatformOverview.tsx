import Link from "next/link"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import { fetchOverview } from "src/redux/store/features/super-admin-slice"
import { formatNaira } from "src/components/UserManagement/helpers"
import { PageHeader, useSuperAdminFeedback } from "./shared"

const n = (value?: number | null) => (value ?? 0).toLocaleString()

const Tile = ({
  label,
  value,
  hint,
  href,
  attention,
}: {
  label: string
  value: string
  hint?: string
  href?: string
  // flags a number that needs someone to act; shown as a labelled dot, not colour alone
  attention?: boolean
}) => {
  const body = (
    <div className="h-full rounded-xl bg-white p-4">
      <div className="flex items-center justify-between text-xs text-text">
        {label}
        {attention && (
          <span className="flex items-center gap-1 text-[10px] text-amber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Needs action
          </span>
        )}
      </div>
      <div className="mt-1 text-2xl font-semibold text-grey">{value}</div>
      {hint && <div className="mt-1 text-[11px] text-text">{hint}</div>}
    </div>
  )
  return href ? (
    <Link href={href} legacyBehavior>
      <a className="block transition hover:shadow-md">{body}</a>
    </Link>
  ) : (
    body
  )
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-3">
    <h2 className="text-sm font-medium text-grey">{title}</h2>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
  </section>
)

// single series → one hue, direct value labels, no legend
const StatusBars = ({ data }: { data: Record<string, number> }) => {
  const rows = Object.entries(data ?? {}).sort((a, b) => b[1] - a[1])
  const max = Math.max(1, ...rows.map(([, v]) => v))
  const total = rows.reduce((s, [, v]) => s + v, 0)
  if (!rows.length) {
    return <div className="py-6 text-center text-sm text-text">No trips yet.</div>
  }
  return (
    <div className="flex flex-col gap-2">
      {rows.map(([status, count]) => (
        <div
          key={status}
          className="group grid grid-cols-[90px_1fr_80px] items-center gap-3 text-xs"
          title={`${status}: ${count.toLocaleString()} trips (${((count / total) * 100).toFixed(1)}%)`}
        >
          <span className="text-grey">{status}</span>
          <div className="h-3">
            <div
              className="h-3 rounded-r bg-darkPurple group-hover:opacity-80"
              style={{ width: `${(count / max) * 100}%`, minWidth: count ? 4 : 0 }}
            />
          </div>
          <span className="text-right text-text">
            {count.toLocaleString()} · {((count / total) * 100).toFixed(0)}%
          </span>
        </div>
      ))}
    </div>
  )
}

const PlatformOverview = () => {
  const dispatch = useAppDispatch()
  const { overview: o, loadingOverview } = useAppSelector((state: any) => state.superAdmin)

  useSuperAdminFeedback()

  useEffect(() => {
    dispatch(fetchOverview())
  }, [dispatch])

  if (!o) {
    return (
      <div className="py-20 text-center text-sm text-text">
        {loadingOverview ? "Loading platform overview…" : "Overview unavailable."}
      </div>
    )
  }

  const byApp = o.money?.transactionsByApplication ?? {}

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between">
        <PageHeader
          title="Platform Overview"
          subtitle="Live totals across Cue, Cue Driver and Flip."
        />
        <button
          className="rounded-md border border-softGray bg-white px-3 py-1.5 text-xs disabled:opacity-50"
          disabled={loadingOverview}
          onClick={() => dispatch(fetchOverview())}
        >
          {loadingOverview ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      <Section title="People">
        <Tile
          label="Customers"
          value={n(o.users?.total)}
          hint={`${n(o.users?.newToday)} joined today`}
          href="/user-management/all"
        />
        <Tile label="Riders" value={n(o.users?.byRole?.rider)} href="/user-management/riders" />
        <Tile label="Drivers" value={n(o.users?.byRole?.driver)} href="/driver-management/drivers" />
        <Tile
          label="Blocked / deactivated"
          value={`${n(o.users?.blocked)} / ${n(o.users?.inactive)}`}
          href="/user-management/all"
        />
      </Section>

      <Section title="Cue operations">
        <Tile
          label="Trips today"
          value={n(o.trips?.today)}
          hint={`${n(o.trips?.active)} in progress now`}
          href="/cue/trips"
        />
        <Tile label="Drivers online" value={n(o.drivers?.online)} href="/cue/tracking" />
        <Tile
          label="Drivers awaiting approval"
          value={n(o.drivers?.pendingApproval)}
          hint={`${n(o.drivers?.suspended)} suspended`}
          href="/driver-management/registrations"
          attention={(o.drivers?.pendingApproval ?? 0) > 0}
        />
        <Tile
          label="Open SOS alerts"
          value={n(o.sos?.open)}
          hint={`${n(o.sos?.total)} all time`}
          href="/cue/SOS"
          attention={(o.sos?.open ?? 0) > 0}
        />
      </Section>

      <Section title="Money">
        <Tile
          label="Transaction volume"
          value={formatNaira(o.money?.transactionVolume)}
          hint={`${formatNaira(o.money?.transactionVolumeToday)} today`}
          href="/dashboard/transactions"
        />
        <Tile
          label="Completed trip value"
          value={formatNaira(o.trips?.completedValue)}
        />
        <Tile
          label="Pending withdrawals"
          value={n(o.money?.pendingWithdrawals)}
          hint={formatNaira(o.money?.pendingWithdrawalAmount)}
          href="/dashboard/withdrawal"
          attention={(o.money?.pendingWithdrawals ?? 0) > 0}
        />
        <Tile label="Held in user wallets" value={formatNaira(o.money?.walletBalances)} />
      </Section>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-4">
          <div className="mb-3 text-sm font-medium text-grey">
            Trips by status{" "}
            <span className="font-normal text-text">· {n(o.trips?.total)} total</span>
          </div>
          <StatusBars data={o.trips?.byStatus} />
        </div>
        <div className="rounded-xl bg-white p-4">
          <div className="mb-3 text-sm font-medium text-grey">Volume by application</div>
          <table className="w-full text-left text-sm">
            <tbody>
              {Object.keys(byApp).length === 0 ? (
                <tr>
                  <td className="py-6 text-center text-text">No transactions yet.</td>
                </tr>
              ) : (
                Object.entries(byApp).map(([app, total]) => (
                  <tr key={app} className="border-b last:border-0">
                    <td className="py-2 capitalize text-grey">{app || "Unknown"}</td>
                    <td className="py-2 text-right text-text">{formatNaira(total as number)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Tile
              label="Flip orders"
              value={n(o.flip?.orders)}
              hint={`${n(o.flip?.pendingOrders)} pending`}
              href="/flip/orders"
            />
            <Tile
              label="Admin actions today"
              value={n(o.admins?.actionsToday)}
              hint={`${n(o.admins?.total)} admins`}
              href="/super-admin/activity"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlatformOverview
