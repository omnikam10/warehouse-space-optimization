import { useEffect, useMemo, useState } from "react";
import "./MapHeatmaps.css";

interface Zone {
  id: string;
  name: string;
  people: number;
  capacity: number;
  x: string;
  y: string;
  width: string;
  height: string;
}

const initialZones: Zone[] = [
  {
    id: "grading",
    name: "Grading Area",
    people: 13,
    capacity: 25,
    x: "4%",
    y: "4%",
    width: "32%",
    height: "34%",
  },
  {
    id: "packaging",
    name: "Packaging",
    people: 30,
    capacity: 36,
    x: "39%",
    y: "4%",
    width: "32%",
    height: "34%",
  },
  {
    id: "storage",
    name: "Storage",
    people: 12,
    capacity: 23,
    x: "4%",
    y: "40%",
    width: "67%",
    height: "54%",
  },
  {
    id: "canteen",
    name: "Canteen",
    people: 32,
    capacity: 36,
    x: "72%",
    y: "40%",
    width: "24%",
    height: "34%",
  },
  {
    id: "loading",
    name: "Loading Dock",
    people: 12,
    capacity: 14,
    x: "72%",
    y: "76%",
    width: "24%",
    height: "18%",
  },
];

function getPercentage(people: number, capacity: number) {
  return Math.round((people / capacity) * 100);
}

function getHeatClass(value: number) {
  if (value < 40) return "map-zone-low";
  if (value < 70) return "map-zone-medium";
  if (value < 85) return "map-zone-high";
  return "map-zone-critical";
}

