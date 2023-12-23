import React, { useRef, useEffect } from "react";
import { fabric } from "fabric";
import { useMediaQuery } from "@mui/material";
import styles from "./CreateMarco.module.css";
import CardContent from "@mui/material/CardContent";

const CanvasMarco = (props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [globos, setGlobos] = React.useState(false);
  const [fondo, setFondo] = React.useState(false);
  const [marcos, setMarcos] = React.useState(false);
  const [stickers, setStickers] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleStickers = (e) => {
    e.preventDefault();
    setFondo(false);
    setGlobos(false);
    setMarcos(false);
    setStickers(true);
  };
  const handleFondo = (e) => {
    e.preventDefault();
    setGlobos(false);
    setMarcos(false);
    setStickers(false);

    setFondo(true);
  };

  const handleGlobos = (e) => {
    e.preventDefault();
    setFondo(false);
    setMarcos(false);
    setStickers(false);

    setGlobos(true);
  };

  const handleMarcos = (e) => {
    e.preventDefault();
    setFondo(false);
    setGlobos(false);
    setStickers(false);

    setMarcos(true);
  };

  const canvasRef = useRef(null);
  const canvasWidth = useMediaQuery("(max-width:1440px)") ? 640 : 800;
  const canvasHeight = useMediaQuery("(max-width:1440px)") ? 300 : 400;
  let zIndexCounter = 1;
  let currentImage = null; // Referencia a la imagen actualmente editable

  const inputRef = useRef(null);

  const handleCargarFotoClick = () => {
    inputRef.current.click();
  };

  const handleImagenSeleccionada = (event) => {
    // Manejar la lógica cuando se selecciona una imagen
    // Puedes acceder a la imagen seleccionada a través de event.target.files
    console.log(event.target.files[0]);
  };

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#f0f0f0",
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

    canvas.wrapperEl.addEventListener("drop", (event) => {
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
  }, [canvasWidth, canvasHeight, ref]);

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

  const limpiarLienzo = () => {
    const canvas = canvasRef.current;
    const objects = canvas.getObjects();

    objects.forEach((obj) => {
      canvas.remove(obj);
    });
  };

  return (
    <div className={styles.marco_container}>
      <div className={styles.btn_seconds}>
        <div className={styles.btn_exit}>
          <img
            src={require("../../image/BOTON_SALIR.png")}
            onClick={handleClose}
            alt="not-found"
          />
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
          <img src={require("../../image/Crea_tu_viñeta.png")} alt="" />
        </div>
        <div>
          <canvas ref={canvasRef}></canvas>
        </div>
        <div className={styles.barra_tools}>
          <div>
            <img
              src={require("../../image//MARCOS/BARRA DE HERRAMIENTAS/IZQUIERDO1.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools}>
            <input
              type="file"
              ref={inputRef}
              onChange={handleImagenSeleccionada}
              accept="image/*"
              style={{ display: "none" }}
            />

            <img
              src={require("../../image/MARCOS/BARRA DE HERRAMIENTAS/CARGAR_FOTO.png")}
              alt=""
              onClick={handleCargarFotoClick}
            />
          </div>
          <div className={styles.btn_tools} onClick={handleMarcos}>
            <img
              src={require("../../image/MARCOS/BARRA DE HERRAMIENTAS/MARCO.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools} onClick={handleFondo}>
            <img
              src={require("../../image/MARCOS/BARRA DE HERRAMIENTAS/FONDO.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools} onClick={handleGlobos}>
            <img
              src={require("../../image/MARCOS/BARRA DE HERRAMIENTAS/GLOBO.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools}>
            <img
              src={require("../../image/MARCOS/BARRA DE HERRAMIENTAS/TIPOGRAFÍA.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools}>
            <img
              src={require("../../image/MARCOS/BARRA DE HERRAMIENTAS/STIKERS.png")}
              alt=""
              onClick={handleStickers}
            />
          </div>
          <div className={styles.btn_tools}>
            <img
              src={require("../../image/MARCOS/BARRA DE HERRAMIENTAS/DESHACER.png")}
              alt=""
            />
          </div>
          <div>
            <img
              src={require("../../image/MARCOS/BARRA DE HERRAMIENTAS/DERECHO.png")}
              alt=""
            />
          </div>
          <div>
            {globos && (
              <div className={styles.globo_container}>
                <React.Fragment>
                  <CardContent>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_1.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_2.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_3.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_4.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_4.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_5.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_6.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_7.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_8.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_9.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_10.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_11.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_11.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_12.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_13.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/GLOBOS DE TEXTO/GLOBO_14.png")}
                          alt=""
                        />
                      </div>
                    </div>
                  </CardContent>
                </React.Fragment>
              </div>
            )}
            {fondo && (
              <div className={styles.globo_container}>
                <React.Fragment>
                  <CardContent>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/Fondos/FONDOS_COMIC.jpg")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/Fondos/FONDO_01.jpg")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/Fondos/FONDO_02.jpg")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/Fondos/FONDO_03.jpg")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/Fondos/FONDO_04.jpg")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/Fondos/FONDO_05.jpg")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/Fondos/FONDO_06.jpg")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/Fondos/FONDO_07.jpg")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/Fondos/FONDO_08.jpg")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/Fondos/FONDO_09.jpg")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/Fondos/FONDO_10.jpg")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/Fondos/FONDO_11.jpg")}
                          alt=""
                        />
                      </div>
                    </div>
                  </CardContent>
                </React.Fragment>
              </div>
            )}
            {marcos && (
              <div className={styles.globo_container}>
                <React.Fragment>
                  <CardContent>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/MARCOS/MARCO_01.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/MARCOS/MARCO_02.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/MARCOS/MARCO_03.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/MARCOS/MARCO_04.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/MARCOS/MARCO_05.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/MARCOS/MARCO_06.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/MARCOS/MARCO_07.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/MARCOS/MARCO_08.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/MARCOS/MARCO_09.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/MARCOS/MARCO_10.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/MARCOS/MARCO_11.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/MARCOS/MARCO_12.png")}
                          alt=""
                        />
                      </div>
                    </div>
                  </CardContent>
                </React.Fragment>
              </div>
            )}
            {stickers && (
              <div className={styles.globo_container}>
                <React.Fragment>
                  <CardContent>
                    <div className={styles.globo}>
                      <div>
                      <img
                          src={require("../../image/MARCOS/STIKERS/Stikers24.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers2.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers3.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers4.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers5.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers6.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers7.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers8.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers9.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers10.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers11.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers12.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers13.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers14.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers16.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers15.png")}
                          alt=""
                        />
                      </div>
                    </div>

                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers17.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers18.png")}
                          alt=""
                        />
                      </div>
                    </div>

                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers19.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers20.png")}
                          alt=""
                        />
                      </div>
                    </div>

                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers21.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers22.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers23.png")}
                          alt=""
                        />
                      </div>
                      <div>
                   

<img
                          src={require("../../image/MARCOS/STIKERS/Stikers1.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                      <img
                          src={require("../../image/MARCOS/STIKERS/Stikers26.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers27.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                      <img
                          src={require("../../image/MARCOS/STIKERS/Stikers28.png")}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src={require("../../image/MARCOS/STIKERS/Stikers29.png")}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={styles.globo}>
                      <div>
                      <img
                          src={require("../../image/MARCOS/STIKERS/Stikers30.png")}
                          alt=""
                        />
                      </div>
              
                    </div>
                  </CardContent>
                </React.Fragment>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasMarco;
