import {
  AlertTriangle,
  BarChart3,
  Camera,
  ChevronLeft,
  ChevronRight,
  FileText,
  Grid3X3,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Map,
  Settings,
  UserRound,
  Warehouse,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Map & Heatmaps",
    path: "/map-heatmaps",
    icon: Map,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Aisle View",
    path: "/aisle-view",
    icon: Grid3X3,
  },
  {
    label: "Zone Management",
    path: "/zone-management",
    icon: Warehouse,
  },
  {
    label: "Camera Feeds",
    path: "/camera-feeds",
    icon: Camera,
  },
  {
    label: "Recommendations",
    path: "/recommendations",
    icon: Lightbulb,
  },
  {
    label: "Alerts",
    path: "/alerts",
    icon: AlertTriangle,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileText,
  },
];

function Sidebar({
  collapsed,
  onToggle,
}: SidebarProps) {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  /* =========================================
     LOGOUT
  ========================================= */

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <aside
      className={`
        app-sidebar
        glass
        flex
        h-[calc(100vh-48px)]
        flex-col
        p-4
        transition-all
        duration-400
        ${
          collapsed
            ? "app-sidebar-collapsed w-[88px]"
            : "w-[250px]"
        }
      `}
    >

      {/* =====================================================
          LOGO / BRAND
      ===================================================== */}

      <div
        className={`
          flex
          items-center
          gap-3
          px-3
          py-4
          ${collapsed ? "justify-center" : ""}
        `}
      >

        {/* Warehouse Icon */}

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-black
            text-white
          "
        >
          <Warehouse size={20} />
        </div>


        {/* Brand Text */}

        {!collapsed && (
          <div>
            <div className="text-sm font-semibold">
              Warehouse
            </div>

            <div className="text-xs text-muted">
              Space Optimization
            </div>
          </div>
        )}

      </div>


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="mt-6 flex-1 space-y-2">

        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => `
                flex
                items-center
                gap-3
                rounded-2xl
                px-3
                py-3
                text-sm
                font-medium
                transition-all
                duration-300

                ${
                  isActive
                    ? "bg-white text-black shadow-lg"
                    : "text-main hover:bg-white/30"
                }

                ${
                  collapsed
                    ? "justify-center"
                    : ""
                }
              `}
              title={
                collapsed
                  ? item.label
                  : undefined
              }
            >

              <Icon
                size={19}
                className="shrink-0"
              />

              {!collapsed && (
                <span>
                  {item.label}
                </span>
              )}

            </NavLink>
          );
        })}

      </nav>


      {/* =====================================================
          SETTINGS
      ===================================================== */}

      <div className="mt-3">

        <NavLink
          to="/settings"
          className={({ isActive }) => `
            flex
            w-full
            items-center
            gap-3
            rounded-2xl
            px-3
            py-3
            text-sm
            font-medium
            transition-all
            duration-300
            box-border

            ${
              isActive
                ? "bg-white text-black shadow-lg"
                : "text-main hover:bg-white/30"
            }

            ${
              collapsed
                ? "justify-center"
                : ""
            }
          `}
          title={
            collapsed
              ? "Settings"
              : undefined
          }
        >

          <Settings
            size={19}
            className="shrink-0"
          />

          {!collapsed && (
            <span>
              Settings
            </span>
          )}

        </NavLink>

      </div>


      {/* =====================================================
          USER PROFILE
      ===================================================== */}

      <div
        className={`
          mt-3
          border-t
          border-black/10
          pt-3
          dark-mode:border-white/10
        `}
      >

        {collapsed ? (

          /* -----------------------------------------
             COLLAPSED USER
          ----------------------------------------- */

          <div
            className="
              flex
              items-center
              justify-center
              py-2
            "
            title={
              user
                ? `${user.name} (${user.username})`
                : "User"
            }
          >

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-black
                text-white
              "
            >
              <UserRound size={18} />
            </div>

          </div>

        ) : (

          /* -----------------------------------------
             EXPANDED USER
          ----------------------------------------- */

          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              px-3
              py-2
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-black
                text-white
              "
            >
              <UserRound size={17} />
            </div>


            <div className="min-w-0 flex-1">

              <div
                className="
                  truncate
                  text-xs
                  font-semibold
                  text-main
                "
              >
                {user?.name || "User"}
              </div>

              <div
                className="
                  truncate
                  text-[10px]
                  text-muted
                "
              >
                {user?.username || "user"}
                {" · "}
                {user?.role || "operator"}
              </div>

            </div>

          </div>

        )}

      </div>


      {/* =====================================================
          LOGOUT BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={handleLogout}
        title={
          collapsed
            ? "Logout"
            : undefined
        }
        className={`
          mt-2
          flex
          w-full
          items-center
          gap-3
          rounded-2xl
          px-3
          py-3
          text-sm
          font-medium
          text-red-600
          transition-all
          duration-300
          hover:bg-red-500/10

          ${
            collapsed
              ? "justify-center"
              : ""
          }
        `}
      >

        <LogOut
          size={19}
          className="shrink-0"
        />

        {!collapsed && (
          <span>
            Logout
          </span>
        )}

      </button>


      {/* =====================================================
          COLLAPSE BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={onToggle}
        aria-label={
          collapsed
            ? "Expand sidebar"
            : "Collapse sidebar"
        }
        className="
          interactive
          mt-3
          flex
          h-10
          items-center
          justify-center
          rounded-2xl
          bg-black/5
          transition-all
          duration-300
          hover:bg-black/10
        "
      >

        {collapsed ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        )}

      </button>

    </aside>
  );
}

export default Sidebar;