
import {
  Activity,
  AlertTriangle,
  Bell,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock3,
  LayoutDashboard,
  Menu,
  RefreshCw,
  Route,
  Settings,
  ShieldAlert,
  X,
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import { useState } from "react";
import { useDashboardData } from "./services/useDashboardData";
import "./App.css";

const numberFormat = new Intl.NumberFormat("en-IN");

function formatNumber(value: number) {
  return numberFormat.format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function App() {
  const { overview, trends, facilities, routing, alerts, loading, error, refresh } =
    useDashboardData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [facilitySearch, setFacilitySearch] = useState("");

  const filteredFacilities = facilities.filter((facility) =>
    `${facility.facility_name} ${facility.facility_code} ${facility.city}`
      .toLowerCase()
      .includes(facilitySearch.toLowerCase())
  );

  const highAlerts = alerts.filter(
    (alert) => alert.severity.toUpperCase() === "HIGH"
  ).length;

  const metrics = overview
    ? [
        {
          title: "Total Consultations",
          value: formatNumber(overview.total_consultations),
          subtitle: "Across all facilities",
          icon: Activity,
          color: "blue",
        },
        {
          title: "Completion Rate",
          value: formatPercent(overview.completion_rate_pct),
          subtitle: `${formatNumber(overview.completed_consultations)} completed`,
          icon: CheckCircle2,
          color: "green",
        },
        {
          title: "Escalation Rate",
          value: formatPercent(overview.escalation_rate_pct),
          subtitle: `${formatNumber(overview.escalated_consultations)} escalated`,
          icon: ShieldAlert,
          color: "orange",
        },
        {
          title: "Pending Consultations",
          value: formatNumber(overview.pending_consultations),
          subtitle: "Awaiting resolution",
          icon: Clock3,
          color: "purple",
        },
        {
          title: "Active Facilities",
          value: formatNumber(overview.active_facilities),
          subtitle: `${formatNumber(overview.active_providers)} active providers`,
          icon: Building2,
          color: "teal",
        },
      ]
    : [];

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          className="mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <Activity size={23} />
          </div>
          <div>
            <h1>VitalCare</h1>
            <p>ADMIN ANALYTICS</p>
          </div>
          <button
            className="icon-button sidebar-close"
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={19} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>
        <nav className="navigation">
          <a className="nav-item nav-active" href="#overview">
            <LayoutDashboard size={19} />
            <span>Overview</span>
          </a>
          <a className="nav-item" href="#facilities">
            <Building2 size={19} />
            <span>Facilities</span>
          </a>
          <a className="nav-item" href="#routing">
            <Route size={19} />
            <span>Routing Analytics</span>
          </a>
          <a className="nav-item" href="#alerts">
            <ShieldAlert size={19} />
            <span>Operational Alerts</span>
            {highAlerts > 0 && <span className="nav-count">{highAlerts}</span>}
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <div className="help-icon">
              <Activity size={20} />
            </div>
            <strong>Healthcare operations</strong>
            <p>Monitor consultation performance across your network.</p>
          </div>
          <a className="nav-item" href="#settings">
            <Settings size={19} />
            <span>Settings</span>
          </a>
          <div className="profile">
            <div className="avatar">VC</div>
            <div className="profile-info">
              <strong>VitalCare Admin</strong>
              <span>Administrator</span>
            </div>
            <ChevronDown size={17} />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button menu-button"
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={21} />
            </button>
            <div>
              <div className="breadcrumb">Workspace / Analytics</div>
              <h2>Admin Dashboard</h2>
            </div>
          </div>
          <div className="topbar-actions">
            <span className="live-indicator">
              <span className="live-dot" />
              Live data
            </span>
            <button
              className="icon-button refresh-button"
              aria-label="Refresh dashboard"
              title="Refresh dashboard"
              onClick={() => void refresh()}
              disabled={loading}
            >
              <RefreshCw size={18} className={loading ? "spin" : ""} />
            </button>
            <button className="icon-button notification-button" aria-label="Alerts">
              <Bell size={19} />
              {highAlerts > 0 && <span className="notification-dot" />}
            </button>
            <div className="topbar-avatar">VC</div>
          </div>
        </header>

        <div className="page-content" id="overview">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">OPERATIONS OVERVIEW</p>
              <h2>Good day, Administrator</h2>
              <p className="welcome-description">
                Here's what's happening across your healthcare network.
              </p>
            </div>
            <div className="date-chip">
              <Clock3 size={16} />
              Updated when refreshed
            </div>
          </section>

          {error && (
            <div className="error-banner" role="alert">
              <AlertTriangle size={19} />
              <span>{error}</span>
              <button onClick={() => void refresh()}>Retry</button>
            </div>
          )}

          {loading && !overview ? (
            <div className="loading-panel">
              <RefreshCw className="spin" size={24} />
              <p>Loading your healthcare analytics...</p>
            </div>
          ) : (
            <>
              <section className="metrics-grid" aria-label="Overview metrics">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <article className="metric-card" key={metric.title}>
                      <div className="metric-top">
                        <span className="metric-title">{metric.title}</span>
                        <span className={`metric-icon icon-${metric.color}`}>
                          <Icon size={20} />
                        </span>
                      </div>
                      <div className="metric-value">{metric.value}</div>
                      <div className="metric-subtitle">{metric.subtitle}</div>
                    </article>
                  );
                })}
              </section>

              <section className="charts-grid">
                <article className="panel trends-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Consultation Trends</h3>
                      <p>Daily consultation volume and completed cases</p>
                    </div>
                    <span className="panel-badge">Last 29 days</span>
                  </div>
                  {trends.length === 0 ? (
                    <div className="empty-chart">No consultation trend data available.</div>
                  ) : (
                    <div className="chart-area">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={trends}
                          margin={{ top: 12, right: 12, left: -12, bottom: 0 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#e9edf3"
                          />
                          <XAxis
                            dataKey="consultation_date"
                            tickFormatter={formatDate}
                            tick={{ fill: "#8792a5", fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                            minTickGap={22}
                          />
                          <YAxis
                            tick={{ fill: "#8792a5", fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip
                            labelFormatter={(value) => formatDate(String(value))}
                            formatter={(value, name) => [
                              formatNumber(Number(value)),
                              name,
                            ]}
                            contentStyle={{
                              border: "1px solid #e6eaf0",
                              borderRadius: 12,
                            }}
                          />
                          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                          <Line
                            type="monotone"
                            dataKey="total_consultations"
                            name="Total consultations"
                            stroke="#3978ed"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 5 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="completed_consultations"
                            name="Completed"
                            stroke="#20a779"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 5 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </article>

                <article className="panel routing-panel" id="routing">
                  <div className="panel-heading">
                    <div>
                      <h3>Routing Performance</h3>
                      <p>Acceptance rate by routing tier</p>
                    </div>
                    <Route size={19} className="heading-icon" />
                  </div>
                  {routing.length === 0 ? (
                    <div className="empty-chart">No routing data available.</div>
                  ) : (
                    <div className="routing-chart">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={routing}
                          layout="vertical"
                          margin={{ top: 8, right: 20, left: 8, bottom: 8 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={false}
                            stroke="#e9edf3"
                          />
                          <XAxis
                            type="number"
                            domain={[0, 100]}
                            unit="%"
                            tick={{ fill: "#8792a5", fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            type="category"
                            dataKey="routing_tier"
                            width={83}
                            tick={{ fill: "#5c6678", fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip
                            formatter={(value) => [
                              `${Number(value).toFixed(2)}%`,
                              "Acceptance rate",
                            ]}
                          />
                          <Bar
                            dataKey="acceptance_rate_pct"
                            name="Acceptance rate"
                            fill="#3978ed"
                            radius={[0, 5, 5, 0]}
                            barSize={22}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                  <div className="routing-summary">
                    <div>
                      <span>Primary response time</span>
                      <strong>
                        {overview
                          ? `${overview.avg_primary_response_seconds.toFixed(2)} sec`
                          : "—"}
                      </strong>
                    </div>
                    <div>
                      <span>Routing tiers</span>
                      <strong>{routing.length}</strong>
                    </div>
                  </div>
                </article>
              </section>

              <section className="lower-grid">
                <article className="panel facility-panel" id="facilities">
                  <div className="panel-heading facility-heading">
                    <div>
                      <h3>Facility Performance</h3>
                      <p>Consultation outcomes across your facilities</p>
                    </div>
                    <label className="search-box">
                      <span className="visually-hidden">Search facilities</span>
                      <input
                        value={facilitySearch}
                        onChange={(event) => setFacilitySearch(event.target.value)}
                        placeholder="Search facilities..."
                      />
                    </label>
                  </div>

                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Facility</th>
                          <th>Consultations</th>
                          <th>Completion</th>
                          <th>Escalation</th>
                          <th>Pending</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFacilities.map((facility) => (
                          <tr key={facility.facility_id}>
                            <td>
                              <div className="facility-name">
                                <span className="facility-avatar">
                                  <Building2 size={16} />
                                </span>
                                <div>
                                  <strong>{facility.facility_name}</strong>
                                  <span>
                                    {facility.city} · {facility.facility_code}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>{formatNumber(facility.total_consultations)}</td>
                            <td>
                              <div className="rate-cell">
                                <span>{formatPercent(facility.completion_rate_pct)}</span>
                                <div className="progress-track">
                                  <div
                                    className="progress-fill progress-green"
                                    style={{
                                      width: `${Math.min(
                                        100,
                                        Math.max(0, facility.completion_rate_pct)
                                      )}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td>
                              <span
                                className={`rate-pill ${
                                  facility.escalation_rate_pct >= 20
                                    ? "rate-danger"
                                    : facility.escalation_rate_pct >= 15
                                      ? "rate-warning"
                                      : "rate-good"
                                }`}
                              >
                                {formatPercent(facility.escalation_rate_pct)}
                              </span>
                            </td>
                            <td>{formatNumber(facility.pending_consultations)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredFacilities.length === 0 && (
                      <p className="empty-table">No matching facilities found.</p>
                    )}
                  </div>
                  <div className="panel-footer">
                    Showing {filteredFacilities.length} of {facilities.length} facilities
                  </div>
                </article>

                <article className="panel alerts-panel" id="alerts">
                  <div className="panel-heading">
                    <div>
                      <h3>Operational Alerts</h3>
                      <p>Issues requiring attention</p>
                    </div>
                    <span className="alert-total">{alerts.length}</span>
                  </div>

                  <div className="alert-summary">
                    <div className="alert-summary-icon">
                      <AlertTriangle size={18} />
                    </div>
                    <div>
                      <strong>{highAlerts} high-severity alerts</strong>
                      <span>Review the latest operational records</span>
                    </div>
                  </div>

                  <div className="alert-list">
                    {alerts.slice(0, 8).map((alert, index) => (
                      <div
                        className="alert-item"
                        key={`${alert.reference_id}-${index}`}
                      >
                        <div
                          className={`alert-marker ${
                            alert.severity.toUpperCase() === "HIGH"
                              ? "marker-high"
                              : "marker-medium"
                          }`}
                        >
                          {alert.severity.toUpperCase() === "HIGH" ? (
                            <AlertTriangle size={16} />
                          ) : (
                            <Bell size={16} />
                          )}
                        </div>
                        <div className="alert-copy">
                          <div className="alert-item-top">
                            <strong>{alert.alert_type.replaceAll("_", " ")}</strong>
                            <span
                              className={`severity severity-${alert.severity.toLowerCase()}`}
                            >
                              {alert.severity}
                            </span>
                          </div>
                          <p>{alert.alert_message}</p>
                          <span className="alert-location">
                            {alert.facility_name} · {alert.facility_code}
                          </span>
                          <span className="alert-time">
                            {alert.age_minutes != null
                              ? `${Math.round(alert.age_minutes).toLocaleString("en-IN")} min old`
                              : new Date(alert.occurred_at).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    ))}
                    {alerts.length === 0 && (
                      <div className="empty-alerts">
                        <CheckCircle2 size={24} />
                        <p>No operational alerts returned.</p>
                      </div>
                    )}
                  </div>
                  <div className="panel-footer">
                    Showing {Math.min(alerts.length, 8)} of {alerts.length} alerts
                  </div>
                </article>
              </section>

              <footer className="page-footer">
                <span>VitalCare Admin Analytics</span>
                <span>
                  <span className="footer-dot" /> Connected to Lakebase
                </span>
              </footer>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
