import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CircleAlert,
  ShieldAlert,
  Clock3,
  MapPin,
} from "lucide-react";

import "./alerts.css";

type AlertStatus = "active" | "acknowledged" | "resolved";
type AlertSeverity = "critical" | "high" | "medium";

interface AlertItem {
  id: number;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  time: string;
  location: string;
}

type Filter = "all" | AlertStatus;

const initialAlerts: AlertItem[] = [
  {
    id: 1,
    title: "Canteen Overcrowding",
    description: "Canteen area exceeded 95% capacity.",
    severity: "critical",
    status: "active",
    time: "5m ago",
    location: "Canteen",
  },
  {
    id: 2,
    title: "Loading Dock Utilization",
    description: "Loading dock at 88% utilization.",
    severity: "high",
    status: "active",
    time: "12m ago",
    location: "Loading Dock",
  },
  {
    id: 3,
    title: "Forklift Safety Violation",
    description: "Personnel detected in forklift exclusion zone.",
    severity: "critical",
    status: "acknowledged",
    time: "8m ago",
    location: "Storage",
  },
  {
    id: 4,
    title: "Camera Feed Disconnected",
    description: "Camera 3 in Packaging Zone disconnected.",
    severity: "medium",
    status: "active",
    time: "25m ago",
    location: "Packaging",
  },
];

