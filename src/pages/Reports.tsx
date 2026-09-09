import { useMemo, useState } from "react";
import "./reports.css";

type ReportType =
  | "Warehouse Summary"
  | "Space Utilization"
  | "Safety & Alerts"
  | "Camera Performance"
  | "Operational Efficiency";

type DateRange =
  | "Last 24 Hours"
  | "Last 7 Days"
  | "Last 30 Days"
  | "This Month";

type WarehouseArea =
  | "All Zones"
  | "Loading Dock"
  | "Storage"
  | "Packaging"
  | "Canteen";

type ReportRow = {
  metric: string;
  value: string;
  status: "Good" | "Warning" | "Critical";
  trend: string;
};

const Reports = () => {
  const [reportType, setReportType] =
    useState<ReportType>("Warehouse Summary");

  const [dateRange, setDateRange] =
    useState<DateRange>("Last 7 Days");

  const [warehouseArea, setWarehouseArea] =
    useState<WarehouseArea>("All Zones");

  const [metricSearch, setMetricSearch] = useState("");

  const [generatedReports, setGeneratedReports] = useState(12);

  const [isGenerating, setIsGenerating] = useState(false);

  const [showNotification, setShowNotification] = useState(false);

  const [recentReports, setRecentReports] = useState([
    {
      id: 1,
      name: "Warehouse Summary",
      range: "Last 7 Days",
      area: "All Zones",
      date: "Today, 02:31 PM",
      status: "Ready",
    },
    {
      id: 2,
      name: "Space Utilization",
      range: "Last 30 Days",
      area: "Storage",
      date: "Yesterday, 04:18 PM",
      status: "Ready",
    },
    {
      id: 3,
      name: "Safety & Alerts",
      range: "Last 7 Days",
      area: "All Zones",
      date: "Sep 05, 2026",
      status: "Ready",
    },
  ]);

  const reportRows: ReportRow[] = useMemo(() => {
    switch (reportType) {
      case "Space Utilization":
        return [
          {
            metric: "Warehouse Utilization",
            value: "76%",
            status: "Good",
            trend: "+4.2%",
          },
          {
            metric: "Storage Utilization",
            value: "81%",
            status: "Warning",
            trend: "+6.1%",
          },
          {
            metric: "Loading Dock Utilization",
            value: "88%",
            status: "Warning",
            trend: "+3.7%",
          },
          {
            metric: "Packaging Utilization",
            value: "69%",
            status: "Good",
            trend: "-2.4%",
          },
          {
            metric: "Available Space",
            value: "24%",
            status: "Good",
            trend: "-4.2%",
          },
        ];

      case "Safety & Alerts":
        return [
          {
            metric: "Total Alerts",
            value: "4",
            status: "Warning",
            trend: "-2",
          },
          {
            metric: "Critical Alerts",
            value: "2",
            status: "Critical",
            trend: "+1",
          },
          {
            metric: "Active Alerts",
            value: "3",
            status: "Warning",
            trend: "-1",
          },
          {
            metric: "Acknowledged Alerts",
            value: "1",
            status: "Good",
            trend: "+1",
          },
          {
            metric: "Resolved Alerts",
            value: "0",
            status: "Good",
            trend: "0",
          },
        ];

      case "Camera Performance":
        return [
          {
            metric: "Camera Uptime",
            value: "98.7%",
            status: "Good",
            trend: "+0.8%",
          },
          {
            metric: "Active Cameras",
            value: "4 / 4",
            status: "Good",
            trend: "0",
          },
          {
            metric: "Recording Status",
            value: "Active",
            status: "Good",
            trend: "Stable",
          },
          {
            metric: "Disconnected Feeds",
            value: "0",
            status: "Good",
            trend: "-1",
          },
          {
            metric: "Storage Used",
            value: "42.3 GB",
            status: "Good",
            trend: "+2.1 GB",
          },
        ];

      case "Operational Efficiency":
        return [
          {
            metric: "Overall Efficiency",
            value: "84%",
            status: "Good",
            trend: "+5.4%",
          },
          {
            metric: "Forklift Route Efficiency",
            value: "88%",
            status: "Good",
            trend: "+7.1%",
          },
          {
            metric: "Loading Efficiency",
            value: "79%",
            status: "Warning",
            trend: "+2.8%",
          },
          {
            metric: "Order Processing",
            value: "92%",
            status: "Good",
            trend: "+4.3%",
          },
          {
            metric: "Average Processing Time",
            value: "18 min",
            status: "Good",
            trend: "-3.2%",
          },
        ];

      default:
        return [
          {
            metric: "Warehouse Utilization",
            value: "76%",
            status: "Good",
            trend: "+4.2%",
          },
          {
            metric: "Active Alerts",
            value: "3",
            status: "Warning",
            trend: "-1",
          },
          {
            metric: "Camera Uptime",
            value: "98.7%",
            status: "Good",
            trend: "+0.8%",
          },
          {
            metric: "Space Efficiency",
            value: "84%",
            status: "Good",
            trend: "+5.4%",
          },
          {
            metric: "Operational Score",
            value: "91 / 100",
            status: "Good",
            trend: "+3.1%",
          },
        ];
    }
  }, [reportType]);

  const filteredRows = useMemo(() => {
    const search = metricSearch.trim().toLowerCase();

    if (!search) {
      return reportRows;
    }

    return reportRows.filter((row) =>
      row.metric.toLowerCase().includes(search)
    );
  }, [metricSearch, reportRows]);

  const handleGenerateReport = () => {
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReports((count) => count + 1);

      const newReport = {
        id: Date.now(),
        name: reportType,
        range: dateRange,
        area: warehouseArea,
        date: "Just now",
        status: "Ready",
      };

      setRecentReports((reports) => [
        newReport,
        ...reports.slice(0, 4),
      ]);

      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }, 900);
  };

  const handleDownloadCSV = () => {
    const headers = ["Metric", "Value", "Status", "Trend"];

    const rows = filteredRows.map((row) => [
      row.metric,
      row.value,
      row.status,
      row.trend,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${value.replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${reportType
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-report.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="reports-page">
      {/* NOTIFICATION */}
      {showNotification && (
        <div className="report-toast">
          <span className="toast-icon">✓</span>

          <div>
            <strong>Report generated</strong>
            <span>Your report is ready to review.</span>
          </div>
        </div>
      )}

      {/* PAGE HEADER */}
      <section className="reports-page-header">
        <div>
          <div className="reports-breadcrumb">
            <span className="breadcrumb-icon"></span>
            <span>Warehouse Monitoring</span>
            <span className="breadcrumb-arrow">›</span>
            <span>Reports</span>
          </div>

          <h1>Reports</h1>

          <p>
            Generate, review and export warehouse performance reports.
          </p>
        </div>

        <div className="reports-live-status">
          <span></span>
          Live data
        </div>
      </section>

      {/* SUMMARY CARDS */}
      <section className="report-summary-grid">
        <div className="report-summary-card blue">
          <div className="summary-icon">
            <span>▤</span>
          </div>

          <div className="summary-content">
            <span className="summary-label">
              Total Reports
            </span>

            <strong>{generatedReports}</strong>

            <small>Generated this month</small>
          </div>
        </div>

        <div className="report-summary-card green">
          <div className="summary-icon">
            <span>▥</span>
          </div>

          <div className="summary-content">
            <span className="summary-label">
              Latest Utilization
            </span>

            <strong>76%</strong>

            <small>Across all warehouse zones</small>
          </div>
        </div>

        <div className="report-summary-card orange">
          <div className="summary-icon">
            <span>△</span>
          </div>

          <div className="summary-content">
            <span className="summary-label">
              Open Alerts
            </span>

            <strong>3</strong>

            <small>Require operational attention</small>
          </div>
        </div>

        <div className="report-summary-card purple">
          <div className="summary-icon">
            <span>▣</span>
          </div>

          <div className="summary-content">
            <span className="summary-label">
              Camera Uptime
            </span>

            <strong>98.7%</strong>

            <small>Current monitoring availability</small>
          </div>
        </div>
      </section>

      {/* REPORT BUILDER */}
      <section className="report-builder panel">
        <div className="panel-header">
          <div>
            <h2>Report Builder</h2>
            <p>
              Select the information you want to include in your
              report.
            </p>
          </div>

          <span className="builder-status">
            <span></span>
            Ready
          </span>
        </div>

        <div className="report-builder-grid">
          {/* REPORT TYPE */}
          <div className="form-group">
            <label htmlFor="report-type">
              Report Type
            </label>

            <select
              id="report-type"
              value={reportType}
              onChange={(event) =>
                setReportType(
                  event.target.value as ReportType
                )
              }
            >
              <option>Warehouse Summary</option>
              <option>Space Utilization</option>
              <option>Safety & Alerts</option>
              <option>Camera Performance</option>
              <option>Operational Efficiency</option>
            </select>
          </div>

          {/* DATE RANGE */}
          <div className="form-group">
            <label htmlFor="date-range">
              Date Range
            </label>

            <select
              id="date-range"
              value={dateRange}
              onChange={(event) =>
                setDateRange(
                  event.target.value as DateRange
                )
              }
            >
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
            </select>
          </div>

          {/* AREA */}
          <div className="form-group">
            <label htmlFor="warehouse-area">
              Warehouse Area
            </label>

            <select
              id="warehouse-area"
              value={warehouseArea}
              onChange={(event) =>
                setWarehouseArea(
                  event.target.value as WarehouseArea
                )
              }
            >
              <option>All Zones</option>
              <option>Loading Dock</option>
              <option>Storage</option>
              <option>Packaging</option>
              <option>Canteen</option>
            </select>
          </div>

          {/* METRIC SEARCH */}
          <div className="form-group">
            <label htmlFor="metric-search">
              Search Metric
            </label>

            <div className="metric-search">
              <span>⌕</span>

              <input
                id="metric-search"
                type="text"
                value={metricSearch}
                onChange={(event) =>
                  setMetricSearch(event.target.value)
                }
                placeholder="Search metrics..."
              />
            </div>
          </div>
        </div>

        <div className="builder-footer">
          <p>
            Report will include{" "}
            <strong>{reportType}</strong> data for{" "}
            <strong>{warehouseArea}</strong> over{" "}
            <strong>{dateRange}</strong>.
          </p>

          <button
            className="generate-report-button"
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="button-spinner"></span>
                Generating...
              </>
            ) : (
              <>
                Generate Report
                <span>→</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* REPORT PREVIEW */}
      <section className="report-preview panel">
        <div className="preview-header">
          <div>
            <div className="preview-title-row">
              <h2>Report Preview</h2>

              <span className="metric-count">
                {filteredRows.length} metrics
              </span>
            </div>

            <p>
              {reportType} · {dateRange} · {warehouseArea}
            </p>
          </div>

          <div className="preview-actions">
            <button
              className="secondary-button"
              onClick={handlePrint}
            >
              <span>⎙</span>
              Print
            </button>

            <button
              className="download-button"
              onClick={handleDownloadCSV}
            >
              <span>↓</span>
              Download CSV
            </button>
          </div>
        </div>

        <div className="preview-table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Current Value</th>
                <th>Status</th>
                <th>Trend</th>
              </tr>
            </thead>

            <tbody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => (
                  <tr key={row.metric}>
                    <td>
                      <strong>{row.metric}</strong>
                    </td>

                    <td className="table-value">
                      {row.value}
                    </td>

                    <td>
                      <span
                        className={`table-status ${row.status.toLowerCase()}`}
                      >
                        <span></span>
                        {row.status}
                      </span>
                    </td>

                    <td
                      className={
                        row.trend.startsWith("-")
                          ? "trend negative"
                          : row.trend === "0"
                          ? "trend neutral"
                          : "trend positive"
                      }
                    >
                      {row.trend}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="empty-preview"
                  >
                    No metrics match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* RECENT REPORTS */}
      <section className="recent-reports panel">
        <div className="recent-header">
          <div>
            <h2>Recent Reports</h2>
            <p>
              Previously generated warehouse reports.
            </p>
          </div>

          <span className="recent-count">
            {recentReports.length} recent
          </span>
        </div>

        <div className="recent-list">
          {recentReports.map((report) => (
            <div
              className="recent-report-item"
              key={report.id}
            >
              <div className="recent-report-icon">
                ▤
              </div>

              <div className="recent-report-info">
                <strong>{report.name}</strong>

                <span>
                  {report.range} · {report.area}
                </span>
              </div>

              <div className="recent-report-date">
                {report.date}
              </div>

              <span className="recent-report-status">
                <span></span>
                {report.status}
              </span>

              <button
                className="recent-download"
                onClick={handleDownloadCSV}
                title="Download report"
              >
                ↓
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Reports;