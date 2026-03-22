import { useState, useCallback } from 'react';
import type { MissileTableRow, SegmentGNSSStatus } from '../types';

// חישוב סטטוס GNSS לכל מקטע במסלול
function calculateSegmentStatuses(missile: MissileTableRow): SegmentGNSSStatus[] {
  const segmentCount = missile.trajectoryPath.length - 1;
  const statuses: SegmentGNSSStatus[] = [];

  for (let i = 0; i < segmentCount; i++) {
    // לוגיקה פשוטה (mock):
    // - סיכוי גבוה יותר לחסימה אם יש הרבה מערכות אויב
    // - מקטעים מאוחרים יותר (קרוב למטרה) יכולים להיות יותר בסיכון
    const random = Math.random();
    const segmentRisk = (i + 1) / segmentCount; // 0-1, גדל לכיוון המטרה

    // בסיס הסיכוי לחסימה
    let blockChance = 0.2;

    // אם יש הרבה מערכות אויב ב-50 ק"מ
    if (missile.enemySystems50km >= 5) {
      blockChance += 0.4;
    } else if (missile.enemySystems50km >= 3) {
      blockChance += 0.2;
    }

    // אם יש הרבה מערכות אויב ב-100 ק"מ
    if (missile.enemySystems100km >= 10) {
      blockChance += 0.2;
    }

    // מקטעים קרובים יותר למטרה בסיכון גבוה יותר
    blockChance += segmentRisk * 0.2;

    statuses.push(random < blockChance ? 'blocked' : 'not_blocked');
  }

  return statuses;
}

export function useGNSSCalculation(initialMissiles: MissileTableRow[]) {
  const [missiles, setMissiles] = useState<MissileTableRow[]>(initialMissiles);
  const [isCalculating, setIsCalculating] = useState(false);

  // הרצת חישוב לכל הטילים
  const runCalculation = useCallback(() => {
    setIsCalculating(true);

    // סימולציה של חישוב אסינכרוני
    setTimeout(() => {
      setMissiles((prevMissiles) =>
        prevMissiles.map((missile) => ({
          ...missile,
          segmentStatuses: calculateSegmentStatuses(missile),
        }))
      );
      setIsCalculating(false);
    }, 500);
  }, []);

  // הרצת חישוב לטיל ספציפי
  const runCalculationForMissile = useCallback((missileId: string) => {
    setMissiles((prevMissiles) =>
      prevMissiles.map((missile) => {
        if (missile.id === missileId) {
          return {
            ...missile,
            segmentStatuses: calculateSegmentStatuses(missile),
          };
        }
        return missile;
      })
    );
  }, []);

  // איפוס כל החישובים
  const resetCalculation = useCallback(() => {
    setMissiles((prevMissiles) =>
      prevMissiles.map((missile) => ({
        ...missile,
        segmentStatuses: Array(missile.trajectoryPath.length - 1).fill('pending') as SegmentGNSSStatus[],
      }))
    );
  }, []);

  return {
    missiles,
    isCalculating,
    runCalculation,
    runCalculationForMissile,
    resetCalculation,
  };
}
