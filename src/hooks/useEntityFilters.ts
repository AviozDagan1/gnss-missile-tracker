import { useState, useCallback } from 'react';
import type { EntityFilters, MissileTableRow, Aircraft, TimeRange } from '../types';

interface UseEntityFiltersReturn {
  filters: EntityFilters;
  setFilter: <K extends keyof EntityFilters>(key: K, value: EntityFilters[K]) => void;
  clearFilters: () => void;
  filterMissiles: (missiles: MissileTableRow[], timeRange: TimeRange) => MissileTableRow[];
  filterAircraft: (aircraft: Aircraft[], timeRange: TimeRange) => Aircraft[];
  getFilterOptions: (missiles: MissileTableRow[]) => {
    operationNames: string[];
    targetNames: string[];
    weaponTypes: string[];
    warheadTypes: string[];
    bdaOptions: string[];
  };
}

const initialFilters: EntityFilters = {
  operationName: null,
  targetName: null,
  weaponType: null,
  warheadType: null,
  bda: null,
};

function parseDateTime(date: string, time: string): Date {
  return new Date(`${date}T${time}`);
}

function isWithinTimeRange(
  itemDate: string,
  itemStartTime: string,
  itemEndTime: string | undefined,
  timeRange: TimeRange
): boolean {
  const itemStart = parseDateTime(itemDate, itemStartTime);
  const itemEnd = itemEndTime ? parseDateTime(itemDate, itemEndTime) : itemStart;

  return itemStart <= timeRange.end && itemEnd >= timeRange.start;
}

export function useEntityFilters(): UseEntityFiltersReturn {
  const [filters, setFilters] = useState<EntityFilters>(initialFilters);

  const setFilter = useCallback(<K extends keyof EntityFilters>(key: K, value: EntityFilters[K]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const filterMissiles = useCallback(
    (missiles: MissileTableRow[], timeRange: TimeRange): MissileTableRow[] => {
      return missiles.filter(missile => {
        // סינון לפי זמן
        if (!isWithinTimeRange(missile.date, missile.launchTime, missile.endTime, timeRange)) {
          return false;
        }

        // סינון לפי פילטרים
        if (filters.operationName && missile.operationalActivityName !== filters.operationName) {
          return false;
        }
        if (filters.targetName && missile.targetName !== filters.targetName) {
          return false;
        }
        if (filters.weaponType && missile.weaponType !== filters.weaponType) {
          return false;
        }
        if (filters.warheadType && missile.warheadType !== filters.warheadType) {
          return false;
        }
        if (filters.bda && missile.bda !== filters.bda) {
          return false;
        }

        return true;
      });
    },
    [filters]
  );

  const filterAircraft = useCallback(
    (aircraft: Aircraft[], timeRange: TimeRange): Aircraft[] => {
      return aircraft.filter(ac => {
        // סינון לפי זמן
        if (!isWithinTimeRange(ac.date, ac.startTime, ac.endTime, timeRange)) {
          return false;
        }

        // סינון לפי מבצע
        if (filters.operationName && ac.operationName !== filters.operationName) {
          return false;
        }

        return true;
      });
    },
    [filters]
  );

  const getFilterOptions = useCallback((missiles: MissileTableRow[]) => {
    return {
      operationNames: [...new Set(missiles.map(m => m.operationalActivityName))],
      targetNames: [...new Set(missiles.map(m => m.targetName))],
      weaponTypes: [...new Set(missiles.map(m => m.weaponType))],
      warheadTypes: [...new Set(missiles.map(m => m.warheadType))],
      bdaOptions: [...new Set(missiles.filter(m => m.bda).map(m => m.bda!))],
    };
  }, []);

  return {
    filters,
    setFilter,
    clearFilters,
    filterMissiles,
    filterAircraft,
    getFilterOptions,
  };
}
