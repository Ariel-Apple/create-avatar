import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import { useMediaQuery } from "@mui/material";
import styles from "./CreateEscudo.module.css";
import CardContent from "@mui/material/CardContent";

const CanvasEscudo = (props, ref) => {
  const [open, setOpen] = React.useState(false);

  const [cintillos, setCintillos] = React.useState(false);
  const [stickers, setStickers] = React.useState(true);
  const [colors, setColors] = React.useState(false);
  const [svgColor, setSvgColor] = useState("#4e2178"); // Color inicial del SVG en el botón

  const handleClose = () => setOpen(false);

  const handleCintillo = (e) => {
    e.preventDefault();
    setStickers(false);
    setColors(false);

    setCintillos(true);
  };
  const handleStickers = (e) => {
    e.preventDefault();

    setColors(false);
    setCintillos(false);
    setStickers(true);
  };

  const handleColor = (e) => {
    e.preventDefault();

    setCintillos(false);
    setStickers(false);
    setColors(true);
  };

  const [canvas, setCanvas] = useState(null);

  const canvasRef = useRef(null);
  const canvasWidth = useMediaQuery("(max-width:1440px)") ? 400 : 600;
  const canvasHeight = useMediaQuery("(max-width:1440px)") ? 400 : 600;
  let currentImage = null;
  const [textOptions, setTextOptions] = useState({
    fontFamily: "Arial",
    fontSize: 20,
  });

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
            onClick={handleClose}
            alt="not-found"
          />
        </div>
        <div className={styles.btn_exit}>
          <img
            src={require("../../image/BOTON_EDITAR.png")}
            onClick={handleClose}
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
                    const updatedSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 554.91 215.41"><path d="M480.16 148.54H74.75l23.99-41.23-23.99-40.44h405.41l-20.06 40.44 20.06 41.23z" style="fill:${svgColor}; stroke: #220049; strokeLinecap: round; strokeLinejoin: round; strokeWidth: 10;"/></svg>`;
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

                <div className={styles.stickers} draggable="true">
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

                <div className={styles.stickers} draggable="true">
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
                <div className={styles.stickers} draggable="true">
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
                <div className={styles.stickers} draggable="true">
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

                <div className={styles.stickers} draggable="true">
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
                <div className={styles.stickers} draggable="true">
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
                <div className={styles.stickers} draggable="true">
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

              <div className={styles.img_escudo}>
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

                <div className={styles.stickers} draggable="true">
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
                <div className={styles.stickers} draggable="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 554.91 215.41"
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
                <div className={styles.stickers} draggable="true">
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
