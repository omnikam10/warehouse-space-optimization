import {
  useEffect,
  useState,
} from "react";

import { Outlet } from "react-router-dom";

import BackgroundVideo from "../background/BackgroundVideo";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";


function AppLayout() {
  /* =========================================
     THEME STATE
  ========================================= */

  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem(
        "warehouse-theme"
      ) === "dark"
    );
  });


  /* =========================================
     SIDEBAR STATE
  ========================================= */

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);


  /* =========================================
     MOBILE MENU STATE
  ========================================= */

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);


  /* =========================================
     APPLY THEME
  ========================================= */

  useEffect(() => {
    /*
     * Add/remove the dark-mode class
     * from the body.
     *
     * Your index.css already contains:
     *
     * .dark-mode {
     *   --glass-bg: ...
     *   --text-main: ...
     * }
     *
     * Therefore all components using
     * these CSS variables will update.
     */

    document.body.classList.toggle(
      "dark-mode",
      isDark
    );


    /*
     * Remember the selected theme.
     */

    localStorage.setItem(
      "warehouse-theme",
      isDark ? "dark" : "light"
    );


    /*
     * Cleanup is not strictly required here,
     * but this ensures the class is removed if
     * the layout is ever unmounted.
     */

    return () => {
      document.body.classList.remove(
        "dark-mode"
      );
    };
  }, [isDark]);


  /* =========================================
     THEME TOGGLE
  ========================================= */

  const handleThemeToggle = () => {
    setIsDark(
      (current) => !current
    );
  };


  /* =========================================
     RENDER
  ========================================= */

  return (
    <main className="app-shell">

      {/* =====================================
          FIXED BACKGROUND VIDEO
      ===================================== */}

      <BackgroundVideo
        isDark={isDark}
      />


      {/* =====================================
          FIXED DESKTOP SIDEBAR
      ===================================== */}

      <aside
        className={`app-sidebar ${
          sidebarCollapsed
            ? "app-sidebar-collapsed"
            : ""
        }`}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() =>
            setSidebarCollapsed(
              (current) => !current
            )
          }
        />
      </aside>


      {/* =====================================
          MOBILE SIDEBAR
      ===================================== */}

      {mobileMenuOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={() =>
            setMobileMenuOpen(false)
          }
        >

          <div
            className="mobile-sidebar-container"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <Sidebar
              collapsed={false}
              onToggle={() =>
                setMobileMenuOpen(false)
              }
            />

          </div>

        </div>
      )}


      {/* =====================================
          RIGHT APPLICATION AREA
      ===================================== */}

      <section
        className={`app-content ${
          sidebarCollapsed
            ? "app-content-expanded"
            : ""
        }`}
      >

        {/* ===================================
            TOP BAR
        =================================== */}

        <div className="app-topbar">

          <TopBar
            isDark={isDark}
            onThemeToggle={
              handleThemeToggle
            }
            onMobileMenu={() =>
              setMobileMenuOpen(true)
            }
          />

        </div>


        {/* ===================================
            ONLY THIS AREA SCROLLS
        =================================== */}

        <div className="app-scroll-area">

          <div className="app-page-content">

            <Outlet />

          </div>

        </div>

      </section>

    </main>
  );
}


export default AppLayout;