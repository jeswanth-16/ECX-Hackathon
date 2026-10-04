import { createContext } from 'react';
import type { AdminUser } from '../types/admin';
import type { AdminLoginInput } from '../services/adminAuth';

export interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AdminLoginInput) => Promise<AdminUser>;
  logout: () => Promise<void>;
}

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);
