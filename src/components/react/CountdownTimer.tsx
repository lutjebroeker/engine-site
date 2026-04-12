import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

function FlipUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-void-card border border-void-border rounded-lg w-16 h-16 flex items-center justify-center overflow-hidden">
        <span className="font-mono text-2xl font-bold text-emerald">{value}</span>
      </div>
      <span className="text-xs text-text-dim font-sans mt-1.5 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        mins: String(mins).padStart(2, '0'),
        secs: String(secs).padStart(2, '0'),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-3">
      <FlipUnit value={timeLeft.days} label="Days" />
      <span className="text-emerald/30 text-xl font-mono mt-[-1rem]">:</span>
      <FlipUnit value={timeLeft.hours} label="Hours" />
      <span className="text-emerald/30 text-xl font-mono mt-[-1rem]">:</span>
      <FlipUnit value={timeLeft.mins} label="Mins" />
      <span className="text-emerald/30 text-xl font-mono mt-[-1rem]">:</span>
      <FlipUnit value={timeLeft.secs} label="Secs" />
    </div>
  );
}
