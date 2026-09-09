import {
  Bell,
  Menu,
  Moon,
  Search,
  Sun,
} from "lucide-react";

interface TopBarProps {
  isDark: boolean;
  onThemeToggle: () => void;
  onMobileMenu: () => void;
}

function TopBar({
  isDark,
  onThemeToggle,
  onMobileMenu,
}: TopBarProps) {
  return (
    <header className="mb-6 flex items-center gap-4">
      {/* Mobile menu */}
      <button
        onClick={onMobileMenu}
        className="
          glass
          interactive
          flex
          h-12
          w-12
          items-center
          justify-center
          lg:hidden
        "
      >
        <Menu size={20} />
      </button>

      {/* Page heading area */}
      <div className="flex-1">
        <p className="text-sm text-muted">
          Warehouse Space Optimization
        </p>

        <h1 className="mt-1 text-2xl font-semibold">
          Operations Overview
        </h1>
      </div>

      {/* Search */}
      <button
        className="
          glass
          interactive
          flex
          h-12
          w-12
          items-center
          justify-center
        "
      >
        <Search size={20} />
      </button>

      {/* Notifications */}
      <button
        className="
          glass
          interactive
          relative
          flex
          h-12
          w-12
          items-center
          justify-center
        "
      >
        <Bell size={20} />

        <span
          className="
            absolute
            right-2
            top-2
            h-2
            w-2
            rounded-full
            bg-[#ff4545]
          "
        />
      </button>

      {/* Theme */}
      <button
        onClick={onThemeToggle}
        className="
          glass
          interactive
          flex
          h-12
          w-12
          items-center
          justify-center
        "
          title={
            isDark
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
      >
        {isDark ? (
          <Sun size={19} />
        ) : (
          <Moon size={19} />
        )}
      </button>
    </header>
  );
}

export default TopBar;