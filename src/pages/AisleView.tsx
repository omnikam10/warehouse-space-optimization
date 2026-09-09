import { useEffect, useState } from "react";
import "./aisle-view.css";

const AISLES = [
  "AISLE 7A",
  "AISLE 7B",
  "AISLE 7C",
  "AISLE 8A",
  "AISLE 8B",
];

function AisleView() {
  const [selectedAisle, setSelectedAisle] = useState("AISLE 7B");
  const [aiAnalysis, setAiAnalysis] = useState(true);
  const [detectionBoxes, setDetectionBoxes] = useState(true);
  const [paused, setPaused] = useState(false);
  const [resolution, setResolution] = useState("1080P");

  const [elapsedSeconds, setElapsedSeconds] = useState(40);

  useEffect(() => {
    if (paused) return;

    const interval = window.setInterval(() => {
      setElapsedSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [paused]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  };

  return (
    <div className="aisle-page">
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}
      <div className="aisle-page-header">
        <div>
          <div className="aisle-breadcrumb">
            Warehouse Space Optimization
          </div>

          <h1>Operations Overview</h1>
        </div>

        <div className="aisle-header-actions">
          <button
            type="button"
            className="header-icon-button"
            aria-label="Search"
          >
            <span>⌕</span>
          </button>

          <button
            type="button"
            className="header-icon-button notification-button"
            aria-label="Notifications"
          >
            <span>♧</span>
            <i></i>
          </button>

          <button
            type="button"
            className="header-icon-button"
            aria-label="Theme"
          >
            <span>☼</span>
          </button>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}
      <div className="aisle-content-grid">
        {/* ===================================================
            CAMERA PANEL
            =================================================== */}
        <section className="camera-panel">
          {/* CAMERA HEADER */}
          <div className="camera-panel-header">
            <div className="camera-title-section">
              <div className="camera-icon">
                ▣
              </div>

              <div>
                <h2>Live Aisle Camera</h2>
                <p>Front-facing warehouse camera</p>
              </div>
            </div>

            {/* IMPORTANT:
                This is a REAL selectable native select.
                Do not replace it with a div/button. */}
            <div className="camera-controls">
              <label className="camera-select-wrapper">
                <select
                  value={selectedAisle}
                  onChange={(event) =>
                    setSelectedAisle(event.target.value)
                  }
                  aria-label="Select aisle"
                >
                  {AISLES.map((aisle) => (
                    <option key={aisle} value={aisle}>
                      {aisle}
                    </option>
                  ))}
                </select>
                
              </label>

              <label className="resolution-wrapper">
                <select
                  value={resolution}
                  onChange={(event) =>
                    setResolution(event.target.value)
                  }
                  aria-label="Select camera resolution"
                >
                  <option value="1080P">1080P</option>
                  <option value="720P">720P</option>
                  <option value="480P">480P</option>
                </select>
              </label>
            </div>
          </div>

          {/* CAMERA VIEW */}
          <div className="camera-view">
            {/* REAL WAREHOUSE IMAGE */}
            <img
              src="/assets/images/aisle-detection.png"
              alt="Warehouse aisle detection view"
              className={`aisle-detection-image ${
                !aiAnalysis ? "analysis-disabled" : ""
              }`}
            />

            {/* LIVE RECORDING INDICATOR */}
            <div className="recording-indicator">
              <span></span>
              <strong>REC</strong>
            </div>

            {/* CAMERA INFORMATION */}
            <div className="camera-overlay-top-right">
              <span className="overlay-aisle">
                {selectedAisle}
              </span>

              <span className="overlay-time">
                {formatTime(elapsedSeconds)}
              </span>
            </div>

            {/* BOTTOM LEFT STATUS */}
            <div className="computer-vision-status">
              <span className="cv-icon">⌁</span>
              Computer Vision Processing
            </div>

            {/* BOTTOM RIGHT BRANDING */}
            <div className="warehouse-ai-brand">
              WAREHOUSE AI VISION
            </div>

            {/* PAUSED OVERLAY */}
            {paused && (
              <div className="camera-paused-overlay">
                <div className="paused-content">
                  <span>Ⅱ</span>
                  <strong>Analysis Paused</strong>
                </div>
              </div>
            )}

            {/* AI DISABLED OVERLAY */}
            {!aiAnalysis && (
              <div className="analysis-disabled-overlay">
                <div>
                  <strong>AI Analysis Disabled</strong>
                  <span>
                    Enable AI Analysis to resume computer vision
                    detection.
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ===================================================
            RIGHT SIDEBAR
            =================================================== */}
        <aside className="aisle-sidebar">
          {/* =================================================
              AI ANALYSIS
              ================================================= */}
          <section className="aisle-card ai-analysis-card">
            <div className="card-heading">
              <div>
                <h3>AI Analysis</h3>
                <p>Live vision configuration</p>
              </div>
            </div>

            <div className="analysis-option">
              <div>
                <strong>AI Analysis</strong>
                <span>Real-time detection</span>
              </div>

              <button
                type="button"
                className={`switch ${
                  aiAnalysis ? "active" : ""
                }`}
                onClick={() =>
                  setAiAnalysis((value) => !value)
                }
                aria-label="Toggle AI Analysis"
                aria-pressed={aiAnalysis}
              >
                <span></span>
              </button>
            </div>

            <div className="analysis-option">
              <div>
                <strong>Detection Boxes</strong>
                <span>Show AI boundaries</span>
              </div>

              <button
                type="button"
                className={`switch ${
                  detectionBoxes ? "active" : ""
                }`}
                onClick={() =>
                  setDetectionBoxes((value) => !value)
                }
                aria-label="Toggle Detection Boxes"
                aria-pressed={detectionBoxes}
              >
                <span></span>
              </button>
            </div>

            <button
              type="button"
              className="pause-analysis-button"
              onClick={() => setPaused((value) => !value)}
            >
              <span>{paused ? "▶" : "Ⅱ"}</span>
              {paused ? "Resume Analysis" : "Pause Analysis"}
            </button>
          </section>

          {/* =================================================
              LIVE METRICS
              ================================================= */}
          <section className="aisle-card live-metrics-card">
            <div className="card-heading metrics-heading">
              <div>
                <h3>Live Metrics</h3>
                <p>Current aisle conditions</p>
              </div>

              <span className="live-badge">
                LIVE
              </span>
            </div>

            <div className="metrics-grid">
              <div className="metric-box">
                <div className="metric-icon blue">
                  ▣
                </div>

                <strong>68%</strong>
                <span>Space Used</span>
              </div>

              <div className="metric-box">
                <div className="metric-icon red">
                  ⊘
                </div>

                <strong>6</strong>
                <span>Empty Zones</span>
              </div>

              <div className="metric-box">
                <div className="metric-icon yellow">
                  △
                </div>

                <strong>3</strong>
                <span>Stack Issues</span>
              </div>

              <div className="metric-box">
                <div className="metric-icon green">
                  ♧
                </div>

                <strong>3</strong>
                <span>People</span>
              </div>
            </div>
          </section>

          {/* =================================================
              OCCUPANCY ANALYSIS
              ================================================= */}
          <section className="aisle-card occupancy-card">
            <div className="card-heading occupancy-heading">
              <div>
                <h3>Occupancy Analysis</h3>
                <p>Storage utilization by level</p>
              </div>

              <span className="eye-icon">◉</span>
            </div>

            <div className="occupancy-levels">
              <div className="occupancy-row">
                <div className="occupancy-label">
                  <span>Level 1</span>
                  <strong>72%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: "72%" }}
                  ></div>
                </div>
              </div>

              <div className="occupancy-row">
                <div className="occupancy-label">
                  <span>Level 2</span>
                  <strong>54%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: "54%" }}
                  ></div>
                </div>
              </div>

              <div className="occupancy-row">
                <div className="occupancy-label">
                  <span>Level 3</span>
                  <strong>61%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: "61%" }}
                  ></div>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default AisleView;