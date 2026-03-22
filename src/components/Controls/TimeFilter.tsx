import type { TimeRange } from '../../types';
import './Controls.css';

interface TimeFilterProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

function formatDateForInput(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function formatTimeForInput(date: Date): string {
  return date.toTimeString().slice(0, 5);
}

export function TimeFilter({ timeRange, onTimeRangeChange }: TimeFilterProps) {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value + 'T' + formatTimeForInput(timeRange.start));
    onTimeRangeChange({ ...timeRange, start: newDate });
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(formatDateForInput(timeRange.start) + 'T' + e.target.value);
    onTimeRangeChange({ ...timeRange, start: newDate });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value + 'T' + formatTimeForInput(timeRange.end));
    onTimeRangeChange({ ...timeRange, end: newDate });
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(formatDateForInput(timeRange.end) + 'T' + e.target.value);
    onTimeRangeChange({ ...timeRange, end: newDate });
  };

  return (
    <div className="control-section">
      <h4 className="control-title">סינון זמן</h4>

      <div className="time-filter-row">
        <label>התחלה:</label>
        <input
          type="date"
          value={formatDateForInput(timeRange.start)}
          onChange={handleStartDateChange}
        />
        <input
          type="time"
          value={formatTimeForInput(timeRange.start)}
          onChange={handleStartTimeChange}
        />
      </div>

      <div className="time-filter-row">
        <label>סיום:</label>
        <input
          type="date"
          value={formatDateForInput(timeRange.end)}
          onChange={handleEndDateChange}
        />
        <input
          type="time"
          value={formatTimeForInput(timeRange.end)}
          onChange={handleEndTimeChange}
        />
      </div>
    </div>
  );
}
