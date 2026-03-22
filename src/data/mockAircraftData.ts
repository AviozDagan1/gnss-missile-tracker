import type { Aircraft } from '../types';

export const aircraftData: Aircraft[] = [
  {
    id: 'aircraft-1',
    callSign: 'פלקון-1',
    model: 'F-16I',
    operationName: 'מבצע שחר',
    crashPoint: { lat: 32.15, lng: 35.1 },
    trajectoryPath: [
      { lat: 32.0, lng: 34.8 },
      { lat: 32.05, lng: 34.9 },
      { lat: 32.1, lng: 35.0 },
      { lat: 32.15, lng: 35.1 },
    ],
    crashTime: '07:15',
    date: '2024-03-15',
    startTime: '06:30',
    endTime: '07:15',
  },
  {
    id: 'aircraft-2',
    callSign: 'נץ-3',
    model: 'F-15I',
    operationName: 'מבצע שחר',
    trajectoryPath: [
      { lat: 32.2, lng: 34.7 },
      { lat: 32.25, lng: 34.85 },
      { lat: 32.3, lng: 35.0 },
      { lat: 32.35, lng: 35.15 },
      { lat: 32.4, lng: 35.3 },
    ],
    date: '2024-03-15',
    startTime: '06:45',
    endTime: '07:30',
  },
  {
    id: 'aircraft-3',
    callSign: 'אדיר-2',
    model: 'F-35I',
    operationName: 'מבצע ליל',
    crashPoint: { lat: 31.95, lng: 35.05 },
    trajectoryPath: [
      { lat: 31.8, lng: 34.6 },
      { lat: 31.85, lng: 34.75 },
      { lat: 31.9, lng: 34.9 },
      { lat: 31.95, lng: 35.05 },
    ],
    crashTime: '22:45',
    date: '2024-03-16',
    startTime: '22:00',
    endTime: '22:45',
  },
  {
    id: 'aircraft-4',
    callSign: 'סופה-5',
    model: 'F-16I',
    operationName: 'מבצע ליל',
    trajectoryPath: [
      { lat: 31.7, lng: 34.5 },
      { lat: 31.75, lng: 34.65 },
      { lat: 31.8, lng: 34.8 },
      { lat: 31.85, lng: 34.95 },
      { lat: 31.9, lng: 35.1 },
    ],
    date: '2024-03-16',
    startTime: '22:30',
    endTime: '23:15',
  },
  {
    id: 'aircraft-5',
    callSign: 'רעם-1',
    model: 'F-15I',
    operationName: 'מבצע צוק',
    crashPoint: { lat: 32.25, lng: 35.0 },
    trajectoryPath: [
      { lat: 32.4, lng: 35.1 },
      { lat: 32.35, lng: 35.05 },
      { lat: 32.3, lng: 35.0 },
      { lat: 32.25, lng: 35.0 },
    ],
    crashTime: '05:20',
    date: '2024-03-17',
    startTime: '05:00',
    endTime: '05:20',
  },
  {
    id: 'aircraft-6',
    callSign: 'ברק-7',
    model: 'F-35I',
    operationName: 'מבצע צוק',
    trajectoryPath: [
      { lat: 32.3, lng: 35.05 },
      { lat: 32.25, lng: 35.0 },
      { lat: 32.2, lng: 34.95 },
      { lat: 32.15, lng: 34.9 },
    ],
    date: '2024-03-17',
    startTime: '05:15',
    endTime: '05:45',
  },
];

// פונקציות עזר
export function getAircraftWithCrashes(): Aircraft[] {
  return aircraftData.filter(a => a.crashPoint);
}

export function getAircraftByOperation(operationName: string): Aircraft[] {
  return aircraftData.filter(a => a.operationName === operationName);
}

export function getOperationNames(): string[] {
  return [...new Set(aircraftData.map(a => a.operationName))];
}
