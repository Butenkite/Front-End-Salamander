'use client';

import { useRef, useState, useEffect } from 'react';
import { binarizeImage } from './imageBinarizerUtils';

interface ImageBinarizerProps {
  videoName?: string;
}

export default function ImageBinarizer({ videoName }: ImageBinarizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = useRef<HTMLCanvasElement>(null);
  const [targetColor, setTargetColor] = useState('#FF6600'); // Default orange color
  const [threshold, setThreshold] = useState(100);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fetch image from API on component mount
  useEffect(() => {
    if (!videoName) return;

    const loadImage = async () => {
      try {
        const res = await fetch(`/api/thumbnail/${videoName}`);
        if (!res.ok) {
          console.error('Failed to fetch thumbnail');
          return;
        }

        const blob = await res.blob();
        const imageUrl = URL.createObjectURL(blob);

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
          URL.revokeObjectURL(imageUrl);
        };
        img.src = imageUrl;
      } catch (error) {
        console.error('Error loading thumbnail:', error);
      }
    };

    loadImage();
  }, [videoName]);

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
    <div style={{ padding: '20px' }}>
      <h2>Image Binarizer</h2>

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
