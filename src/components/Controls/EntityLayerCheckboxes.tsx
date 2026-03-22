import type { EntityLayerState } from '../../types';
import './Controls.css';

interface EntityLayerCheckboxesProps {
  layers: EntityLayerState;
  onLayerToggle: (layer: keyof EntityLayerState) => void;
}

const layerLabels: Record<keyof EntityLayerState, string> = {
  missiles: 'מסלולי טילים',
  aircraftCrashes: 'התרסקויות מטוסים',
  aircraftPaths: 'מסלולי מטוסים',
};

export function EntityLayerCheckboxes({ layers, onLayerToggle }: EntityLayerCheckboxesProps) {
  const layerKeys: (keyof EntityLayerState)[] = ['missiles', 'aircraftCrashes', 'aircraftPaths'];

  return (
    <div className="control-section">
      <h4 className="control-title">יישויות</h4>

      <div className="checkbox-group">
        {layerKeys.map(layer => (
          <label key={layer} className="checkbox-item">
            <input
              type="checkbox"
              checked={layers[layer]}
              onChange={() => onLayerToggle(layer)}
            />
            <span>{layerLabels[layer]}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
