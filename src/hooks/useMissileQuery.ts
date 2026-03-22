import { useState, useCallback } from 'react';
import type { MissileTableRow, SegmentGNSSStatus, TimeRange } from '../types';
import { fetchMissiles, type MissileQueryParams, type WarheadType, type WeaponType, type BDAValue } from '../api/missiles';

interface UseMissileQueryReturn {
  missiles: MissileTableRow[];
  isLoading: boolean;
  queryParams: MissileQueryParams;
  updateQueryParam: <K extends keyof MissileQueryParams>(key: K, value: MissileQueryParams[K]) => void;
  loadMissiles: () => Promise<void>;
  runCalculationForMissile: (missileId: string) => void;
  setTimeRange: (range: TimeRange) => void;
}

function getDefaultTimeRange(): TimeRange {
  return {
    start: new Date('2024-03-01T00:00:00'),
    end: new Date('2024-03-31T23:59:59'),
  };
}

const initialParams: MissileQueryParams = {
  timeRange: getDefaultTimeRange(),
  operationName: '',
  targetName: '',
  weaponType: '' as WeaponType,
  warheadType: '' as WarheadType,
  bda: '' as BDAValue,
};

export function useMissileQuery(): UseMissileQueryReturn {
  const [missiles, setMissiles] = useState<MissileTableRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryParams, setQueryParams] = useState<MissileQueryParams>(initialParams);

  const updateQueryParam = useCallback(<K extends keyof MissileQueryParams>(
    key: K,
    value: MissileQueryParams[K]
  ) => {
    setQueryParams(prev => ({ ...prev, [key]: value }));
  }, []);

  const setTimeRange = useCallback((range: TimeRange) => {
    setQueryParams(prev => ({ ...prev, timeRange: range }));
  }, []);

  const loadMissiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchMissiles(queryParams);
      // Initialize all missiles with pending status
      const missilesWithStatus = result.map(m => ({
        ...m,
        segmentStatuses: m.segmentStatuses.map(() => 'pending' as SegmentGNSSStatus),
      }));
      setMissiles(missilesWithStatus);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  const runCalculationForMissile = useCallback((missileId: string) => {
    setMissiles(prev =>
      prev.map(missile => {
        if (missile.id !== missileId) return missile;

        // Simulate GNSS calculation - assign random statuses
        const newStatuses: SegmentGNSSStatus[] = missile.segmentStatuses.map(() => {
          const rand = Math.random();
          if (rand < 0.3) return 'blocked';
          return 'not_blocked';
        });

        return {
          ...missile,
          segmentStatuses: newStatuses,
        };
      })
    );
  }, []);

  return {
    missiles,
    isLoading,
    queryParams,
    updateQueryParam,
    loadMissiles,
    runCalculationForMissile,
    setTimeRange,
  };
}
