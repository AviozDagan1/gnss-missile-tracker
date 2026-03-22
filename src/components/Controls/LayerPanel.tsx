import { TimeFilter } from './TimeFilter';
import { MapLayerRadio } from './MapLayerRadio';
import { EntityLayerCheckboxes } from './EntityLayerCheckboxes';
import type {
  TimeRange,
  MapLayerType,
  AggregationType,
  EntityLayerState,
  CommChannel,
} from '../../types';
import './Controls.css';

interface LayerPanelProps {
  // Time
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;

  // Map Layer
  activeMapLayer: MapLayerType;
  onMapLayerChange: (layer: MapLayerType) => void;
  aggregationType: AggregationType;
  onAggregationChange: (type: AggregationType) => void;

  // Channel
  selectedChannel: CommChannel;
  onChannelChange: (channel: CommChannel) => void;

  // Entity Layers
  entityLayers: EntityLayerState;
  onEntityLayerToggle: (layer: keyof EntityLayerState) => void;
}

export function LayerPanel({
  timeRange,
  onTimeRangeChange,
  activeMapLayer,
  onMapLayerChange,
  aggregationType,
  onAggregationChange,
  selectedChannel,
  onChannelChange,
  entityLayers,
  onEntityLayerToggle,
}: LayerPanelProps) {
  return (
    <div className="layer-panel" dir="rtl">
      <h3 className="panel-title">בקרת תצוגה</h3>

      <TimeFilter
        timeRange={timeRange}
        onTimeRangeChange={onTimeRangeChange}
      />

      <MapLayerRadio
        activeLayer={activeMapLayer}
        onLayerChange={onMapLayerChange}
        aggregationType={aggregationType}
        onAggregationChange={onAggregationChange}
        selectedChannel={selectedChannel}
        onChannelChange={onChannelChange}
      />

      <EntityLayerCheckboxes
        layers={entityLayers}
        onLayerToggle={onEntityLayerToggle}
      />
    </div>
  );
}
