import type { OperationalActivity, MissileTableRow } from '../types';

export const operationalActivities: OperationalActivity[] = [
  {
    id: 'op-1',
    name: 'מבצע שחר',
    targets: [
      {
        id: 'target-1-1',
        name: 'מטרה אלפא',
        missiles: [
          {
            id: 'missile-1',
            weaponType: 'דליל',
            warheadType: 'חודר',
            trajectoryData: { altitude: 5000, speed: 850, heading: 45 },
            callSign: 'נשר-1',
            pathNumber: 101,
            launcherModel: 'F-16I',
            structureName: 'בניין מפקדה',
            date: '2024-03-15',
            launchTime: '06:30',
            endTime: '06:45',
            enemySystems50km: 3,
            enemySystems100km: 7,
            launchPoint: { lat: 32.0853, lng: 34.7818 },
            trajectoryPath: [
              { lat: 32.0853, lng: 34.7818 },
              { lat: 32.15, lng: 34.85 },
              { lat: 32.22, lng: 34.92 },
              { lat: 32.28, lng: 35.0 },
            ],
            segmentStatuses: ['pending', 'pending', 'pending'],
            targetName: 'מטרה אלפא',
            operationalActivityName: 'מבצע שחר',
          },
          {
            id: 'missile-2',
            weaponType: 'ספייס',
            warheadType: 'מתפצל',
            trajectoryData: { altitude: 8000, speed: 920, heading: 50 },
            callSign: 'נשר-2',
            pathNumber: 102,
            launcherModel: 'F-15I',
            structureName: 'מחסן תחמושת',
            date: '2024-03-15',
            launchTime: '06:32',
            endTime: '06:48',
            enemySystems50km: 2,
            enemySystems100km: 5,
            launchPoint: { lat: 32.1053, lng: 34.8018 },
            trajectoryPath: [
              { lat: 32.1053, lng: 34.8018 },
              { lat: 32.18, lng: 34.88 },
              { lat: 32.25, lng: 34.95 },
              { lat: 32.32, lng: 35.02 },
            ],
            segmentStatuses: ['pending', 'pending', 'pending'],
            targetName: 'מטרה אלפא',
            operationalActivityName: 'מבצע שחר',
          },
        ],
      },
      {
        id: 'target-1-2',
        name: 'מטרה בטא',
        missiles: [
          {
            id: 'missile-3',
            weaponType: 'פופאי',
            warheadType: 'תרמוברי',
            trajectoryData: { altitude: 3000, speed: 780, heading: 120 },
            callSign: 'עיט-1',
            pathNumber: 201,
            launcherModel: 'F-35I',
            structureName: 'מנהרה',
            date: '2024-03-15',
            launchTime: '07:00',
            endTime: '07:12',
            enemySystems50km: 5,
            enemySystems100km: 12,
            launchPoint: { lat: 32.2053, lng: 34.9018 },
            trajectoryPath: [
              { lat: 32.2053, lng: 34.9018 },
              { lat: 32.15, lng: 35.0 },
              { lat: 32.08, lng: 35.1 },
              { lat: 32.0, lng: 35.2 },
            ],
            segmentStatuses: ['pending', 'pending', 'pending'],
            targetName: 'מטרה בטא',
            operationalActivityName: 'מבצע שחר',
          },
        ],
      },
    ],
  },
  {
    id: 'op-2',
    name: 'מבצע ליל',
    targets: [
      {
        id: 'target-2-1',
        name: 'מטרה גמא',
        missiles: [
          {
            id: 'missile-4',
            weaponType: 'דליל',
            warheadType: 'חודר',
            trajectoryData: { altitude: 6000, speed: 880, heading: 90 },
            callSign: 'ברק-1',
            pathNumber: 301,
            launcherModel: 'F-16I',
            structureName: 'בונקר',
            date: '2024-03-16',
            launchTime: '22:15',
            endTime: '22:30',
            enemySystems50km: 4,
            enemySystems100km: 9,
            launchPoint: { lat: 31.9053, lng: 34.6018 },
            trajectoryPath: [
              { lat: 31.9053, lng: 34.6018 },
              { lat: 31.9, lng: 34.75 },
              { lat: 31.88, lng: 34.9 },
              { lat: 31.85, lng: 35.05 },
              { lat: 31.82, lng: 35.2 },
            ],
            segmentStatuses: ['pending', 'pending', 'pending', 'pending'],
            targetName: 'מטרה גמא',
            operationalActivityName: 'מבצע ליל',
          },
          {
            id: 'missile-5',
            weaponType: 'ספייס',
            warheadType: 'מתפצל',
            trajectoryData: { altitude: 7500, speed: 900, heading: 85 },
            callSign: 'ברק-2',
            pathNumber: 302,
            launcherModel: 'F-15I',
            structureName: 'עמדת שיגור',
            date: '2024-03-16',
            launchTime: '22:17',
            endTime: '22:33',
            enemySystems50km: 4,
            enemySystems100km: 8,
            launchPoint: { lat: 31.9253, lng: 34.6218 },
            trajectoryPath: [
              { lat: 31.9253, lng: 34.6218 },
              { lat: 31.92, lng: 34.78 },
              { lat: 31.91, lng: 34.94 },
              { lat: 31.9, lng: 35.1 },
            ],
            segmentStatuses: ['pending', 'pending', 'pending'],
            targetName: 'מטרה גמא',
            operationalActivityName: 'מבצע ליל',
          },
          {
            id: 'missile-6',
            weaponType: 'פופאי',
            warheadType: 'חודר',
            trajectoryData: { altitude: 4500, speed: 820, heading: 88 },
            callSign: 'ברק-3',
            pathNumber: 303,
            launcherModel: 'F-35I',
            structureName: 'מרכז בקרה',
            date: '2024-03-16',
            launchTime: '22:20',
            endTime: '22:35',
            enemySystems50km: 3,
            enemySystems100km: 7,
            launchPoint: { lat: 31.9453, lng: 34.6418 },
            trajectoryPath: [
              { lat: 31.9453, lng: 34.6418 },
              { lat: 31.94, lng: 34.8 },
              { lat: 31.93, lng: 34.96 },
              { lat: 31.92, lng: 35.12 },
            ],
            segmentStatuses: ['pending', 'pending', 'pending'],
            targetName: 'מטרה גמא',
            operationalActivityName: 'מבצע ליל',
          },
        ],
      },
      {
        id: 'target-2-2',
        name: 'מטרה דלתא',
        missiles: [
          {
            id: 'missile-7',
            weaponType: 'דליל',
            warheadType: 'תרמוברי',
            trajectoryData: { altitude: 5500, speed: 860, heading: 135 },
            callSign: 'סער-1',
            pathNumber: 401,
            launcherModel: 'F-16I',
            structureName: 'מפעל',
            date: '2024-03-16',
            launchTime: '23:00',
            endTime: '23:15',
            enemySystems50km: 6,
            enemySystems100km: 14,
            launchPoint: { lat: 31.7853, lng: 34.5018 },
            trajectoryPath: [
              { lat: 31.7853, lng: 34.5018 },
              { lat: 31.72, lng: 34.6 },
              { lat: 31.65, lng: 34.72 },
              { lat: 31.58, lng: 34.85 },
            ],
            segmentStatuses: ['pending', 'pending', 'pending'],
            targetName: 'מטרה דלתא',
            operationalActivityName: 'מבצע ליל',
          },
          {
            id: 'missile-8',
            weaponType: 'ספייס',
            warheadType: 'מתפצל',
            trajectoryData: { altitude: 9000, speed: 950, heading: 140 },
            callSign: 'סער-2',
            pathNumber: 402,
            launcherModel: 'F-15I',
            structureName: 'אנטנה',
            date: '2024-03-16',
            launchTime: '23:02',
            endTime: '23:18',
            enemySystems50km: 5,
            enemySystems100km: 11,
            launchPoint: { lat: 31.8053, lng: 34.5218 },
            trajectoryPath: [
              { lat: 31.8053, lng: 34.5218 },
              { lat: 31.74, lng: 34.62 },
              { lat: 31.67, lng: 34.74 },
              { lat: 31.6, lng: 34.87 },
            ],
            segmentStatuses: ['pending', 'pending', 'pending'],
            targetName: 'מטרה דלתא',
            operationalActivityName: 'מבצע ליל',
          },
        ],
      },
    ],
  },
  {
    id: 'op-3',
    name: 'מבצע צוק',
    targets: [
      {
        id: 'target-3-1',
        name: 'מטרה אפסילון',
        missiles: [
          {
            id: 'missile-9',
            weaponType: 'פופאי',
            warheadType: 'חודר',
            trajectoryData: { altitude: 4000, speed: 800, heading: 180 },
            callSign: 'רעם-1',
            pathNumber: 501,
            launcherModel: 'F-35I',
            structureName: 'גשר',
            date: '2024-03-17',
            launchTime: '05:00',
            endTime: '05:12',
            enemySystems50km: 2,
            enemySystems100km: 6,
            launchPoint: { lat: 32.3053, lng: 35.0018 },
            trajectoryPath: [
              { lat: 32.3053, lng: 35.0018 },
              { lat: 32.22, lng: 35.0 },
              { lat: 32.14, lng: 35.0 },
              { lat: 32.06, lng: 35.0 },
            ],
            segmentStatuses: ['pending', 'pending', 'pending'],
            targetName: 'מטרה אפסילון',
            operationalActivityName: 'מבצע צוק',
          },
          {
            id: 'missile-10',
            weaponType: 'דליל',
            warheadType: 'מתפצל',
            trajectoryData: { altitude: 6500, speed: 890, heading: 175 },
            callSign: 'רעם-2',
            pathNumber: 502,
            launcherModel: 'F-16I',
            structureName: 'צומת',
            date: '2024-03-17',
            launchTime: '05:03',
            endTime: '05:18',
            enemySystems50km: 3,
            enemySystems100km: 8,
            launchPoint: { lat: 32.3253, lng: 35.0218 },
            trajectoryPath: [
              { lat: 32.3253, lng: 35.0218 },
              { lat: 32.25, lng: 35.02 },
              { lat: 32.17, lng: 35.02 },
              { lat: 32.09, lng: 35.02 },
            ],
            segmentStatuses: ['pending', 'pending', 'pending'],
            targetName: 'מטרה אפסילון',
            operationalActivityName: 'מבצע צוק',
          },
        ],
      },
      {
        id: 'target-3-2',
        name: 'מטרה זיתא',
        missiles: [
          {
            id: 'missile-11',
            weaponType: 'ספייס',
            warheadType: 'תרמוברי',
            trajectoryData: { altitude: 7000, speed: 910, heading: 200 },
            callSign: 'קשת-1',
            pathNumber: 601,
            launcherModel: 'F-15I',
            structureName: 'מוצב',
            date: '2024-03-17',
            launchTime: '05:30',
            endTime: '05:45',
            enemySystems50km: 7,
            enemySystems100km: 15,
            launchPoint: { lat: 32.4053, lng: 35.1018 },
            trajectoryPath: [
              { lat: 32.4053, lng: 35.1018 },
              { lat: 32.32, lng: 35.05 },
              { lat: 32.24, lng: 34.98 },
              { lat: 32.16, lng: 34.9 },
            ],
            segmentStatuses: ['pending', 'pending', 'pending'],
            targetName: 'מטרה זיתא',
            operationalActivityName: 'מבצע צוק',
          },
          {
            id: 'missile-12',
            weaponType: 'פופאי',
            warheadType: 'חודר',
            trajectoryData: { altitude: 3500, speed: 770, heading: 195 },
            callSign: 'קשת-2',
            pathNumber: 602,
            launcherModel: 'F-35I',
            structureName: 'תצפית',
            date: '2024-03-17',
            launchTime: '05:32',
            endTime: '05:46',
            enemySystems50km: 6,
            enemySystems100km: 13,
            launchPoint: { lat: 32.4253, lng: 35.1218 },
            trajectoryPath: [
              { lat: 32.4253, lng: 35.1218 },
              { lat: 32.35, lng: 35.07 },
              { lat: 32.27, lng: 35.0 },
              { lat: 32.19, lng: 34.92 },
            ],
            segmentStatuses: ['pending', 'pending', 'pending'],
            targetName: 'מטרה זיתא',
            operationalActivityName: 'מבצע צוק',
          },
        ],
      },
    ],
  },
];

// Flatten the hierarchical data into table rows
export function flattenMissilesToTableRows(): MissileTableRow[] {
  const rows: MissileTableRow[] = [];

  for (const activity of operationalActivities) {
    for (const target of activity.targets) {
      for (const missile of target.missiles) {
        rows.push({
          ...missile,
          targetId: target.id,
          operationalActivityId: activity.id,
        });
      }
    }
  }

  return rows;
}

// Get all unique operational activity names
export function getOperationalActivityNames(): string[] {
  return operationalActivities.map(a => a.name);
}

// Get all unique target names
export function getTargetNames(): string[] {
  const names = new Set<string>();
  for (const activity of operationalActivities) {
    for (const target of activity.targets) {
      names.add(target.name);
    }
  }
  return Array.from(names);
}
