import { Polyline } from 'react-leaflet';
import type { MissileTableRow, SegmentGNSSStatus } from '../../types';

interface MissileTrajectoryProps {
  missile: MissileTableRow;
  isSelected: boolean;
}

// צבעים לפי סטטוס GNSS של המקטע
function getSegmentColor(status: SegmentGNSSStatus): string {
  switch (status) {
    case 'blocked':
      return '#ef4444'; // אדום - חסום
    case 'not_blocked':
      return '#22c55e'; // ירוק - לא חסום
    case 'pending':
    default:
      return '#9ca3af'; // אפור - ממתין
  }
}

export function MissileTrajectory({ missile, isSelected }: MissileTrajectoryProps) {
  const { trajectoryPath, segmentStatuses } = missile;

  // יוצרים Polyline נפרד לכל מקטע
  return (
    <>
      {trajectoryPath.slice(0, -1).map((point, index) => {
        const nextPoint = trajectoryPath[index + 1];
        const status = segmentStatuses[index] || 'pending';
        const segmentPositions: [number, number][] = [
          [point.lat, point.lng],
          [nextPoint.lat, nextPoint.lng],
        ];

        return (
          <Polyline
            key={`${missile.id}-segment-${index}`}
            positions={segmentPositions}
            pathOptions={{
              color: getSegmentColor(status),
              weight: isSelected ? 5 : 3,
              opacity: isSelected ? 1 : 0.8,
            }}
          />
        );
      })}
    </>
  );
}
