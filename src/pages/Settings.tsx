import { useEffect, useMemo, useState } from "react";
import "./settings.css";

type SettingsState = {
  emailAlerts: boolean;
  pushNotifications: boolean;
  soundAlerts: boolean;
  overcrowdingAlerts: boolean;
  maintenanceAlerts: boolean;

  updateInterval: number;
  heatmapRefresh: number;
  autoZoomOnAlert: boolean;
  showZoneLabels: boolean;
  trackingAccuracy: "High" | "Medium" | "Low";

  showTimestamps: boolean;
  compactView: boolean;
  showMetrics: boolean;
  animateUpdates: boolean;

  dataRetention: number;
  maxConcurrentUsers: number;
  enableAuditLog: boolean;
  backupFrequency: "Daily" | "Weekly" | "Monthly";
};

type Camera = {
  id: number;
  name: string;
  location: string;
  status: "online" | "offline";
  resolution: string;
  lastChecked: string;
};

const DEFAULT_SETTINGS: SettingsState = {
  emailAlerts: false,
  pushNotifications: false,
  soundAlerts: false,
  overcrowdingAlerts: false,
  maintenanceAlerts: false,

  updateInterval: 2,
  heatmapRefresh: 5,
  autoZoomOnAlert: false,
  showZoneLabels: false,
  trackingAccuracy: "High",

  showTimestamps: true,
  compactView: false,
  showMetrics: true,
  animateUpdates: false,

  dataRetention: 30,
  maxConcurrentUsers: 10,
  enableAuditLog: false,
  backupFrequency: "Daily",
};

const DEFAULT_CAMERAS: Camera[] = [
  {
    id: 1,
    name: "Loading Dock Camera 1",
    location: "Loading Dock",
    status: "online",
    resolution: "1080P",
    lastChecked: "Just now",
  },
  {
    id: 2,
    name: "Canteen Overview",
    location: "Canteen",
    status: "online",
    resolution: "1080P",
    lastChecked: "Just now",
  },
  {
    id: 3,
    name: "Storage Area North",
    location: "Storage North",
    status: "offline",
    resolution: "720P",
    lastChecked: "4 min ago",
  },
  {
    id: 4,
    name: "Packaging Zone Main",
    location: "Packaging",
    status: "online",
    resolution: "1080P",
    lastChecked: "Just now",
  },
];

const SETTINGS_STORAGE_KEY = "warehouseSystemSettings";
const CAMERAS_STORAGE_KEY = "warehouseCameras";

