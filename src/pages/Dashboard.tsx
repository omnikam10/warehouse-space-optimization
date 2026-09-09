import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Box,
  CheckCircle2,
  Clock3,
  Map,
  Package,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Zone {
  name: string;
  capacity: number;
  people: number;
  percentage: number;
}

const INITIAL_ZONES: Zone[] = [
  {
    name: "Grading Area",
    capacity: 25,
    people: 0,
    percentage: 0,
  },
  {
    name: "Packaging Zone",
    capacity: 60,
    people: 0,
    percentage: 0,
  },
  {
    name: "Canteen",
    capacity: 40,
    people: 0,
    percentage: 0,
  },
  {
    name: "Storage Area",
    capacity: 50,
    people: 0,
    percentage: 0,
  },
  {
    name: "Loading Dock",
    capacity: 45,
    people: 0,
    percentage: 0,
  },
];

function generateZoneData(): Zone[] {
  return INITIAL_ZONES.map((zone) => {
    const people = Math.floor(Math.random() * (zone.capacity + 1));

    const percentage = Math.floor((people / zone.capacity) * 100);

    return {
      ...zone,
      people,
      percentage,
    };
  });
}

function getPercentageClass(percentage: number) {
  if (percentage < 50) {
    return "text-green-600";
  }

  if (percentage <= 80) {
    return "text-yellow-600";
  }

  return "text-red-600";
}

function Dashboard() {
  const navigate = useNavigate();

  const [zones, setZones] = useState<Zone[]>(generateZoneData);

  const [objectsTracked, setObjectsTracked] = useState(
    () => Math.floor(Math.random() * 20) + 5,
  );

  const [lastUpdated, setLastUpdated] = useState(new Date());

  /*
   * Generate new warehouse data every 10 seconds.
   *
   * This preserves the behavior of the original
   * dash2.js file.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setZones(generateZoneData());

      setObjectsTracked(Math.floor(Math.random() * 20) + 5);

      setLastUpdated(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const totalPeople = zones.reduce((total, zone) => total + zone.people, 0);

  const averageUtilization = Math.floor(
    zones.reduce((total, zone) => total + zone.percentage, 0) / zones.length,
  );

  const activeAlerts = zones.filter((zone) => zone.percentage > 80).length;

  const alertZones = zones.filter((zone) => zone.percentage > 80);

  const formattedTime = lastUpdated.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <section className="flex min-h-full flex-col space-y-5 pb-6">
      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/50 px-3 py-1 text-xs font-medium backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Live monitoring
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-sm text-muted">
            Real-time warehouse activity monitoring
          </p>
        </div>

        <div className="text-right text-xs text-muted">
          Last updated: {formattedTime}
        </div>
      </div>

      {/* ==================================================
          SUMMARY CARDS
      ================================================== */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {/* Active People */}

        <div className="glass interactive relative overflow-hidden p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted">Active People</p>

              <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                {totalPeople}
              </h2>

              <p className="mt-2 text-xs text-muted">Across all zones</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
              <Users size={21} />
            </div>
          </div>
        </div>

        {/* Objects Tracked */}

        <div className="glass interactive relative overflow-hidden p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted">Objects Tracked</p>

              <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                {objectsTracked}
              </h2>

              <p className="mt-2 text-xs text-muted">
                Forklifts, pallet, equipment
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-500/10 text-green-600">
              <Box size={21} />
            </div>
          </div>
        </div>

        {/* Average Utilization */}

        <div className="glass interactive relative overflow-hidden p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted">Average Utilization</p>

              <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                {averageUtilization}%
              </h2>

              <p className="mt-2 text-xs text-muted">
                Currently tracking 5 zones
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
              <BarChart3 size={21} />
            </div>
          </div>
        </div>

        {/* Active Alerts */}

        <div className="glass interactive relative overflow-hidden p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted">Active Alerts</p>

              <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                {activeAlerts}
              </h2>

              <p className="mt-2 text-xs text-muted">
                Zones above 80% capacity
              </p>
            </div>

            <div
              className={`
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                ${
                  activeAlerts > 0
                    ? "bg-red-500/10 text-red-500"
                    : "bg-green-500/10 text-green-600"
                }
              `}
            >
              <AlertTriangle size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          ZONES + RECENT ACTIVITY
      ================================================== */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
        {/* Zone Status */}

        <div className="glass p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium">Zone Status Overview</h2>

              <p className="mt-1 text-xs text-muted">
                Current occupancy across monitored zones
              </p>
            </div>

            <Map size={20} className="text-muted" />
          </div>

          <div className="space-y-4">
            {zones.map((zone) => (
              <div key={zone.name}>
                {/* Zone heading */}

                <div className="mb-2 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">{zone.name}</span>

                    <span className="ml-2 text-xs text-muted">
                      ({zone.people} people)
                    </span>
                  </div>

                  <span
                    className={`
                      font-semibold
                      ${getPercentageClass(zone.percentage)}
                    `}
                  >
                    {zone.percentage}%
                  </span>
                </div>

                {/* Progress */}

                <div className="h-2 overflow-hidden rounded-full bg-black/10">
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-blue-500
                      transition-all
                      duration-700
                      ease-out
                    "
                    style={{
                      width: `${zone.percentage}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}

        <div className="glass p-5">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium">Recent Activity</h2>

              <p className="mt-1 text-xs text-muted">Latest warehouse events</p>
            </div>

            <Clock3 size={20} className="text-muted" />
          </div>

          <div className="space-y-3">
            {alertZones.length > 0 ? (
              alertZones.map((zone) => (
                <div
                  key={zone.name}
                  className="
                    flex
                    items-start
                    gap-3
                    rounded-2xl
                    bg-red-500/5
                    p-4
                  "
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                    <Clock3 size={15} />
                  </div>

                  <p className="text-sm leading-5 text-main">
                    {zone.name} ({zone.people} people) reached {zone.percentage}
                    % capacity
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-start gap-3 rounded-2xl bg-green-500/5 p-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                  <CheckCircle2 size={15} />
                </div>

                <p className="text-sm leading-5 text-main">
                  All warehouse zones operating normally
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==================================================
          QUICK ACTIONS
      ================================================== */}

      <div className="glass p-5">
        <div className="mb-3">
          <h2 className="text-lg font-medium">Quick Actions</h2>

          <p className="mt-1 text-xs text-muted">
            Jump directly to frequently used warehouse tools
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/map-heatmaps")}
            className="
              interactive
              flex
              items-center
              gap-2
              rounded-full
              bg-white
              px-5
              py-3
              text-sm
              font-medium
              text-black
              shadow-sm
            "
          >
            <Map size={17} />
            View Live Heatmap
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="
              interactive
              flex
              items-center
              gap-2
              rounded-full
              bg-white/50
              px-5
              py-3
              text-sm
              font-medium
              backdrop-blur-md
            "
          >
            <Package size={17} />
            Generate Report
          </button>

          <button
            onClick={() => navigate("/alerts")}
            className="
              interactive
              flex
              items-center
              gap-2
              rounded-full
              bg-white/50
              px-5
              py-3
              text-sm
              font-medium
              backdrop-blur-md
            "
          >
            <AlertTriangle size={17} />
            Configure Alerts
          </button>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
