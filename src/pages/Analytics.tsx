import {
  getHighestOccupancyZone,
  getLowestOccupancyZone,
  getOverallUtilization,
  getTotalArea,
  getTotalCapacity,
  getTotalPeople,
  getUtilization,
  getUtilizationStatus,
  warehouseZones,
} from "../data/WarehouseData";

import "./Analytics.css";

function Analytics() {
  const totalPeople = getTotalPeople();
  const totalCapacity = getTotalCapacity();
  const totalArea = getTotalArea();
  const overallUtilization = getOverallUtilization();

  const highestZone = getHighestOccupancyZone();
  const lowestZone = getLowestOccupancyZone();

  const availableCapacity = totalCapacity - totalPeople;

  return (
    <div className="analytics-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="analytics-header">
        <div>
          <span className="analytics-eyebrow">
            Warehouse Space Optimization
          </span>

          <h1>Analytics & Insights</h1>

          <p>
            Real-time warehouse utilization, occupancy and
            space performance.
          </p>
        </div>

        <div className="analytics-live">
          <span className="analytics-live-dot" />
          Live analytics
        </div>
      </div>


      {/* =====================================================
          KPI CARDS
          ===================================================== */}

      <div className="analytics-kpi-grid">

        <div className="analytics-kpi-card">
          <div className="analytics-kpi-icon people-icon">
            <span>♙</span>
          </div>

          <div className="analytics-kpi-content">
            <span className="analytics-kpi-label">
              People Currently Inside
            </span>

            <strong>{totalPeople}</strong>

            <span className="analytics-kpi-sub">
              Across all warehouse zones
            </span>
          </div>
        </div>


        <div className="analytics-kpi-card">
          <div className="analytics-kpi-icon capacity-icon">
            <span>◫</span>
          </div>

          <div className="analytics-kpi-content">
            <span className="analytics-kpi-label">
              Available Capacity
            </span>

            <strong>{availableCapacity}</strong>

            <span className="analytics-kpi-sub">
              {totalCapacity} total capacity
            </span>
          </div>
        </div>


        <div className="analytics-kpi-card">
          <div className="analytics-kpi-icon utilization-icon">
            <span>⌁</span>
          </div>

          <div className="analytics-kpi-content">
            <span className="analytics-kpi-label">
              Overall Utilization
            </span>

            <strong>{overallUtilization}%</strong>

            <span className="analytics-kpi-sub">
              Current warehouse occupancy
            </span>
          </div>
        </div>


        <div className="analytics-kpi-card">
          <div className="analytics-kpi-icon area-icon">
            <span>□</span>
          </div>

          <div className="analytics-kpi-content">
            <span className="analytics-kpi-label">
              Total Warehouse Area
            </span>

            <strong>
              {totalArea.toLocaleString()}
            </strong>

            <span className="analytics-kpi-sub">
              sq. ft. across active zones
            </span>
          </div>
        </div>

      </div>


      {/* =====================================================
          MAIN ANALYTICS GRID
          ===================================================== */}

      <div className="analytics-main-grid">

        {/* ===================================================
            ZONE UTILIZATION
            =================================================== */}

        <section className="analytics-panel zone-utilization-panel">

          <div className="analytics-panel-header">
            <div>
              <h2>Zone Utilization</h2>

              <p>
                Current occupancy across warehouse areas
              </p>
            </div>

            <span className="analytics-panel-badge">
              {warehouseZones.length} zones
            </span>
          </div>


          <div className="zone-utilization-list">

            {warehouseZones.map((zone) => {
              const utilization = getUtilization(zone);
              const status = getUtilizationStatus(zone);

              return (
                <div
                  className="zone-analytics-row"
                  key={zone.id}
                >

                  <div className="zone-analytics-info">
                    <div className="zone-name-line">
                      <span className="zone-status-dot" data-status={status} />

                      <strong>{zone.name}</strong>
                    </div>

                    <span>
                      {zone.people} / {zone.capacity} people
                    </span>
                  </div>


                  <div className="zone-progress-wrapper">

                    <div className="zone-progress-track">
                      <div
                        className="zone-progress-fill"
                        data-status={status}
                        style={{
                          width: `${Math.min(
                            utilization,
                            100
                          )}%`,
                        }}
                      />
                    </div>

                  </div>


                  <div
                    className="zone-utilization-value"
                    data-status={status}
                  >
                    {utilization}%
                  </div>

                </div>
              );
            })}

          </div>

        </section>


        {/* ===================================================
            OCCUPANCY SUMMARY
            =================================================== */}

        <section className="analytics-panel occupancy-panel">

          <div className="analytics-panel-header">
            <div>
              <h2>Occupancy Overview</h2>

              <p>
                Current warehouse capacity distribution
              </p>
            </div>
          </div>


          <div className="occupancy-ring-container">

            <div
              className="occupancy-ring"
              style={{
                background: `conic-gradient(
                  #2563eb ${overallUtilization}%,
                  rgba(148,163,184,0.18) ${overallUtilization}% 100%
                )`,
              }}
            >
              <div className="occupancy-ring-inner">
                <strong>{overallUtilization}%</strong>

                <span>Utilized</span>
              </div>
            </div>

          </div>


          <div className="occupancy-stats">

            <div>
              <span>Occupied</span>
              <strong>{totalPeople}</strong>
            </div>

            <div>
              <span>Available</span>
              <strong>{availableCapacity}</strong>
            </div>

            <div>
              <span>Capacity</span>
              <strong>{totalCapacity}</strong>
            </div>

          </div>

        </section>

      </div>


      {/* =====================================================
          PERFORMANCE INSIGHTS
          ===================================================== */}

      <div className="analytics-main-grid">

        <section className="analytics-panel">

          <div className="analytics-panel-header">
            <div>
              <h2>Space Performance</h2>

              <p>
                Areas requiring attention based on occupancy
              </p>
            </div>
          </div>


          <div className="performance-cards">

            {/* Highest occupancy */}

            <div className="performance-card critical-performance">

              <div className="performance-card-top">
                <span className="performance-icon">
                  ↑
                </span>

                <span className="performance-label">
                  Highest Occupancy
                </span>
              </div>

              <strong>
                {highestZone.name}
              </strong>

              <div className="performance-number">
                {getUtilization(highestZone)}%
              </div>

              <p>
                {highestZone.people} of{" "}
                {highestZone.capacity} people currently
                detected.
              </p>

            </div>


            {/* Lowest occupancy */}

            <div className="performance-card low-performance">

              <div className="performance-card-top">
                <span className="performance-icon">
                  ↓
                </span>

                <span className="performance-label">
                  Lowest Occupancy
                </span>
              </div>

              <strong>
                {lowestZone.name}
              </strong>

              <div className="performance-number">
                {getUtilization(lowestZone)}%
              </div>

              <p>
                {lowestZone.people} of{" "}
                {lowestZone.capacity} people currently
                detected.
              </p>

            </div>

          </div>

        </section>


        {/* ===================================================
            SPACE DISTRIBUTION
            =================================================== */}

        <section className="analytics-panel">

          <div className="analytics-panel-header">
            <div>
              <h2>Space Distribution</h2>

              <p>
                Warehouse area by operational zone
              </p>
            </div>
          </div>


          <div className="space-distribution">

            {warehouseZones.map((zone) => {

              const percentage =
                (zone.area / totalArea) * 100;

              return (
                <div
                  className="space-distribution-row"
                  key={zone.id}
                >

                  <div className="space-distribution-name">
                    <span />
                    {zone.name}
                  </div>

                  <div className="space-distribution-bar">
                    <div
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <strong>
                    {zone.area.toLocaleString()} sq.ft
                  </strong>

                </div>
              );
            })}

          </div>

        </section>

      </div>


      {/* =====================================================
          ZONE DETAILS
          ===================================================== */}

      <section className="analytics-panel zone-details-panel">

        <div className="analytics-panel-header">

          <div>
            <h2>Zone Performance Details</h2>

            <p>
              Detailed occupancy and space information
            </p>
          </div>

          <span className="analytics-updated">
            ● Data synchronized
          </span>

        </div>


        <div className="zone-table">

          <div className="zone-table-header">
            <span>Zone</span>
            <span>People</span>
            <span>Capacity</span>
            <span>Utilization</span>
            <span>Area</span>
            <span>Status</span>
          </div>


          {warehouseZones.map((zone) => {

            const utilization = getUtilization(zone);
            const status = getUtilizationStatus(zone);

            return (
              <div
                className="zone-table-row"
                key={zone.id}
              >

                <strong>
                  {zone.name}
                </strong>

                <span>
                  {zone.people}
                </span>

                <span>
                  {zone.capacity}
                </span>

                <span className="table-utilization">
                  {utilization}%
                </span>

                <span>
                  {zone.area.toLocaleString()} sq.ft
                </span>

                <span
                  className="status-pill"
                  data-status={status}
                >
                  {status}
                </span>

              </div>
            );
          })}

        </div>

      </section>


      {/* =====================================================
          FOOTER INSIGHT
          ===================================================== */}

      <div className="analytics-insight">

        <div className="analytics-insight-icon">
          ✦
        </div>

        <div>
          <strong>
            Space optimization insight
          </strong>

          <p>
            {highestZone.name} currently has the highest
            occupancy at{" "}
            {getUtilization(highestZone)}%. Consider reviewing
            nearby available capacity before adding additional
            activity to this zone.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Analytics;