import React, { createContext, useState, useContext, useEffect } from "react";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  isLoadingPublicSettings: boolean;
  authError: { type: string; message: string } | null;
  appPublicSettings: any;
  logout: (shouldRedirect?: boolean) => void;
  navigateToLogin: () => void;
  checkAppState: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      setIsLoadingPublicSettings(true);
      setAuthError(null);

      const appId = import.meta.env.VITE_APP_ID;
      const token = localStorage.getItem("auth_token");

      const headers = { "X-App-Id": appId };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch(
        `/api/apps/public/prod/public-settings/by-id/${appId}`,
        { headers }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 403 && errorData?.extra_data?.reason) {
          const reason = errorData.extra_data.reason;
          setAuthError({
            type: reason,
            message:
              reason === "auth_required"
                ? "Authentication required"
                : reason === "user_not_registered"
                ? "User not registered for this app"
                : errorData.message,
          });
        } else {
          setAuthError({
            type: "unknown",
            message: errorData.message || "Failed to load app",
          });
        }

        setIsLoadingPublicSettings(false);
        setIsLoadingAuth(false);
        return;
      }

      const publicSettings = await response.json();
      setAppPublicSettings(publicSettings);

      if (token) {
        await checkUserAuth();
      } else {
        setIsAuthenticated(false);
        setIsLoadingAuth(false);
      }

      setIsLoadingPublicSettings(false);
    } catch (error) {
      console.error("Unexpected error:", error);
      setAuthError({
        type: "unknown",
        message: error.message || "An unexpected error occurred",
      });
      setIsLoadingPublicSettings(false);
      setIsLoadingAuth(false);
    }
  };

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      const token = localStorage.getItem("auth_token");

      const response = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok)
        throw Object.assign(new Error(), { status: response.status });

      const currentUser = await response.json();
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("User auth check failed:", error);
      setIsAuthenticated(false);

      if (error.status === 401 || error.status === 403) {
        setAuthError({
          type: "auth_required",
          message: "Authentication required",
        });
      }
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logout = (shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth_token");

    if (shouldRedirect) {
      const returnUrl = encodeURIComponent(window.location.href);
      window.location.href = `/login?returnUrl=${returnUrl}`;
    }
  };

  const navigateToLogin = () => {
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `/login?returnUrl=${returnUrl}`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
        logout,
        navigateToLogin,
        checkAppState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
