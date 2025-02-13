import React from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css'; // Ensure you import the necessary styles

const Canvas: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Tldraw />
    </div>
  );
};

export default Canvas;
