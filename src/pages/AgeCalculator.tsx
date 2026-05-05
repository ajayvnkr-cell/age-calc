import { useState, useEffect } from 'react';
import { differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, differenceInHours, differenceInMinutes, differenceInSeconds, startOfDay, addYears, addMonths } from 'date-fns';
import { Calendar, Clock, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AgeCalculator() {
  const [dob, setDob] = useState<string>('2000-01-01');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [now, setNow] = useState(new Date());

  // Update 'now' every second to keep current age ticking if targetDate is today
  useEffect(() => {
    const isToday = targetDate === new Date().toISOString().split('T')[0];
    if (isToday) {
      const timer = setInterval(() => {
        setNow(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [targetDate]);

  const calculateAge = () => {
    const start = new Date(dob);
    // If testing against today, use actual current time for the seconds/minutes diff.
    const isToday = targetDate === new Date().toISOString().split('T')[0];
    const end = isToday ? now : new Date(targetDate + 'T23:59:59');

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      return null;
    }

    const years = differenceInYears(end, start);
    let tempDate = addYears(start, years);
    
    const months = differenceInMonths(end, tempDate);
    tempDate = addMonths(tempDate, months);
    
    const days = differenceInDays(end, tempDate);

    // Total totals
    const totalMonths = differenceInMonths(end, start);
    const totalWeeks = differenceInWeeks(end, start);
    const totalDays = differenceInDays(end, start);
    const totalHours = differenceInHours(end, start);
    const totalMinutes = differenceInMinutes(end, start);
    const totalSeconds = differenceInSeconds(end, start);

    return {
      structured: { years, months, days },
      totals: {
        months: totalMonths,
        weeks: totalWeeks,
        days: totalDays,
        hours: totalHours,
        minutes: totalMinutes,
        seconds: totalSeconds
      }
    };
  };

  const results = calculateAge();

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full items-start justify-center">
      <div className="glass w-full md:w-[420px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] shrink-0">
        <h1 className="m-0 mb-2 text-[28px] font-bold text-white">Age Calculator</h1>
        <p className="text-[#94a3b8] text-sm leading-relaxed mb-8">
          Precisely calculate age in years, months, days, and down to the second.
        </p>

        <div className="mb-5">
          <label htmlFor="dob" className="block text-xs uppercase tracking-[1px] text-[#94a3b8] mb-2">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50 transition-colors"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="targetDate" className="block text-xs uppercase tracking-[1px] text-[#94a3b8] mb-2">Age at the Date of</label>
          <input
            type="date"
            id="targetDate"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#38bdf8]/50 transition-colors"
          />
        </div>

        <button className="bg-[#38bdf8] text-[#0f172a] border-none rounded-xl px-7 py-3.5 font-bold cursor-pointer w-full text-base hover:bg-[#0ea5e9] transition-colors mt-2">
          Calculate Age
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-6 w-full">
        <AnimatePresence mode="wait">
          {results ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-8 flex flex-col gap-6"
            >
              <div className="border-b border-white/10 pb-4">
                <span className="block text-xs uppercase tracking-[1px] text-[#94a3b8] mb-2">Calculated Result</span>
                <div className="text-4xl sm:text-[48px] font-bold mt-2 flex flex-wrap items-baseline gap-x-2 text-white">
                  {results.structured.years} <span className="text-lg font-normal text-[#94a3b8]">years</span>{' '}
                  {results.structured.months} <span className="text-lg font-normal text-[#94a3b8]">months</span>{' '}
                  {results.structured.days} <span className="text-lg font-normal text-[#94a3b8]">days</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4">
                <StatBox label="Months" value={results.totals.months.toLocaleString()} />
                <StatBox label="Weeks" value={results.totals.weeks.toLocaleString()} />
                <StatBox label="Days" value={results.totals.days.toLocaleString()} className="md:border-r border-white/10" />
                <StatBox label="Hours" value={results.totals.hours.toLocaleString()} className="border-r-0" />
              </div>
              <div className="grid grid-cols-2 gap-y-4 pt-2 border-t border-white/5">
                <div className="text-center p-4 border-r border-white/10">
                  <div className="text-2xl font-bold text-[#38bdf8]">{results.totals.minutes.toLocaleString()}</div>
                  <div className="text-[11px] text-[#94a3b8] uppercase mt-1 tracking-wider">Minutes</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-[#38bdf8]">{results.totals.seconds.toLocaleString()}</div>
                  <div className="text-[11px] text-[#94a3b8] uppercase mt-1 tracking-wider">Seconds</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass p-8 flex flex-col items-center justify-center min-h-[300px] text-[#94a3b8]"
            >
              <RefreshCcw className="h-8 w-8 opacity-50 mb-4" />
              <p>Please enter a valid date of birth earlier than the target date.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass p-6">
          <h3 className="m-0 mb-4 text-sm uppercase text-[#94a3b8] tracking-[1px]">Quick Insights</h3>
          <p className="text-sm leading-[1.6] text-[#cbd5e1] m-0">
            Most western countries use the standard age system where age increases on a birthday. However, in traditional Chinese systems, a person is age 1 at birth. Our calculator follows the standard international convention for precision.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, className = "" }: { label: string, value: string, className?: string }) {
  return (
    <div className={`text-center p-4 border-white/10 ${className} [&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-r md:[&:nth-child(even)]:border-r last:border-r-0`}>
      <div className="text-2xl font-bold text-[#38bdf8]">{value}</div>
      <div className="text-[11px] text-[#94a3b8] uppercase mt-1 tracking-wider">{label}</div>
    </div>
  );
}
