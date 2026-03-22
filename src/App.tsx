import { useMemo } from 'react';
import { aircraftData } from './data/mockAircraftData';
import { getGridLayerData } from './data/mockGridData';
import { MapView } from './components/Map/MapContainer';
import { MissileTable } from './components/Table/MissileTable';
import { FloatingTablePanel } from './components/Table/FloatingTablePanel';
import { ControlPanel } from './components/Controls/ControlPanel';
import { useMissileSelection } from './hooks/useMissileSelection';
import { useMissileQuery } from './hooks/useMissileQuery';
import { useMapLayers } from './hooks/useMapLayers';
import './App.css';

function App() {
  const { selectedMissileId, selectMissile } = useMissileSelection();

  // Missile query from server
  const {
    missiles,
    isLoading,
    queryParams,
    updateQueryParam,
    loadMissiles,
    runCalculationForMissile,
    setTimeRange,
  } = useMissileQuery();

  // Layers
  const {
    activeMapLayer,
    setActiveMapLayer,
    aggregationType,
    setAggregationType,
    entityLayers,
    toggleEntityLayer,
    selectedChannel,
    setSelectedChannel,
  } = useMapLayers();

  // Sync time range changes to missile query
  const handleTimeRangeChange = (range: typeof queryParams.timeRange) => {
    setTimeRange(range);
  };

  // Grid data
  const gridData = useMemo(
    () => getGridLayerData(activeMapLayer, selectedChannel),
    [activeMapLayer, selectedChannel]
  );

  return (
    <div className="app" dir="rtl">
      <header className="app-header">
        <h1>מערכת תצוגת טילים ו-GNSS</h1>
      </header>

      <main className="app-main">
        {/* המפה מציגה את הטילים שנטענו מהשרת */}
        <MapView
          missiles={missiles}
          aircraft={aircraftData}
          gridData={gridData}
          selectedMissileId={selectedMissileId}
          onMissileSelect={selectMissile}
          activeMapLayer={activeMapLayer}
          aggregationType={aggregationType}
          showMissiles={entityLayers.missiles}
          showAircraftCrashes={entityLayers.aircraftCrashes}
          showAircraftPaths={entityLayers.aircraftPaths}
        />

        {/* פנל בקרה מאוחד */}
        <ControlPanel
          timeRange={queryParams.timeRange}
          onTimeRangeChange={handleTimeRangeChange}
          missileQueryParams={queryParams}
          onMissileQueryParamChange={updateQueryParam}
          onLoadMissiles={loadMissiles}
          isLoadingMissiles={isLoading}
          missileCount={missiles.length}
          showAircraftPaths={entityLayers.aircraftPaths}
          onToggleAircraftPaths={() => toggleEntityLayer('aircraftPaths')}
          showAircraftCrashes={entityLayers.aircraftCrashes}
          onToggleAircraftCrashes={() => toggleEntityLayer('aircraftCrashes')}
          activeMapLayer={activeMapLayer}
          onMapLayerChange={setActiveMapLayer}
          aggregationType={aggregationType}
          onAggregationChange={setAggregationType}
          selectedChannel={selectedChannel}
          onChannelChange={setSelectedChannel}
          showMissiles={entityLayers.missiles}
          onToggleMissiles={() => toggleEntityLayer('missiles')}
        />

        {/* הטבלה - תצוגה בלבד */}
        <FloatingTablePanel>
          <MissileTable
            missiles={missiles}
            onRowSelect={selectMissile}
            selectedMissileId={selectedMissileId}
            onRunCalculation={runCalculationForMissile}
          />
        </FloatingTablePanel>
      </main>
    </div>
  );
}

export default App;
