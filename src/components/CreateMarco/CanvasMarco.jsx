import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

const CanvasMarco = () => {
  const canvasRef = useRef(null);
  const canvasWidth = 800;
  const canvasHeight = 400;
  let zIndexCounter = 1;
  let currentImage = null; // Referencia a la imagen actualmente editable

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: '#f0f0f0',
    });

    const addImage = (img) => {
      const scale = canvasWidth / img.width;

      const fabricImage = new fabric.Image(img, {
        left: 0,
        top: 0,
        scaleX: scale,
        scaleY: scale,
        selectable: true,
        hasControls: true,
        zIndex: zIndexCounter++,
      });

      // Deshabilitar la interacción y manipulación para las imágenes anteriores
      if (currentImage) {
        currentImage.set({
          selectable: false,
          hasControls: false,
        });
      }

      // Agregar la nueva imagen en la parte superior del lienzo
      canvas.add(fabricImage);
      canvas.bringToFront(fabricImage);

      // Establecer la imagen actual como editable
      currentImage = fabricImage;

      canvas.renderAll();
    };

    canvas.wrapperEl.addEventListener('drop', (event) => {
      event.preventDefault();

      const file = event.dataTransfer.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            addImage(img);
          };
        };
        reader.readAsDataURL(file);
      }
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default CanvasMarco;
