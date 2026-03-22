import { useState, useCallback } from 'react';
import type { MapLayerType, AggregationType, EntityLayerState, CommChannel } from '../types';

interface UseMapLayersReturn {
  activeMapLayer: MapLayerType;
  setActiveMapLayer: (layer: MapLayerType) => void;
  aggregationType: AggregationType;
  setAggregationType: (type: AggregationType) => void;
  entityLayers: EntityLayerState;
  toggleEntityLayer: (layer: keyof EntityLayerState) => void;
  selectedChannel: CommChannel;
  setSelectedChannel: (channel: CommChannel) => void;
}

export function useMapLayers(): UseMapLayersReturn {
  const [activeMapLayer, setActiveMapLayer] = useState<MapLayerType>('none');
  const [aggregationType, setAggregationType] = useState<AggregationType>('avg');
  const [selectedChannel, setSelectedChannel] = useState<CommChannel>('channel_1');
  const [entityLayers, setEntityLayers] = useState<EntityLayerState>({
    missiles: true,
    aircraftCrashes: true,
    aircraftPaths: true,
  });

  const toggleEntityLayer = useCallback((layer: keyof EntityLayerState) => {
    setEntityLayers(prev => ({
      ...prev,
      [layer]: !prev[layer],
    }));
  }, []);

  return {
    activeMapLayer,
    setActiveMapLayer,
    aggregationType,
    setAggregationType,
    entityLayers,
    toggleEntityLayer,
    selectedChannel,
    setSelectedChannel,
  };
}
