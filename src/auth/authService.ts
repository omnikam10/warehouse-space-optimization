export type UserRole =
  | "admin"
  | "manager"
  | "operator";

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  role: UserRole;
}

interface StoredUser {
  id: string;
  username: string;
  password: string;
  name: string;
  role: UserRole;
}

interface AuthSession {
  user: AuthUser;
  expiresAt: number;
}

const SESSION_STORAGE_KEY =
  "warehouse_auth_session";

const USERS_STORAGE_KEY =
  "warehouse_users";


/* =========================================================
   DEFAULT USER
   ========================================================= */

const DEFAULT_USERS: StoredUser[] = [
  {
    id: "1",
    username: "admin",
    password: "Admin@123",
    name: "Administrator",
    role: "admin",
  },
];


/* =========================================================
   GET STORED USERS
   ========================================================= */

function getStoredUsers(): StoredUser[] {
  try {
    const stored = localStorage.getItem(
      USERS_STORAGE_KEY
    );

    /*
     * First time application is opened:
     * create the default admin user.
     */
    if (!stored) {
      localStorage.setItem(
        USERS_STORAGE_KEY,
        JSON.stringify(DEFAULT_USERS)
      );

      return DEFAULT_USERS;
    }

    const users: StoredUser[] =
      JSON.parse(stored);

    if (!Array.isArray(users)) {
      return DEFAULT_USERS;
    }

    return users;
  } catch {
    return DEFAULT_USERS;
  }
}


/* =========================================================
   SAVE USERS
   ========================================================= */

function saveUsers(
  users: StoredUser[]
): void {
  localStorage.setItem(
    USERS_STORAGE_KEY,
    JSON.stringify(users)
  );
}


/* =========================================================
   CREATE NEW USER
   ========================================================= */

export function createUser(
  username: string,
  password: string,
  name: string,
  role: UserRole = "operator"
): {
  success: boolean;
  message: string;
} {
  const cleanUsername =
    username.trim();

  const cleanName =
    name.trim();

  /*
   * Validate username
   */
  if (!cleanUsername) {
    return {
      success: false,
      message: "Username is required.",
    };
  }

  /*
   * Validate name
   */
  if (!cleanName) {
    return {
      success: false,
      message: "Full name is required.",
    };
  }

  /*
   * Validate password
   */
  if (!password) {
    return {
      success: false,
      message: "Password is required.",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      message:
        "Password must be at least 6 characters.",
    };
  }


  const users = getStoredUsers();


  /*
   * Check whether username already exists.
   */
  const usernameExists =
    users.some(
      (user) =>
        user.username.toLowerCase() ===
        cleanUsername.toLowerCase()
    );


  if (usernameExists) {
    return {
      success: false,
      message:
        "This username is already registered.",
    };
  }


  /*
   * Create new user.
   */
  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    username: cleanUsername,
    password,
    name: cleanName,
    role,
  };


  users.push(newUser);

  saveUsers(users);


  return {
    success: true,
    message:
      "Account created successfully.",
  };
}


/* =========================================================
   LOGIN
   ========================================================= */

export function loginUser(
  username: string,
  password: string,
  rememberMe: boolean
): AuthUser | null {

  const normalizedUsername =
    username.trim();

  const users = getStoredUsers();


  const matchedUser =
    users.find(
      (user) =>
        user.username.toLowerCase() ===
          normalizedUsername.toLowerCase() &&
        user.password === password
    );


  if (!matchedUser) {
    return null;
  }


  const user: AuthUser = {
    id: matchedUser.id,
    username: matchedUser.username,
    name: matchedUser.name,
    role: matchedUser.role,
  };


  /*
   * Normal session:
   * 8 hours
   *
   * Remember me:
   * 30 days
   */

  const sessionDuration =
    rememberMe
      ? 30 * 24 * 60 * 60 * 1000
      : 8 * 60 * 60 * 1000;


  const session: AuthSession = {
    user,
    expiresAt:
      Date.now() + sessionDuration,
  };


  localStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify(session)
  );


  return user;
}


/* =========================================================
   GET STORED SESSION
   ========================================================= */

export function getStoredSession():
  | AuthSession
  | null {

  try {

    const stored =
      localStorage.getItem(
        SESSION_STORAGE_KEY
      );


    if (!stored) {
      return null;
    }


    const session: AuthSession =
      JSON.parse(stored);


    /*
     * Session expired
     */

    if (
      Date.now() >=
      session.expiresAt
    ) {

      localStorage.removeItem(
        SESSION_STORAGE_KEY
      );

      return null;
    }


    return session;

  } catch {

    localStorage.removeItem(
      SESSION_STORAGE_KEY
    );

    return null;
  }
}


/* =========================================================
   GET CURRENT USER
   ========================================================= */

export function getCurrentUser():
  | AuthUser
  | null {

  const session =
    getStoredSession();

  return (
    session?.user ?? null
  );
}


/* =========================================================
   LOGOUT
   ========================================================= */

export function logoutUser(): void {

  localStorage.removeItem(
    SESSION_STORAGE_KEY
  );
}


/* =========================================================
   CHECK AUTHENTICATION
   ========================================================= */

export function isAuthenticated():
  boolean {

  return (
    getStoredSession() !== null
  );
}