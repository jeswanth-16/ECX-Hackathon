import { createContext } from 'react';

export interface RegistrationContextType {
  openRegistration: () => void;
  isModalOpen: boolean;
  closeModal: () => void;
  formUrl: string;
}

export const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);
