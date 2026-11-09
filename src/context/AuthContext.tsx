import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  register: (data: Omit<User, "id">) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "noire_users";
const SESSION_KEY = "noire_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem(SESSION_KEY);

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = (data: Omit<User, "id">) => {
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    const exists = users.some(
      (item) => item.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (exists) {
      throw new Error("این ایمیل قبلاً ثبت‌نام کرده است.");
    }

    const newUser: User = {
      ...data,
      id: crypto.randomUUID(),
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = (email: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    const foundUser = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password,
    );

    if (!foundUser) {
      return false;
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(foundUser));
    setUser(foundUser);

    return true;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
