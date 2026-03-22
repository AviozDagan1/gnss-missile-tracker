import type { MapLayerType } from '../../types';
import './Legend.css';

interface LegendProps {
  activeMapLayer: MapLayerType;
}

const mapLayerLabels: Record<Exclude<MapLayerType, 'none'>, string> = {
  snr_gnss: 'SNR GNSS',
  comm_loss: 'איבודי תקשורת',
  comm_reception: 'קליטות תקשורת',
};

export function Legend({ activeMapLayer }: LegendProps) {
  return (
    <div className="map-legend" dir="rtl">
      <h4>מקרא</h4>

      {/* Grid Layer Legend */}
      {activeMapLayer !== 'none' && (
        <div className="legend-section">
          <h5>{mapLayerLabels[activeMapLayer]}</h5>
          <div className="legend-gradient">
            <div className="gradient-bar"></div>
            <div className="gradient-labels">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </div>
      )}

      <div className="legend-section">
        <h5>מערכות אויב ב-50 ק"מ</h5>
        <div className="legend-item">
          <span className="legend-dot enemy-low"></span>
          <span>0-2 מערכות</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot enemy-medium"></span>
          <span>3 מערכות</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot enemy-high"></span>
          <span>4+ מערכות</span>
        </div>
      </div>

      <div className="legend-section">
        <h5>מסלול GNSS</h5>
        <div className="legend-item">
          <span className="legend-line gnss-blocked"></span>
          <span>חסום</span>
        </div>
        <div className="legend-item">
          <span className="legend-line gnss-not-blocked"></span>
          <span>לא חסום</span>
        </div>
        <div className="legend-item">
          <span className="legend-line gnss-pending"></span>
          <span>ממתין לחישוב</span>
        </div>
      </div>

      <div className="legend-section">
        <h5>מטוסים</h5>
        <div className="legend-item">
          <span className="legend-dot crash-marker"></span>
          <span>נקודת התרסקות</span>
        </div>
        <div className="legend-item">
          <span className="legend-line aircraft-path"></span>
          <span>מסלול טיסה</span>
        </div>
      </div>
    </div>
  );
}
