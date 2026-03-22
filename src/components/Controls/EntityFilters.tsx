import type { EntityFilters as EntityFiltersType } from '../../types';
import './Controls.css';

interface EntityFiltersProps {
  filters: EntityFiltersType;
  onFilterChange: <K extends keyof EntityFiltersType>(key: K, value: EntityFiltersType[K]) => void;
  onClearFilters: () => void;
  options: {
    operationNames: string[];
    targetNames: string[];
    weaponTypes: string[];
    warheadTypes: string[];
    bdaOptions: string[];
  };
}

export function EntityFilters({
  filters,
  onFilterChange,
  onClearFilters,
  options,
}: EntityFiltersProps) {
  const hasActiveFilters = Object.values(filters).some(v => v !== null);

  return (
    <div className="control-section">
      <div className="control-title-row">
        <h4 className="control-title">סינון יישויות</h4>
        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={onClearFilters}>
            נקה
          </button>
        )}
      </div>

      <div className="filter-group">
        <label>מבצע:</label>
        <select
          value={filters.operationName || ''}
          onChange={e => onFilterChange('operationName', e.target.value || null)}
        >
          <option value="">הכל</option>
          {options.operationNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>מטרה:</label>
        <select
          value={filters.targetName || ''}
          onChange={e => onFilterChange('targetName', e.target.value || null)}
        >
          <option value="">הכל</option>
          {options.targetNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>סוג פצצה:</label>
        <select
          value={filters.weaponType || ''}
          onChange={e => onFilterChange('weaponType', e.target.value || null)}
        >
          <option value="">הכל</option>
          {options.weaponTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>סוג ראש קרב:</label>
        <select
          value={filters.warheadType || ''}
          onChange={e => onFilterChange('warheadType', e.target.value || null)}
        >
          <option value="">הכל</option>
          {options.warheadTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>BDA:</label>
        <select
          value={filters.bda || ''}
          onChange={e => onFilterChange('bda', e.target.value || null)}
        >
          <option value="">הכל</option>
          {options.bdaOptions.map(bda => (
            <option key={bda} value={bda}>{bda}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
