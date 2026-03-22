import type { GridCell, GridLayerData, MapLayerType, CommChannel } from '../types';

// אזור ישראל בקירוב
const ISRAEL_BOUNDS = {
  minLat: 29.5,
  maxLat: 33.3,
  minLng: 34.2,
  maxLng: 35.9,
};

// גודל תא בקירוב (10 ק"מ ≈ 0.09 מעלות)
const CELL_SIZE = 0.09;

// יצירת רשת תאים עם seed לשחזור
function generateGridCells(seed: number = 0): GridCell[] {
  const cells: GridCell[] = [];
  let id = 0;

  // Simple seeded random
  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  for (let lat = ISRAEL_BOUNDS.minLat; lat < ISRAEL_BOUNDS.maxLat; lat += CELL_SIZE) {
    for (let lng = ISRAEL_BOUNDS.minLng; lng < ISRAEL_BOUNDS.maxLng; lng += CELL_SIZE) {
      // יצירת ערכים אקראיים (5-15 ערכים לכל תא)
      const numValues = 5 + Math.floor(seededRandom(id + seed) * 10);
      const values: number[] = [];
      for (let i = 0; i < numValues; i++) {
        values.push(seededRandom(id * 100 + i + seed) * 100);
      }

      cells.push({
        id: `cell-${id++}`,
        bounds: [
          [lat, lng],
          [lat + CELL_SIZE, lng + CELL_SIZE],
        ],
        values,
      });
    }
  }

  return cells;
}

// יצירת נתונים לכל סוג שכבה
const baseCells = generateGridCells(42);

// SNR GNSS - ערכים גבוהים יותר בכלל (איכות אות טובה)
const snrGnssCells: GridCell[] = baseCells.map(cell => ({
  ...cell,
  id: `snr-${cell.id}`,
  values: cell.values.map(v => Math.min(100, v + 20 + Math.random() * 10)),
}));

// איבודי תקשורת - ערכים נמוכים יותר (פחות איבודים = טוב)
const commLossCells: GridCell[] = baseCells.map(cell => ({
  ...cell,
  id: `loss-${cell.id}`,
  values: cell.values.map(v => Math.max(0, v - 30 + Math.random() * 20)),
}));

// קליטות תקשורת לכל ערוץ - נתונים שונים לכל ערוץ
const commReceptionByChannel: Record<CommChannel, GridCell[]> = {
  channel_1: generateGridCells(100).map(cell => ({
    ...cell,
    id: `reception-ch1-${cell.id}`,
    values: cell.values.map(() => 40 + Math.random() * 50),
  })),
  channel_2: generateGridCells(200).map(cell => ({
    ...cell,
    id: `reception-ch2-${cell.id}`,
    values: cell.values.map(() => 30 + Math.random() * 60),
  })),
  channel_3: generateGridCells(300).map(cell => ({
    ...cell,
    id: `reception-ch3-${cell.id}`,
    values: cell.values.map(() => 50 + Math.random() * 40),
  })),
  channel_4: generateGridCells(400).map(cell => ({
    ...cell,
    id: `reception-ch4-${cell.id}`,
    values: cell.values.map(() => 20 + Math.random() * 70),
  })),
  channel_5: generateGridCells(500).map(cell => ({
    ...cell,
    id: `reception-ch5-${cell.id}`,
    values: cell.values.map(() => 60 + Math.random() * 30),
  })),
};

export const gridLayerData: Record<Exclude<MapLayerType, 'none'>, GridLayerData> = {
  snr_gnss: {
    type: 'snr_gnss',
    cells: snrGnssCells,
    timestamp: '2024-03-15T06:00:00',
  },
  comm_loss: {
    type: 'comm_loss',
    cells: commLossCells,
    timestamp: '2024-03-15T06:00:00',
  },
  comm_reception: {
    type: 'comm_reception',
    cells: commReceptionByChannel.channel_1,
    timestamp: '2024-03-15T06:00:00',
  },
};

export function getGridLayerData(type: MapLayerType, channel?: CommChannel): GridLayerData | null {
  if (type === 'none') return null;

  if (type === 'comm_reception' && channel) {
    return {
      type: 'comm_reception',
      cells: commReceptionByChannel[channel],
      timestamp: '2024-03-15T06:00:00',
    };
  }

  return gridLayerData[type];
}
