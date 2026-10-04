import { useContext } from 'react';
import { RegistrationContext } from './RegistrationContextType';

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};
