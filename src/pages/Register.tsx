import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { eventConfig, REGISTRATION_FORM_URL } from '../data/eventConfig';
import { useRegistration } from '../context/useRegistration';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  UserCheck,
  Users,
  ExternalLink,
  Phone
} from 'lucide-react';

export const Register: React.FC = () => {
  const { openRegistration } = useRegistration();
  const hasFormUrl = Boolean(REGISTRATION_FORM_URL && REGISTRATION_FORM_URL.trim() !== '');

  return (
    <div className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <SectionHeader
        badge="Official Registration Portal"
        title="Register for"
        highlightedText={eventConfig.name}
        subtitle="8-Hour Hardware and Embedded Systems Hackathon at Knowledge Institute of Technology, Salem."
      />

      {/* Main Registration Status Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-dark-900 border border-slate-800 shadow-card text-center mb-10">
        <div className="max-w-xl mx-auto">
          {hasFormUrl ? (
            <>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 mb-6">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Registrations Open</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                Official Google Form Ready
              </h3>

              <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                Click below to complete your team submission via our official Google Form before the registration deadline of {eventConfig.registrationDeadline}.
              </p>

              <button
                type="button"
                onClick={openRegistration}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-200 text-dark-950 font-bold text-base shadow-lg transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Google Form</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-dark-950 border border-slate-800 text-cyan-400 mb-6">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Google Form Notice</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                Registration form will be available soon.
              </h3>

              <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                The official Google Form for {eventConfig.name} is being prepared. Responses will be collected via Google Forms. Please check back before the deadline on <strong>{eventConfig.registrationDeadline}</strong>.
              </p>

              <button
                type="button"
                onClick={openRegistration}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-dark-800 hover:bg-dark-750 text-white font-bold text-base border border-slate-700 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Key Event Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 flex items-start gap-3">
          <Calendar className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Event Date</span>
            <span className="text-sm font-bold text-white block">{eventConfig.date}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 flex items-start gap-3">
          <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Duration</span>
            <span className="text-sm font-bold text-white block">{eventConfig.time}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 flex items-start gap-3">
          <MapPin className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Venue</span>
            <span className="text-sm font-bold text-white block">{eventConfig.venue}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Registration Deadline</span>
            <span className="text-sm font-bold text-amber-300 block">{eventConfig.registrationDeadline}</span>
          </div>
        </div>
      </div>

      {/* Coordinators Contact Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-dark-900 border border-slate-800">
        <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
          Event Coordinators
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <UserCheck className="w-4 h-4" />
                <span className="font-mono text-[10px] font-bold uppercase">Faculty Coordinator</span>
              </div>
              <p className="font-bold text-white text-base">Vividhini O</p>
              <p className="text-slate-400 text-xs mt-0.5">{eventConfig.department}</p>
            </div>
            <a
              href="tel:+916379339310"
              aria-label="Call Faculty Coordinator Vividhini O"
              className="mt-3 pt-3 border-t border-slate-800/80 inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 63793 39310</span>
            </a>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="font-mono text-[10px] font-bold uppercase">Student Coordinator</span>
              </div>
              <p className="font-bold text-white text-base">Surya A</p>
              <p className="text-slate-400 text-xs mt-0.5">{eventConfig.department}</p>
            </div>
            <a
              href="tel:+918610104355"
              aria-label="Call Student Coordinator Surya A"
              className="mt-3 pt-3 border-t border-slate-800/80 inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 861010 4355</span>
            </a>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="font-mono text-[10px] font-bold uppercase">Student Coordinator</span>
              </div>
              <p className="font-bold text-white text-base">Sarthoshini S</p>
              <p className="text-slate-400 text-xs mt-0.5">{eventConfig.department}</p>
            </div>
            <a
              href="tel:+916383785532"
              aria-label="Call Student Coordinator Sarthoshini S"
              className="mt-3 pt-3 border-t border-slate-800/80 inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 63837 85532</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
