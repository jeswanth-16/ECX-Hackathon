import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode as QrIcon } from 'lucide-react';

interface QRCardProps {
  value: string;
  registrationId: string;
  size?: number;
}

export const QRCard: React.FC<QRCardProps> = ({ value, registrationId, size = 160 }) => {
  const [qrSrc, setQrSrc] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!value) return;

    QRCode.toDataURL(value, {
      width: size * 2,
      margin: 1,
      color: {
        dark: '#030712',
        light: '#FFFFFF',
      },
    })
      .then((url) => {
        setQrSrc(url);
        setError(false);
      })
      .catch((err) => {
        console.error('Error generating QR Code', err);
        setError(true);
      });
  }, [value, size]);

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white text-slate-950 shadow-md">
      {qrSrc && !error ? (
        <img
          src={qrSrc}
          alt={`QR Code for ${registrationId}`}
          className="rounded-lg object-contain"
          style={{ width: size, height: size }}
        />
      ) : (
        <div
          className="flex flex-col items-center justify-center bg-slate-100 rounded-lg text-slate-600"
          style={{ width: size, height: size }}
        >
          <QrIcon className="w-8 h-8 animate-pulse text-slate-400" />
          <span className="text-[10px] mt-1">Generating QR...</span>
        </div>
      )}
      <span className="font-mono text-[10px] font-bold text-slate-800 tracking-wider mt-1.5 uppercase">
        {registrationId}
      </span>
    </div>
  );
};
