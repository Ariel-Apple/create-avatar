import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import { useMediaQuery } from "@mui/material";
import styles from "./CreateEscudo.module.css";

const CanvasEscudo = (props, ref) => {

  const [cintillos, setCintillos] = React.useState(false);

  const [stickers, setStickers] = React.useState(true);
  const [colors, setColors] = React.useState(false);
  const [escudos, setEscudos] = React.useState(false);

  const [svgColor, setSvgColor] = useState(""); // Color inicial del SVG en el botón
  const [canvas, setCanvas] = useState(null);

  const canvasRef = useRef(null);
  const canvasWidth = useMediaQuery("(max-width:1440px)") ? 400 : 600;
  const canvasHeight = useMediaQuery("(max-width:1440px)") ? 400 : 600;
  let currentImage = null;
  const [textOptions, setTextOptions] = useState({
    fontFamily: "Arial",
    fontSize: 20,
  });


  const handleEscudos = (e) => {
    e.preventDefault();
    setStickers(false);
    setColors(false);

    setCintillos(false);
    setEscudos(true)
  };

  const handleCintillo = (e) => {
    e.preventDefault();
    setStickers(false);
    setColors(false);
    setEscudos(false)

    setCintillos(true);
  };
  const handleStickers = (e) => {
    e.preventDefault();
    setEscudos(false)

    setColors(false);
    setCintillos(false);
    setStickers(true);
  };

  const handleColor = (e) => {
    e.preventDefault();
    setEscudos(false)

    setCintillos(false);
    setStickers(false);
    setColors(true);
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
        const fabricObject = new fabric.Group(); // o cualquier otro tipo de objeto según tus necesidades

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

  const changeColor = (newColor) => {
    setSvgColor(newColor);
  };

  const handleAgregarTexto = () => {
    if (canvas) {
      const text = new fabric.IText("Escribe aquí", {
        left: 50,
        top: 50,
        fontSize: textOptions.fontSize,
        fontFamily: textOptions.fontFamily,
        fill: "black",
      });

      text.on('changed', function () {
        setTextOptions({
          fontFamily: text.get('fontFamily'),
          fontSize: text.get('fontSize'),
        });
      });

      text.on('input', function () {
        setTextOptions({
          fontFamily: text.get('fontFamily'),
          fontSize: text.get('fontSize'),
        });
      });

      canvas.add(text);
      canvas.setActiveObject(text);
      text.enterEditing();
      text.hiddenTextarea.focus();
    }
  };
  
  


  const handleLimpiarLienzo = () => {
    if (canvas) {
      // Obtener todos los objetos en el lienzo
      const objects = canvas.getObjects();

      // Iterar sobre los objetos y eliminarlos
      objects.forEach((obj) => {
        // Verificar si el objeto no es el fondo (background)
        if (!obj.isType("Image") || obj.get("id") !== "background") {
          canvas.remove(obj);
        }
      });

      canvas.renderAll(); // Renderizar los cambios
    }
  };
  const handleDescargarLienzo = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const dataURL = canvas.toDataURL({ format: "png", quality: 0.8 });

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "mi_imagen.png"; // Puedes personalizar el nombre del archivo
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    }
  };

  return (
    <div className={styles.marco_container}>
      <div className={styles.btn_seconds}>
     

        <div className={styles.btn_exit}>
          <img src={require("../../image/BOTON_SALIR.png")} alt="not-found" />
        </div>
        <div className={styles.btn_exit}>
          <img
            src={require("../../image/BOTON_GUARDAR.png")}
            alt="not-found"
          />
        </div>
        <div className={styles.btn_exit}>
          <img
            src={require("../../image/BOTON_EDITAR.png")}
            alt="not-found"
          />
        </div>
        <div onClick={handleDescargarLienzo} className={styles.btn_exit}>
          <img
            src={require("../../image/BOTON_DESCARGAR.png")}
            alt="not-found"
          />
        </div>
      </div>
      <div className={styles.element_center}>
        <div className={styles.crea_viñeta}>
          <img src={require("../../image/ESCUDO/TITULAR.png")} alt="" />
        </div>
        <div>
          <canvas
            ref={canvasRef}
            onDragOver={(event) => {
              event.preventDefault();
            }}
          ></canvas>
        </div>
      </div>
      <div className={styles.tools_container}>
        <div className={styles.barra_tools}>
          <div>
            <img
              src={require("../../image/ESCUDO/MENU DE ELEMENTOS/M1.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools}>
            <input type="file" accept="image/*" style={{ display: "none" }} />

            <img
              src={require("../../image/ESCUDO/MENU DE ELEMENTOS/M2.png")}
              alt=""
              onClick={handleAgregarTexto}
            />
          </div>
          <div className={styles.btn_tools}>
            <img
              src={require("../../image/ESCUDO/MENU DE ELEMENTOS/M3.png")}
              alt=""
              onClick={handleEscudos}
            />
          </div>
          <div className={styles.btn_tools} onClick={handleCintillo}>
            <img
              src={require("../../image/ESCUDO/MENU DE ELEMENTOS/M4.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools} onClick={handleStickers}>
            <img
              src={require("../../image/ESCUDO/MENU DE ELEMENTOS/M5.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools} onClick={handleColor}>
            <img
              src={require("../../image/ESCUDO/MENU DE ELEMENTOS/M6.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools}>
            <img
              src={require("../../image/ESCUDO/MENU DE ELEMENTOS/M7.png")}
              alt=""
            />
          </div>
        </div>

        {stickers && (
          <div className={styles.barra_stickers}>
            <div className={styles.img_container}>
              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers1.png")}
                    alt=""
                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers3.png")}
                    alt=""
                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers4.png")}
                    alt=""
                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers5.png")}
                    alt=""
                  />
                </div>
              </div>
              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers7.png")}
                    alt=""
                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers8.png")}
                    alt=""
                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers9.png")}
                    alt=""
                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers10.png")}
                    alt=""
                  />
                </div>
              </div>

              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers11.png")}
                    alt=""
                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers12.png")}
                    alt=""
                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers13.png")}
                    alt=""
                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers14.png")}
                    alt=""
                  />
                </div>
              </div>

              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers15.png")}
                    alt=""
                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers16.png")}
                    alt=""
                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers17.png")}
                    alt=""
                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers18.png")}
                    alt=""
                  />
                </div>
              </div>

              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers19.png")}
                    alt=""
                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers20.png")}
                    alt=""
                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers21.png")}
                    alt=""
                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers22.png")}
                    alt=""
                  />
                </div>
              </div>

              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers26.png")}
                    alt=""
                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers27.png")}
                    alt=""
                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers28.png")}
                    alt=""
                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers29.png")}
                    alt=""
                  />
                </div>
              </div>
              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/MARCOS/STIKERS/Stikers30.png")}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {cintillos && (
          <div className={styles.barra_stickers}>
            <div className={styles.img_container}>
              <div className={styles.img_escudo}>
                <div
                  className={styles.stickers}
                  draggable="true"
                  onDragStart={(event) => {
                    const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M480.16 148.54H74.75l23.99-41.23-23.99-40.44h405.41l-20.06 40.44 20.06 41.23z" style="fill:#4e2178; stroke: #0BC6FF; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                    event.dataTransfer.setData("text/plain", updatedSvgString);
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

                <div className={styles.stickers} draggable="true"
                     onDragStart={(event) => {
                      const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M128.33 163.95c-31.03 0-56.24-25.22-56.24-56.24s25.21-56.25 56.24-56.25h298.25c31.03 0 56.24 25.22 56.24 56.25s-25.22 56.24-56.24 56.24H128.33Z" style="fill:#00b3ba; stroke: #004c4c; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                      event.dataTransfer.setData("text/plain", updatedSvgString);
                    }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                    {...props}
                  >
                    <path
                      d="M128.33 163.95c-31.03 0-56.24-25.22-56.24-56.24s25.21-56.25 56.24-56.25h298.25c31.03 0 56.24 25.22 56.24 56.25s-25.22 56.24-56.24 56.24H128.33Z"
                      style={{
                        fill: "#00b3ba",
                        stroke: "#004c4c",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>

                <div className={styles.stickers} draggable="true"
                        onDragStart={(event) => {
                          const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M96.24 63.36c-.02.1 0 0-.02.13-.5 2.49.12.03-.62 2.46s.12.05-.86 2.4c-.97 2.35.11.05-1.09 2.3-1.2 2.24.11.07-1.31 2.18-1.41 2.11.1.07-1.51 2.04s.09.09-1.71 1.88c-1.8 1.8.08.09-1.88 1.71-1.97 1.61.08.1-2.04 1.52-2.11 1.41.06.11-2.18 1.31s.05.12-2.3 1.09c-2.35.97.04.12-2.4.86-2.43.74.03.12-2.47.62-.13.03-.02 0-.13.02v47.68c.1.02 0 0 .13.02 2.49.5.03-.12 2.47.62 2.43.74.05-.12 2.4.86 2.35.97.05-.11 2.3 1.09 2.24 1.2.07-.11 2.18 1.31 2.11 1.41.07-.1 2.04 1.52 1.97 1.61.09-.09 1.88 1.71 1.8 1.8.09-.08 1.71 1.88 1.61 1.97.1-.08 1.51 2.04 1.41 2.11.11-.06 1.31 2.18s.12-.05 1.09 2.3c.97 2.35.12-.04.86 2.4.74 2.43.12-.03.62 2.47.03.13 0 .03.02.13h362.43c.02-.1 0 0 .02-.13.5-2.49-.12-.03.62-2.47.74-2.43-.12-.05.86-2.4.97-2.35-.11-.05 1.09-2.3 1.2-2.24-.11-.07 1.31-2.18 1.41-2.11-.1-.07 1.52-2.04 1.61-1.97-.09-.09 1.71-1.88 1.8-1.8-.08-.09 1.88-1.71 1.97-1.61-.08-.1 2.04-1.52 2.11-1.41-.06-.11 2.18-1.31s-.05-.12 2.3-1.09c2.35-.97-.04-.12 2.4-.86 2.43-.74-.03-.12 2.46-.62.13-.03.03 0 .13-.02V83.88c-.1-.02 0 0-.13-.02-2.49-.5-.03.12-2.46-.62s-.05.12-2.4-.86c-2.35-.97-.05.11-2.3-1.09-2.24-1.2-.07.11-2.18-1.31-2.11-1.41-.07.1-2.04-1.52-1.97-1.61-.09.09-1.88-1.71-1.8-1.8-.09.08-1.71-1.88-1.61-1.97-.1.08-1.52-2.04-1.41-2.11-.11.06-1.31-2.18s-.12.05-1.09-2.3c-.97-2.35-.12.04-.86-2.4-.74-2.43-.12.03-.62-2.46-.03-.13 0-.03-.02-.13H96.24Z" style="fill:#f5c211; stroke: #876400; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                          event.dataTransfer.setData("text/plain", updatedSvgString);
                        }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                    {...props}
                  >
                    <path
                      d="M96.24 63.36c-.02.1 0 0-.02.13-.5 2.49.12.03-.62 2.46s.12.05-.86 2.4c-.97 2.35.11.05-1.09 2.3-1.2 2.24.11.07-1.31 2.18-1.41 2.11.1.07-1.51 2.04s.09.09-1.71 1.88c-1.8 1.8.08.09-1.88 1.71-1.97 1.61.08.1-2.04 1.52-2.11 1.41.06.11-2.18 1.31s.05.12-2.3 1.09c-2.35.97.04.12-2.4.86-2.43.74.03.12-2.47.62-.13.03-.02 0-.13.02v47.68c.1.02 0 0 .13.02 2.49.5.03-.12 2.47.62 2.43.74.05-.12 2.4.86 2.35.97.05-.11 2.3 1.09 2.24 1.2.07-.11 2.18 1.31 2.11 1.41.07-.1 2.04 1.52 1.97 1.61.09-.09 1.88 1.71 1.8 1.8.09-.08 1.71 1.88 1.61 1.97.1-.08 1.51 2.04 1.41 2.11.11-.06 1.31 2.18s.12-.05 1.09 2.3c.97 2.35.12-.04.86 2.4.74 2.43.12-.03.62 2.47.03.13 0 .03.02.13h362.43c.02-.1 0 0 .02-.13.5-2.49-.12-.03.62-2.47.74-2.43-.12-.05.86-2.4.97-2.35-.11-.05 1.09-2.3 1.2-2.24-.11-.07 1.31-2.18 1.41-2.11-.1-.07 1.52-2.04 1.61-1.97-.09-.09 1.71-1.88 1.8-1.8-.08-.09 1.88-1.71 1.97-1.61-.08-.1 2.04-1.52 2.11-1.41-.06-.11 2.18-1.31s-.05-.12 2.3-1.09c2.35-.97-.04-.12 2.4-.86 2.43-.74-.03-.12 2.46-.62.13-.03.03 0 .13-.02V83.88c-.1-.02 0 0-.13-.02-2.49-.5-.03.12-2.46-.62s-.05.12-2.4-.86c-2.35-.97-.05.11-2.3-1.09-2.24-1.2-.07.11-2.18-1.31-2.11-1.41-.07.1-2.04-1.52-1.97-1.61-.09.09-1.88-1.71-1.8-1.8-.09.08-1.71-1.88-1.61-1.97-.1.08-1.52-2.04-1.41-2.11-.11.06-1.31-2.18s-.12.05-1.09-2.3c-.97-2.35-.12.04-.86-2.4-.74-2.43-.12.03-.62-2.46-.03-.13 0-.03-.02-.13H96.24Z"
                      style={{
                        fill: "#f5c211",
                        stroke: "#876400",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>
                <div className={styles.stickers} draggable="true"
                     onDragStart={(event) => {
                      const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M117.33 65.03h320.26l-33.32 85.35H150.65l-33.32-85.35Z" style="fill:#d6d903; stroke: #660; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                      event.dataTransfer.setData("text/plain", updatedSvgString);
                    }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                    {...props}
                  >
                    <path
                      d="M117.33 65.03h320.26l-33.32 85.35H150.65l-33.32-85.35Z"
                      style={{
                        fill: "#d6d903",
                        stroke: "#660",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>
              </div>
              <div className={styles.img_escudo}>
                <div className={styles.stickers} draggable="true"
                     onDragStart={(event) => {
                      const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M126.67 56.7h369.42l-67.85 102.02H58.82L126.67 56.7Z" style="fill:#db2d4d; stroke:#750019; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                      event.dataTransfer.setData("text/plain", updatedSvgString);
                    }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                    {...props}
                  >
                    <path
                      d="M126.67 56.7h369.42l-67.85 102.02H58.82L126.67 56.7Z"
                      style={{
                        fill: "#db2d4d",
                        stroke: "#750019",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>

                <div className={styles.stickers} draggable="true"
                    onDragStart={(event) => {
                      const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M91.79 156.97h371.33c0-11.59 9.39-20.98 20.98-20.98h0V79.41c-11.59 0-20.98-9.39-20.98-20.98H91.79c0 11.59-9.39 20.98-20.98 20.98h0v56.58c11.59 0 20.98 9.39 20.98 20.98h0Z" style="fill:#ededed; stroke:#7f7f7f; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                      event.dataTransfer.setData("text/plain", updatedSvgString);
                    }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                    {...props}
                  >
                    <path
                      d="M91.79 156.97h371.33c0-11.59 9.39-20.98 20.98-20.98h0V79.41c-11.59 0-20.98-9.39-20.98-20.98H91.79c0 11.59-9.39 20.98-20.98 20.98h0v56.58c11.59 0 20.98 9.39 20.98 20.98h0Z"
                      style={{
                        fill: "#ededed",
                        stroke: "#7f7f7f",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>
                <div className={styles.stickers} draggable="true"
                   onDragStart={(event) => {
                    const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M71.22 81.16H41.29l16.12 34.05-16.12 34.05h63.14l-33.21-12.81V81.16zM483.7 81.16h29.92l-16.11 34.05 16.11 34.05h-63.14l33.22-12.81V81.16z" style="fill:#00b878; stroke:#005635; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                    event.dataTransfer.setData("text/plain", updatedSvgString);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Capa_10"
                    viewBox="0 0 554.91 215.41"
                  >
                    <defs>
                      <style>
                        {
                          ".cls-1{fill:#00b878;stroke:#005635;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px}"
                        }
                      </style>
                    </defs>
                    <path
                      d="M71.22 81.16H41.29l16.12 34.05-16.12 34.05h63.14l-33.21-12.81V81.16zM483.7 81.16h29.92l-16.11 34.05 16.11 34.05h-63.14l33.22-12.81V81.16z"
                      className="cls-1"
                    />
                    <path
                      d="M277.46 66.15H75.6v68.11h403.71V66.15H277.46z"
                      className="cls-1"
                    />
                  </svg>
                </div>
                <div className={styles.stickers} draggable="true"
                    onDragStart={(event) => {
                      const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M455.58 107.7c8.61-4.5 14.5-13.51 14.5-23.9 0-14.89-12.07-26.96-26.96-26.96s-26.96 12.07-26.96 26.96h-277.4c0-14.89-12.08-26.96-26.97-26.96S84.83 68.91 84.83 83.8c0 10.39 5.89 19.4 14.51 23.9-8.62 4.51-14.51 13.51-14.51 23.9 0 14.9 12.07 26.96 26.96 26.96s26.97-12.07 26.97-26.96h277.4c0 14.9 12.07 26.96 26.96 26.96s26.96-12.07 26.96-26.96c0-10.4-5.89-19.4-14.5-23.9Z" style="fill:#f57657; stroke:#7c1400; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                      event.dataTransfer.setData("text/plain", updatedSvgString);
                    }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                  >
                    <path
                      d="M455.58 107.7c8.61-4.5 14.5-13.51 14.5-23.9 0-14.89-12.07-26.96-26.96-26.96s-26.96 12.07-26.96 26.96h-277.4c0-14.89-12.08-26.96-26.97-26.96S84.83 68.91 84.83 83.8c0 10.39 5.89 19.4 14.51 23.9-8.62 4.51-14.51 13.51-14.51 23.9 0 14.9 12.07 26.96 26.96 26.96s26.97-12.07 26.97-26.96h277.4c0 14.9 12.07 26.96 26.96 26.96s26.96-12.07 26.96-26.96c0-10.4-5.89-19.4-14.5-23.9Z"
                      style={{
                        fill: "#f57657",
                        stroke: "#7c1400",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>
              </div>

              <div className={styles.img_escudo}
          onDragStart={(event) => {
            const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="m467.96 107.7-41.48 41.64H128.43L86.96 107.7l41.47-41.63h298.05l41.48 41.63z" style="fill:#00a0ff; stroke:#006293; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
            event.dataTransfer.setData("text/plain", updatedSvgString);
          }}
              >
                <div className={styles.stickers} draggable="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                  >
                    <path
                      d="m467.96 107.7-41.48 41.64H128.43L86.96 107.7l41.47-41.63h298.05l41.48 41.63z"
                      style={{
                        fill: "#00a0ff",
                        stroke: "#006293",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>

                <div className={styles.stickers} draggable="true"
                 onDragStart={(event) => {
                  const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="m467.96 107.7-41.48 41.64H128.43L86.96 107.7l41.47-41.63h298.05l41.48 41.63z" style="fill:#b7ae55; stroke:#006293; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                  event.dataTransfer.setData("text/plain", updatedSvgString);
                }}
                   
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                  >
                    <path
                      d="M455.26 175.97c-5.04-5.49-6.38-13.33-1.9-18.48l2.35-2.01 2.47-1.46c6.05-2.58 13.22 2.02 12.32 9.63l-.12 1.68-1.56-.78c-3.47-1.91-4.37-1.12-4.93-.67-1.23.78-2.01 4.25 1.12 5.82l1.57.56 3.02-.22c3.02-.9 6.05-3.7 6.38-8.29.56-6.94-4.59-12.43-9.63-13.33-1.23-.22-2.69 0-4.25.22l-370.06-2.9c-13.78 2.24-21.73-5.71-21.84-15.9l-.12-77.17c1.23-14.56 18.48-24.98 29.57-13.22 5.15 5.49 6.38 13.33 1.9 18.48l-2.24 2.02-2.46 1.45c-6.16 2.58-13.22-2.01-12.43-9.63l.22-1.68 1.46.78c3.47 1.9 4.37 1.12 5.04.67 1.12-.78 2.02-4.25-1.23-5.83l-1.45-.56-3.03.22c-3.13.78-6.05 3.69-6.5 8.29-.56 6.83 4.59 12.43 9.63 13.33 1.34.23 2.69 0 4.37-.22l369.95 2.9c13.89-2.24 21.84 5.72 21.84 15.79l.11 77.16c-1.12 14.67-18.48 25.09-29.57 13.33Z"
                      style={{
                        fill: "#b7ae55",
                        fillRule: "evenodd",
                        stroke: "#897903",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>
                <div className={styles.stickers} draggable="true"
              onDragStart={(event) => {
                const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M93.98 55.3s-14.42 2.83-14.42 17.16v87.64s1.6-17.66 14.42-17.66h381.38l-27.71-45.13 27.71-42.01H93.98Z" style="fill:#d6d903; stroke: #660; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                event.dataTransfer.setData("text/plain", updatedSvgString);
              }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                    {...props}

                  >
                    <path
                      d="M93.98 55.3s-14.42 2.83-14.42 17.16v87.64s1.6-17.66 14.42-17.66h381.38l-27.71-45.13 27.71-42.01H93.98Z"
                      style={{
                        fill: "#73d2de",
                        stroke: "#44898e",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>
                <div className={styles.stickers} draggable="true"
                       onDragStart={(event) => {
                        const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M93.98 55.3s-14.42 2.83-14.42 17.16v87.64s1.6-17.66 14.42-17.66h381.38l-27.71-45.13 27.71-42.01H93.98Z" style="fill:#dbd2bf; stroke: #84817b; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                        event.dataTransfer.setData("text/plain", updatedSvgString);
                      }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                  >
                    <path
                      d="M487.34 70.35h-97.19l46.43 10.99h-.09l-318.16-.03 46.41-10.97H67.57l33.6 35.49-33.48 24.27h68.99l4.17 14.96h272.53l4.29-14.93h69.54l-33.48-28.88 33.62-30.9Z"
                      style={{
                        fill: "#dbd2bf",
                        stroke: "#84817b",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}


{cintillos && (
          <div className={styles.barra_stickers}>
            <div className={styles.img_container}>
              <div className={styles.img_escudo}>
                <div
                  className={styles.stickers}
                  draggable="true"
                  onDragStart={(event) => {
                    const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M480.16 148.54H74.75l23.99-41.23-23.99-40.44h405.41l-20.06 40.44 20.06 41.23z" style="fill:#4e2178; stroke: #0BC6FF; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                    event.dataTransfer.setData("text/plain", updatedSvgString);
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

                <div className={styles.stickers} draggable="true"
                     onDragStart={(event) => {
                      const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M128.33 163.95c-31.03 0-56.24-25.22-56.24-56.24s25.21-56.25 56.24-56.25h298.25c31.03 0 56.24 25.22 56.24 56.25s-25.22 56.24-56.24 56.24H128.33Z" style="fill:#00b3ba; stroke: #004c4c; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                      event.dataTransfer.setData("text/plain", updatedSvgString);
                    }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                    {...props}
                  >
                    <path
                      d="M128.33 163.95c-31.03 0-56.24-25.22-56.24-56.24s25.21-56.25 56.24-56.25h298.25c31.03 0 56.24 25.22 56.24 56.25s-25.22 56.24-56.24 56.24H128.33Z"
                      style={{
                        fill: "#00b3ba",
                        stroke: "#004c4c",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>

                <div className={styles.stickers} draggable="true"
                        onDragStart={(event) => {
                          const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M96.24 63.36c-.02.1 0 0-.02.13-.5 2.49.12.03-.62 2.46s.12.05-.86 2.4c-.97 2.35.11.05-1.09 2.3-1.2 2.24.11.07-1.31 2.18-1.41 2.11.1.07-1.51 2.04s.09.09-1.71 1.88c-1.8 1.8.08.09-1.88 1.71-1.97 1.61.08.1-2.04 1.52-2.11 1.41.06.11-2.18 1.31s.05.12-2.3 1.09c-2.35.97.04.12-2.4.86-2.43.74.03.12-2.47.62-.13.03-.02 0-.13.02v47.68c.1.02 0 0 .13.02 2.49.5.03-.12 2.47.62 2.43.74.05-.12 2.4.86 2.35.97.05-.11 2.3 1.09 2.24 1.2.07-.11 2.18 1.31 2.11 1.41.07-.1 2.04 1.52 1.97 1.61.09-.09 1.88 1.71 1.8 1.8.09-.08 1.71 1.88 1.61 1.97.1-.08 1.51 2.04 1.41 2.11.11-.06 1.31 2.18s.12-.05 1.09 2.3c.97 2.35.12-.04.86 2.4.74 2.43.12-.03.62 2.47.03.13 0 .03.02.13h362.43c.02-.1 0 0 .02-.13.5-2.49-.12-.03.62-2.47.74-2.43-.12-.05.86-2.4.97-2.35-.11-.05 1.09-2.3 1.2-2.24-.11-.07 1.31-2.18 1.41-2.11-.1-.07 1.52-2.04 1.61-1.97-.09-.09 1.71-1.88 1.8-1.8-.08-.09 1.88-1.71 1.97-1.61-.08-.1 2.04-1.52 2.11-1.41-.06-.11 2.18-1.31s-.05-.12 2.3-1.09c2.35-.97-.04-.12 2.4-.86 2.43-.74-.03-.12 2.46-.62.13-.03.03 0 .13-.02V83.88c-.1-.02 0 0-.13-.02-2.49-.5-.03.12-2.46-.62s-.05.12-2.4-.86c-2.35-.97-.05.11-2.3-1.09-2.24-1.2-.07.11-2.18-1.31-2.11-1.41-.07.1-2.04-1.52-1.97-1.61-.09.09-1.88-1.71-1.8-1.8-.09.08-1.71-1.88-1.61-1.97-.1.08-1.52-2.04-1.41-2.11-.11.06-1.31-2.18s-.12.05-1.09-2.3c-.97-2.35-.12.04-.86-2.4-.74-2.43-.12.03-.62-2.46-.03-.13 0-.03-.02-.13H96.24Z" style="fill:#f5c211; stroke: #876400; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                          event.dataTransfer.setData("text/plain", updatedSvgString);
                        }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                    {...props}
                  >
                    <path
                      d="M96.24 63.36c-.02.1 0 0-.02.13-.5 2.49.12.03-.62 2.46s.12.05-.86 2.4c-.97 2.35.11.05-1.09 2.3-1.2 2.24.11.07-1.31 2.18-1.41 2.11.1.07-1.51 2.04s.09.09-1.71 1.88c-1.8 1.8.08.09-1.88 1.71-1.97 1.61.08.1-2.04 1.52-2.11 1.41.06.11-2.18 1.31s.05.12-2.3 1.09c-2.35.97.04.12-2.4.86-2.43.74.03.12-2.47.62-.13.03-.02 0-.13.02v47.68c.1.02 0 0 .13.02 2.49.5.03-.12 2.47.62 2.43.74.05-.12 2.4.86 2.35.97.05-.11 2.3 1.09 2.24 1.2.07-.11 2.18 1.31 2.11 1.41.07-.1 2.04 1.52 1.97 1.61.09-.09 1.88 1.71 1.8 1.8.09-.08 1.71 1.88 1.61 1.97.1-.08 1.51 2.04 1.41 2.11.11-.06 1.31 2.18s.12-.05 1.09 2.3c.97 2.35.12-.04.86 2.4.74 2.43.12-.03.62 2.47.03.13 0 .03.02.13h362.43c.02-.1 0 0 .02-.13.5-2.49-.12-.03.62-2.47.74-2.43-.12-.05.86-2.4.97-2.35-.11-.05 1.09-2.3 1.2-2.24-.11-.07 1.31-2.18 1.41-2.11-.1-.07 1.52-2.04 1.61-1.97-.09-.09 1.71-1.88 1.8-1.8-.08-.09 1.88-1.71 1.97-1.61-.08-.1 2.04-1.52 2.11-1.41-.06-.11 2.18-1.31s-.05-.12 2.3-1.09c2.35-.97-.04-.12 2.4-.86 2.43-.74-.03-.12 2.46-.62.13-.03.03 0 .13-.02V83.88c-.1-.02 0 0-.13-.02-2.49-.5-.03.12-2.46-.62s-.05.12-2.4-.86c-2.35-.97-.05.11-2.3-1.09-2.24-1.2-.07.11-2.18-1.31-2.11-1.41-.07.1-2.04-1.52-1.97-1.61-.09.09-1.88-1.71-1.8-1.8-.09.08-1.71-1.88-1.61-1.97-.1.08-1.52-2.04-1.41-2.11-.11.06-1.31-2.18s-.12.05-1.09-2.3c-.97-2.35-.12.04-.86-2.4-.74-2.43-.12.03-.62-2.46-.03-.13 0-.03-.02-.13H96.24Z"
                      style={{
                        fill: "#f5c211",
                        stroke: "#876400",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>
                <div className={styles.stickers} draggable="true"
                     onDragStart={(event) => {
                      const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M117.33 65.03h320.26l-33.32 85.35H150.65l-33.32-85.35Z" style="fill:#d6d903; stroke: #660; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                      event.dataTransfer.setData("text/plain", updatedSvgString);
                    }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                    {...props}
                  >
                    <path
                      d="M117.33 65.03h320.26l-33.32 85.35H150.65l-33.32-85.35Z"
                      style={{
                        fill: "#d6d903",
                        stroke: "#660",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>
              </div>
              <div className={styles.img_escudo}>
                <div className={styles.stickers} draggable="true"
                     onDragStart={(event) => {
                      const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M126.67 56.7h369.42l-67.85 102.02H58.82L126.67 56.7Z" style="fill:#db2d4d; stroke:#750019; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                      event.dataTransfer.setData("text/plain", updatedSvgString);
                    }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                    {...props}
                  >
                    <path
                      d="M126.67 56.7h369.42l-67.85 102.02H58.82L126.67 56.7Z"
                      style={{
                        fill: "#db2d4d",
                        stroke: "#750019",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>

                <div className={styles.stickers} draggable="true"
                    onDragStart={(event) => {
                      const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M91.79 156.97h371.33c0-11.59 9.39-20.98 20.98-20.98h0V79.41c-11.59 0-20.98-9.39-20.98-20.98H91.79c0 11.59-9.39 20.98-20.98 20.98h0v56.58c11.59 0 20.98 9.39 20.98 20.98h0Z" style="fill:#ededed; stroke:#7f7f7f; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                      event.dataTransfer.setData("text/plain", updatedSvgString);
                    }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                    {...props}
                  >
                    <path
                      d="M91.79 156.97h371.33c0-11.59 9.39-20.98 20.98-20.98h0V79.41c-11.59 0-20.98-9.39-20.98-20.98H91.79c0 11.59-9.39 20.98-20.98 20.98h0v56.58c11.59 0 20.98 9.39 20.98 20.98h0Z"
                      style={{
                        fill: "#ededed",
                        stroke: "#7f7f7f",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>
                <div className={styles.stickers} draggable="true"
                   onDragStart={(event) => {
                    const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M71.22 81.16H41.29l16.12 34.05-16.12 34.05h63.14l-33.21-12.81V81.16zM483.7 81.16h29.92l-16.11 34.05 16.11 34.05h-63.14l33.22-12.81V81.16z" style="fill:#00b878; stroke:#005635; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                    event.dataTransfer.setData("text/plain", updatedSvgString);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Capa_10"
                    viewBox="0 0 554.91 215.41"
                  >
                    <defs>
                      <style>
                        {
                          ".cls-1{fill:#00b878;stroke:#005635;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px}"
                        }
                      </style>
                    </defs>
                    <path
                      d="M71.22 81.16H41.29l16.12 34.05-16.12 34.05h63.14l-33.21-12.81V81.16zM483.7 81.16h29.92l-16.11 34.05 16.11 34.05h-63.14l33.22-12.81V81.16z"
                      className="cls-1"
                    />
                    <path
                      d="M277.46 66.15H75.6v68.11h403.71V66.15H277.46z"
                      className="cls-1"
                    />
                  </svg>
                </div>
                <div className={styles.stickers} draggable="true"
                    onDragStart={(event) => {
                      const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M455.58 107.7c8.61-4.5 14.5-13.51 14.5-23.9 0-14.89-12.07-26.96-26.96-26.96s-26.96 12.07-26.96 26.96h-277.4c0-14.89-12.08-26.96-26.97-26.96S84.83 68.91 84.83 83.8c0 10.39 5.89 19.4 14.51 23.9-8.62 4.51-14.51 13.51-14.51 23.9 0 14.9 12.07 26.96 26.96 26.96s26.97-12.07 26.97-26.96h277.4c0 14.9 12.07 26.96 26.96 26.96s26.96-12.07 26.96-26.96c0-10.4-5.89-19.4-14.5-23.9Z" style="fill:#f57657; stroke:#7c1400; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                      event.dataTransfer.setData("text/plain", updatedSvgString);
                    }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                  >
                    <path
                      d="M455.58 107.7c8.61-4.5 14.5-13.51 14.5-23.9 0-14.89-12.07-26.96-26.96-26.96s-26.96 12.07-26.96 26.96h-277.4c0-14.89-12.08-26.96-26.97-26.96S84.83 68.91 84.83 83.8c0 10.39 5.89 19.4 14.51 23.9-8.62 4.51-14.51 13.51-14.51 23.9 0 14.9 12.07 26.96 26.96 26.96s26.97-12.07 26.97-26.96h277.4c0 14.9 12.07 26.96 26.96 26.96s26.96-12.07 26.96-26.96c0-10.4-5.89-19.4-14.5-23.9Z"
                      style={{
                        fill: "#f57657",
                        stroke: "#7c1400",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>
              </div>

              <div className={styles.img_escudo}
          onDragStart={(event) => {
            const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="m467.96 107.7-41.48 41.64H128.43L86.96 107.7l41.47-41.63h298.05l41.48 41.63z" style="fill:#00a0ff; stroke:#006293; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
            event.dataTransfer.setData("text/plain", updatedSvgString);
          }}
              >
                <div className={styles.stickers} draggable="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                  >
                    <path
                      d="m467.96 107.7-41.48 41.64H128.43L86.96 107.7l41.47-41.63h298.05l41.48 41.63z"
                      style={{
                        fill: "#00a0ff",
                        stroke: "#006293",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>

                <div className={styles.stickers} draggable="true"
                 onDragStart={(event) => {
                  const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="m467.96 107.7-41.48 41.64H128.43L86.96 107.7l41.47-41.63h298.05l41.48 41.63z" style="fill:#b7ae55; stroke:#006293; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                  event.dataTransfer.setData("text/plain", updatedSvgString);
                }}
                   
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                  >
                    <path
                      d="M455.26 175.97c-5.04-5.49-6.38-13.33-1.9-18.48l2.35-2.01 2.47-1.46c6.05-2.58 13.22 2.02 12.32 9.63l-.12 1.68-1.56-.78c-3.47-1.91-4.37-1.12-4.93-.67-1.23.78-2.01 4.25 1.12 5.82l1.57.56 3.02-.22c3.02-.9 6.05-3.7 6.38-8.29.56-6.94-4.59-12.43-9.63-13.33-1.23-.22-2.69 0-4.25.22l-370.06-2.9c-13.78 2.24-21.73-5.71-21.84-15.9l-.12-77.17c1.23-14.56 18.48-24.98 29.57-13.22 5.15 5.49 6.38 13.33 1.9 18.48l-2.24 2.02-2.46 1.45c-6.16 2.58-13.22-2.01-12.43-9.63l.22-1.68 1.46.78c3.47 1.9 4.37 1.12 5.04.67 1.12-.78 2.02-4.25-1.23-5.83l-1.45-.56-3.03.22c-3.13.78-6.05 3.69-6.5 8.29-.56 6.83 4.59 12.43 9.63 13.33 1.34.23 2.69 0 4.37-.22l369.95 2.9c13.89-2.24 21.84 5.72 21.84 15.79l.11 77.16c-1.12 14.67-18.48 25.09-29.57 13.33Z"
                      style={{
                        fill: "#b7ae55",
                        fillRule: "evenodd",
                        stroke: "#897903",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>
                <div className={styles.stickers} draggable="true"
              onDragStart={(event) => {
                const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M93.98 55.3s-14.42 2.83-14.42 17.16v87.64s1.6-17.66 14.42-17.66h381.38l-27.71-45.13 27.71-42.01H93.98Z" style="fill:#d6d903; stroke: #660; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                event.dataTransfer.setData("text/plain", updatedSvgString);
              }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                    {...props}

                  >
                    <path
                      d="M93.98 55.3s-14.42 2.83-14.42 17.16v87.64s1.6-17.66 14.42-17.66h381.38l-27.71-45.13 27.71-42.01H93.98Z"
                      style={{
                        fill: "#73d2de",
                        stroke: "#44898e",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>
                <div className={styles.stickers} draggable="true"
                       onDragStart={(event) => {
                        const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M93.98 55.3s-14.42 2.83-14.42 17.16v87.64s1.6-17.66 14.42-17.66h381.38l-27.71-45.13 27.71-42.01H93.98Z" style="fill:#dbd2bf; stroke: #84817b; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                        event.dataTransfer.setData("text/plain", updatedSvgString);
                      }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
                  >
                    <path
                      d="M487.34 70.35h-97.19l46.43 10.99h-.09l-318.16-.03 46.41-10.97H67.57l33.6 35.49-33.48 24.27h68.99l4.17 14.96h272.53l4.29-14.93h69.54l-33.48-28.88 33.62-30.9Z"
                      style={{
                        fill: "#dbd2bf",
                        stroke: "#84817b",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 10,
                      }}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

{escudos && (
          <div className={styles.barra_stickers}>
            <div className={styles.img_container}>
              <div className={styles.img_escudo}>
                <div className={styles.stickers}
                draggable="true"
                 onDragStart={(event) => {
                  const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M228.69 373.27c-1.56 0-3.12-.45-4.53-1.34l-81.38-51.79c-.36-.23-.7-.48-1.03-.76-29.46-24.99-47.04-65.11-47.04-107.33V106.54c0-3.65 1.59-7.06 4.24-9.07l20.59-15.58c32.52-24.61 70.27-37.62 109.15-37.62s76.62 13.01 109.15 37.62l20.59 15.58c2.65 2 4.24 5.41 4.24 9.07v105.51c0 42.22-17.59 82.35-47.05 107.33-.33.28-.67.53-1.03.76l-81.38 51.79c-1.41.9-2.97 1.34-4.53 1.34Z" style="fill:#164194; stroke: #1d1d1b; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                  event.dataTransfer.setData("text/plain", updatedSvgString);
                }}
                >
                <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 457.38 417.54"
    {...props}
  >
    <g
      style={{
        isolation: "isolate",
      }}
    >
      <path
        d="M228.69 373.27c-1.56 0-3.12-.45-4.53-1.34l-81.38-51.79c-.36-.23-.7-.48-1.03-.76-29.46-24.99-47.04-65.11-47.04-107.33V106.54c0-3.65 1.59-7.06 4.24-9.07l20.59-15.58c32.52-24.61 70.27-37.62 109.15-37.62s76.62 13.01 109.15 37.62l20.59 15.58c2.65 2 4.24 5.41 4.24 9.07v105.51c0 42.22-17.59 82.35-47.05 107.33-.33.28-.67.53-1.03.76l-81.38 51.79c-1.41.9-2.97 1.34-4.53 1.34Z"
        style={{
          fill: "#164194",
          stroke: "#1d1d1b",
          strokeMiterlimit: 10,
          strokeWidth: 5,
        }}
      />
      <g
        style={{
          mixBlendMode: "soft-light",
        }}
      >
        <path
          d="M148.25 313.05c-23.23-18.13-38.1-45.68-43.94-74.33-1.99-9.62-2.81-19.52-2.87-29.31-.21-19.46-.26-38.93-.38-58.39-.03-6.21-.07-31.72-.09-37.4-.13-4.01 1.41-8.13 4.61-10.69l2.95-2.25c7.73-5.79 15.58-12 23.5-17.49 53.89-37.61 124.85-40.46 180.89-5.78 5.87 3.52 12.57 8.34 17.96 12.55l-6.01-4.14C264.3 45.06 186.9 46.99 128.74 91.13c-3.78 2.88-13.77 10.42-17.45 13.2l-2.86 2.16c-1.85 1.47-2.87 3.92-2.93 6.28-.03 6.22-.07 31.6-.1 38.25-.12 19.46-.17 38.93-.38 58.39-.8 38.46 13.69 78.08 43.22 103.64Z"
          style={{
            strokeWidth: 0,
            fill: "#fff",
          }}
        />
      </g>
      <g
        style={{
          mixBlendMode: "multiply",
          opacity: 0.26,
        }}
      >
        <path
          d="M354.15 113.04c1.15 34.19 1.93 68.37 1.96 102.57-.05 1.48-.01 3.51-.15 4.95-1.83 35.41-17.36 70.84-44.94 93.64-25.21 15.98-51.56 31.88-77.22 47.21-2.7 1.92-6.62 2.13-9.34.14 2.83 1.72 6.43 1.35 8.97-.72 18.42-12.54 38.3-25.76 56.88-37.92 5.44-3.58 10.89-7.14 16.36-10.67 1.14-.75 1.83-1.13 2.71-1.99 23.16-20.42 37.36-49.95 41.4-80.37.59-3.96.94-7.97 1.15-11.96.71-34.95.85-69.91 2.23-104.87Z"
          style={{
            fill: "#17375c",
            strokeWidth: 0,
          }}
        />
      </g>
    </g>
  </svg>
                </div>



                <div className={styles.stickers}
                draggable="true"
                 onDragStart={(event) => {
                  const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M362.79 146.98 256.28 69.57c-16.5-11.8-38.9-11.8-55.11 0L94.52 146.98c-16.36 11.93-23.36 32.94-16.9 52.15L118.3 324.3c6.32 19.35 24.05 32.52 44.39 32.52h131.94c20.34 0 38.07-13.18 44.39-32.52l40.82-125.17c6.32-19.21-.69-40.22-17.04-52.15Z" style="fill:#00b878; stroke: #1d1d1b; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                  event.dataTransfer.setData("text/plain", updatedSvgString);
                }}
                >
                    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 457.38 417.54"
    {...props}
  >
    <g
      style={{
        isolation: "isolate",
      }}
    >
      <path
        d="M362.79 146.98 256.28 69.57c-16.5-11.8-38.9-11.8-55.11 0L94.52 146.98c-16.36 11.93-23.36 32.94-16.9 52.15L118.3 324.3c6.32 19.35 24.05 32.52 44.39 32.52h131.94c20.34 0 38.07-13.18 44.39-32.52l40.82-125.17c6.32-19.21-.69-40.22-17.04-52.15Z"
        style={{
          fill: "#00b878",
          fillRule: "evenodd",
          stroke: "#1d1d1b",
          strokeMiterlimit: 10,
          strokeWidth: 5,
        }}
      />
      <g
        style={{
          mixBlendMode: "soft-light",
        }}
      >
        <path
          d="M255.08 75.67c-12.54-8.4-29.12-10.15-42.92-4.15-5.94 2.36-13.45 8.61-18.64 12.43l-18.25 13.6c-21.1 15.68-51.8 38.2-73.38 53.89-5.81 4.28-10.62 9.89-13.67 16.44-4.74 9.81-5.24 21.31-1.78 31.62 3.37 10.49 6.99 22.1 10.27 32.57 7.74 24.68 15.85 51.36 23.24 76.21l3.19 10.93-3.85-10.71c-8.6-24.5-17.78-50.77-26-75.31-3.56-10.34-7.34-21.93-10.84-32.37-3.99-11.22-3.48-24.07 1.7-34.85 3.33-7.25 8.63-13.53 15.03-18.26 21.78-15.63 52.34-37.87 73.98-53.06l18.59-13.14c5.44-3.72 13.26-9.88 19.56-12.08 14.5-5.51 31.47-3.2 43.76 6.23Z"
          style={{
            strokeWidth: 0,
            fill: "#fff",
          }}
        />
      </g>
      <g
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M123.14 319.23c5.76 16.48 21.43 28.9 38.87 29.82 7.26.18 18.79-.18 26.19-.23 34.02-.43 69.58-.68 103.51-.74 17.36.11 33.72-11.43 39.65-27.72 1.37-3.36 2.88-8.84 4.14-12.37 11.47-34.79 23.68-71.21 35.59-105.91l1.05-3.11.93-3.06c4.6-16.82-2.28-35.65-16.16-46.23 7.26 5.01 13 12.19 16.23 20.43 3.71 9.26 4.22 19.94 1.25 29.58-.59 1.83-2.29 7.48-2.92 9.42-2.4 7.76-9.22 29.56-11.77 37.64-6.51 20.74-13.31 41.89-19.97 62.61-1.26 3.78-2.76 8.82-4.16 12.57-6.25 17.45-23.53 30.22-42.14 30.56-26.19.13-52.77-.18-78.94-.39-11.91-.13-34.23-.37-46-.57-20.6.79-39.56-12.5-45.35-32.32Z"
          style={{
            fill: "#c5e2d6",
            strokeWidth: 0,
          }}
        />
      </g>
    </g>
  </svg>
 
                </div>

                <div className={styles.stickers}
                draggable="true"
                 onDragStart={(event) => {
                  const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M365.55 52.5H91.85c-5.8 0-10.51 4.59-10.51 10.25v196.69c0 3.3 1.63 6.41 4.38 8.32l136.32 94.97c.66.52 1.35.96 2.12 1.31 1.24.57 2.54.9 3.89.98.24 0 .42.02.63.02 1.61 0 3.19-.37 4.64-1.04.7-.33 1.35-.75 2-1.24l136.32-94.99c2.75-1.91 4.38-5.02 4.38-8.32V62.75c0-5.65-4.71-10.25-10.49-10.25Z" style="fill:#b526ea; stroke: #1d1d1b; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                  event.dataTransfer.setData("text/plain", updatedSvgString);
                }}
                >

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 457.38 417.54"
    {...props}
  >
    <g
      style={{
        isolation: "isolate",
      }}
    >
      <path
        d="M365.55 52.5H91.85c-5.8 0-10.51 4.59-10.51 10.25v196.69c0 3.3 1.63 6.41 4.38 8.32l136.32 94.97c.66.52 1.35.96 2.12 1.31 1.24.57 2.54.9 3.89.98.24 0 .42.02.63.02 1.61 0 3.19-.37 4.64-1.04.7-.33 1.35-.75 2-1.24l136.32-94.99c2.75-1.91 4.38-5.02 4.38-8.32V62.75c0-5.65-4.71-10.25-10.49-10.25Z"
        style={{
          fill: "#b526ea",
          stroke: "#1d1d1b",
          strokeMiterlimit: 10,
          strokeWidth: 5,
        }}
      />
      <g
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M91.4 262.86c37.13 24.43 76.13 50.61 112.88 75.48 4.82 3.18 16.09 11.05 20.8 13.99 2.65 1.23 5.79.99 8.2-.59l1.66-1.17c2.06-1.41 8.27-5.77 10.45-7.27 31.76-22.12 80.04-55.34 111.77-77.08.69-.57 7.87-5.26 8.44-5.88 1.67-1.5 2.54-3.75 2.43-5.98.24-54.93.63-112.59 1.56-167.55l.26-16.97c.75-5.81-3.79-11.11-9.72-11.15 6.05-.17 10.96 5.09 10.42 11.15l.26 16.97c.92 54.97 1.33 112.6 1.56 167.55.26 4.25-2.11 8.55-5.7 10.71l-6.98 4.82c-31.52 21.86-79.97 55.08-111.86 76.82-1.96 1.3-8.53 5.83-10.52 7.16l-1.82 1.25c-3.52 2.31-8.33 2.6-12.07.78-1.36-.56-2.66-1.75-3.88-2.52l-3.48-2.43-13.89-9.72c-36.35-25.37-74.71-52.5-110.77-78.39Z"
          style={{
            strokeWidth: 0,
            fill: "#d6b1e5",
          }}
        />
      </g>
      <g
        style={{
          mixBlendMode: "soft-light",
        }}
      >
        <path
          d="M360.12 58.71c-77.66 1.8-159.25 2.22-237.12 2.3-6.76 0-19.23-.05-25.89-.03-4.18-.04-7.94 3.64-7.69 7.85V71.61c-.16 58.96-.72 118.84-1.88 177.84l-.09 3.71c-.01 1.24-.13 2.47.1 3.66.42 2.39 1.83 4.61 3.84 6.05-2.07-1.35-3.63-3.52-4.18-5.98-.43-2-.25-5.34-.37-7.43-1.06-54.05-1.62-109.02-1.83-163.02 0-1.87-.04-16.02-.05-17.6-.31-6.6 5.53-12.41 12.06-12.37 17.56-.12 66.99.04 85.26.07 58.94.27 118.86.81 177.84 2.18Z"
          style={{
            fill: "#fff",
            strokeWidth: 0,
          }}
        />
      </g>
    </g>
  </svg>
              </div>
              <div className={styles.stickers}
                draggable="true"
                 onDragStart={(event) => {
                  const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M227.58 74.02 35.34 206.55c-1.49 1.02-1.49 3.59 0 4.61l192 132.36c.69.47 1.54.48 2.23 0l192.47-132.36c1.49-1.02 1.49-3.59 0-4.61L229.81 74.02c-.69-.48-1.54-.48-2.23 0Z" style="fill:#c4a95f; stroke: #1d1d1b; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                  event.dataTransfer.setData("text/plain", updatedSvgString);
                }}
                >
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 457.38 417.54"
    {...props}
  >
    <g
      style={{
        isolation: "isolate",
      }}
    >
      <path
        d="M227.58 74.02 35.34 206.55c-1.49 1.02-1.49 3.59 0 4.61l192 132.36c.69.47 1.54.48 2.23 0l192.47-132.36c1.49-1.02 1.49-3.59 0-4.61L229.81 74.02c-.69-.48-1.54-.48-2.23 0Z"
        style={{
          fill: "#c4a95f",
          stroke: "#1d1d1b",
          strokeMiterlimit: 10,
          strokeWidth: 5,
        }}
      />
      <g
        style={{
          mixBlendMode: "soft-light",
        }}
      >
        <path
          d="M378.01 184.17c-45.98-30.42-102.7-68.7-148.37-99.75l-.91-.62c-.12-.08-.05-.02-.04-.03h.02l-.84.58c-15.78 11.01-65.07 44.99-81.71 56.47-23.26 15.96-71.88 49.26-94.74 64.78l-3.65 2.49c-.47.21-.47 1.04-.23 1.35 26.06 18.34 74.85 52.32 100.67 70.72 7.19 5.02 21.63 15.38 28.78 20.47-7.36-4.89-22.1-14.6-29.42-19.54-25.76-17.03-74.89-50.4-100.71-67.79l-.91-.62c-2.52-1.42-2.95-5.51-.53-7.33 7.36-5.13 32.38-22.48 40.21-27.91 39.94-27.58 100.13-69.03 140.11-96.18l.98-.66c.6-.38 1.36-.6 2.12-.57 1.2 0 2.05.74 2.91 1.32 45.35 31.57 101.38 70.72 146.26 102.82Z"
          style={{
            strokeWidth: 0,
            fill: "#fff",
          }}
        />
      </g>
      <g
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M73.66 229.59c51.31 33.52 102.94 68.43 153.52 103.04l1.36.93c.08.06.04.03.05.03-.01 0-.03-.02-.06-.02-.06-.01-.13 0-.19.02l.15-.1.68-.47c32.37-22.3 72.58-49.71 105.06-71.54 23.98-16.18 49.99-33.43 74.23-49.37l1.38-.91.69-.45c.19-.14.38-.29.51-.48.58-.76.63-1.95.12-2.81-.24-.43-.69-.7-1.15-1.04l-1.34-.97-5.35-3.87 5.53 3.61c.54.46 2.29 1.28 2.71 2.01 1.04 1.75.44 3.59-1.33 4.59-.81.57-3.18 2.27-4.03 2.87-3.04 2.19-23.3 16.59-26.89 19.17-47.64 33.72-99.47 69.61-147.79 102.63l-.68.47c-1.23.94-3.02 1.06-4.35.25l-.29-.19-1.36-.94c-50.43-34.83-101.51-70.54-151.18-106.45Z"
          style={{
            fill: "#d8d0c0",
            strokeWidth: 0,
          }}
        />
      </g>
    </g>
  </svg>
                </div>
               

              </div>

              <div className={styles.img_escudo}>
                <div className={styles.stickers}
                draggable="true"
                 onDragStart={(event) => {
                  const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M391.99 170.26c8.46 15.66 11.84 34.01 9.32 51.66-7.66 50.08-54.88 82.74-100.24 96.95-73.4 23.16-172.57 10.3-223.32-51.98-2.87-3.76-5.53-7.67-7.94-11.72 5.21 7.84 11.36 15.01 18.21 21.45 60.58 55.23 165.17 61.63 237.72 27.77 34.19-15.88 66.52-44.2 73.43-82.8 3.16-17.32.32-35.44-7.18-51.32Z" style="fill:#164194; stroke: #1d1d1b; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                  event.dataTransfer.setData("text/plain", updatedSvgString);
                }}
                >
           <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 457.38 417.54"
    {...props}
  >
    <g
      style={{
        isolation: "isolate",
      }}
    >
      <ellipse
        cx={228.69}
        cy={208.77}
        rx={180.01}
        ry={123.72}
        style={{
          fill: "#f5c211",
          stroke: "#1d1d1b",
          strokeMiterlimit: 10,
          strokeWidth: 5,
        }}
      />
      <g
        style={{
          mixBlendMode: "soft-light",
        }}
      >
        <path
          d="M74.25 261.78c-30.08-39.11-23.65-86.56 10.13-120.99 38.12-38.28 95.08-53.73 147.98-52.72 32.52.61 65.27 7.55 94.56 21.91 16.64 8.27 32.19 18.97 44.9 32.46-3.07-2.84-7.22-6.58-10.49-9.05-5.09-4.18-11.39-8.32-17.02-11.81-17.77-10.43-37.41-18.06-57.47-22.72-57.31-13.21-121.86-6.9-172.68 23.8-50.86 30.68-76 86.41-39.9 139.12Z"
          style={{
            strokeWidth: 0,
            fill: "#fff",
          }}
        />
      </g>
      <g
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M391.99 170.26c8.46 15.66 11.84 34.01 9.32 51.66-7.66 50.08-54.88 82.74-100.24 96.95-73.4 23.16-172.57 10.3-223.32-51.98-2.87-3.76-5.53-7.67-7.94-11.72 5.21 7.84 11.36 15.01 18.21 21.45 60.58 55.23 165.17 61.63 237.72 27.77 34.19-15.88 66.52-44.2 73.43-82.8 3.16-17.32.32-35.44-7.18-51.32Z"
          style={{
            fill: "#c6bda7",
            strokeWidth: 0,
          }}
        />
      </g>
    </g>
  </svg>
                </div>

                <div className={styles.stickers}
                draggable="true"
                 onDragStart={(event) => {
                  const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M393.9 83.28H63.49l-35.5 125.98 200.7 125 200.7-125L393.9 83.28z" style="fill:#ed8e0a; stroke: #1d1d1b; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                  event.dataTransfer.setData("text/plain", updatedSvgString);
                }}
                >

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 457.38 417.54"
    {...props}
  >
    <g
      style={{
        isolation: "isolate",
      }}
    >
      <path
        d="M393.9 83.28H63.49l-35.5 125.98 200.7 125 200.7-125L393.9 83.28z"
        style={{
          fill: "#ed8e0a",
          stroke: "#1d1d1b",
          strokeMiterlimit: 10,
          strokeWidth: 5,
        }}
      />
      <g
        style={{
          mixBlendMode: "soft-light",
        }}
      >
        <path
          d="M396.7 125.16c-2.52-7.73-7.15-23.36-9.56-31.12l.63.48c-53.09 1.01-106.18 1.39-159.27 1.64-51.4.14-107.68.12-159.27-.23l1.97-1.49c-5.21 17.94-18.74 64.25-23.91 81.59l-8.16 27.14-.3-.75 13.85 8.65 13.8 8.73-14.19-8.08-14.15-8.17-.43-.25.13-.5 7.21-27.41c4.57-17.28 17.33-64.2 22.19-82.07l.4-1.48h1.57c51.65-.34 107.81-.42 159.27-.26 53.09.25 106.18.62 159.27 1.62h.51l.12.47c2.1 7.82 6.28 23.64 8.3 31.48Z"
          style={{
            strokeWidth: 0,
            fill: "#fff",
          }}
        />
      </g>
      <g
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M66.49 219.8c39.51 22.53 83.29 48.06 122.69 71.33l40.68 24.14h-2.35c60.48-36.58 129.75-77.99 190.64-113.51l-.64 1.61c-4.77-17.38-11.05-41.23-15.71-58.63l-5.12-19.58 5.98 19.33c5.22 17.26 12.46 40.81 17.58 58.1l.31 1.03-.94.58c-60.33 37.32-129.87 79.24-190.94 115.69-52.78-32.09-110.19-67.12-162.19-100.09Z"
          style={{
            fill: "#d3b998",
            strokeWidth: 0,
          }}
        />
      </g>
    </g>
  </svg>
               
               </div>

               <div className={styles.stickers}
                draggable="true"
                 onDragStart={(event) => {
                  const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M393.16 152.09 245.18 85.62c-5.43-2.44-10.95-3.66-16.48-3.66s-11.05 1.22-16.49 3.66L64.23 152.09c-3.8 1.71-6.85 4.35-8.96 7.59-2.11 3.26-3.26 7.12-3.26 11.28v75.61c0 4.16 1.16 8.02 3.26 11.28 2.11 3.25 5.16 5.89 8.96 7.59l147.98 66.47c5.43 2.44 10.96 3.66 16.49 3.66s11.05-1.22 16.49-3.66l147.98-66.47c3.8-1.71 6.86-4.35 8.96-7.59 2.11-3.26 3.26-7.12 3.26-11.28v-75.61c0-4.16-1.16-8.02-3.26-11.28-2.1-3.25-5.16-5.89-8.96-7.59Z" style="fill:#9b9445; stroke: #1d1d1b; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                  event.dataTransfer.setData("text/plain", updatedSvgString);
                }}
                >
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 457.38 417.54"
    {...props}
  >
    <g
      style={{
        isolation: "isolate",
      }}
    >
      <path
        d="M393.16 152.09 245.18 85.62c-5.43-2.44-10.95-3.66-16.48-3.66s-11.05 1.22-16.49 3.66L64.23 152.09c-3.8 1.71-6.85 4.35-8.96 7.59-2.11 3.26-3.26 7.12-3.26 11.28v75.61c0 4.16 1.16 8.02 3.26 11.28 2.11 3.25 5.16 5.89 8.96 7.59l147.98 66.47c5.43 2.44 10.96 3.66 16.49 3.66s11.05-1.22 16.49-3.66l147.98-66.47c3.8-1.71 6.86-4.35 8.96-7.59 2.11-3.26 3.26-7.12 3.26-11.28v-75.61c0-4.16-1.16-8.02-3.26-11.28-2.1-3.25-5.16-5.89-8.96-7.59Z"
        style={{
          fill: "#9b9445",
          stroke: "#1d1d1b",
          strokeMiterlimit: 10,
          strokeWidth: 5,
        }}
      />
      <g
        style={{
          mixBlendMode: "soft-light",
        }}
      >
        <path
          d="M310.34 124.2c-13.21-5.44-34.23-14.45-47.57-20.09-4.09-1.84-13.87-5.91-17.78-7.66-5.65-2.64-11.62-4.77-17.86-4.23-4.14.29-7.96 1.49-11.72 3.32-27.02 12.48-66.41 30.38-93.98 42.79-3.65 1.66-50.58 22.56-53.01 23.63-3.83 1.67-6.02 5.62-5.77 9.75-.03 1.03 0 3.78-.03 4.84-.07 12.86-.38 38.77-.53 51.63l-.19 12.91c.04 3.92-.73 8.45 1.71 11.8 1.07 1.61 2.62 2.91 4.4 3.79l5.82 2.76 11.66 5.53c5.84 2.7 17.49 8.37 23.29 11.16-5.95-2.45-17.89-7.47-23.81-10l-11.88-5.04-5.95-2.53c-2.12-.93-4.05-2.4-5.45-4.32-2.91-3.73-2.45-8.75-2.54-13.15l-.19-12.91c-.13-14.49-.49-40.39-.55-54.86l-.01-1.61c-.4-5.66 2.9-11.44 8.12-13.76 2.27-1.06 49.4-22.38 52.96-23.98 27.74-12.3 66.93-29.95 94.41-41.83 8.02-3.92 18.03-4.58 26.35-1.07 22.32 10.17 48 22.52 70.12 33.13Z"
          style={{
            fill: "#fff",
            strokeWidth: 0,
          }}
        />
      </g>
      <g
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M108.77 276.14c34.14 14.4 73.04 31.2 106.98 46.09 7.8 3.73 16.93 3.87 24.77.23 2.06-.9 8.4-3.83 10.58-4.81 41.87-19.16 96.07-43.5 137.97-62.2 4.39-2.1 5.91-6.1 5.61-10.8l.02-3.88.08-15.53c.09-14.24.31-40.32.44-54.35.05-5.03-3.01-8.62-7.6-10.36l-7.04-3.27-14.08-6.54c-15.97-7.33-40.45-19.1-56.17-26.51 7.14 3.04 21.49 9.05 28.6 12.15 9.47 4.06 33.7 14.42 42.82 18.42l7.13 3.1c2.6 1.05 5.18 2.5 6.88 4.81 1.82 2.34 2.75 5.29 2.78 8.19l.07 7.77.14 15.53c.08 10.38.27 36.58.31 46.59l.02 3.88c.47 6.3-2.14 12.07-8 14.91-41.79 18.97-96.15 43.29-138.27 61.9-1.91.81-8.71 3.88-10.68 4.72-8.78 3.95-19.28 3.61-27.85-.68-33.68-15.49-72.07-33.39-105.52-49.36Z"
          style={{
            strokeWidth: 0,
            fill: "#c1bea4",
          }}
        />
      </g>
    </g>
  </svg>

              </div>
              <div className={styles.stickers}
                draggable="true"
                 onDragStart={(event) => {
                  const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M347.05 204.29c-3.83-39.67 26.87-67.81 26.87-67.81V90.42c-75.49 0-145.23-48.63-145.23-48.63S158.95 90.42 83.46 90.42v46.06s30.71 28.15 26.87 67.81c-3.84 39.66-17.92 61.41-30.71 67.81 0 0 51.82 103.64 149.07 103.64S377.76 272.1 377.76 272.1c-12.79-6.4-26.87-28.15-30.71-67.81Z" style="fill:#7648a2; stroke: #1d1d1b; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                  event.dataTransfer.setData("text/plain", updatedSvgString);
                }}
                >

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 457.38 417.54"
    {...props}
  >
    <defs>
      <style>
        {".cls-1{fill:#d5c8e8;stroke-width:0}.cls-4{mix-blend-mode:soft-light}"}
      </style>
    </defs>
    <g
      style={{
        isolation: "isolate",
      }}
    >
      <g id="Capa_18">
        <path
          d="M347.05 204.29c-3.83-39.67 26.87-67.81 26.87-67.81V90.42c-75.49 0-145.23-48.63-145.23-48.63S158.95 90.42 83.46 90.42v46.06s30.71 28.15 26.87 67.81c-3.84 39.66-17.92 61.41-30.71 67.81 0 0 51.82 103.64 149.07 103.64S377.76 272.1 377.76 272.1c-12.79-6.4-26.87-28.15-30.71-67.81Z"
          style={{
            fill: "#7648a2",
            stroke: "#1d1d1b",
            strokeMiterlimit: 10,
            strokeWidth: 5,
          }}
        />
        <path
          d="M338.98 95.33c-29.61-4.53-58.25-14.52-85.04-27.83-8.95-4.46-17.72-9.29-26.21-14.62h1.93c-41.34 26.34-88.77 45.15-138.09 47.73l2.28-2.37-.06 34.92-.64-1.59c10.76 11.54 19.04 25.39 23.7 40.47.56 1.59 1.47 5.56 1.91 7.23.16.82.96 5.37 1.09 6.14.18 1.79.46 4.41.64 6.21.04 2.39.17 5.1.09 7.49-1.37 21.23-5.98 42.81-16.89 61.29-3.45 5.63-7.67 10.86-12.83 15.07l.23-1.31c9.11 16.03 20.17 30.96 32.67 44.54-6.59-6.5-12.8-13.39-18.51-20.69-5.91-7.5-11.41-15.34-16.37-23.53l.67-.59c18.8-17.15 24.68-45.7 26.91-70.11l.22-4.75c.03-2.27-.14-4.84-.21-7.12-.18-1.72-.49-4.19-.67-5.9-.14-.7-.94-5.03-1.1-5.83-4.05-17.3-13.32-33.26-25.54-46.08-.04-1.63-.04-37.02-.07-38.09l2.28-.13c36.36-1.8 71.73-12.86 104.43-28.52 11.26-5.48 22.34-11.39 32.91-18.09l.95.62c33.38 21.36 70.38 37.59 109.32 45.45Z"
          className="cls-4"
          style={{
            fill: "#fff",
            strokeWidth: 0,
          }}
        />
        <g
          style={{
            mixBlendMode: "multiply",
            opacity: 0.53,
          }}
        >
          <g className="cls-4">
            <path
              d="M228.69 367.75c44.98-1.27 82.64-25.93 111.28-59.22 9.36-10.94 17.9-22.64 25.17-35.06l.54 3.03c-19.72-17.12-26.2-46.33-28.68-71.24-1.88-19.2 4.42-40.78 15.69-57.23 3.69-5.56 7.88-10.77 12.57-15.5l-.25.63c.22-9.95.58-25.02.92-34.92.34 9.9.69 24.82.92 34.92v.34l-.26.29c-12.89 14.52-22.3 32.53-25.08 51.83-.83 6.1-.85 13.89-.33 19.23 1.38 12.54 3.78 25.04 7.98 36.93 4.33 12.25 10.87 24.23 21.1 32.37-4.05 6.92-8.43 13.64-13.15 20.11-30.24 41.52-74.94 75.26-128.41 73.48Z"
              className="cls-1"
            />
          </g>
          <g className="cls-4">
            <path
              d="M91.46 133.17c14.48 13.34 24.91 31.52 28.37 50.99.48 2.26.64 5.15.95 7.45.05 2.43.26 5.1.2 7.51l-.24 5.01c-1.85 19.59-6.46 39.45-17.17 56.2-3.66 5.48-8.05 10.55-13.37 14.34 4.62-4.6 8.35-9.89 11.35-15.54 8.86-17.08 12.71-36.37 14.43-55.4 2.26-25.69-8.54-50.66-24.51-70.57Z"
              className="cls-1"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>

              </div>
              </div>


              <div className={styles.img_escudo}>

              <div className={styles.stickers}
                draggable="true"
                 onDragStart={(event) => {
                  const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M228.69 344.53c-6.84 0-12.79-3.07-16.74-8.64L48.07 105.47c-4.54-6.39-5.11-14.36-1.51-21.33 3.59-6.97 10.41-11.13 18.26-11.13h327.74c7.85 0 14.67 4.16 18.26 11.13 3.6 6.96 3.04 14.94-1.51 21.33L245.44 335.89c-3.96 5.57-9.9 8.64-16.74 8.64Z" style="fill:#d6d903; stroke: #1d1d1b; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                  event.dataTransfer.setData("text/plain", updatedSvgString);
                }}
                >
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 457.38 417.54"
    {...props}
  >
    <g
      style={{
        isolation: "isolate",
      }}
    >
      <path
        d="M228.69 344.53c-6.84 0-12.79-3.07-16.74-8.64L48.07 105.47c-4.54-6.39-5.11-14.36-1.51-21.33 3.59-6.97 10.41-11.13 18.26-11.13h327.74c7.85 0 14.67 4.16 18.26 11.13 3.6 6.96 3.04 14.94-1.51 21.33L245.44 335.89c-3.96 5.57-9.9 8.64-16.74 8.64Z"
        style={{
          fill: "#d6d903",
          stroke: "#1d1d1b",
          strokeMiterlimit: 10,
          strokeWidth: 5,
        }}
      />
      <g
        style={{
          mixBlendMode: "soft-light",
        }}
      >
        <path
          d="M404.6 87.35c-2.19-4.15-6.59-6.92-11.28-6.96l-14.07.25C275 82.87 166.82 82.37 62.53 82.01c-7.34 1.07-11.93 10-8.62 16.63.82 1.79 4.53 6.81 5.7 8.59 8.96 12.93 22.97 33.53 31.84 46.52l7.87 11.69c-4.21-5.63-12.71-16.92-16.85-22.6-5.51-7.46-19.83-26.75-25.1-34.02l-4.16-5.69c-1.48-1.9-2.87-4.39-3.31-6.88-1.66-7.87 4-16.44 11.99-17.79 2.04-.43 5.23-.27 7.35-.34 102.05-.86 208.03-.76 310.01 1.24 4.71.1 9.38.15 14.11.3 4.81.28 9.24 3.33 11.24 7.68Z"
          style={{
            strokeWidth: 0,
            fill: "#fff",
          }}
        />
      </g>
      <g
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M99.32 165.45c39.2 52.66 78.27 106.66 116.52 159.94.71.95 2.9 4.06 3.61 5.02 3.83 5.98 13.35 6.46 17.73.91 53.7-75.6 110.11-154.36 165.19-228.79 3.66-4.14 4.87-10.16 2.24-15.18 1.32 2.41 1.95 5.23 1.64 8.01-.27 2.79-1.67 5.37-3.28 7.59-45.54 66.68-94.81 136.71-141.69 202.74-1.63 2.04-20.53 29.49-22.19 30.36-6.72 6.07-18.42 4.66-23.35-2.98-.72-.97-2.81-4.02-3.56-5.06-37.78-53.6-75.96-108.27-112.84-162.56Z"
          style={{
            fill: "#e0e0a0",
            strokeWidth: 0,
          }}
        />
      </g>
    </g>
  </svg>

  </div>

  <div className={styles.stickers}
                draggable="true"
                 onDragStart={(event) => {
                  const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M357.57 57.91c-.02-6.56-5.34-11.86-11.9-11.86H228.69v.12H111.72c-6.56 0-11.89 5.3-11.9 11.86-.13 47.32-.54 221.09.03 243.44 1.04 40.13 34.18 49.43 77.75 50.5 35.94.88 47.64 13.73 51.11 19.53v-.13c3.48-5.81 15.19-18.64 51.09-19.51 43.58-1.06 76.71-10.36 77.75-50.5.58-22.35.16-196.13.03-243.45Z" style="fill:#00b3ba; stroke: #1d1d1b; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                  event.dataTransfer.setData("text/plain", updatedSvgString);
                }}
                >
                    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 457.38 417.54"
    {...props}
  >
    <g
      style={{
        isolation: "isolate",
      }}
    >
      <path
        d="M357.57 57.91c-.02-6.56-5.34-11.86-11.9-11.86H228.69v.12H111.72c-6.56 0-11.89 5.3-11.9 11.86-.13 47.32-.54 221.09.03 243.44 1.04 40.13 34.18 49.43 77.75 50.5 35.94.88 47.64 13.73 51.11 19.53v-.13c3.48-5.81 15.19-18.64 51.09-19.51 43.58-1.06 76.71-10.36 77.75-50.5.58-22.35.16-196.13.03-243.45Z"
        style={{
          fill: "#00b3ba",
          stroke: "#1d1d1b",
          strokeMiterlimit: 10,
          strokeWidth: 5,
        }}
      />
      <g
        style={{
          mixBlendMode: "soft-light",
        }}
      >
        <path
          d="M351.57 57.92c-.04-2.53-1.88-4.83-4.25-5.46-1.17-.34-2.42-.16-3.68-.16l-3.76.09c-21.52.39-53.52.94-75.14 1.18l-30.06.3 1.83-1.83v.12l.02 1.81-1.84.02c-30.29.28-63.47.46-93.87.5l-23.47.04-5.77.02c-1.16.03-2.29.71-2.88 1.73-.79.98-.41 3.36-.51 4.5-.13 44.15-.53 102.49-1.05 146.67l-1.29 93.87c-1.14-31.28-1.46-62.58-1.87-93.87-.44-44.21-.66-102.51-.55-146.68v-2.2c-.31-4.48 3.41-8.7 7.95-8.77h5.96c20.92.04 49.49.06 70.4.21 15.65.07 31.29.17 46.94.33l-1.83 1.83v-.12l.02-1.84 1.81.02c32.58.27 72.68.85 105.2 1.48l3.76.09 1.88.04c3.26-.07 6.21 2.87 6.05 6.1Z"
          style={{
            fill: "#fff",
            strokeWidth: 0,
          }}
        />
      </g>
      <g
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M105.84 301.31c1.12 30.89 24.72 39.34 51.54 42.06 12.48 1.47 25.03.54 37.52 2.4 6.28.92 12.54 2.33 18.54 4.67 5.99 2.29 11.76 5.54 16.57 10.06h-2.75c12.39-11.91 30.27-15.42 46.78-16.65 21.51-1.07 52.33-1.16 67.35-18.7 6.32-7.57 7.97-17.79 7.87-27.44.09-3.95.13-14.35.18-18.42.32-54.57.61-117.71 1.38-172.18.23-16.4.41-32.8.76-49.2.78 32.79 1.32 65.59 1.73 98.39.5 47.12 1 94.35.63 141.48.44 22.34-8.94 37.06-30.4 44.17-15.94 5.31-32.65 5.84-49.23 6.35-15.61 1-32.57 4.11-44.29 15.02l-1.4 1.33c-4.58-4.76-10.26-8.37-16.52-10.84-6.33-2.6-13.17-4.11-19.99-5.13-3.68-.48-7.82-.93-11.53-1.09-31.78-1.3-75.24-4.94-74.73-46.29Z"
          style={{
            strokeWidth: 0,
            fill: "#b6e0e0",
          }}
        />
      </g>
    </g>
  </svg>

</div>

<div className={styles.stickers}
                draggable="true"
                 onDragStart={(event) => {
                  const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M357.57 57.91c-.02-6.56-5.34-11.86-11.9-11.86H228.69v.12H111.72c-6.56 0-11.89 5.3-11.9 11.86-.13 47.32-.54 221.09.03 243.44 1.04 40.13 34.18 49.43 77.75 50.5 35.94.88 47.64 13.73 51.11 19.53v-.13c3.48-5.81 15.19-18.64 51.09-19.51 43.58-1.06 76.71-10.36 77.75-50.5.58-22.35.16-196.13.03-243.45Z" style="fill:#f5c211; stroke: #1d1d1b; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                  event.dataTransfer.setData("text/plain", updatedSvgString);
                }}
                >

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 457.38 417.54"
    {...props}
  >
    <g
      style={{
        isolation: "isolate",
      }}
    >
      <circle
        cx={228.69}
        cy={208.77}
        r={144.76}
        style={{
          fill: "#f5c211",
          stroke: "#1d1d1b",
          strokeMiterlimit: 10,
          strokeWidth: 5,
        }}
        transform="rotate(-45 228.696 208.771)"
      />
      <g
        style={{
          mixBlendMode: "soft-light",
        }}
      >
        <path
          d="M112.84 283.32c-27.47-39.47-31-92.82-9.97-135.97 24.71-51.53 80.07-83.05 137-77.44 17.74 1.69 35.13 6.87 50.82 15.29 5.17 2.72 10.28 5.96 15.02 9.35-52.87-34.44-127.31-27.24-171.68 17.51-45.71 43.45-54.5 117.65-21.19 171.26Z"
          style={{
            fill: "#fff",
            strokeWidth: 0,
          }}
        />
      </g>
      <g
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M305.71 94.54c53.79 34.5 76.26 102.66 54.4 162.6-20.55 57.27-78.57 95.45-139.34 91.05-38.64-2.3-75.53-21.79-99.22-52.33-2.82-3.55-6.26-8.71-8.72-12.56 3.49 4.95 7.74 10.55 11.78 14.97 15.94 17.88 36.73 31.57 59.45 39.14 69.41 23.54 146.44-13.06 171.8-81.84 21.91-58.59.79-124.99-50.16-161.04Z"
          style={{
            strokeWidth: 0,
            fill: "#e2d6b5",
          }}
        />
      </g>
    </g>
  </svg>
              </div>
              <div className={styles.stickers}
                draggable="true"
                 onDragStart={(event) => {
                  const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M129.11 332.68h199.17c12.76 0 23.1-10.34 23.1-23.1V107.96c0-12.76-10.34-23.1-23.1-23.1H129.11c-12.76 0-23.1 10.34-23.1 23.1v201.62c0 12.76 10.34 23.1 23.1 23.1Z" style="fill:#db2d4d; stroke: #1d1d1b; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
                  event.dataTransfer.setData("text/plain", updatedSvgString);
                }}
                >
 
 <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 457.38 417.54"
    {...props}
  >
    <g
      style={{
        isolation: "isolate",
      }}
    >
      <path
        d="M129.11 332.68h199.17c12.76 0 23.1-10.34 23.1-23.1V107.96c0-12.76-10.34-23.1-23.1-23.1H129.11c-12.76 0-23.1 10.34-23.1 23.1v201.62c0 12.76 10.34 23.1 23.1 23.1Z"
        style={{
          fill: "#db2d4d",
          stroke: "#1d1d1b",
          strokeMiterlimit: 10,
          strokeWidth: 5,
        }}
      />
      <g
        style={{
          mixBlendMode: "soft-light",
        }}
      >
        <path
          d="M328.28 91.36c-61.89 1.63-124.84 2.19-186.75 2.33-3.04.01-8.67.01-11.67.02-4.33-.15-8.68 1.64-11.5 4.98-2.64 2.93-3.68 6.92-3.49 10.8l-.03 13.34c-.1 57.43-.67 115.99-1.98 173.41l-.36 13.34-.36-13.34c-1.3-57.42-1.88-115.97-1.98-173.41l-.03-13.34c-.04-2.44.13-4.98.89-7.31 2.43-7.99 10.51-13.54 18.82-13.18 7.87.01 30.15.08 38.35.1 53.05.28 106.99.84 160.07 2.26Z"
          style={{
            strokeWidth: 0,
            fill: "#fff",
          }}
        />
      </g>
      <g
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M112.51 309.58c.1 8.86 7.94 16.36 16.73 16.03l3.74-.07c59.42-1.15 120.18-1.58 179.61-1.7l14.97-.03c2.26.04 4.3-.32 6.35-1.19 4.18-1.83 7.35-5.71 8.29-10.17.41-1.9.28-4.07.31-6.05 0-66.31.68-133.84 1.74-200.14-.64-8.08-7.78-14.82-15.98-14.92 4.99-.12 10.06 2.14 13.29 6.1 2.45 2.96 3.81 6.79 3.87 10.63l.07 3.74c1.15 59.42 1.59 120.18 1.7 179.61l.03 14.97c0 2.26.09 4.75-.38 7.01-1.6 8.14-8.97 14.62-17.26 15.06-55.27.12-111.47-.38-166.68-1.14l-29.94-.54-3.74-.07c-9.17.04-17.09-8.01-16.73-17.16Z"
          style={{
            fill: "#e2b7c0",
            strokeWidth: 0,
          }}
        />
      </g>
    </g>
  </svg>
 </div>

              </div>


            </div>
          </div>
        )}


        {colors && (
          <div className={styles.barra_stickers}>
            <div className={styles.img_container}>
              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_01-01.png")}
                    alt=""
                    onClick={() => changeColor("white")}
                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_02-01.png")}
                    alt=""
                    onClick={() => changeColor("black")}

                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_03-01.png")}
                    alt=""
                    onClick={() => changeColor("red")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_04-01.png")}
                    alt=""
                    onClick={() => changeColor("yellow")}

                  />
                </div>
              </div>
              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_05-01.png")}
                    alt=""
                    onClick={() => changeColor("green")}
                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_06-01.png")}
                    alt=""
                    onClick={() => changeColor("skyblue")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_07-01.png")}
                    alt=""
                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_08-01.png")}
                    alt=""
                    onClick={() => changeColor("violet")}

                  />
                </div>
              </div>

              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_09-01.png")}
                    alt=""
                    onClick={() => changeColor("pink")}

                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_09-01.png")}
                    alt=""
                    onClick={() => changeColor("darkred")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_10-01.png")}
                    alt=""
                    onClick={() => changeColor("darkred")}
                    
                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_11-01.png")}
                    alt=""
                    onClick={() => changeColor("darkorange")}

                  />
                </div>
              </div>

              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_12-01.png")}
                    alt=""
                    onClick={() => changeColor("orange")}
                  />

                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_13-01.png")}
                    alt=""
                    onClick={() => changeColor("lightorange")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_14-01.png")}
                    alt=""
                    onClick={() => changeColor("orange")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_15-01.png")}
                    alt=""
                    onClick={() => changeColor("yellow")}

                  />
                </div>
              </div>

              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_16-01.png")}
                    alt=""
                    onClick={() => changeColor("yellowgreen")}
                  />

                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_17-01.png")}
                    alt=""
                    onClick={() => changeColor("green")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_18-01.png")}
                    alt=""

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_19-01.png")}
                    alt=""
                    onClick={() => changeColor("green")}

                  />

                </div>
              </div>

              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_20-01.png")}
                    alt=""
                    onClick={() => changeColor("darkgreen")}

                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_21-01.png")}
                    alt=""
                    onClick={() => changeColor("lightseagreen")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_22-01.png")}
                    alt=""
                    onClick={() => changeColor("cadetblue")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_23-01.png")}
                    alt=""
                    onClick={() => changeColor("cadetblue")}

                  />
                </div>
              </div>

              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_24-01.png")}
                    alt=""
                    onClick={() => changeColor("blue")}

                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_25-01.png")}
                    alt=""
                    onClick={() => changeColor("#42008E")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_26-01.png")}
                    alt=""
                    onClick={() => changeColor("#00154A")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_27-01.png")}
                    alt=""
                    onClick={() => changeColor("#2F0243")}

                  />
                </div>
              </div>

              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_28-01.png")}
                    alt=""
                    onClick={() => changeColor("#6B09B7")}

                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_29-01.png")}
                    alt=""
                    onClick={() => changeColor("#4A0031")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_30-01.png")}
                    alt=""
                    onClick={() => changeColor("#4A0026")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_31-01.png")}
                    alt=""
                    onClick={() => changeColor("#00364A")}

                  />
                </div>
              </div>

              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_32-01.png")}
                    alt=""
                    onClick={() => changeColor("#01929A")}

                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_33-01.png")}
                    alt=""
                    onClick={() => changeColor("#EDCD00")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_34-01.png")}
                    alt=""
                    onClick={() => changeColor("#7D002A")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_35-01.png")}
                    alt=""
                    onClick={() => changeColor("#1B015E")}

                  />
                </div>
              </div>

              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_36-01.png")}
                    alt=""
                    onClick={() => changeColor("#D0D0D0")}

                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_37-01.png")}
                    alt=""
                    onClick={() => changeColor("#A5A5A5")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_38-01.png")}
                    alt=""
                    onClick={() => changeColor("#676767")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_39-01.png")}
                    alt=""
                    onClick={() => changeColor("#404040")}

                  />
                </div>
              </div>

              <div className={styles.img_escudo}>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_40-01.png")}
                    alt=""
                    onClick={() => changeColor("#2E2E2E")}

                  />
                </div>

                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_41-01.png")}
                    alt=""
                    onClick={() => changeColor("#A85D00")}

                  />
                </div>
                <div className={styles.stickers}>
                  <img
                    src={require("../../image/ESCUDO/COLORES/COLOR_42-01.png")}
                    alt=""
                    onClick={() => changeColor("#542E00")}

                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.barra_tools}>
          <div>
            <img
              src={require("../../image/ESCUDO/BARRA_DE HERRMIENTAS/barra_izquierda.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools}>
            <input type="file" accept="image/*" style={{ display: "none" }} />

            <img
              src={require("../../image/ESCUDO/BARRA_DE HERRMIENTAS/B1.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools}>
            <img
              src={require("../../image/ESCUDO/BARRA_DE HERRMIENTAS/B2.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools}>
            <img
              src={require("../../image/ESCUDO/BARRA_DE HERRMIENTAS/B3.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools}>
            <img
              src={require("../../image/ESCUDO/BARRA_DE HERRMIENTAS/B4.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools}>
            <img
              src={require("../../image/ESCUDO/BARRA_DE HERRMIENTAS/B5.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools}>
            <img
              src={require("../../image/ESCUDO/BARRA_DE HERRMIENTAS/B6.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools}>
            <img
              src={require("../../image/ESCUDO/BARRA_DE HERRMIENTAS/B7.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools}>
            <img
              src={require("../../image/ESCUDO/BARRA_DE HERRMIENTAS/B8.png")}
              alt=""
              onClick={handleLimpiarLienzo}
            />
          </div>

          <div>
            <img
              src={require("../../image/ESCUDO/BARRA_DE HERRMIENTAS/Bderecha.png")}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasEscudo;
