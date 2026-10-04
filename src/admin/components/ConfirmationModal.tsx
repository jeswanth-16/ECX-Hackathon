import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, X } from 'lucide-react';

export type ConfirmationVariant = 'approve' | 'reject' | 'delete' | 'neutral';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  variant?: ConfirmationVariant;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  variant = 'neutral',
  confirmText,
  cancelText = 'Cancel',
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'approve':
        return {
          icon: CheckCircle,
          iconColor: 'text-emerald-400',
          iconBg: 'bg-emerald-500/10 border-emerald-500/30',
          confirmBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white',
          defaultConfirmText: 'Approve',
        };
      case 'reject':
        return {
          icon: XCircle,
          iconColor: 'text-amber-400',
          iconBg: 'bg-amber-500/10 border-amber-500/30',
          confirmBtn: 'bg-amber-600 hover:bg-amber-500 text-white',
          defaultConfirmText: 'Reject',
        };
      case 'delete':
        return {
          icon: AlertTriangle,
          iconColor: 'text-rose-400',
          iconBg: 'bg-rose-500/10 border-rose-500/30',
          confirmBtn: 'bg-rose-600 hover:bg-rose-500 text-white',
          defaultConfirmText: 'Delete Team',
        };
      default:
        return {
          icon: AlertTriangle,
          iconColor: 'text-cyan-400',
          iconBg: 'bg-cyan-500/10 border-cyan-500/30',
          confirmBtn: 'bg-white hover:bg-slate-200 text-dark-950',
          defaultConfirmText: 'Confirm',
        };
    }
  };

  const currentVariant = getVariantStyles();
  const Icon = currentVariant.icon;
  const finalConfirmText = confirmText || currentVariant.defaultConfirmText;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-dark-900 border border-slate-800 shadow-2xl text-left">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-dark-800 transition-colors disabled:opacity-50"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3.5 mb-4">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${currentVariant.iconBg} ${currentVariant.iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 id="confirm-modal-title" className="text-lg font-bold text-white leading-snug">
              {title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl bg-dark-950 hover:bg-dark-800 text-slate-300 hover:text-white border border-slate-800 text-xs sm:text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all disabled:opacity-50 ${currentVariant.confirmBtn}`}
          >
            {isLoading ? 'Processing...' : finalConfirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
