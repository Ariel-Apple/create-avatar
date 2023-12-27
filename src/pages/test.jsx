import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useMediaQuery } from "@mui/material";
import ArialFont from '../image/FONT/Bangers-Regular.ttf';
import HelveticaFont from '../image/FONT/Comication.ttf';
const TuComponente = () => {
  const [cintillos, setCintillos] = useState(false);
  const [stickers, setStickers] = useState(true);
  const [colors, setColors] = useState(false);
  const [escudos, setEscudos] = useState(false);

  const [svgColor, setSvgColor] = useState("");
  const [canvas, setCanvas] = useState("");

  const canvasRef = useRef(null);
  const canvasWidth = useMediaQuery("(max-width:1440px)") ? 400 : 600;
  const canvasHeight = useMediaQuery("(max-width:1440px)") ? 400 : 600;
  let currentImage = null;

  const [textOptions, setTextOptions] = useState({
    fontFamily: "Arial",
    fontSize: 20,
    textColor: "black",
  });

  const handleFontChange = (e) => {
    const font = e.target.value;
    setTextOptions((prevOptions) => ({
      ...prevOptions,
      fontFamily: font,
    }));
  };

  const handleFontSizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    setTextOptions((prevOptions) => ({
      ...prevOptions,
      fontSize: size,
    }));
  };

  const handleTextColorChange = (color) => {
    setTextOptions((prevOptions) => ({
      ...prevOptions,
      textColor: color,
    }));
  };

  const handleAgregarTexto = () => {
    if (canvas) {
      const text = new fabric.IText("Escribe aquí", {
        left: 50,
        top: 50,
        fontSize: textOptions.fontSize,
        fontFamily: `url(${HelveticaFont})`, // Cambia la fuente según sea necesario
        fill: textOptions.textColor,
      });

      text.on("changed", function () {
        setTextOptions({
          fontFamily: text.get("fontFamily"),
          fontSize: text.get("fontSize"),
          textColor: text.get("fill"),
        });
      });

      text.on("input", function () {
        setTextOptions({
          fontFamily: text.get("fontFamily"),
          fontSize: text.get("fontSize"),
          textColor: text.get("fill"),
        });
      });

      canvas.add(text);
      canvas.setActiveObject(text);
      text.enterEditing();
      text.hiddenTextarea.focus();
    }
  };

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#f0f0f0",
    });

    const addObject = (object) => {
      if (currentImage) {
        currentImage.set({
          selectable: false,
          hasControls: false,
        });
      }

      newCanvas.add(object);
      newCanvas.bringToFront(object);
      currentImage = object;

      newCanvas.renderAll();
    };

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
        const svgString = event.dataTransfer.getData("text/plain");
        const fabricObject = new fabric.Group();

        fabric.loadSVGFromString(svgString, (objects, options) => {
          fabricObject.addWithUpdate(...objects);
          fabricObject.set(options);
          fabricObject.setCoords();

          addObject(fabricObject);
        });
      }
    };

    newCanvas.wrapperEl.addEventListener("drop", handleDrop);

    setCanvas(newCanvas);

    return () => {
      newCanvas.wrapperEl.removeEventListener("drop", handleDrop);
      newCanvas.dispose();
    };
  }, [canvasWidth, canvasHeight]);

  const handleLimpiarLienzo = () => {
    if (canvas) {
      const objects = canvas.getObjects();

      objects.forEach((obj) => {
        if (!obj.isType("Image") || obj.get("id") !== "background") {
          canvas.remove(obj);
        }
      });

      canvas.renderAll();
    }
  };
 
  
  const handleDescargarLienzo = () => {
    const dataURL = canvas.toDataURL({ format: "png", quality: 0.8 });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "mi_imagen.png";
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };
  const FontButtons = () => {
    return (
      <div>
<button onClick={() => handleFontChange({ target: { value: 'Arial' } })}>Arial</button>
<button onClick={() => handleFontChange({ target: { value: 'Helvetica' } })}>Helvetica</button>

      </div>
    );
  };
  return (
    <div>
    <FontButtons />


      <input type="number" value={textOptions.fontSize} onChange={handleFontSizeChange} />

      <input type="color" value={textOptions.textColor} onChange={(e) => handleTextColorChange(e.target.value)} />

      <button onClick={handleAgregarTexto}>Agregar Texto</button>

      {/* Resto de tu interfaz de usuario */}

      <canvas ref={canvasRef}></canvas>

      <button onClick={handleLimpiarLienzo}>Limpiar Lienzo</button>
      <button onClick={handleDescargarLienzo}>Descargar Lienzo</button>
    </div>
  );
};

export default TuComponente;
