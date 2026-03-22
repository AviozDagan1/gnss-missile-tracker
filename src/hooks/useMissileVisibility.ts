import { useState, useCallback } from 'react';
import type { MissileTableRow } from '../types';

export function useMissileVisibility(initialMissiles: MissileTableRow[]) {
  // By default, all missiles are visible
  const [visibleMissileIds, setVisibleMissileIds] = useState<Set<string>>(
    () => new Set(initialMissiles.map(m => m.id))
  );

  const toggleVisibility = useCallback((missileId: string) => {
    setVisibleMissileIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(missileId)) {
        newSet.delete(missileId);
      } else {
        newSet.add(missileId);
      }
      return newSet;
    });
  }, []);

  const showAll = useCallback((missiles: MissileTableRow[]) => {
    setVisibleMissileIds(new Set(missiles.map(m => m.id)));
  }, []);

  const hideAll = useCallback(() => {
    setVisibleMissileIds(new Set());
  }, []);

  return {
    visibleMissileIds,
    toggleVisibility,
    showAll,
    hideAll,
  };
}
