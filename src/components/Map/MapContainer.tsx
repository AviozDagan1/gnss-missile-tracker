import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import type {
  MissileTableRow,
  Aircraft,
  MapLayerType,
  AggregationType,
  GridLayerData,
} from '../../types';
import { GridLayer } from './layers/GridLayer';
import { MissileLayer } from './layers/MissileLayer';
import { AircraftLayer } from './layers/AircraftLayer';
import { Legend } from './Legend';
import 'leaflet/dist/leaflet.css';
import './MapContainer.css';

interface MapContainerProps {
  // Data
  missiles: MissileTableRow[];
  aircraft: Aircraft[];
  gridData: GridLayerData | null;

  // Selection
  selectedMissileId: string | null;
  onMissileSelect: (missile: MissileTableRow | null) => void;

  // Layers
  activeMapLayer: MapLayerType;
  aggregationType: AggregationType;
  showMissiles: boolean;
  showAircraftCrashes: boolean;
  showAircraftPaths: boolean;
}

export function MapView({
  missiles,
  aircraft,
  gridData,
  selectedMissileId,
  onMissileSelect,
  activeMapLayer,
  aggregationType,
  showMissiles,
  showAircraftCrashes,
  showAircraftPaths,
}: MapContainerProps) {
  // Center on Israel
  const defaultCenter: [number, number] = [31.5, 34.8];
  const defaultZoom = 8;

  return (
    <div className="map-wrapper">
      <LeafletMapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Grid Layer (תאי שטח) */}
        {gridData && activeMapLayer !== 'none' && (
          <GridLayer data={gridData} aggregationType={aggregationType} />
        )}

        {/* Aircraft Layer */}
        {(showAircraftCrashes || showAircraftPaths) && (
          <AircraftLayer
            aircraft={aircraft}
            showCrashes={showAircraftCrashes}
            showPaths={showAircraftPaths}
          />
        )}

        {/* Missile Layer */}
        {showMissiles && (
          <MissileLayer
            missiles={missiles}
            selectedMissileId={selectedMissileId}
            onMissileSelect={onMissileSelect}
          />
        )}
      </LeafletMapContainer>

      <Legend activeMapLayer={activeMapLayer} />
    </div>
  );
}
