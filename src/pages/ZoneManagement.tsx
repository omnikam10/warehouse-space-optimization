import { useMemo, useState } from "react";
import "./zone-management.css";

type ZoneStatus =
  | "Optimal"
  | "Near Capacity"
  | "Underutilized"
  | "Blocked";

type Zone = {
  id: string;
  name: string;
  aisle: string;
  level: string;
  status: ZoneStatus;
  utilization: number;
  capacity: number;
  occupied: number;
  pallets: number;
  emptySlots: number;
  issues: number;
  temperature: string;
  lastUpdated: string;
};

const ZONES: Zone[] = [
  {
    id: "Z-01",
    name: "Zone A1",
    aisle: "Aisle 7A",
    level: "Level 1",
    status: "Optimal",
    utilization: 78,
    capacity: 120,
    occupied: 94,
    pallets: 47,
    emptySlots: 26,
    issues: 0,
    temperature: "22°C",
    lastUpdated: "2 min ago",
  },
  {
    id: "Z-02",
    name: "Zone A2",
    aisle: "Aisle 7A",
    level: "Level 2",
    status: "Near Capacity",
    utilization: 91,
    capacity: 110,
    occupied: 100,
    pallets: 50,
    emptySlots: 10,
    issues: 2,
    temperature: "23°C",
    lastUpdated: "1 min ago",
  },
  {
    id: "Z-03",
    name: "Zone B1",
    aisle: "Aisle 7B",
    level: "Level 1",
    status: "Optimal",
    utilization: 68,
    capacity: 140,
    occupied: 95,
    pallets: 42,
    emptySlots: 45,
    issues: 0,
    temperature: "21°C",
    lastUpdated: "3 min ago",
  },
  {
    id: "Z-04",
    name: "Zone B2",
    aisle: "Aisle 7B",
    level: "Level 2",
    status: "Underutilized",
    utilization: 42,
    capacity: 130,
    occupied: 55,
    pallets: 27,
    emptySlots: 75,
    issues: 1,
    temperature: "21°C",
    lastUpdated: "4 min ago",
  },
  {
    id: "Z-05",
    name: "Zone C1",
    aisle: "Aisle 7C",
    level: "Level 1",
    status: "Near Capacity",
    utilization: 87,
    capacity: 100,
    occupied: 87,
    pallets: 43,
    emptySlots: 13,
    issues: 1,
    temperature: "24°C",
    lastUpdated: "2 min ago",
  },
  {
    id: "Z-06",
    name: "Zone C2",
    aisle: "Aisle 7C",
    level: "Level 2",
    status: "Optimal",
    utilization: 72,
    capacity: 125,
    occupied: 90,
    pallets: 45,
    emptySlots: 35,
    issues: 0,
    temperature: "22°C",
    lastUpdated: "5 min ago",
  },
  {
    id: "Z-07",
    name: "Zone D1",
    aisle: "Aisle 8A",
    level: "Level 1",
    status: "Blocked",
    utilization: 64,
    capacity: 115,
    occupied: 74,
    pallets: 37,
    emptySlots: 41,
    issues: 3,
    temperature: "23°C",
    lastUpdated: "1 min ago",
  },
  {
    id: "Z-08",
    name: "Zone D2",
    aisle: "Aisle 8A",
    level: "Level 2",
    status: "Underutilized",
    utilization: 36,
    capacity: 135,
    occupied: 49,
    pallets: 24,
    emptySlots: 86,
    issues: 0,
    temperature: "20°C",
    lastUpdated: "6 min ago",
  },
  {
    id: "Z-09",
    name: "Zone E1",
    aisle: "Aisle 8B",
    level: "Level 1",
    status: "Optimal",
    utilization: 74,
    capacity: 150,
    occupied: 111,
    pallets: 55,
    emptySlots: 39,
    issues: 0,
    temperature: "22°C",
    lastUpdated: "3 min ago",
  },
  {
    id: "Z-10",
    name: "Zone E2",
    aisle: "Aisle 8B",
    level: "Level 2",
    status: "Near Capacity",
    utilization: 88,
    capacity: 105,
    occupied: 92,
    pallets: 46,
    emptySlots: 13,
    issues: 2,
    temperature: "24°C",
    lastUpdated: "2 min ago",
  },
  {
    id: "Z-11",
    name: "Zone F1",
    aisle: "Aisle 8C",
    level: "Level 1",
    status: "Underutilized",
    utilization: 39,
    capacity: 120,
    occupied: 47,
    pallets: 23,
    emptySlots: 73,
    issues: 0,
    temperature: "21°C",
    lastUpdated: "7 min ago",
  },
  {
    id: "Z-12",
    name: "Zone F2",
    aisle: "Aisle 8C",
    level: "Level 2",
    status: "Optimal",
    utilization: 76,
    capacity: 130,
    occupied: 99,
    pallets: 49,
    emptySlots: 31,
    issues: 0,
    temperature: "22°C",
    lastUpdated: "4 min ago",
  },
];