function MapHeatmaps() {
  const [zones, setZones] = useState(initialZones);
  const [showPaths, setShowPaths] = useState(true);
  const [showLiveCount, setShowLiveCount] = useState(true);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setZones((currentZones) =>
        currentZones.map((zone) => {
          const change = Math.floor(Math.random() * 5) - 2;

          const people = Math.max(
            0,
            Math.min(zone.capacity, zone.people + change)
          );

          return {
            ...zone,
            people,
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  const statistics = useMemo(() => {
    const totalPeople = zones.reduce(
      (sum, zone) => sum + zone.people,
      0
    );

    const totalCapacity = zones.reduce(
      (sum, zone) => sum + zone.capacity,
      0
    );

    const utilization = Math.round(
      (totalPeople / totalCapacity) * 100
    );

    const highestZone = [...zones].sort(
      (a, b) =>
        getPercentage(b.people, b.capacity) -
        getPercentage(a.people, a.capacity)
    )[0];

    return {
      totalPeople,
      utilization,
      highestZone,
    };
  }, [zones]);

  const livePeople = useMemo(() => {
    const points: {
      id: number;
      left: string;
      top: string;
    }[] = [];

    let id = 0;

    zones.forEach((zone) => {
      const count = Math.min(zone.people, 12);

      for (let i = 0; i < count; i++) {
        const left =
          parseFloat(zone.x) +
          Math.random() * (parseFloat(zone.width) - 3);

        const top =
          parseFloat(zone.y) +
          Math.random() * (parseFloat(zone.height) - 3);

        points.push({
          id: id++,
          left: `${left}%`,
          top: `${top}%`,
        });
      }
    });

    return points;
  }, [zones]);

  return (
    <div className="map-page">

      {/* PAGE HEADER */}

      <div className="map-page-header">
        <div>
          <div className="map-breadcrumb">
            Warehouse Space Optimization
          </div>

          <h1>Map & Heatmaps</h1>

          <p>
            Real-time warehouse activity and people density
          </p>
        </div>

        <div className="map-header-status">
          <span className="live-dot"></span>
          Live monitoring
        </div>
      </div>

      {/* MAIN WORKSPACE */}

      <div className="map-workspace">

        {/* MAP */}

        <div className="map-panel">

          <div className="map-panel-header">

            <div>
              <h2>Warehouse Live Map</h2>

              <span>
                People density · Live location tracking
              </span>
            </div>

            <div className="map-actions">

              <button
                onClick={() =>
                  setZoom((value) =>
                    Math.min(value + 10, 130)
                  )
                }
              >
                +
              </button>

              <span>{zoom}%</span>

              <button
                onClick={() =>
                  setZoom((value) =>
                    Math.max(value - 10, 80)
                  )
                }
              >
                −
              </button>

              <button
                className={paused ? "active" : ""}
                onClick={() => setPaused((value) => !value)}
              >
                {paused ? "Resume" : "Pause"}
              </button>

            </div>

          </div>

          {/* MAP CANVAS */}

          <div className="warehouse-map-wrapper">

            <div
              className="warehouse-map"
              style={{
                transform: `scale(${zoom / 100})`,
              }}
            >

              {/* GRID */}

              <div className="map-grid"></div>

              {/* PATHS */}

              {showPaths && (
                <svg
                  className="movement-paths"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 15 20 C 35 30, 45 15, 62 25 S 82 40, 88 55"
                    pathLength="1"
                  />

                  <path
                    d="M 15 80 C 30 65, 35 55, 48 45 S 65 30, 82 18"
                    pathLength="1"
                  />

                  <path
                    d="M 30 90 C 45 70, 60 65, 72 48"
                    pathLength="1"
                  />
                </svg>
              )}

              {/* ZONES */}

              {zones.map((zone) => {
                const percentage = getPercentage(
                  zone.people,
                  zone.capacity
                );

                return (
                  <div
                    key={zone.id}
                    className={`map-zone ${getHeatClass(
                      percentage
                    )}`}
                    style={{
                      left: zone.x,
                      top: zone.y,
                      width: zone.width,
                      height: zone.height,
                    }}
                  >

                    {/* HEAT */}

                    <div className="zone-heat"></div>

                    {/* ZONE LABEL */}

                    <div className="zone-info">

                      <strong>{zone.name}</strong>

                      {showLiveCount && (
                        <>
                          <span className="zone-people">
                            ♙ {zone.people} / {zone.capacity} people
                          </span>

                          <b>{percentage}%</b>
                        </>
                      )}

                    </div>

                  </div>
                );
              })}

              {/* LIVE PEOPLE */}

              {showLiveCount &&
                livePeople.map((person) => (
                  <span
                    key={person.id}
                    className="live-person"
                    style={{
                      left: person.left,
                      top: person.top,
                    }}
                  />
                ))}

              {/* MAP LEGEND */}

              <div className="map-legend">

                <strong>People Density</strong>

                <div className="density-bar"></div>

                <div className="density-labels">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Critical</span>
                </div>

              </div>

              <div className="map-live-indicator">
                <span></span>
                Live feed active
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}

        <aside className="map-side-panel">

          {/* CONTROLS */}

          <div className="map-side-card">

            <h3>Map Controls</h3>

            <div className="map-control-row">
              <span>Heatmap</span>

              <select>
                <option>People Density</option>
                <option>Object Movement</option>
                <option>Combined Activity</option>
              </select>
            </div>

            <div className="map-control-row">
              <span>Time Range</span>

              <select>
                <option>Live</option>
                <option>Last 15 min</option>
                <option>Last 1 hr</option>
                <option>Last 4 hr</option>
              </select>
            </div>

            <div className="map-toggle-row">
              <span>Show Paths</span>

              <button
                className={`toggle ${
                  showPaths ? "on" : ""
                }`}
                onClick={() =>
                  setShowPaths((value) => !value)
                }
              >
                <span></span>
              </button>
            </div>

            <div className="map-toggle-row">
              <span>Show Live Count</span>

              <button
                className={`toggle ${
                  showLiveCount ? "on" : ""
                }`}
                onClick={() =>
                  setShowLiveCount((value) => !value)
                }
              >
                <span></span>
              </button>
            </div>

          </div>

          {/* OVERVIEW */}

          <div className="map-side-card">

            <h3>Warehouse Overview</h3>

            <p className="side-subtitle">
              Real-time statistics
            </p>

            <div className="overview-grid">

              <div>
                <span className="overview-icon">⌁</span>

                <strong>5</strong>

                <small>Active Zones</small>
              </div>

              <div>
                <span className="overview-icon">◇</span>

                <strong>2,450</strong>

                <small>Total Area (sq.ft)</small>
              </div>

              <div>
                <span className="overview-icon">ϟ</span>

                <strong>
                  {statistics.utilization}%
                </strong>

                <small>Overall Utilization</small>
              </div>

              <div>
                <span className="overview-icon">♙</span>

                <strong>
                  {statistics.totalPeople}
                </strong>

                <small>Total People</small>
              </div>

            </div>

          </div>

          {/* ACTIVITY */}

          <div className="map-side-card activity-card">

            <div className="activity-header">

              <div>
                <h3>Live Activity Feed</h3>

                <p>Latest warehouse events</p>
              </div>

              <span className="activity-live">
                ● Live
              </span>

            </div>

            <div className="activity-item">

              <span className="activity-time">
                Now
              </span>

              <span className="activity-dot"></span>

              <span>
                {statistics.highestZone.name} has the
                highest occupancy
              </span>

            </div>

            <div className="activity-item">

              <span className="activity-time">
                Live
              </span>

              <span className="activity-dot orange"></span>

              <span>
                {statistics.totalPeople} people currently
                detected
              </span>

            </div>

          </div>

        </aside>

      </div>
    </div>
  );
}

export default MapHeatmaps;