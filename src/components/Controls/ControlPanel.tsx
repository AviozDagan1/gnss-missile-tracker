import { TimeFilter } from './TimeFilter';
import { MissileQueryForm } from './MissileQueryForm';
import { MapLayerRadio } from './MapLayerRadio';
import type {
  TimeRange,
  MapLayerType,
  AggregationType,
  CommChannel,
} from '../../types';
import type { MissileQueryParams } from '../../api/missiles';
import './Controls.css';

interface ControlPanelProps {
  // Time (global)
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;

  // Missile Query
  missileQueryParams: MissileQueryParams;
  onMissileQueryParamChange: <K extends keyof MissileQueryParams>(key: K, value: MissileQueryParams[K]) => void;
  onLoadMissiles: () => void;
  isLoadingMissiles: boolean;
  missileCount: number;

  // Aircraft (display toggles)
  showAircraftPaths: boolean;
  onToggleAircraftPaths: () => void;
  showAircraftCrashes: boolean;
  onToggleAircraftCrashes: () => void;

  // Map Layer (grid cells)
  activeMapLayer: MapLayerType;
  onMapLayerChange: (layer: MapLayerType) => void;
  aggregationType: AggregationType;
  onAggregationChange: (type: AggregationType) => void;
  selectedChannel: CommChannel;
  onChannelChange: (channel: CommChannel) => void;

  // Missile display toggle
  showMissiles: boolean;
  onToggleMissiles: () => void;
}

export function ControlPanel({
  timeRange,
  onTimeRangeChange,
  missileQueryParams,
  onMissileQueryParamChange,
  onLoadMissiles,
  isLoadingMissiles,
  missileCount,
  showAircraftPaths,
  onToggleAircraftPaths,
  showAircraftCrashes,
  onToggleAircraftCrashes,
  activeMapLayer,
  onMapLayerChange,
  aggregationType,
  onAggregationChange,
  selectedChannel,
  onChannelChange,
  showMissiles,
  onToggleMissiles,
}: ControlPanelProps) {
  return (
    <div className="control-panel" dir="rtl">
      <h3 className="panel-title">
        <span>בקרת תצוגה</span>
        <div className="panel-title-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
      </h3>

      {/* Time Range - Global */}
      <TimeFilter
        timeRange={timeRange}
        onTimeRangeChange={onTimeRangeChange}
      />

      {/* Entity Display Toggles */}
      <div className="control-section">
        <h4 className="control-title">תצוגת יישויות</h4>
        <div className="checkbox-group">
          <div className="checkbox-item-wrapper">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={showMissiles}
                onChange={onToggleMissiles}
              />
              <span>מסלולי טילים</span>
            </label>

            {/* Missile Query - Only shown when missiles are enabled */}
            {showMissiles && (
              <div className="entity-options">
                <MissileQueryForm
                  queryParams={missileQueryParams}
                  onParamChange={onMissileQueryParamChange}
                  onLoad={onLoadMissiles}
                  isLoading={isLoadingMissiles}
                  missileCount={missileCount}
                />
              </div>
            )}
          </div>

          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={showAircraftPaths}
              onChange={onToggleAircraftPaths}
            />
            <span>מסלולי מטוסים</span>
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={showAircraftCrashes}
              onChange={onToggleAircraftCrashes}
            />
            <span>התרסקויות מטוסים</span>
          </label>
        </div>
      </div>

      {/* Map Layer (Grid Cells) */}
      <MapLayerRadio
        activeLayer={activeMapLayer}
        onLayerChange={onMapLayerChange}
        aggregationType={aggregationType}
        onAggregationChange={onAggregationChange}
        selectedChannel={selectedChannel}
        onChannelChange={onChannelChange}
      />
    </div>
  );
}
