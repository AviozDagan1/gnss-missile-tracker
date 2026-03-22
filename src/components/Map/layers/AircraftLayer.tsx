import { Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Aircraft } from '../../../types';

interface AircraftLayerProps {
  aircraft: Aircraft[];
  showCrashes: boolean;
  showPaths: boolean;
}

// אייקון התרסקות
function createCrashIcon(): L.DivIcon {
  return L.divIcon({
    className: 'crash-marker',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: #dc2626;
        border: 3px solid #7f1d1d;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      ">✕</div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

export function AircraftLayer({ aircraft, showCrashes, showPaths }: AircraftLayerProps) {
  const crashIcon = createCrashIcon();

  return (
    <>
      {/* מסלולי מטוסים */}
      {showPaths && aircraft.map(ac => (
        <Polyline
          key={`aircraft-path-${ac.id}`}
          positions={ac.trajectoryPath.map(p => [p.lat, p.lng] as [number, number])}
          pathOptions={{
            color: ac.crashPoint ? '#f97316' : '#3b82f6',
            weight: 2,
            opacity: 0.7,
            dashArray: '8, 4',
          }}
        />
      ))}

      {/* נקודות התרסקות */}
      {showCrashes && aircraft
        .filter(ac => ac.crashPoint)
        .map(ac => (
          <Marker
            key={`crash-${ac.id}`}
            position={[ac.crashPoint!.lat, ac.crashPoint!.lng]}
            icon={crashIcon}
          >
            <Popup>
              <div className="crash-popup" dir="rtl">
                <h4 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>התרסקות</h4>
                <p><strong>אות קריאה:</strong> {ac.callSign}</p>
                <p><strong>דגם:</strong> {ac.model}</p>
                <p><strong>מבצע:</strong> {ac.operationName}</p>
                <p><strong>תאריך:</strong> {ac.date}</p>
                <p><strong>שעה:</strong> {ac.crashTime}</p>
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
}
