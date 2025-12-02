'use client';

import { useRef, useState, useEffect } from 'react';
import { binarizeImage } from './imageBinarizerUtils';

export default function ImageBinarizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = useRef<HTMLCanvasElement>(null);
  const [targetColor, setTargetColor] = useState('#FF6600'); // Default orange color
  const [threshold, setThreshold] = useState(100);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        setImageLoaded(true);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const processBinarization = () => {
    const canvas = canvasRef.current;
    const outputCanvas = outputCanvasRef.current;
    if (!canvas || !outputCanvas) return;

    // Convert hex color string to 24-bit integer
    const hexColor = targetColor.replace('#', '');
    const colorInt = parseInt(hexColor, 16);

    // Perform binarization
    const binarizedImageData = binarizeImage(canvas, colorInt, threshold);

    // Display result
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;
    const ctx = outputCanvas.getContext('2d');
    if (ctx) {
      ctx.putImageData(binarizedImageData, 0, 0);
    }
  };

  return (
    // be ready to remove this once we have the image thumbnail working
    <div style={{ padding: '20px' }}>
      <h2>Image Binarizer</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginBottom: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Target Color:{' '}
          <input
            type="color"
            value={targetColor}
            onChange={(e) => setTargetColor(e.target.value)}
          />
          <span style={{ marginLeft: '10px' }}>{targetColor}</span>
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Threshold: {threshold}
          <input
            type="range"
            min="0"
            max="442"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            style={{ marginLeft: '10px', width: '300px' }}
          />
        </label>
      </div>

      <button
        onClick={processBinarization}
        disabled={!imageLoaded}
        style={{
          padding: '10px 20px',
          backgroundColor: imageLoaded ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: imageLoaded ? 'pointer' : 'not-allowed'
        }}
      >
        Process Binarization
      </button>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div>
          <h3>Original Image</h3>
          <canvas
            ref={canvasRef}
            style={{ border: '1px solid #ccc', maxWidth: '400px' }}
          />
        </div>
        <div>
          <h3>Binarized Image</h3>
          <canvas
            ref={outputCanvasRef}
            style={{ border: '1px solid #ccc', maxWidth: '400px' }}
          />
        </div>
      </div>
    </div>
  );
}
