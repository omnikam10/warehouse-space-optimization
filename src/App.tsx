import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import AppLayout from "./components/layout/AppLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import MapHeatmaps from "./pages/MapHeatmaps";
import Analytics from "./pages/Analytics";
import AisleView from "./pages/AisleView";
import ZoneManagement from "./pages/ZoneManagement";
import CameraFeeds from "./pages/CameraFeeds";
import Recommendations from "./pages/Recommendations";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ========================= */}
          {/* PUBLIC ROUTE */}
          {/* ========================= */}

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* ========================= */}
          {/* PROTECTED APPLICATION */}
          {/* ========================= */}

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />

              <Route path="/map-heatmaps" element={<MapHeatmaps />} />

              <Route path="/analytics" element={<Analytics />} />

              <Route path="/aisle-view" element={<AisleView />} />

              <Route path="/zone-management" element={<ZoneManagement />} />

              <Route path="/camera-feeds" element={<CameraFeeds />} />

              <Route path="/recommendations" element={<Recommendations />} />

              <Route path="/alerts" element={<Alerts />} />

              <Route path="/reports" element={<Reports />} />

              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* ========================= */}
          {/* FALLBACK */}
          {/* ========================= */}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
