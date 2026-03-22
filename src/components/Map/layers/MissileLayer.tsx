import { MissileMarker } from '../MissileMarker';
import { MissileTrajectory } from '../MissileTrajectory';
import type { MissileTableRow } from '../../../types';

interface MissileLayerProps {
  missiles: MissileTableRow[];
  selectedMissileId: string | null;
  onMissileSelect: (missile: MissileTableRow | null) => void;
}

export function MissileLayer({
  missiles,
  selectedMissileId,
  onMissileSelect,
}: MissileLayerProps) {
  return (
    <>
      {/* מסלולים */}
      {missiles.map(missile => (
        <MissileTrajectory
          key={`trajectory-${missile.id}`}
          missile={missile}
          isSelected={missile.id === selectedMissileId}
        />
      ))}

      {/* מרקרים */}
      {missiles.map(missile => (
        <MissileMarker
          key={`marker-${missile.id}`}
          missile={missile}
          isSelected={missile.id === selectedMissileId}
          onClick={() => onMissileSelect(missile)}
        />
      ))}
    </>
  );
}
