import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useMediaQuery } from '@mui/material';

const ColorChangingCanvas = () => {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const canvasWidth = useMediaQuery('(max-width:1440px)') ? 400 : 600;
  const canvasHeight = useMediaQuery('(max-width:1440px)') ? 400 : 600;
  const [svgColor, setSvgColor] = useState('black');

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: '#f0f0f0',
    });

    const handleDrop = (event) => {
      event.preventDefault();

      const file = event.dataTransfer.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;

          img.onload = () => {
            const fabricObject = new fabric.Image(img, {
              // configuración adicional según sea necesario
            });

            addObject(fabricObject);
          };
        };
        reader.readAsDataURL(file);
      } else {
        const svgString = event.dataTransfer.getData('text/plain');
        fabric.loadSVGFromString(svgString, (objects, options) => {
          const fabricGroup = new fabric.Group(objects, options);
          addObject(fabricGroup);
        });
      }
    };

    newCanvas.wrapperEl.addEventListener('drop', handleDrop);

    setCanvas(newCanvas);

    return () => {
      newCanvas.wrapperEl.removeEventListener('drop', handleDrop);
      newCanvas.dispose();
    };
  }, [canvasWidth, canvasHeight]);

  const addObject = (object) => {
    object.set({
      selectable: true,
      hasControls: true,
      fill: svgColor,
    });

    canvas.add(object);
    canvas.bringToFront(object);

    canvas.renderAll();
  };

  const changeColor = (newColor) => {
    setSvgColor(newColor);

    const activeObject = canvas.getActiveObject();

    if (activeObject) {
      activeObject.set('fill', newColor);
      canvas.renderAll();
    }
  };

  return (
    <>
      <div>
        <button onClick={() => changeColor('red')}>Rojo</button>
        <button onClick={() => changeColor('blue')}>Azul</button>
        <button onClick={() => changeColor('gray')}>Gris</button>
        {/* Agregar más botones según sea necesario */}
      </div>

      <canvas
        ref={canvasRef}
        onDragOver={(event) => {
          event.preventDefault();
        }}
      />
      <div
        draggable="true"
        onDragStart={(event) => {
          const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M480.16 148.54H74.75l23.99-41.23-23.99-40.44h405.41l-20.06 40.44 20.06 41.23z" style="fill:${svgColor}; stroke: #220049; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
          event.dataTransfer.setData('text/plain', updatedSvgString);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 554.91 215.41"
        >
          <path
            d="M480.16 148.54H74.75l23.99-41.23-23.99-40.44h405.41l-20.06 40.44 20.06 41.23z"
            style={{
              fill: svgColor,
              stroke: "#220049",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 10,
            }}
          />
        </svg>
      </div>
    </>
  );
};

export default ColorChangingCanvas;
