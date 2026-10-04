import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AdminUser } from '../types/admin';
import { adminAuthService } from '../services/adminAuth';
import type { AdminLoginInput } from '../services/adminAuth';
import { AdminAuthContext } from './AdminAuthContextType';

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = adminAuthService.subscribeToAuthChanges((adminUser) => {
      setUser(adminUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (credentials: AdminLoginInput): Promise<AdminUser> => {
    setIsLoading(true);
    try {
      const authenticatedUser = await adminAuthService.login(credentials);
      setUser(authenticatedUser);
      return authenticatedUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await adminAuthService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
