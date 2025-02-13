import React, { useRef, useState, useEffect } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [image, setImage] = useState(null);
  const [tool, setTool] = useState('brush');
  const [text, setText] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth / 2 - 20;
    canvas.height = window.innerHeight - 100;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctxRef.current = ctx;
  }, [brushSize, color]);

  const startDrawing = (e) => {
    if (tool === 'text') return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || tool !== 'brush') return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    saveToHistory();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          setImage(img);
          drawImageOnCanvas(img);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const drawImageOnCanvas = (img) => {
    const canvas = canvasRef.current;
    ctxRef.current.drawImage(img, 0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const clearCanvas = () => {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setImage(null);
    saveToHistory();
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    setHistory([...history.slice(0, currentStep + 1), dataUrl]);
    setCurrentStep(currentStep + 1);
  };

  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const img = new Image();
      img.src = history[currentStep - 1];
      img.onload = () => ctxRef.current.drawImage(img, 0, 0);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      const img = new Image();
      img.src = history[currentStep + 1];
      img.onload = () => ctxRef.current.drawImage(img, 0, 0);
    }
  };

  const handleTextInput = (e) => setText(e.target.value);

  const addTextToCanvas = () => {
    if (text.trim() !== '') {
      ctxRef.current.font = `${brushSize * 2}px Arial`;
      ctxRef.current.fillText(text, 50, 50);
      saveToHistory();
      setText('');
    }
  };

  const downloadCanvas = () => {
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50vw' }}>
      <div style={{ display: 'flex', gap: '10px', padding: '10px', background: '#fff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', width: '100%', justifyContent: 'center' }}>
        <input type='color' value={color} onChange={(e) => setColor(e.target.value)} />
        <input type='range' min='1' max='20' value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} />
        <label>
          📸 Upload Image
          <input type='file' accept='image/*' onChange={handleImageUpload} style={{ display: 'none' }} />
        </label>
        <button onClick={clearCanvas}>🧹 Clear</button>
        <button onClick={undo}>↩️ Undo</button>
        <button onClick={redo}>↪️ Redo</button>
        <button onClick={downloadCanvas}>⬇️ Download</button>
        <button onClick={() => setTool('brush')}>✏️ Brush</button>
        <button onClick={() => setTool('eraser')}>🧽 Eraser</button>
        <button onClick={() => setTool('text')}>🔤 Text</button>
      </div>
      <input type='text' value={text} onChange={handleTextInput} placeholder='Enter text' style={{ margin: '5px 0' }} />
      <button onClick={addTextToCanvas}>Add Text</button>
      <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} style={{ border: '2px solid black', cursor: 'crosshair', background: 'white' }} />
    </div>
  );
};

export default Canvas;