const FILTERS = [
  "All Zones",
  "Optimal",
  "Near Capacity",
  "Underutilized",
  "Blocked",
];

function ZoneManagement() {
  const [selectedZoneId, setSelectedZoneId] = useState("Z-01");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Zones");
  const [showAddZone, setShowAddZone] = useState(false);

  const selectedZone =
    ZONES.find((zone) => zone.id === selectedZoneId) ?? ZONES[0];

  const filteredZones = useMemo(() => {
    return ZONES.filter((zone) => {
      const matchesSearch =
        zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        zone.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        zone.aisle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === "All Zones" ||
        zone.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  const totalCapacity = ZONES.reduce(
    (total, zone) => total + zone.capacity,
    0
  );

  const totalOccupied = ZONES.reduce(
    (total, zone) => total + zone.occupied,
    0
  );

  const totalEmpty = ZONES.reduce(
    (total, zone) => total + zone.emptySlots,
    0
  );

  const totalIssues = ZONES.reduce(
    (total, zone) => total + zone.issues,
    0
  );

  const overallUtilization = Math.round(
    (totalOccupied / totalCapacity) * 100
  );

  const getStatusClass = (status: ZoneStatus) => {
    switch (status) {
      case "Optimal":
        return "status-optimal";

      case "Near Capacity":
        return "status-warning";

      case "Underutilized":
        return "status-underutilized";

      case "Blocked":
        return "status-blocked";

      default:
        return "";
    }
  };

  const getUtilizationClass = (utilization: number) => {
    if (utilization >= 85) {
      return "utilization-high";
    }

    if (utilization < 50) {
      return "utilization-low";
    }

    return "utilization-normal";
  };

  return (
    <div className="zone-page">
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="zone-page-header">
        <div>
          <div className="zone-breadcrumb">
            Warehouse Space Optimization
          </div>

          <h1>Zone Management</h1>

          <p className="zone-page-description">
            Configure, monitor and optimize warehouse storage zones
          </p>
        </div>

        <div className="zone-header-actions">
          <button
            type="button"
            className="zone-header-button"
            onClick={() => setShowAddZone(true)}
          >
            <span>＋</span>
            Add Zone
          </button>

          <button
            type="button"
            className="zone-icon-button"
            aria-label="Refresh zones"
          >
            ↻
          </button>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
          ===================================================== */}

      <div className="zone-summary-grid">
        <div className="zone-summary-card">
          <div className="summary-icon blue">▦</div>

          <div className="summary-content">
            <span>Total Zones</span>
            <strong>{ZONES.length}</strong>
            <small>Across warehouse</small>
          </div>
        </div>

        <div className="zone-summary-card">
          <div className="summary-icon green">◉</div>

          <div className="summary-content">
            <span>Space Utilization</span>
            <strong>{overallUtilization}%</strong>
            <small>{totalOccupied} occupied slots</small>
          </div>
        </div>

        <div className="zone-summary-card">
          <div className="summary-icon cyan">□</div>

          <div className="summary-content">
            <span>Available Capacity</span>
            <strong>{totalEmpty}</strong>
            <small>Storage slots available</small>
          </div>
        </div>

        <div className="zone-summary-card">
          <div className="summary-icon red">!</div>

          <div className="summary-content">
            <span>Active Issues</span>
            <strong>{totalIssues}</strong>
            <small>Require attention</small>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div className="zone-main-layout">
        {/* ===================================================
            LEFT - ZONE MANAGEMENT
            =================================================== */}

        <section className="zone-management-card">
          <div className="zone-card-header">
            <div>
              <h2>Warehouse Zones</h2>
              <p>
                Select a zone to view capacity and operational
                details
              </p>
            </div>

            <div className="zone-live-indicator">
              <span></span>
              LIVE
            </div>
          </div>

          {/* SEARCH + FILTER */}

          <div className="zone-toolbar">
            <div className="zone-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search zone or aisle..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>

            <div className="zone-filter-list">
              {FILTERS.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={
                    activeFilter === filter
                      ? "active"
                      : ""
                  }
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* ZONE GRID */}

          <div className="zone-grid">
            {filteredZones.map((zone) => (
              <button
                type="button"
                key={zone.id}
                className={`zone-tile ${
                  selectedZoneId === zone.id
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedZoneId(zone.id)}
              >
                <div className="zone-tile-top">
                  <div>
                    <strong>{zone.name}</strong>
                    <span>{zone.id}</span>
                  </div>

                  <span
                    className={`zone-status ${getStatusClass(
                      zone.status
                    )}`}
                  >
                    {zone.status}
                  </span>
                </div>

                <div className="zone-location">
                  <span>▤</span>
                  {zone.aisle}
                  <span className="location-divider">•</span>
                  {zone.level}
                </div>

                <div className="zone-utilization">
                  <div className="utilization-heading">
                    <span>Utilization</span>

                    <strong>{zone.utilization}%</strong>
                  </div>

                  <div className="utilization-track">
                    <div
                      className={`utilization-fill ${getUtilizationClass(
                        zone.utilization
                      )}`}
                      style={{
                        width: `${zone.utilization}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="zone-tile-footer">
                  <span>
                    {zone.occupied}/{zone.capacity} slots
                  </span>

                  {zone.issues > 0 && (
                    <span className="zone-issue-count">
                      ! {zone.issues}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {filteredZones.length === 0 && (
            <div className="zone-empty-state">
              <span>⌕</span>
              <strong>No zones found</strong>
              <p>
                Try changing the search term or selected
                filter.
              </p>
            </div>
          )}
        </section>

        {/* ===================================================
            RIGHT - SELECTED ZONE
            =================================================== */}

        <aside className="zone-details-column">
          <section className="zone-details-card">
            <div className="details-header">
              <div>
                <span className="details-label">
                  SELECTED ZONE
                </span>

                <h2>{selectedZone.name}</h2>

                <p>
                  {selectedZone.id} · {selectedZone.aisle}
                </p>
              </div>

              <span
                className={`details-status ${getStatusClass(
                  selectedZone.status
                )}`}
              >
                {selectedZone.status}
              </span>
            </div>

            {/* LARGE UTILIZATION */}

            <div className="large-utilization">
              <div className="large-utilization-header">
                <span>Storage Utilization</span>

                <strong>
                  {selectedZone.utilization}%
                </strong>
              </div>

              <div className="large-progress-track">
                <div
                  className={`large-progress-fill ${getUtilizationClass(
                    selectedZone.utilization
                  )}`}
                  style={{
                    width: `${selectedZone.utilization}%`,
                  }}
                ></div>
              </div>

              <div className="utilization-caption">
                <span>
                  {selectedZone.occupied} occupied
                </span>

                <span>
                  {selectedZone.emptySlots} available
                </span>
              </div>
            </div>

            {/* DETAILS GRID */}

            <div className="zone-detail-grid">
              <div>
                <span>Capacity</span>
                <strong>{selectedZone.capacity}</strong>
              </div>

              <div>
                <span>Occupied</span>
                <strong>{selectedZone.occupied}</strong>
              </div>

              <div>
                <span>Pallets</span>
                <strong>{selectedZone.pallets}</strong>
              </div>

              <div>
                <span>Empty Slots</span>
                <strong>{selectedZone.emptySlots}</strong>
              </div>
            </div>

            {/* INFORMATION */}

            <div className="zone-information">
              <div className="information-row">
                <span>Aisle</span>
                <strong>{selectedZone.aisle}</strong>
              </div>

              <div className="information-row">
                <span>Storage Level</span>
                <strong>{selectedZone.level}</strong>
              </div>

              <div className="information-row">
                <span>Temperature</span>
                <strong>{selectedZone.temperature}</strong>
              </div>

              <div className="information-row">
                <span>Last Updated</span>
                <strong>{selectedZone.lastUpdated}</strong>
              </div>
            </div>
          </section>

          {/* =================================================
              ISSUES
              ================================================= */}

          <section className="zone-details-card issues-card">
            <div className="details-section-title">
              <div>
                <h3>Zone Health</h3>
                <p>Current operational condition</p>
              </div>

              <span
                className={
                  selectedZone.issues === 0
                    ? "health-good"
                    : "health-warning"
                }
              >
                {selectedZone.issues === 0
                  ? "HEALTHY"
                  : "ATTENTION"}
              </span>
            </div>

            {selectedZone.issues === 0 ? (
              <div className="no-issues">
                <div className="no-issues-icon">✓</div>

                <div>
                  <strong>No active issues</strong>
                  <span>
                    Zone is operating within expected
                    parameters.
                  </span>
                </div>
              </div>
            ) : (
              <div className="issue-list">
                <div className="issue-item">
                  <span className="issue-icon">!</span>

                  <div>
                    <strong>
                      {selectedZone.issues} issue
                      {selectedZone.issues > 1
                        ? "s"
                        : ""}{" "}
                      detected
                    </strong>

                    <span>
                      Review zone conditions and
                      allocation.
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              className="zone-action-button"
            >
              View Zone Activity
              <span>→</span>
            </button>
          </section>

          {/* =================================================
              AI RECOMMENDATION
              ================================================= */}

          <section className="zone-details-card recommendation-card">
            <div className="recommendation-heading">
              <div className="recommendation-icon">
                ✦
              </div>

              <div>
                <h3>AI Recommendation</h3>
                <span>Space optimization insight</span>
              </div>
            </div>

            {selectedZone.utilization >= 85 ? (
              <p>
                This zone is approaching maximum capacity.
                Consider redirecting incoming pallets to
                nearby available zones.
              </p>
            ) : selectedZone.utilization < 50 ? (
              <p>
                This zone is underutilized. Consider
                consolidating inventory here to free
                capacity in high-demand zones.
              </p>
            ) : (
              <p>
                Space utilization is within the optimal
                operating range. Continue the current
                allocation strategy.
              </p>
            )}

            <button
              type="button"
              className="optimization-button"
            >
              Optimize Allocation
              <span>→</span>
            </button>
          </section>
        </aside>
      </div>

      {/* =====================================================
          ADD ZONE MODAL
          ===================================================== */}

      {showAddZone && (
        <div
          className="zone-modal-backdrop"
          onClick={() => setShowAddZone(false)}
        >
          <div
            className="zone-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span>ZONE CONFIGURATION</span>
                <h2>Add Warehouse Zone</h2>
              </div>

              <button
                type="button"
                onClick={() => setShowAddZone(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="modal-form">
              <label>
                Zone Name
                <input
                  type="text"
                  placeholder="e.g. Zone G1"
                />
              </label>

              <label>
                Aisle
                <select defaultValue="">
                  <option value="" disabled>
                    Select aisle
                  </option>
                  <option>Aisle 7A</option>
                  <option>Aisle 7B</option>
                  <option>Aisle 7C</option>
                  <option>Aisle 8A</option>
                  <option>Aisle 8B</option>
                  <option>Aisle 8C</option>
                </select>
              </label>

              <label>
                Storage Capacity
                <input
                  type="number"
                  placeholder="e.g. 120"
                />
              </label>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-cancel"
                onClick={() => setShowAddZone(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="modal-save"
                onClick={() => setShowAddZone(false)}
              >
                Add Zone
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ZoneManagement;