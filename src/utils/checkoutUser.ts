import { useAuth } from "../context/AuthContext";

export type CheckoutUser = { name?: string; email?: string; phone?: string };

export function useCheckoutUser() {
  const auth = useAuth() as {
    isAuthenticated: boolean;
    user?: CheckoutUser | null;
  };

  return { isAuthenticated: auth.isAuthenticated, user: auth.user ?? null };
}
