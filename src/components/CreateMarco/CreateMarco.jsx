import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./CreateMarco.module.css";
import backgroundImage from "../../image/FONDO_marco.png";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FondoDefaultImage from "../../image/MARCOS/Fondos/FONDOS_COMIC.jpg";
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




  
  const handleFotos= (e) => {
    e.preventDefault();
    setFondo(false);
    setGlobos(false);
    setMarcos(false);
    setFotos(true)
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

  const handleMarcos= (e) => {
    e.preventDefault();
    setFondo(false);
    setGlobos(false);
    setFotos(false);

    setMarcos(true);

  };





  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const offsetX = useRef(0);
  const offsetY = useRef(0);

  const handleDrop = (event) => {
    event.preventDefault();

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          // Dibujar la primera imagen (imagen principal)
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (event) => {
    isDragging.current = true;
    offsetX.current = event.nativeEvent.offsetX;
    offsetY.current = event.nativeEvent.offsetY;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (event) => {
    if (isDragging.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Limpiar el canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar la primera imagen (imagen principal)
      const img = new Image();
      img.src = "ruta-de-tu-imagen-principal.png"; // Reemplaza con la ruta de tu imagen principal
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Dibujar la segunda imagen (imagen que se superpone)
        const overlayImage = new Image();
        overlayImage.src = "ruta-de-tu-imagen-superpuesta.png"; // Reemplaza con la ruta de tu imagen superpuesta
        const x = event.nativeEvent.offsetX - offsetX.current;
        const y = event.nativeEvent.offsetY - offsetY.current;
        context.drawImage(
          overlayImage,
          x,
          y,
          overlayImage.width,
          overlayImage.height
        );
      };
    }
  };

  const setDefaultBackground = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Dibujar el fondo por defecto
    const backgroundImage = new Image();
    backgroundImage.src = "ruta-de-tu-imagen-de-fondo.png"; // Reemplaza con la ruta de tu imagen de fondo
    backgroundImage.onload = () => {
      context.drawImage(
        backgroundImage,
        0,
        0,
        canvas.width,
        canvas.height
      );
    };
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubirImagen = (file) => {
    // Obtener referencia al componente CanvasMarco
    const canvasComponent = canvasRef.current;

    // Llamar a la función para subir la imagen
    canvasComponent.subirImagenAlLienzo(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleSubirImagen(file);
    }
  };
  
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
        onRendered={setDefaultBackground} // Llama a la función al renderizar el modal
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
              <div className={styles.btn_exit}>
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
 
      <CanvasMarco ref={canvasRef} />
    </div>
              <div className={styles.barra_tools}>
                <div>
                  <img
                    src={require("../../image//MARCOS/BARRA DE HERRAMIENTAS/IZQUIERDO1.png")}
                    alt=""
                  />
                </div>
                <div onClick={handleMarcos}>
                  <img
                    src={require("../../image/MARCOS/BARRA DE HERRAMIENTAS/CARGAR_FOTO.png")}
                    alt=""
                  />
                </div>
                <div onClick={handleMarcos}>
                  <img
                    src={require("../../image/MARCOS/BARRA DE HERRAMIENTAS/MARCO.png")}
                    alt=""
                  />
                </div>
                <div onClick={handleFondo}>
                  <img
                    src={require("../../image/MARCOS/BARRA DE HERRAMIENTAS/FONDO.png")}
                    alt=""
                  />
                </div>
                <div onClick={handleGlobos}>
                  <img
                    src={require("../../image/MARCOS/BARRA DE HERRAMIENTAS/GLOBO.png")}
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src={require("../../image/MARCOS/BARRA DE HERRAMIENTAS/TIPOGRAFÍA.png")}
                    alt=""
                  />
                </div>
                <div>
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