const Alerts = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    return {
      total: alerts.length,
      active: alerts.filter((alert) => alert.status === "active").length,
      acknowledged: alerts.filter(
        (alert) => alert.status === "acknowledged"
      ).length,
      resolved: alerts.filter((alert) => alert.status === "resolved").length,
      critical: alerts.filter(
        (alert) =>
          alert.severity === "critical" && alert.status !== "resolved"
      ).length,
    };
  }, [alerts]);

  const filteredAlerts = useMemo(() => {
    if (filter === "all") {
      return alerts;
    }

    return alerts.filter((alert) => alert.status === filter);
  }, [alerts, filter]);

  const updateAlertStatus = (
    id: number,
    status: AlertStatus
  ) => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status,
            }
          : alert
      )
    );
  };

  const filterItems = [
    {
      key: "all" as Filter,
      label: "All",
      count: counts.total,
    },
    {
      key: "active" as Filter,
      label: "Active",
      count: counts.active,
    },
    {
      key: "acknowledged" as Filter,
      label: "Acknowledged",
      count: counts.acknowledged,
    },
    {
      key: "resolved" as Filter,
      label: "Resolved",
      count: counts.resolved,
    },
  ];

  return (
    <div className="alerts-page">
      {/* PAGE HEADER */}

      <div className="alerts-page-header">
        <div>
          <div className="alerts-eyebrow">
            <ShieldAlert size={15} />
            <span>Warehouse Monitoring</span>
          </div>

          <h1>Alerts</h1>

          <p>
            Monitor safety, capacity, equipment and operational alerts
            across the warehouse.
          </p>
        </div>

        <div className="alerts-live-indicator">
          <span className="live-dot" />
          <span>Live Monitoring</span>
        </div>
      </div>

      {/* SUMMARY CARDS */}

      <section className="alert-summary-grid">
        <div className="alert-summary-card">
          <div className="summary-card-top">
            <span>Total Alerts</span>

            <div className="summary-icon neutral">
              <AlertTriangle size={18} />
            </div>
          </div>

          <strong>{counts.total}</strong>

          <p>Alerts in the monitoring system</p>
        </div>

        <div className="alert-summary-card">
          <div className="summary-card-top">
            <span>Active Alerts</span>

            <div className="summary-icon danger">
              <CircleAlert size={18} />
            </div>
          </div>

          <strong className="danger-text">
            {counts.active}
          </strong>

          <p>Require attention</p>
        </div>

        <div className="alert-summary-card">
          <div className="summary-card-top">
            <span>Critical</span>

            <div className="summary-icon critical">
              <ShieldAlert size={18} />
            </div>
          </div>

          <strong className="danger-text">
            {counts.critical}
          </strong>

          <p>High-priority safety or operational issues</p>
        </div>

        <div className="alert-summary-card">
          <div className="summary-card-top">
            <span>Acknowledged</span>

            <div className="summary-icon warning">
              <CheckCircle2 size={18} />
            </div>
          </div>

          <strong className="warning-text">
            {counts.acknowledged}
          </strong>

          <p>Being reviewed by the operations team</p>
        </div>
      </section>

      {/* FILTERS */}

      <section className="alerts-section filters-section">
        <div className="section-heading-row">
          <div>
            <h2>Filters</h2>

            <p>
              Filter alerts by their current status.
            </p>
          </div>

          <span className="showing-count">
            Showing {filteredAlerts.length} of {alerts.length}
          </span>
        </div>

        <div className="alert-filter-buttons">
          {filterItems.map((item) => (
            <button
              key={item.key}
              className={
                filter === item.key
                  ? "alert-filter active"
                  : "alert-filter"
              }
              onClick={() => setFilter(item.key)}
            >
              <span>{item.label}</span>
              <small>{item.count}</small>
            </button>
          ))}
        </div>
      </section>

      {/* ALERT DETAILS */}

      <section className="alerts-section alert-details-section">
        <div className="section-heading">
          <h2>
            Alert Details
            <span>{filteredAlerts.length}</span>
          </h2>

          <p>
            Review and manage alerts detected by the warehouse
            monitoring system.
          </p>
        </div>

        <div className="alert-list">
          {filteredAlerts.length === 0 ? (
            <div className="no-alerts">
              <CheckCircle2 size={32} />

              <h3>No alerts found</h3>

              <p>
                There are no alerts matching the selected filter.
              </p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <article
                key={alert.id}
                className={`alert-item ${alert.severity}`}
              >
                <div className="alert-item-content">
                  <div className="alert-title-row">
                    <h3>{alert.title}</h3>

                    <span
                      className={`severity-tag ${alert.severity}`}
                    >
                      {alert.severity}
                    </span>

                    <span
                      className={`status-tag ${alert.status}`}
                    >
                      {alert.status}
                    </span>
                  </div>

                  <p className="alert-description">
                    {alert.description}
                  </p>

                  <div className="alert-meta">
                    <span>
                      <Clock3 size={13} />
                      {alert.time}
                    </span>

                    <span>
                      <MapPin size={13} />
                      {alert.location}
                    </span>
                  </div>
                </div>

                <div className="alert-actions">
                  {alert.status === "active" && (
                    <button
                      className="acknowledge-btn"
                      onClick={() =>
                        updateAlertStatus(
                          alert.id,
                          "acknowledged"
                        )
                      }
                    >
                      Acknowledge
                    </button>
                  )}

                  {alert.status !== "resolved" && (
                    <button
                      className="resolve-btn"
                      onClick={() =>
                        updateAlertStatus(
                          alert.id,
                          "resolved"
                        )
                      }
                    >
                      Resolve
                    </button>
                  )}

                  {alert.status === "resolved" && (
                    <span className="resolved-label">
                      <CheckCircle2 size={15} />
                      Resolved
                    </span>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* ALERT CONFIGURATION */}

      <section className="alerts-section configuration-section">
        <div className="section-heading">
          <h2>Alert Configuration</h2>

          <p>
            Current thresholds and monitoring rules used by the
            warehouse system.
          </p>
        </div>

        <div className="configuration-grid">
          <div className="configuration-card">
            <div className="configuration-icon">
              <CircleAlert size={18} />
            </div>

            <div>
              <h3>Capacity Thresholds</h3>

              <p>
                <span>Critical:</span> &gt; 90%
              </p>

              <p>
                <span>High:</span> &gt; 70%
              </p>

              <p>
                <span>Low:</span> &lt; 40%
              </p>
            </div>
          </div>

          <div className="configuration-card">
            <div className="configuration-icon">
              <ShieldAlert size={18} />
            </div>

            <div>
              <h3>Safety Zones</h3>

              <p>Forklift exclusion</p>

              <p>Emergency exits</p>
            </div>
          </div>

          <div className="configuration-card">
            <div className="configuration-icon">
              <AlertTriangle size={18} />
            </div>

            <div>
              <h3>Environmental</h3>

              <p>Temp: 18–25°C</p>

              <p>Humidity: 40–60%</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Alerts;