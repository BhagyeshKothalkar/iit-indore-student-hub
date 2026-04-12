import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { professorProfile, studentProfile } from "@/data/mockData";

export type UserRole = "student" | "professor";

type SessionUser =
  | (typeof studentProfile & { role: "student"; idLabel: string; idValue: string })
  | (typeof professorProfile & { role: "professor"; idLabel: string; idValue: string });

interface AuthContextValue {
  user: SessionUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "iit-indore-student-hub-role";

const buildUser = (role: UserRole): SessionUser =>
  role === "student"
    ? { ...studentProfile, role, idLabel: "Roll No.", idValue: studentProfile.rollNo }
    : { ...professorProfile, role, idLabel: "Employee ID", idValue: professorProfile.employeeId };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const storedRole = window.localStorage.getItem(STORAGE_KEY) as UserRole | null;
    if (storedRole === "student" || storedRole === "professor") {
      setUser(buildUser(storedRole));
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (role) => {
        window.localStorage.setItem(STORAGE_KEY, role);
        setUser(buildUser(role));
      },
      logout: () => {
        window.localStorage.removeItem(STORAGE_KEY);
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
