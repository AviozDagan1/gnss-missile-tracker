import { useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type RowClickedEvent, type ColDef, type ICellRendererParams } from 'ag-grid-community';
import type { MissileTableRow } from '../../types';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './MissileTable.css';

ModuleRegistry.registerModules([AllCommunityModule]);

interface MissileTableProps {
  missiles: MissileTableRow[];
  onRowSelect: (missile: MissileTableRow | null) => void;
  selectedMissileId: string | null;
  onRunCalculation: (missileId: string) => void;
}

export function MissileTable({
  missiles,
  onRowSelect,
  selectedMissileId,
  onRunCalculation,
}: MissileTableProps) {
  const gridRef = useRef<AgGridReact<MissileTableRow>>(null);

  // GNSS Button Cell Renderer
  const GNSSButtonRenderer = useCallback((params: ICellRendererParams<MissileTableRow>) => {
    if (!params.data) return null;
    const missileId = params.data.id;
    const hasCalculated = params.data.segmentStatuses.some(s => s !== 'pending');

    return (
      <button
        className={`gnss-row-btn ${hasCalculated ? 'calculated' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onRunCalculation(missileId);
        }}
      >
        {hasCalculated ? '✓' : 'חשב'}
      </button>
    );
  }, [onRunCalculation]);

  const columnDefs: ColDef<MissileTableRow>[] = [
    { headerName: 'פעילות מבצעית', field: 'operationalActivityName', width: 130 },
    { headerName: 'שם מטרה', field: 'targetName', width: 120 },
    { headerName: 'סוג חימוש', field: 'weaponType', width: 100 },
    { headerName: 'סוג ראש קרב', field: 'warheadType', width: 110 },
    { headerName: 'אות קריאה', field: 'callSign', width: 100 },
    { headerName: 'מספר נתיב', field: 'pathNumber', width: 95 },
    { headerName: 'דגם משגר', field: 'launcherModel', width: 100 },
    { headerName: 'שם מבנה', field: 'structureName', width: 110 },
    { headerName: 'תאריך', field: 'date', width: 100 },
    { headerName: 'שעת הטלה', field: 'launchTime', width: 95 },
    { headerName: 'שעת סיום', field: 'endTime', width: 95 },
    { headerName: 'אויב 50 ק"מ', field: 'enemySystems50km', width: 100 },
    { headerName: 'אויב 100 ק"מ', field: 'enemySystems100km', width: 105 },
    {
      headerName: 'GNSS',
      field: 'id',
      width: 80,
      cellRenderer: GNSSButtonRenderer,
      sortable: false,
      filter: false,
    },
  ];

  const onRowClicked = useCallback(
    (event: RowClickedEvent<MissileTableRow>) => {
      if (event.data) {
        onRowSelect(event.data);
      }
    },
    [onRowSelect]
  );

  const getRowStyle = useCallback(
    (params: { data?: MissileTableRow }) => {
      if (params.data?.id === selectedMissileId) {
        return { backgroundColor: '#dbeafe' };
      }
      return undefined;
    },
    [selectedMissileId]
  );

  return (
    <div className="missile-table-container">
      {/* Header */}
      <div className="table-header">
        <h3>טבלת טילים ({missiles.length})</h3>
      </div>

      {/* Grid */}
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<MissileTableRow>
          ref={gridRef}
          rowData={missiles}
          columnDefs={columnDefs}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
          }}
          onRowClicked={onRowClicked}
          getRowStyle={getRowStyle}
          enableRtl={true}
          animateRows={true}
          suppressCellFocus={true}
        />
      </div>
    </div>
  );
}
