import { useState, useCallback } from 'react';
import type { TimeRange } from '../types';

interface UseTimeFilterReturn {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}

// ברירת מחדל: טווח שמכיל את נתוני ה-mock (מרץ 2024)
function getDefaultTimeRange(): TimeRange {
  return {
    start: new Date('2024-03-01T00:00:00'),
    end: new Date('2024-03-31T23:59:59'),
  };
}

export function useTimeFilter(): UseTimeFilterReturn {
  const [timeRange, setTimeRangeState] = useState<TimeRange>(getDefaultTimeRange);

  const setTimeRange = useCallback((range: TimeRange) => {
    setTimeRangeState(range);
  }, []);

  return {
    timeRange,
    setTimeRange,
  };
}
