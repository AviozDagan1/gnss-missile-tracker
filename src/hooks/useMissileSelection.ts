import { useState, useCallback } from 'react';
import type { MissileTableRow } from '../types';

export function useMissileSelection() {
  const [selectedMissile, setSelectedMissile] = useState<MissileTableRow | null>(null);

  const selectMissile = useCallback((missile: MissileTableRow | null) => {
    setSelectedMissile(missile);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedMissile(null);
  }, []);

  return {
    selectedMissile,
    selectedMissileId: selectedMissile?.id ?? null,
    selectMissile,
    clearSelection,
  };
}
