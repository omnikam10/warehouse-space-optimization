import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";


import {
  useAuth,
} from "./AuthContext";


/*
 * =========================================================
 * PROTECTED ROUTE
 * =========================================================
 *
 * Any route placed inside this component requires the user
 * to be authenticated.
 *
 * Example:
 *
 * <Route element={<ProtectedRoute />}>
 *
 *   <Route
 *     path="/"
 *     element={<Dashboard />}
 *   />
 *
 * </Route>
 *
 * =========================================================
 */

function ProtectedRoute() {

  const {
    isAuthenticated,
    isLoading,
  } = useAuth();


  const location =
    useLocation();


  /*
   * =======================================================
   * SESSION RESTORATION
   * =======================================================
   *
   * When the application first starts, AuthContext needs
   * a moment to check localStorage.
   *
   * Don't redirect to login during that time.
   */

  if (isLoading) {

    return (
      <div className="auth-loading-screen">

        <div className="auth-loading-card">

          <div className="auth-spinner"></div>

          <p>
            Loading warehouse monitor...
          </p>

        </div>

      </div>
    );
  }


  /*
   * =======================================================
   * USER NOT AUTHENTICATED
   * =======================================================
   *
   * Redirect to /login.
   *
   * We also store the current location so that after
   * successful login we can return the user to the page
   * they originally requested.
   */

  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }


  /*
   * =======================================================
   * USER AUTHENTICATED
   * =======================================================
   *
   * <Outlet /> renders whichever protected child route
   * the user requested.
   */

  return (
    <Outlet />
  );
}


export default ProtectedRoute;