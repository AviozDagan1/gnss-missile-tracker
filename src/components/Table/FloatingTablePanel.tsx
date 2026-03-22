import { useState, useRef, useEffect, type ReactNode } from 'react';
import './FloatingTablePanel.css';

interface FloatingTablePanelProps {
  children: ReactNode;
}

export function FloatingTablePanel({ children }: FloatingTablePanelProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [size, setSize] = useState({ width: 900, height: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ width: 0, height: 0, x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        setPosition((prev) => ({
          x: prev.x + dx,
          y: prev.y + dy,
        }));
        dragStartRef.current = { x: e.clientX, y: e.clientY };
      }

      if (isResizing) {
        const dx = e.clientX - resizeStartRef.current.x;
        const dy = e.clientY - resizeStartRef.current.y;
        setSize({
          width: Math.max(400, resizeStartRef.current.width + dx),
          height: Math.max(200, resizeStartRef.current.height + dy),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    resizeStartRef.current = {
      width: size.width,
      height: size.height,
      x: e.clientX,
      y: e.clientY,
    };
  };

  if (isMinimized) {
    return (
      <div
        className="floating-panel minimized"
        style={{ left: position.x, top: position.y }}
      >
        <div className="panel-header" onMouseDown={handleDragStart}>
          <span>טבלת טילים</span>
          <button onClick={() => setIsMinimized(false)}>+</button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={panelRef}
      className="floating-panel"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
    >
      <div className="panel-header" onMouseDown={handleDragStart}>
        <span>טבלת טילים</span>
        <button onClick={() => setIsMinimized(true)}>-</button>
      </div>
      <div className="panel-content">{children}</div>
      <div className="resize-handle" onMouseDown={handleResizeStart} />
    </div>
  );
}
