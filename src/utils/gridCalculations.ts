import type { AggregationType } from '../types';

// חישוב ממוצע
export function calculateAvg(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

// חישוב מינימום
export function calculateMin(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.min(...values);
}

// חישוב מקסימום
export function calculateMax(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.max(...values);
}

// חישוב חציון
export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

// חישוב P90 (אחוזון 90)
export function calculateP90(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.floor(sorted.length * 0.9);
  return sorted[Math.min(index, sorted.length - 1)];
}

// פונקציה כללית לחישוב לפי סוג
export function calculateAggregation(values: number[], type: AggregationType): number {
  switch (type) {
    case 'avg':
      return calculateAvg(values);
    case 'min':
      return calculateMin(values);
    case 'max':
      return calculateMax(values);
    case 'median':
      return calculateMedian(values);
    case 'p90':
      return calculateP90(values);
    default:
      return calculateAvg(values);
  }
}

// המרת ערך (0-100) לצבע
// 0 = אדום, 50 = צהוב, 100 = ירוק
export function valueToColor(value: number): string {
  const normalized = Math.max(0, Math.min(100, value)) / 100;

  // Gradient: אדום → צהוב → ירוק
  let r: number, g: number, b: number;

  if (normalized < 0.5) {
    // אדום → צהוב
    r = 255;
    g = Math.round(normalized * 2 * 255);
    b = 0;
  } else {
    // צהוב → ירוק
    r = Math.round((1 - (normalized - 0.5) * 2) * 255);
    g = 255;
    b = 0;
  }

  return `rgb(${r}, ${g}, ${b})`;
}

// צבע עם שקיפות
export function valueToColorWithOpacity(value: number, opacity: number = 0.6): string {
  const normalized = Math.max(0, Math.min(100, value)) / 100;

  let r: number, g: number, b: number;

  if (normalized < 0.5) {
    r = 255;
    g = Math.round(normalized * 2 * 255);
    b = 0;
  } else {
    r = Math.round((1 - (normalized - 0.5) * 2) * 255);
    g = 255;
    b = 0;
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
