import { Rectangle, Tooltip } from 'react-leaflet';
import type { GridLayerData, AggregationType } from '../../../types';
import { calculateAggregation, valueToColorWithOpacity } from '../../../utils/gridCalculations';

interface GridLayerProps {
  data: GridLayerData;
  aggregationType: AggregationType;
}

const aggregationLabels: Record<AggregationType, string> = {
  avg: 'ממוצע',
  min: 'מינימום',
  max: 'מקסימום',
  median: 'חציון',
  p90: 'P90',
};

export function GridLayer({ data, aggregationType }: GridLayerProps) {
  return (
    <>
      {data.cells.map(cell => {
        const value = calculateAggregation(cell.values, aggregationType);
        const color = valueToColorWithOpacity(value, 0.5);

        return (
          <Rectangle
            key={cell.id}
            bounds={cell.bounds}
            pathOptions={{
              fillColor: color,
              fillOpacity: 0.5,
              color: '#333',
              weight: 0.5,
              opacity: 0.3,
            }}
          >
            <Tooltip direction="top" opacity={0.9}>
              <div dir="rtl" style={{ textAlign: 'right' }}>
                <strong>{aggregationLabels[aggregationType]}: {value.toFixed(1)}</strong>
                <br />
                <small>מספר דגימות: {cell.values.length}</small>
              </div>
            </Tooltip>
          </Rectangle>
        );
      })}
    </>
  );
}