function Settings() {
  const [settings, setSettings] =
    useState<SettingsState>(DEFAULT_SETTINGS);

  const [savedSettings, setSavedSettings] =
    useState<SettingsState>(DEFAULT_SETTINGS);

  const [cameras, setCameras] =
    useState<Camera[]>(DEFAULT_CAMERAS);

  const [savedCameras, setSavedCameras] =
    useState<Camera[]>(DEFAULT_CAMERAS);

  const [showSavedMessage, setShowSavedMessage] =
    useState(false);

  const [showResetConfirm, setShowResetConfirm] =
    useState(false);

  const [showAddCamera, setShowAddCamera] =
    useState(false);

  const [newCameraName, setNewCameraName] =
    useState("");

  const [newCameraLocation, setNewCameraLocation] =
    useState("");

  const [newCameraResolution, setNewCameraResolution] =
    useState("1080P");

  const [lastUpdated, setLastUpdated] =
    useState(new Date());

  /*
   * ============================================================
   * LOAD SETTINGS
   * ============================================================
   */

  useEffect(() => {
    try {
      const storedSettings =
        localStorage.getItem(SETTINGS_STORAGE_KEY);

      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);

        const loadedSettings: SettingsState = {
          ...DEFAULT_SETTINGS,
          ...parsed,
        };

        setSettings(loadedSettings);
        setSavedSettings(loadedSettings);
      }

      const storedCameras =
        localStorage.getItem(CAMERAS_STORAGE_KEY);

      if (storedCameras) {
        const parsedCameras = JSON.parse(storedCameras);

        setCameras(parsedCameras);
        setSavedCameras(parsedCameras);
      }
    } catch (error) {
      console.error("Unable to load system settings:", error);
    }
  }, []);

  /*
   * ============================================================
   * DARK MODE
   *
   * Keep this compatible with the application's existing
   * dark-mode class.
   * ============================================================
   */

  /*
   * ============================================================
   * LIVE LAST UPDATED
   * ============================================================
   */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLastUpdated(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  /*
   * ============================================================
   * UNSAVED CHANGES
   * ============================================================
   */

  const hasChanges = useMemo(() => {
    return (
      JSON.stringify(settings) !==
        JSON.stringify(savedSettings) ||
      JSON.stringify(cameras) !==
        JSON.stringify(savedCameras)
    );
  }, [
    settings,
    savedSettings,
    cameras,
    savedCameras,
  ]);

  /*
   * ============================================================
   * UPDATE SETTING
   * ============================================================
   */

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setShowSavedMessage(false);
  };

  /*
   * ============================================================
   * SAVE
   * ============================================================
   */

  const handleSave = () => {
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify(settings)
    );

    localStorage.setItem(
      CAMERAS_STORAGE_KEY,
      JSON.stringify(cameras)
    );

    setSavedSettings(settings);
    setSavedCameras(cameras);

    setLastUpdated(new Date());
    setShowSavedMessage(true);

    window.setTimeout(() => {
      setShowSavedMessage(false);
    }, 3500);
  };

  /*
   * ============================================================
   * RESET
   * ============================================================
   */

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setSavedSettings(DEFAULT_SETTINGS);

    setCameras(DEFAULT_CAMERAS);
    setSavedCameras(DEFAULT_CAMERAS);

    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify(DEFAULT_SETTINGS)
    );

    localStorage.setItem(
      CAMERAS_STORAGE_KEY,
      JSON.stringify(DEFAULT_CAMERAS)
    );

    localStorage.setItem("darkMode", "false");

    setShowResetConfirm(false);
    setShowSavedMessage(true);
    setLastUpdated(new Date());

    window.setTimeout(() => {
      setShowSavedMessage(false);
    }, 3500);
  };

  /*
   * ============================================================
   * CAMERA
   * ============================================================
   */

  const handleAddCamera = () => {
    if (!newCameraName.trim()) {
      return;
    }

    const newCamera: Camera = {
      id: Date.now(),
      name: newCameraName.trim(),
      location:
        newCameraLocation.trim() || "Unassigned",
      status: "online",
      resolution: newCameraResolution,
      lastChecked: "Just now",
    };

    setCameras((current) => [
      ...current,
      newCamera,
    ]);

    setNewCameraName("");
    setNewCameraLocation("");
    setNewCameraResolution("1080P");
    setShowAddCamera(false);
    setShowSavedMessage(false);
  };

  const handleDeleteCamera = (id: number) => {
    setCameras((current) =>
      current.filter((camera) => camera.id !== id)
    );

    setShowSavedMessage(false);
  };

  const toggleCameraStatus = (id: number) => {
    setCameras((current) =>
      current.map((camera) =>
        camera.id === id
          ? {
              ...camera,
              status:
                camera.status === "online"
                  ? "offline"
                  : "online",
              lastChecked: "Just now",
            }
          : camera
      )
    );

    setShowSavedMessage(false);
  };

  /*
   * ============================================================
   * HELPERS
   * ============================================================
   */

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const onlineCameras = cameras.filter(
    (camera) => camera.status === "online"
  ).length;

  return (
    <div className="settings-page">

      {/* ========================================================
          PAGE HEADER
         ======================================================== */}

      <div className="settings-page-header">

        <div>
          <div className="settings-breadcrumb">
            Warehouse Space Optimization
            <span>›</span>
            Settings
          </div>

          <h1>Settings</h1>

          <p>
            Configure system preferences and monitoring
            settings for your warehouse.
          </p>
        </div>

        <div className="settings-header-status">
          <span className="settings-live-dot" />
          <span>Live monitoring</span>
        </div>

      </div>

      {/* ========================================================
          SAVE MESSAGE
         ======================================================== */}

      {showSavedMessage && (
        <div className="settings-save-message">
          <span className="save-message-icon">✓</span>

          <div>
            <strong>Settings saved successfully</strong>
            <span>
              Your warehouse monitoring preferences
              have been updated.
            </span>
          </div>
        </div>
      )}

      {/* ========================================================
          UNSAVED CHANGES
         ======================================================== */}

      {hasChanges && (
        <div className="unsaved-banner">
          <div className="unsaved-info">
            <span className="unsaved-dot" />

            <div>
              <strong>Unsaved changes</strong>
              <span>
                You have changes that have not been saved yet.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
          >
            Save changes
          </button>
        </div>
      )}

      {/* ========================================================
          SETTINGS GRID
         ======================================================== */}

      <div className="settings-grid">

        {/* ======================================================
            NOTIFICATIONS
           ====================================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon notification">
              <span>!</span>
            </div>

            <div>
              <h2>Notifications & Alerts</h2>

              <p>
                Control how operational alerts are delivered.
              </p>
            </div>

          </div>

          <div className="settings-options">

            <ToggleRow
              label="Email Alerts"
              description="Receive alerts by email"
              checked={settings.emailAlerts}
              onChange={(value) =>
                updateSetting("emailAlerts", value)
              }
            />

            <ToggleRow
              label="Push Notifications"
              description="Receive browser notifications"
              checked={settings.pushNotifications}
              onChange={(value) =>
                updateSetting(
                  "pushNotifications",
                  value
                )
              }
            />

            <ToggleRow
              label="Sound Alerts"
              description="Play sound for critical alerts"
              checked={settings.soundAlerts}
              onChange={(value) =>
                updateSetting("soundAlerts", value)
              }
            />

            <ToggleRow
              label="Overcrowding Alerts"
              description="Alert when occupancy exceeds limits"
              checked={settings.overcrowdingAlerts}
              onChange={(value) =>
                updateSetting(
                  "overcrowdingAlerts",
                  value
                )
              }
            />

            <ToggleRow
              label="Maintenance Alerts"
              description="Notify about equipment maintenance"
              checked={settings.maintenanceAlerts}
              onChange={(value) =>
                updateSetting(
                  "maintenanceAlerts",
                  value
                )
              }
            />

          </div>
        </section>

        {/* ======================================================
            MONITORING
           ====================================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon monitoring">
              <span>◌</span>
            </div>

            <div>
              <h2>Monitoring Settings</h2>

              <p>
                Configure live warehouse monitoring behaviour.
              </p>
            </div>

          </div>

          <div className="settings-fields">

            <NumberField
              label="Update Interval"
              description="How often live data is refreshed"
              value={settings.updateInterval}
              suffix="sec"
              min={1}
              max={60}
              onChange={(value) =>
                updateSetting("updateInterval", value)
              }
            />

            <NumberField
              label="Heatmap Refresh"
              description="How often heatmap data refreshes"
              value={settings.heatmapRefresh}
              suffix="sec"
              min={1}
              max={60}
              onChange={(value) =>
                updateSetting("heatmapRefresh", value)
              }
            />

            <ToggleRow
              label="Auto-zoom on Alert"
              description="Automatically focus on alert locations"
              checked={settings.autoZoomOnAlert}
              onChange={(value) =>
                updateSetting(
                  "autoZoomOnAlert",
                  value
                )
              }
            />

            <ToggleRow
              label="Show Zone Labels"
              description="Display names on warehouse zones"
              checked={settings.showZoneLabels}
              onChange={(value) =>
                updateSetting(
                  "showZoneLabels",
                  value
                )
              }
            />

            <SelectField
              label="Tracking Accuracy"
              description="Computer vision tracking precision"
              value={settings.trackingAccuracy}
              options={[
                "High",
                "Medium",
                "Low",
              ]}
              onChange={(value) =>
                updateSetting(
                  "trackingAccuracy",
                  value as SettingsState["trackingAccuracy"]
                )
              }
            />

          </div>
        </section>

        {/* ======================================================
            DISPLAY
           ====================================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon display">
              <span>☼</span>
            </div>

            <div>
              <h2>Display Preferences</h2>

              <p>
                Personalize the warehouse monitoring interface.
              </p>
            </div>

          </div>

          <div className="settings-options">

            <ToggleRow
              label="Show Timestamps"
              description="Display timestamps on live events"
              checked={settings.showTimestamps}
              onChange={(value) =>
                updateSetting(
                  "showTimestamps",
                  value
                )
              }
            />

            <ToggleRow
              label="Compact View"
              description="Reduce spacing throughout the interface"
              checked={settings.compactView}
              onChange={(value) =>
                updateSetting(
                  "compactView",
                  value
                )
              }
            />

            <ToggleRow
              label="Show Metrics"
              description="Display monitoring metrics and statistics"
              checked={settings.showMetrics}
              onChange={(value) =>
                updateSetting(
                  "showMetrics",
                  value
                )
              }
            />

            <ToggleRow
              label="Animate Updates"
              description="Animate live monitoring changes"
              checked={settings.animateUpdates}
              onChange={(value) =>
                updateSetting(
                  "animateUpdates",
                  value
                )
              }
            />

          </div>
        </section>

        {/* ======================================================
            SYSTEM CONFIGURATION
           ====================================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon system">
              <span>⚙</span>
            </div>

            <div>
              <h2>System Configuration</h2>

              <p>
                Manage data retention and system behaviour.
              </p>
            </div>

          </div>

          <div className="settings-fields">

            <NumberField
              label="Data Retention"
              description="Keep monitoring records for"
              value={settings.dataRetention}
              suffix="days"
              min={1}
              max={3650}
              onChange={(value) =>
                updateSetting(
                  "dataRetention",
                  value
                )
              }
            />

            <NumberField
              label="Max Concurrent Users"
              description="Maximum simultaneous users"
              value={settings.maxConcurrentUsers}
              suffix="users"
              min={1}
              max={500}
              onChange={(value) =>
                updateSetting(
                  "maxConcurrentUsers",
                  value
                )
              }
            />

            <ToggleRow
              label="Enable Audit Log"
              description="Record configuration and user actions"
              checked={settings.enableAuditLog}
              onChange={(value) =>
                updateSetting(
                  "enableAuditLog",
                  value
                )
              }
            />

            <SelectField
              label="Backup Frequency"
              description="Frequency of system backups"
              value={settings.backupFrequency}
              options={[
                "Daily",
                "Weekly",
                "Monthly",
              ]}
              onChange={(value) =>
                updateSetting(
                  "backupFrequency",
                  value as SettingsState["backupFrequency"]
                )
              }
            />

          </div>
        </section>

      </div>

      {/* ========================================================
          CAMERA MANAGEMENT
         ======================================================== */}

      <section className="settings-card camera-management">

        <div className="camera-management-header">

          <div className="settings-card-header">

            <div className="settings-card-icon camera">
              <span>▣</span>
            </div>

            <div>
              <h2>Camera Management</h2>

              <p>
                Manage warehouse cameras and monitoring feeds.
              </p>
            </div>

          </div>

          <div className="camera-summary">

            <span className="camera-summary-online">
              <i />
              {onlineCameras} online
            </span>

            <span>
              {cameras.length} total
            </span>

          </div>

        </div>

        <div className="camera-table">

          <div className="camera-table-header">

            <span>Camera</span>
            <span>Location</span>
            <span>Status</span>
            <span>Resolution</span>
            <span>Last Checked</span>
            <span>Actions</span>

          </div>

          {cameras.map((camera) => (

            <div
              className="camera-table-row"
              key={camera.id}
            >

              <div className="camera-name">

                <div className="camera-mini-icon">
                  ▣
                </div>

                <strong>{camera.name}</strong>

              </div>

              <span className="camera-location">
                {camera.location}
              </span>

              <button
                type="button"
                className={`camera-status ${
                  camera.status
                }`}
                onClick={() =>
                  toggleCameraStatus(camera.id)
                }
                title="Toggle camera status"
              >
                <i />
                {camera.status}
              </button>

              <span className="camera-resolution">
                {camera.resolution}
              </span>

              <span className="camera-last-check">
                {camera.lastChecked}
              </span>

              <div className="camera-actions">

                <button
                  type="button"
                  className="camera-action-button"
                  onClick={() =>
                    toggleCameraStatus(camera.id)
                  }
                >
                  {camera.status === "online"
                    ? "Disable"
                    : "Enable"}
                </button>

                <button
                  type="button"
                  className="camera-delete-button"
                  onClick={() =>
                    handleDeleteCamera(camera.id)
                  }
                  aria-label={`Delete ${camera.name}`}
                >
                  ×
                </button>

              </div>

            </div>

          ))}

          {cameras.length === 0 && (
            <div className="camera-empty">
              <span>▣</span>
              <strong>No cameras configured</strong>
              <p>
                Add a camera to start monitoring this warehouse.
              </p>
            </div>
          )}

        </div>

        {/* ======================================================
            ADD CAMERA
           ====================================================== */}

        {showAddCamera && (

          <div className="add-camera-panel">

            <div className="add-camera-header">

              <div>
                <h3>Add Camera</h3>

                <p>
                  Configure a new warehouse monitoring camera.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAddCamera(false)
                }
              >
                ×
              </button>

            </div>

            <div className="add-camera-fields">

              <label>
                <span>Camera Name</span>

                <input
                  type="text"
                  value={newCameraName}
                  onChange={(event) =>
                    setNewCameraName(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Loading Dock Camera 2"
                />
              </label>

              <label>
                <span>Location</span>

                <input
                  type="text"
                  value={newCameraLocation}
                  onChange={(event) =>
                    setNewCameraLocation(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Loading Dock"
                />
              </label>

              <label>
                <span>Resolution</span>

                <select
                  value={newCameraResolution}
                  onChange={(event) =>
                    setNewCameraResolution(
                      event.target.value
                    )
                  }
                >
                  <option value="1080P">1080P</option>
                  <option value="720P">720P</option>
                  <option value="480P">480P</option>
                </select>
              </label>

            </div>

            <div className="add-camera-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setShowAddCamera(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary-button"
                disabled={!newCameraName.trim()}
                onClick={handleAddCamera}
              >
                Add Camera
              </button>

            </div>

          </div>

        )}

        {!showAddCamera && (
          <button
            type="button"
            className="add-camera-button"
            onClick={() =>
              setShowAddCamera(true)
            }
          >
            <span>+</span>
            Add Camera
          </button>
        )}

      </section>

      {/* ========================================================
          SYSTEM STATUS
         ======================================================== */}

      <section className="system-status-card">

        <div className="system-status-left">

          <div className="system-status-icon">
            ✓
          </div>

          <div>
            <strong>System Online</strong>

            <span>
              Warehouse monitoring services are operating normally.
            </span>
          </div>

        </div>

        <div className="system-status-right">

          <div>
            <span>Last updated</span>
            <strong>
              {formatTime(lastUpdated)}
            </strong>
          </div>

          <div>
            <span>Camera availability</span>
            <strong>
              {cameras.length > 0
                ? `${Math.round(
                    (onlineCameras /
                      cameras.length) *
                      100
                  )}%`
                : "0%"}
            </strong>
          </div>

        </div>

      </section>

      {/* ========================================================
          FOOTER ACTIONS
         ======================================================== */}

      <div className="settings-footer">

        <div className="settings-footer-info">

          {hasChanges ? (
            <>
              <span className="footer-warning-dot" />
              <span>
                You have unsaved changes
              </span>
            </>
          ) : (
            <>
              <span className="footer-check">
                ✓
              </span>
              <span>
                All changes are saved
              </span>
            </>
          )}

        </div>

        <div className="settings-footer-actions">

          <button
            type="button"
            className="reset-button"
            onClick={() =>
              setShowResetConfirm(true)
            }
          >
            Reset to Defaults
          </button>

          <button
            type="button"
            className="save-button"
            disabled={!hasChanges}
            onClick={handleSave}
          >
            Save Changes
          </button>

        </div>

      </div>

      {/* ========================================================
          RESET MODAL
         ======================================================== */}

      {showResetConfirm && (

        <div className="settings-modal-backdrop">

          <div className="settings-modal">

            <div className="modal-warning-icon">
              !
            </div>

            <h3>Reset settings?</h3>

            <p>
              This will restore all system preferences
              and camera configuration to their default values.
            </p>

            <div className="modal-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setShowResetConfirm(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="danger-button"
                onClick={handleReset}
              >
                Reset Settings
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/*
 * ================================================================
 * TOGGLE COMPONENT
 * ================================================================
 */

type ToggleRowProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  accent?: "blue";
};

function ToggleRow({
  label,
  description,
  checked,
  onChange,
  accent,
}: ToggleRowProps) {
  return (
    <div className="settings-toggle-row">

      <div className="settings-toggle-info">

        <strong>{label}</strong>

        <span>{description}</span>

      </div>

      <button
        type="button"
        className={`settings-toggle ${
          checked ? "active" : ""
        } ${accent === "blue" ? "blue" : ""}`}
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span />
      </button>

    </div>
  );
}

/*
 * ================================================================
 * NUMBER FIELD
 * ================================================================
 */

type NumberFieldProps = {
  label: string;
  description: string;
  value: number;
  suffix: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

function NumberField({
  label,
  description,
  value,
  suffix,
  min,
  max,
  onChange,
}: NumberFieldProps) {
  return (
    <div className="settings-input-row">

      <div className="settings-input-info">

        <strong>{label}</strong>

        <span>{description}</span>

      </div>

      <div className="number-input-wrapper">

        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(event) => {
            const nextValue =
              Number(event.target.value);

            if (Number.isNaN(nextValue)) {
              return;
            }

            onChange(
              Math.max(
                min,
                Math.min(max, nextValue)
              )
            );
          }}
        />

        <span>{suffix}</span>

      </div>

    </div>
  );
}

/*
 * ================================================================
 * SELECT FIELD
 * ================================================================
 */

type SelectFieldProps = {
  label: string;
  description: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function SelectField({
  label,
  description,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="settings-input-row">

      <div className="settings-input-info">

        <strong>{label}</strong>

        <span>{description}</span>

      </div>

      <select
        className="settings-select"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

    </div>
  );
}

export default Settings;