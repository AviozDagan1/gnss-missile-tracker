import type { MapLayerType, AggregationType, CommChannel } from '../../types';
import './Controls.css';

interface MapLayerRadioProps {
  activeLayer: MapLayerType;
  onLayerChange: (layer: MapLayerType) => void;
  aggregationType: AggregationType;
  onAggregationChange: (type: AggregationType) => void;
  selectedChannel: CommChannel;
  onChannelChange: (channel: CommChannel) => void;
}

const layerLabels: Record<MapLayerType, string> = {
  snr_gnss: 'SNR GNSS',
  comm_loss: 'איבודי תקשורת',
  comm_reception: 'קליטות תקשורת',
  none: 'ללא',
};

const aggregationLabels: Record<AggregationType, string> = {
  avg: 'ממוצע',
  min: 'מינימום',
  max: 'מקסימום',
  median: 'חציון',
  p90: 'P90',
};

const channelLabels: Record<CommChannel, string> = {
  channel_1: 'ערוץ 1',
  channel_2: 'ערוץ 2',
  channel_3: 'ערוץ 3',
  channel_4: 'ערוץ 4',
  channel_5: 'ערוץ 5',
};

export function MapLayerRadio({
  activeLayer,
  onLayerChange,
  aggregationType,
  onAggregationChange,
  selectedChannel,
  onChannelChange,
}: MapLayerRadioProps) {
  const layers: MapLayerType[] = ['snr_gnss', 'comm_loss', 'comm_reception', 'none'];
  const aggregations: AggregationType[] = ['avg', 'min', 'max', 'median', 'p90'];
  const channels: CommChannel[] = ['channel_1', 'channel_2', 'channel_3', 'channel_4', 'channel_5'];

  return (
    <div className="control-section">
      <h4 className="control-title">שכבת תאי שטח</h4>

      <div className="radio-group">
        {layers.map(layer => (
          <div key={layer} className="radio-item-wrapper">
            <label className="radio-item">
              <input
                type="radio"
                name="mapLayer"
                value={layer}
                checked={activeLayer === layer}
                onChange={() => onLayerChange(layer)}
              />
              <span>{layerLabels[layer]}</span>
            </label>

            {/* Options for selected layer */}
            {activeLayer === layer && layer !== 'none' && (
              <div className="layer-options">
                {/* Channel selector for comm_reception */}
                {layer === 'comm_reception' && (
                  <div className="layer-option-row">
                    <label>ערוץ:</label>
                    <select
                      className="layer-option-select"
                      value={selectedChannel}
                      onChange={e => onChannelChange(e.target.value as CommChannel)}
                    >
                      {channels.map(ch => (
                        <option key={ch} value={ch}>
                          {channelLabels[ch]}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Aggregation selector */}
                <div className="layer-option-row">
                  <label>אגרגציית תאים:</label>
                  <select
                    className="layer-option-select"
                    value={aggregationType}
                    onChange={e => onAggregationChange(e.target.value as AggregationType)}
                  >
                    {aggregations.map(agg => (
                      <option key={agg} value={agg}>
                        {aggregationLabels[agg]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
