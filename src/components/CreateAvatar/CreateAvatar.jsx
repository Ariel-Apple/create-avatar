import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import backgroundImage from "../../image/FONDO_Mesa.png";
import styles from "./CreateAvatar.module.css";
import { StyleSharp } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  p: 4,
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  boxShadow: "15px 7px 15px #000",
};

export default function CreateAvatar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedImage, setSelectedImage] = React.useState(null);


  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleDownload = () => {
    if (selectedImage) {
      // Crea un elemento canvas para combinar las imágenes
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Carga la imagen principal
      const mainImage = new Image();
      mainImage.src = require("../../image/AYATAR_BASICO_PRINCIPAL.png");

      // Carga la imagen seleccionada
      const selectedImageElement = new Image();
      selectedImageElement.src = selectedImage;

      // Cuando ambas imágenes estén cargadas
    // ... (código anterior)

Promise.all([loadImage(mainImage), loadImage(selectedImageElement)])
.then(() => {
  // Establece el tamaño del canvas según la imagen principal
  canvas.width = mainImage.width;
  canvas.height = mainImage.height;

  // Dibuja la imagen principal
  context.drawImage(mainImage, 0, 0);

  // Calcula el tamaño ajustado de la imagen seleccionada para mantener la proporción
  const scaleFactor = Math.min(
    mainImage.width / selectedImageElement.width,
    mainImage.height / selectedImageElement.height
  );

  const adjustedWidth = selectedImageElement.width * scaleFactor;
  const adjustedHeight = selectedImageElement.height * scaleFactor;

  // Ajusta la posición de la imagen seleccionada para superponerla en los ojos
  const eyesPositionX = 600 /* ajusta según tu diseño */
  const eyesPositionY = 1100/* ajusta según tu diseño */

  // Ajusta el tamaño de la imagen seleccionada
  const scaledWidth = adjustedWidth * 0.5; // Ajusta el factor de escala según sea necesario
  const scaledHeight = adjustedHeight * 0.5; // Ajusta el factor de escala según sea necesario

  context.drawImage(
    selectedImageElement,
    eyesPositionX,
    eyesPositionY,
    scaledWidth,
    scaledHeight
  );

  // Crea un enlace temporal para descargar la imagen combinada
  const link = document.createElement("a");
  link.href = canvas.toDataURL(); // Convierte el contenido del canvas a una URL de datos
  link.download = "combined_avatar.png"; // Puedes personalizar el nombre del archivo
  link.click();
  link.remove();
})
.catch((error) => console.error("Error al cargar las imágenes", error));
    }
  };


  // Función auxiliar para cargar imágenes y devolver una promesa
  const loadImage = (image) => {
    return new Promise((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });
  };

  return (
    <div>
      <div className={styles.btn_avatar}>
        <img
          src={require("../../image/home/BOTON_AVATAR.png")}
          alt="not-found"
          div
          onClick={handleOpen}
        />
      </div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.createavatar_container}>
            <div>
              <div className={styles.btn_exit}>
                <img
                  src={require("../../image/BOTON_SALIR.png")}
                  onClick={handleClose}
                  alt="not-found"
                />
              </div>
              <div className={styles.btn_seconds}>
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
                    onClick={handleDownload}
                    alt="not-found"
                  />
                </div>
              </div>
              <div>
                <div className={styles.title_create_avatar}>
                  <img
                    src={require("../../image/CREA TU AVATAR.png")}
                    alt="not found"
                  />
                </div>
                <div className={styles.img_avatar}>
                  <img
                    src={require("../../image/AYATAR_BASICO_PRINCIPAL.png")}
                    alt="not found"
                  />
                  <div>
                  {selectedImage && (
                <div className={styles.eyes_avatar}>
                  <img
                    src={selectedImage}
                    alt="Avatar"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.menu}>
              <div className={styles.box_type}>
                <div className={styles.type}>
                  <img src={require("../../image/types/menu1.png")} alt="" />
                </div>
                <div className={styles.type}>
                  <img src={require("../../image/types/menu2.png")} alt="" />
                </div>
                <div className={styles.type}>
                  <img src={require("../../image/types/menu3.png")} alt="" />
                </div>
                <div className={styles.type}>
                  <img src={require("../../image/types/menu4.png")} alt="" />
                </div>
              </div>

              <div className={styles.box_type}>
                <div className={styles.type}>
                  <img src={require("../../image/types/menu5.png")} alt="" />
                </div>
                <div className={styles.type}>
                  <img src={require("../../image/types/menu6.png")} alt="" />
                </div>
                <div className={styles.type}>
                  <img src={require("../../image/types/menu7.png")} alt="" />
                </div>
                <div className={styles.type}>
                  <img src={require("../../image/types/menu8.png")} alt="" />
                </div>
              </div>
              <div className={styles.box_type}>
                <div className={styles.type}>
                  <img src={require("../../image/types/menu9.png")} alt="" />
                </div>
                <div className={styles.type}>
                  <img src={require("../../image/types/menu10.png")} alt="" />
                </div>
                <div className={styles.type}>
                  <img src={require("../../image/types/menu11.png")} alt="" />
                </div>
                <div className={styles.type}>
                  <img src={require("../../image/types/menu12.png")} alt="" />
                </div>
              </div>
            </div>

            <div className={styles.datas}>
              <div className={styles.seconds_data}>
                <div className={styles.box_datas}>
                <div
                  className={styles.type}
                  onClick={() =>
                    handleImageClick(
                      require("../../image/0J01.png")
                    )
                  }
                >
                  <img src={require("../../image/0J01.png")} alt="" />
                </div>
                <div
                  className={styles.type}
                  onClick={() =>
                    handleImageClick(
                      require("../../image/0J02.png")
                    )
                  }
                >
                    <img src={require("../../image/0J02.png")} alt="" />
                  </div>
                </div>
                <div className={styles.box_datas}>
                  <div className={styles.type}
                       onClick={() =>
                        handleImageClick(
                          require("../../image/0J03.png")
                        )
                      }
                  >
                    <img src={require("../../image/0J03.png")} alt="" />
                  </div>
                  <div className={styles.type}
                       onClick={() =>
                        handleImageClick(
                          require("../../image/0J04.png")
                        )
                      }
                  >
                    <img src={require("../../image/0J04.png")} alt="" />
                  </div>
                </div>

                <div className={styles.box_datas}>
                  <div className={styles.type}
                       onClick={() =>
                        handleImageClick(
                          require("../../image/0J05.png")
                        )
                      }
                  >
                    <img src={require("../../image/0J05.png")} alt="" />
                  </div>
                  <div className={styles.type}
                       onClick={() =>
                        handleImageClick(
                          require("../../image/0J06.png")
                        )
                      }
                  >
                    <img src={require("../../image/0J06.png")} alt="" />
                  </div>
                </div>
                <div className={styles.box_datas}>
                  <div className={styles.box_datas}>
                    <div className={styles.type}
                         onClick={() =>
                          handleImageClick(
                            require("../../image/0J07.png")
                          )
                        }
                    >
                      <img src={require("../../image/0J07.png")} alt="" />
                    </div>
                    <div className={styles.type}
                         onClick={() =>
                          handleImageClick(
                            require("../../image/0J08.png")
                          )
                        }
                    >
                      <img src={require("../../image/0J08.png")} alt="" />
                    </div>
                  </div>
                </div>
                <div className={styles.box_datas}>
                  <div className={styles.type}
                       onClick={() =>
                        handleImageClick(
                          require("../../image/0J09.png")
                        )
                      }
                  >
                    <img src={require("../../image/0J09.png")} alt="" />
                  </div>
                  <div className={styles.type}
                       onClick={() =>
                        handleImageClick(
                          require("../../image/0J010.png")
                        )
                      }
                  >
                    <img src={require("../../image/0J010.png")} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
