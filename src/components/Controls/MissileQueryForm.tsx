import { WARHEAD_TYPES, WEAPON_TYPES, BDA_VALUES, type MissileQueryParams, type WarheadType, type WeaponType, type BDAValue } from '../../api/missiles';
import './Controls.css';

interface MissileQueryFormProps {
  queryParams: MissileQueryParams;
  onParamChange: <K extends keyof MissileQueryParams>(key: K, value: MissileQueryParams[K]) => void;
  onLoad: () => void;
  isLoading: boolean;
  missileCount: number;
}

export function MissileQueryForm({
  queryParams,
  onParamChange,
  onLoad,
  isLoading,
  missileCount,
}: MissileQueryFormProps) {
  const hasTimeRange = queryParams.timeRange.start && queryParams.timeRange.end;

  return (
    <div className="missile-query-form">
      {/* Text inputs */}
      <div className="query-row">
        <input
          type="text"
          placeholder="מבצע..."
          value={queryParams.operationName}
          onChange={e => onParamChange('operationName', e.target.value)}
          className="query-input"
        />
        <input
          type="text"
          placeholder="מטרה..."
          value={queryParams.targetName}
          onChange={e => onParamChange('targetName', e.target.value)}
          className="query-input"
        />
      </div>

      {/* Dropdowns */}
      <div className="query-row">
        <select
          value={queryParams.warheadType}
          onChange={e => onParamChange('warheadType', e.target.value as WarheadType)}
          className="query-select"
        >
          <option value="">ראש קרב - הכל</option>
          {WARHEAD_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={queryParams.weaponType}
          onChange={e => onParamChange('weaponType', e.target.value as WeaponType)}
          className="query-select"
        >
          <option value="">סוג פצצה - הכל</option>
          {WEAPON_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="query-row">
        <select
          value={queryParams.bda}
          onChange={e => onParamChange('bda', e.target.value as BDAValue)}
          className="query-select full-width"
        >
          <option value="">BDA - הכל</option>
          {BDA_VALUES.map(val => (
            <option key={val} value={val}>{val}</option>
          ))}
        </select>
      </div>

      {/* Load button */}
      <button
        className="load-missiles-btn"
        onClick={onLoad}
        disabled={!hasTimeRange || isLoading}
      >
        {isLoading ? 'טוען...' : `טען טילים${missileCount > 0 ? ` (${missileCount})` : ''}`}
      </button>
    </div>
  );
}
