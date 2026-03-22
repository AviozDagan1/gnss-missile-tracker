import { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { MissileTableRow } from '../../types';

interface MissileMarkerProps {
  missile: MissileTableRow;
  isSelected: boolean;
  onClick: () => void;
}

// צבעים לפי מספר מערכות אויב ב-50 ק"מ
function getEnemySystemsColor(count: number): { fill: string; stroke: string } {
  if (count <= 2) {
    return { fill: '#22c55e', stroke: '#16a34a' }; // ירוק
  }
  if (count === 3) {
    return { fill: '#f97316', stroke: '#ea580c' }; // כתום
  }
  return { fill: '#ef4444', stroke: '#dc2626' }; // אדום (4+)
}

function createMarkerIcon(enemySystems50km: number, isSelected: boolean): L.DivIcon {
  const colors = getEnemySystemsColor(enemySystems50km);
  const size = isSelected ? 20 : 14;
  const borderWidth = isSelected ? 3 : 2;

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${colors.fill};
        border: ${borderWidth}px solid ${isSelected ? '#1e3a5f' : colors.stroke};
        border-radius: 50%;
        box-shadow: ${isSelected ? '0 0 10px rgba(30, 58, 95, 0.5)' : '0 2px 4px rgba(0,0,0,0.3)'};
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export function MissileMarker({ missile, isSelected, onClick }: MissileMarkerProps) {
  const map = useMap();
  const position: L.LatLngExpression = [missile.launchPoint.lat, missile.launchPoint.lng];

  useEffect(() => {
    if (isSelected) {
      map.flyTo(position, 11, { duration: 0.5 });
    }
  }, [isSelected, map, position]);

  return (
    <Marker
      position={position}
      icon={createMarkerIcon(missile.enemySystems50km, isSelected)}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup>
        <div className="marker-popup" dir="rtl">
          <h4>{missile.callSign}</h4>
          <p><strong>פעילות:</strong> {missile.operationalActivityName}</p>
          <p><strong>מטרה:</strong> {missile.targetName}</p>
          <p><strong>סוג חימוש:</strong> {missile.weaponType}</p>
          <p><strong>מערכות אויב 50 ק"מ:</strong> {missile.enemySystems50km}</p>
          <p><strong>מערכות אויב 100 ק"מ:</strong> {missile.enemySystems100km}</p>
          <p>
            <strong>מקטעי מסלול:</strong>{' '}
            {missile.segmentStatuses.map((status, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  marginLeft: 2,
                  borderRadius: 2,
                  background: status === 'blocked' ? '#ef4444'
                            : status === 'not_blocked' ? '#22c55e'
                            : '#9ca3af'
                }}
                title={status === 'blocked' ? 'חסום' : status === 'not_blocked' ? 'לא חסום' : 'ממתין'}
              />
            ))}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}
