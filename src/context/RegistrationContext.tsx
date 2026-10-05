import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { REGISTRATION_FORM_URL, eventConfig } from '../data/eventConfig';
import { AlertCircle, Calendar, Clock, MapPin, X, Ticket } from 'lucide-react';
import { RegistrationContext } from './RegistrationContextType';

export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openRegistration = () => {
    if (REGISTRATION_FORM_URL && REGISTRATION_FORM_URL.trim() !== '') {
      window.open(REGISTRATION_FORM_URL, '_blank', 'noopener,noreferrer');
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <RegistrationContext.Provider
      value={{
        openRegistration,
        isModalOpen,
        closeModal,
        formUrl: REGISTRATION_FORM_URL,
      }}
    >
      {children}

      {/* Global Registration Modal shown when REGISTRATION_FORM_URL is empty */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="registration-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-dark-900 border border-slate-800 shadow-2xl text-left">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-dark-800 transition-colors"
              aria-label="Close registration modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-electric-cyan">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-electric-cyan font-bold block">
                  EDGECRAFT 2026 // PORTAL NOTICE
                </span>
                <h3 id="registration-modal-title" className="text-xl font-black text-white">
                  Registration Notice
                </h3>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-dark-950/90 border border-blue-500/20 my-4 text-center">
              <p className="text-base sm:text-lg font-bold text-white mb-1.5">
                Registration form will be available soon.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                The official Google Form for {eventConfig.name} is being prepared and will open for team submissions shortly.
              </p>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 my-5">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-950/60 border border-cyan-500/30">
                <Ticket className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  <strong className="text-white">Registration Fee:</strong> ₹250 per team (one payment per team)
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-950/60 border border-slate-800">
                <Calendar className="w-4 h-4 text-electric-cyan shrink-0" />
                <span>
                  <strong className="text-white">Registration Deadline:</strong> {eventConfig.registrationDeadline}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-950/60 border border-slate-800">
                <Clock className="w-4 h-4 text-electric-cyan shrink-0" />
                <span>
                  <strong className="text-white">Event Date:</strong> {eventConfig.date} ({eventConfig.time})
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-950/60 border border-slate-800">
                <MapPin className="w-4 h-4 text-electric-cyan shrink-0" />
                <span>
                  <strong className="text-white">Venue:</strong> {eventConfig.venue}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold transition-colors border border-slate-700"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </RegistrationContext.Provider>
  );
};
