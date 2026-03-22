import type { MissileTableRow, TimeRange } from '../types';
import { flattenMissilesToTableRows } from '../data/mockData';

// ערכים אפשריים ל-dropdowns
export const WARHEAD_TYPES = ['חודר', 'מתפצל', 'תרמוברי'] as const;
export const WEAPON_TYPES = ['דליל', 'ספייס', 'פופאי'] as const;
export const BDA_VALUES = ['הושמד', 'נפגע', 'לא נפגע', 'לא ידוע'] as const;

export type WarheadType = typeof WARHEAD_TYPES[number] | '';
export type WeaponType = typeof WEAPON_TYPES[number] | '';
export type BDAValue = typeof BDA_VALUES[number] | '';

export interface MissileQueryParams {
  timeRange: TimeRange;
  operationName: string;
  targetName: string;
  weaponType: WeaponType;
  warheadType: WarheadType;
  bda: BDAValue;
}

// Mock API - simulates server-side filtering
export async function fetchMissiles(params: MissileQueryParams): Promise<MissileTableRow[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const allMissiles = flattenMissilesToTableRows();

  // Server-side filtering
  return allMissiles.filter(missile => {
    // Time filter (חובה)
    const missileDate = new Date(`${missile.date}T${missile.launchTime}`);
    if (missileDate < params.timeRange.start || missileDate > params.timeRange.end) {
      return false;
    }

    // Optional filters
    if (params.operationName &&
        !missile.operationalActivityName.includes(params.operationName)) {
      return false;
    }
    if (params.targetName &&
        !missile.targetName.includes(params.targetName)) {
      return false;
    }
    if (params.weaponType &&
        missile.weaponType !== params.weaponType) {
      return false;
    }
    if (params.warheadType &&
        missile.warheadType !== params.warheadType) {
      return false;
    }
    if (params.bda &&
        missile.bda !== params.bda) {
      return false;
    }
    return true;
  });
}
