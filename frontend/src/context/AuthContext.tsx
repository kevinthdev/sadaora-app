import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { IUser } from "../types";

interface AuthContextType {
  user: IUser | null;
  setUser: (user: IUser) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const fetchUserProfile = () => {
    api.get("users/profile").then((res) => {
      if (res.data) {
        setUser({ ...res.data.profile });
      }
    });
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUserProfile();
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    if (res.data) {
      setUser({ id: res.data.id, name: res.data.name });
      await localStorage.setItem("token", JSON.stringify(res.data.token));
      fetchUserProfile();
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await api.post("/auth/signup", { name, email, password });
    if (res.data) {
      setUser({ id: res.data.id, name: res.data.name });
      localStorage.setItem("token", JSON.stringify(res.data.token));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
