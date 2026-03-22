// היררכיה: פעילות מבצעית > מטרות > טילים

export interface TrajectoryData {
  altitude: number;  // גובה במטרים
  speed: number;     // מהירות בקמ"ש
  heading: number;   // כיוון במעלות
}

export interface LatLng {
  lat: number;
  lng: number;
}

export type LaunchPoint = LatLng;

export type GNSSStatus = 'blocked' | 'not_blocked' | 'pending';

// סטטוס GNSS לכל מקטע במסלול
export type SegmentGNSSStatus = 'blocked' | 'not_blocked' | 'pending';

export interface Missile {
  id: string;
  weaponType: string;              // סוג חימוש
  warheadType: string;             // סוג ראש קרב
  trajectoryData: TrajectoryData;  // נתוני מסלול
  callSign: string;                // אות קריאה
  pathNumber: number;              // מספר נתיב
  launcherModel: string;           // דגם כלי משגר
  structureName: string;           // שם המבנה
  date: string;                    // תאריך
  launchTime: string;              // שעת הטלה
  endTime: string;                 // שעת סיום
  enemySystems50km: number;        // מספר מערכות אויב ב-50 ק"מ
  enemySystems100km: number;       // מספר מערכות אויב ב-100 ק"מ
  launchPoint: LaunchPoint;        // נקודת הטלה
  trajectoryPath: LatLng[];        // נקודות מסלול (מנקודת הטלה עד המטרה)
  segmentStatuses: SegmentGNSSStatus[]; // סטטוס GNSS לכל מקטע (אורך = trajectoryPath.length - 1)
  targetName: string;              // שם המטרה
  operationalActivityName: string; // שם הפעילות המבצעית
}

export interface Target {
  id: string;
  name: string;
  missiles: Missile[];
}

export interface OperationalActivity {
  id: string;
  name: string;
  targets: Target[];
}

// Flattened missile for table display
export interface MissileTableRow extends Missile {
  targetId: string;
  operationalActivityId: string;
  bda?: string; // Battle Damage Assessment
}

// ========== Map Layers ==========

// סוג שכבת מפה (תאי שטח)
export type MapLayerType = 'snr_gnss' | 'comm_loss' | 'comm_reception' | 'none';

// ערוץ תקשורת (לקליטות תקשורת)
export type CommChannel = 'channel_1' | 'channel_2' | 'channel_3' | 'channel_4' | 'channel_5';

// שיטת אגרגציה לחישוב ערך תא
export type AggregationType = 'avg' | 'min' | 'max' | 'median' | 'p90';

// תא שטח ברשת
export interface GridCell {
  id: string;
  bounds: [[number, number], [number, number]]; // [SW, NE] - [[lat, lng], [lat, lng]]
  values: number[]; // ערכים גולמיים לחישוב (0-100)
}

// נתוני שכבת מפה (תאי שטח)
export interface GridLayerData {
  type: MapLayerType;
  cells: GridCell[];
  timestamp: string; // לסינון לפי זמן
}

// ========== Time Filter ==========

export interface TimeRange {
  start: Date;
  end: Date;
}

// ========== Aircraft ==========

export interface Aircraft {
  id: string;
  callSign: string;
  model: string;
  operationName: string;
  crashPoint?: LatLng;
  trajectoryPath: LatLng[];
  crashTime?: string;
  date: string;
  startTime: string;
  endTime?: string;
}

// ========== Entity Layers ==========

export interface EntityLayerState {
  missiles: boolean;
  aircraftCrashes: boolean;
  aircraftPaths: boolean;
}

// ========== Entity Filters ==========

export interface EntityFilters {
  operationName: string | null;
  targetName: string | null;
  weaponType: string | null;
  warheadType: string | null;
  bda: string | null;
}
