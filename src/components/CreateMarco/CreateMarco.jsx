import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./CreateMarco.module.css";
import backgroundImage from "../../image/FONDO_marco.png";
import CardContent from "@mui/material/CardContent";
import { fabric } from 'fabric';
import { useMediaQuery } from '@mui/material';
import CanvasMarco from "./CanvasMarco";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "75%",
  bgcolor: "background.paper",
  p: 4,
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  boxShadow: "15px 7px 15px #000",
};

export default function CreateMarco() {
  const [open, setOpen] = useState(false);
  const [globos, setGlobos] = React.useState(false);
  const [fondo, setFondo] = React.useState(false);
  const [marcos, setMarcos] = React.useState(false);
  const [fotos, setFotos] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inputRef = useRef(null);

  const handleCargarFotoClick = () => {
    inputRef.current.click();
  };

  const handleImagenSeleccionada = (event) => {
    // Manejar la lógica cuando se selecciona una imagen
    // Puedes acceder a la imagen seleccionada a través de event.target.files
    console.log(event.target.files[0]);
  };
  const handleFotos = (e) => {
    e.preventDefault();
    setFondo(false);
    setGlobos(false);
    setMarcos(false);
    setFotos(true);
  };
  const handleFondo = (e) => {
    e.preventDefault();
    setGlobos(false);
    setMarcos(false);
    setFotos(false);

    setFondo(true);
  };

  const handleGlobos = (e) => {
    e.preventDefault();
    setFondo(false);
    setMarcos(false);
    setFotos(false);

    setGlobos(true);
  };

  const handleMarcos = (e) => {
    e.preventDefault();
    setFondo(false);
    setGlobos(false);
    setFotos(false);

    setMarcos(true);
  };



  const handleDescargarLienzo = () => {
    const canvas = canvasRef.current;
  
    if (canvas) {
      const dataURL = canvas.toDataURL({ format: 'png', quality: 0.8 });
  
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'mi_imagen.png'; // Puedes personalizar el nombre del archivo
      document.body.appendChild(link);
  
      link.click();
  
      document.body.removeChild(link);
    }
  };
  
  

  const canvasRef = useRef(null);
  const canvasWidth = useMediaQuery('(max-width:1440px)') ? 640 : 800;
  const canvasHeight = useMediaQuery('(max-width:1440px)') ? 300 : 400;
  let zIndexCounter = 1;
  let currentImage = null; // Referencia a la imagen actualmente editable

  React.useEffect(() => {
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
  }, [canvasWidth, canvasHeight]);



  
  return (
    <div>
      <div className={styles.btn_marco}>
        <img
          onClick={handleOpen}
          src={require("../../image/home/BOTON_VIÑETA.png")}
          alt=""
        />
        <div className={styles.title_marco}>MARCO</div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // Llama a la función al renderizar el modal
      >
        <Box sx={style}>
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
  <div >
  <CanvasMarco/>
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
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
