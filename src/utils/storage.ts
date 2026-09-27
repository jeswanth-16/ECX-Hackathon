import type { Registration, RegistrationStatus } from '../types';
import { initialMockRegistrations } from '../data/mockRegistrations';

const STORAGE_KEY = 'ecx_hackathon_registrations_v1';
const LAST_REGISTERED_ID_KEY = 'ecx_hackathon_last_reg_id';
const PARTICIPANT_REG_ID_KEY = 'ecx_hackathon_participant_reg_id';

export function getRegistrations(): Registration[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with initial registrations
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockRegistrations));
      return initialMockRegistrations;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialMockRegistrations;
  } catch (e) {
    console.warn('LocalStorage error, falling back to mock data', e);
    return initialMockRegistrations;
  }
}

export function getRegistrationById(id: string): Registration | null {
  if (!id) return null;
  const list = getRegistrations();
  const searchId = id.trim().toUpperCase();
  return list.find(r => r.id.toUpperCase() === searchId) || null;
}

export function getRegistrationByEmail(email: string): Registration | null {
  if (!email) return null;
  const list = getRegistrations();
  const searchEmail = email.trim().toLowerCase();
  return list.find(r => 
    r.email.toLowerCase() === searchEmail || 
    r.members.some(m => m.email.toLowerCase() === searchEmail)
  ) || null;
}

export function saveRegistration(newReg: Registration): void {
  try {
    const current = getRegistrations();
    // Prepend new registration
    const updated = [newReg, ...current.filter(r => r.id !== newReg.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(LAST_REGISTERED_ID_KEY, newReg.id);
    localStorage.setItem(PARTICIPANT_REG_ID_KEY, newReg.id);
  } catch (e) {
    console.error('Failed to save registration', e);
  }
}

export function updateRegistrationStatus(id: string, status: RegistrationStatus): void {
  const current = getRegistrations();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update status', e);
  }
}

export function updateRegistration(id: string, updatedFields: Partial<Registration>): void {
  const current = getRegistrations();
  const updated = current.map(item => item.id === id ? { ...item, ...updatedFields } : item);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update registration', e);
  }
}

export function deleteRegistration(id: string): void {
  const current = getRegistrations();
  const updated = current.filter(item => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete registration', e);
  }
}

export function getNextRegistrationId(): string {
  const list = getRegistrations();
  // Find highest number in existing ECXH-2026-XXXX
  let maxNum = 44;
  for (const item of list) {
    const match = item.id.match(/ECXH-2026-(\d+)/);
    if (match && match[1]) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  }
  try {
    const lastId = localStorage.getItem(LAST_REGISTERED_ID_KEY);
    if (lastId) {
      const match = lastId.match(/ECXH-2026-(\d+)/);
      if (match && match[1]) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    }
  } catch {
    // Ignore localStorage errors
  }
  const nextNum = maxNum + 1;
  return `ECXH-2026-${String(nextNum).padStart(4, '0')}`;
}

export function getParticipantRegistrationId(): string | null {
  try {
    return localStorage.getItem(PARTICIPANT_REG_ID_KEY) || localStorage.getItem(LAST_REGISTERED_ID_KEY) || null;
  } catch {
    return null;
  }
}

export function getParticipantRegistration(): Registration | null {
  try {
    const id = getParticipantRegistrationId();
    if (!id) return null;
    return getRegistrationById(id);
  } catch {
    return null;
  }
}

export function getLastRegisteredTeam(): Registration | null {
  return getParticipantRegistration();
}

export function resetToMockData(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockRegistrations));
}
