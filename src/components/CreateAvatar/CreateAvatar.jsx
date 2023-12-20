import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import backgroundImage from "../../image/FONDO_Mesa.png";
import styles from "./CreateAvatar.module.css";


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
  const [selectedImageFace, setSelectedImageFace] = React.useState(
    require("../../image/Rostro/ROSTRO_01.png")
  );
  const [selectedImageEyes, setSelectedImageEyes] = React.useState(
    require("../../image/Ojos/OJOS_05.png")
  );
  const [selectedImageHair, setSelectedImageHair] = React.useState(
    require("../../image/Cabello/CABELLO_09.png")
  );
  const [selectedImageEyebrows, setSelectedImageEyebrows] = React.useState(
    require("../../image/Cejas/Cejas10_1.png")
  );
  const [selectedImageNose, setSelectedImageNose] = React.useState(
    require("../../image/Nariz/Nariz1.png")
  );
  const [selectedImageLips, setSelectedImageLips] = React.useState(
    require("../../image/Boca/Boca0_1.png")
  );

  const [selectedImageMoustache, setSelectedImageMoustache] = React.useState("");

  const [selectedImageEar, setSelectedImageEar] = React.useState(
    require("../../image/Orejas/OREJAS_1.png")
  );

  const [selectedImageBody, setSelectedImageBody] = React.useState(
    require("../../image/Ropa/Ropa10_1.png")
  );
  const [selectedImageGlasses, setSelectedImageGlasses] = React.useState("");
  const [selectedImageCaps, setSelectedImageCaps] = React.useState("");
  const [selectedImageEarrings, setSelectedImageErrings] = React.useState("");

 

  const handleDownload = async () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Función para cargar una imagen y devolver una promesa
    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => resolve(null); // Resuelve con null en caso de error
            image.src = src;
        });
    };

    try {
        // Cargar todas las imágenes, permitiendo que algunas puedan ser null
        const [
            faceImage,
            eyesImage,
            hairImage,
            eyebrowsImage,
            noseImage,
            lipsImage,
            moustacheImage,
            earImage,
            bodyImage,
            glassesImage,
            capsImage,
            earringsImage,
        ] = await Promise.all([
            loadImage(selectedImageFace),
            loadImage(selectedImageEyes),
            loadImage(selectedImageHair),
            loadImage(selectedImageEyebrows),
            loadImage(selectedImageNose),
            loadImage(selectedImageLips),
            loadImage(selectedImageMoustache),
            loadImage(selectedImageEar),
            loadImage(selectedImageBody),
            loadImage(selectedImageGlasses),
            loadImage(selectedImageCaps),
            loadImage(selectedImageEarrings),
        ]);

        // Establecer el tamaño del canvas según la imagen principal (usaremos la más grande)
        const maxWidth = Math.max(...[faceImage, bodyImage].filter(img => img !== null).map(img => img.width));
        const maxHeight = Math.max(...[faceImage, bodyImage].filter(img => img !== null).map(img => img.height));

        canvas.width = maxWidth;
        canvas.height = maxHeight;


        
       context.drawImage(earImage, 0, 0);
        faceImage && context.drawImage(faceImage, 0, 0);
        bodyImage && context.drawImage(bodyImage, 0, 0, maxWidth, maxHeight);
        noseImage && context.drawImage(noseImage, 750, 500, 1500, 1500);
        earringsImage && context.drawImage(earringsImage, 0, -850, 3000, 3000);
        eyebrowsImage && context.drawImage(eyebrowsImage, 125, -1100, 2700, 2700);
        hairImage && context.drawImage(hairImage, 0, 0);
        lipsImage && context.drawImage(lipsImage, 620, 550, 1800, 1800);
        eyesImage && context.drawImage(eyesImage, 0, 0);
        glassesImage && context.drawImage(glassesImage, 300, -450, 2400, 2400);
        capsImage && context.drawImage(capsImage, 0, 0);
        moustacheImage && context.drawImage(moustacheImage, 500, 300, 2000, 2000); 

        // Crear un enlace temporal para descargar la imagen combinada
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "mi_avatar.png"; // Puedes personalizar el nombre del archivo
        link.click();
        link.remove();
    } catch (error) {
        console.error("Error al cargar las imágenes:", error);
    }
};

  
  






  const [eyes, setEyes] = React.useState(false);
  const [faces, setFaces] = React.useState(true);

  const [hair, sethair] = React.useState(false);
  const [eyebrows, setEyebrows] = React.useState(false);
  const [nose, setNose] = React.useState(false);
  const [lips, setLips] = React.useState(false);
  const [moustache, setMoustache] = React.useState(false);
  const [ear, setEar] = React.useState(false);
  const [body, setBody] = React.useState(false);
  const [glasses, setGlasses] = React.useState(false);
  const [caps, setCaps] = React.useState(false);
  const [earrings, setEarrings] = React.useState(false);
 

  const handleImageClickEyes = () => {
    setFaces(false);
    sethair(false);
    setEyebrows(false);
    setNose(false);
    setLips(false);
    setMoustache(false);
    setEar(false);
    setBody(false);
    setGlasses(false);
    setCaps(false);
    setEarrings(false);

    setEyes(true);
  };
  const handleImageClickFaces = () => {
    setEyes(false);
    sethair(false);
    setEyebrows(false);
    setNose(false);
    setLips(false);
    setMoustache(false);
    setEar(false);
    setBody(false);
    setGlasses(false);
    setCaps(false);
    setEarrings(false);

    setFaces(true);
  };
  const handleImageClickHair = () => {
    setEyes(false);
    setFaces(false);
    setEyebrows(false);
    setNose(false);
    setLips(false);
    setMoustache(false);
    setEar(false);
    setBody(false);
    setGlasses(false);
    setCaps(false);
    setEarrings(false);

    sethair(true);
  };
  const handleImageClickEyebrows = () => {
    setEyes(false);
    setFaces(false);
    sethair(false);
    setEyebrows(false);
    setNose(false);
    setLips(false);
    setMoustache(false);
    setEar(false);
    setBody(false);
    setGlasses(false);
    setCaps(false);
    setEarrings(false);

    setEyebrows(true);
  };

  const handleImageClickNose = () => {
    setEyes(false);
    setFaces(false);
    sethair(false);
    setEyebrows(false);
    setLips(false);
    setMoustache(false);
    setEar(false);
    setBody(false);
    setGlasses(false);
    setEarrings(false);
    setCaps(false);

    setNose(true);
  };

  const handleImageClickLips = () => {
    setEyes(false);
    setFaces(false);
    sethair(false);
    setEyebrows(false);
    setNose(false);
    setMoustache(false);
    setEar(false);
    setBody(false);
    setGlasses(false);
    setCaps(false);
    setEarrings(false);

    setLips(true);
  };

  const handleImageClickMoustache = () => {
    setEyes(false);
    setFaces(false);
    sethair(false);
    setEyebrows(false);
    setNose(false);
    setLips(false);
    setEar(false);
    setBody(false);
    setGlasses(false);
    setCaps(false);
    setEarrings(false);

    setMoustache(true);
  };
  const handleImageClickEar = () => {
    setEyes(false);
    setFaces(false);
    sethair(false);
    setEyebrows(false);
    setNose(false);
    setLips(false);
    setMoustache(false);
    setBody(false);
    setGlasses(false);
    setCaps(false);
    setEarrings(false);

    setEar(true);
  };
  const handleImageClickBody = () => {
    setEyes(false);
    setFaces(false);
    sethair(false);
    setEyebrows(false);
    setNose(false);
    setLips(false);
    setMoustache(false);
    setEar(false);
    setGlasses(false);
    setCaps(false);
    setEarrings(false);

    setBody(true);
  };
  const handleImageClickGlasses = () => {
    setEyes(false);
    setFaces(false);
    sethair(false);
    setEyebrows(false);
    setNose(false);
    setLips(false);
    setMoustache(false);
    setEar(false);
    setBody(false);
    setCaps(false);
    setEarrings(false);

    setGlasses(true);
  };

  const handleImageClickCaps = () => {
    setEyes(false);
    setFaces(false);
    sethair(false);
    setEyebrows(false);
    setNose(false);
    setLips(false);
    setMoustache(false);
    setEar(false);
    setBody(false);
    setGlasses(false);
    setEarrings(false);
    setCaps(true);
  };

  const handleImageClickEarrings = () => {
    setEyes(false);
    setFaces(false);
    sethair(false);
    setEyebrows(false);
    setNose(false);
    setLips(false);
    setMoustache(false);
    setEar(false);
    setBody(false);
    setGlasses(false);
    setCaps(false);
    setEarrings(true);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImageEyes(imageSrc);
  };
  const handleImageFace = (imageSrc) => {
    setSelectedImageFace(imageSrc);
  };

  const handleImageHair = (imageSrc) => {
    setSelectedImageHair(imageSrc);
  };
  const handleImageEyebrows = (imageSrc) => {
    setSelectedImageEyebrows(imageSrc);
  };

  const handleImageNose = (imageSrc) => {
    setSelectedImageNose(imageSrc);
  };

  const handleImageLips = (imageSrc) => {
    setSelectedImageLips(imageSrc);
  };

  const handleImageMoustache = (imageSrc) => {
    setSelectedImageMoustache(imageSrc);
  };
  const handleImageEar = (imageSrc) => {
    setSelectedImageEar(imageSrc);
  };
  const handleImageBody = (imageSrc) => {
    setSelectedImageBody(imageSrc);
  };
  const handleImageGlasses = (imageSrc) => {
    setSelectedImageGlasses(imageSrc);
  };
  const handleImageCaps = (imageSrc) => {
    setSelectedImageCaps(imageSrc);
  };

  const handleImageEarrings = (imageSrc) => {
    setSelectedImageErrings(imageSrc);
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
        <div className={styles.title_avatar}>AVATAR</div>
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

                <div>
                  <div className={styles.body_face}>
                  {selectedImageCaps && (
                    <div className={styles.caps_avatar}>
                      <img
                        src={selectedImageCaps}
                        alt="Avatar"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )}
          
                  {selectedImageHair && (
                    <div className={styles.hair_avatar}>
                      <img
                        src={selectedImageHair}
                        alt="Avatar"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )}
                {selectedImageFace && (
                  <div className={styles.face_avatar}>
                      <img
                        src={selectedImageFace}
                        alt="Avatar"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )} 
                     {selectedImageEyebrows && (
                    <div className={styles.eyebrows_avatar}>
                      <img
                        src={selectedImageEyebrows}
                        alt="Avatar"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )}
                         {selectedImageEyes && (
                    <div className={styles.eyes_avatar}>
                      <img
                        src={selectedImageEyes}
                        alt="Avatar"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )}
   
   {selectedImageGlasses && (
                    <div className={styles.galsees_avatar}>
                      <img
                        src={selectedImageGlasses}
                        alt="Avatar"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )}
                     {selectedImageEar && (
                    <div className={styles.eae_avatar}>
                      <img
                        src={selectedImageEar}
                        alt="Avatar"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )} 
                       {selectedImageEarrings && (
                    <div className={styles.eaerarrings_avatar}>
                      <img
                        src={selectedImageEarrings}
                        alt="Avatar"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )}
                  
                  {selectedImageNose && (
                    <div className={styles.nose_avatar}>
                      <img
                        src={selectedImageNose}
                        alt="Avatar"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )}
                            {selectedImageMoustache && (
                    <div className={styles.moustache_avatar}>
                      <img
                        src={selectedImageMoustache}
                        alt="Avatar"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )}
                      {selectedImageLips && (
                    <div className={styles.lips_avatar}>
                      <img
                        src={selectedImageLips}
                        alt="Avatar"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )}
                  {selectedImageBody && (
                    <div className={styles.body_avatar}>
                      <img
                        src={selectedImageBody}
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
                <div className={styles.type} onClick={handleImageClickFaces}>
                  <img
                    src={require("../../image/types/menu1.png")}
                    alt="not found"
                  />
                </div>
                <div className={styles.type} onClick={handleImageClickHair}>
                  <img
                    src={require("../../image/types/menu2.png")}
                    alt="not found"
                  />
                </div>
                <div className={styles.type} onClick={handleImageClickEyes}>
                  <img
                    src={require("../../image/types/menu3.png")}
                    alt="not found"
                  />
                </div>
                <div className={styles.type}>
                  <img
                    src={require("../../image/types/menu4.png")}
                    onClick={handleImageClickNose}
                    alt="not found"
                  />
                </div>
              </div>

              <div className={styles.box_type}>
                <div className={styles.type}>
                  <img
                    src={require("../../image/types/menu5.png")}
                    onClick={handleImageClickLips}
                    alt="not found"
                  />
                </div>
                <div className={styles.type}>
                  <img
                    src={require("../../image/types/menu6.png")}
                    alt="not found"
                    onClick={handleImageClickMoustache}
                  />
                </div>
                <div className={styles.type}>
                  <img
                    src={require("../../image/types/menu7.png")}
                    alt="not found"
                    onClick={handleImageClickEar}
                  />
                </div>
                <div className={styles.type}>
                  <img
                    src={require("../../image/types/menu8.png")}
                    onClick={handleImageClickEyebrows}
                    alt="not found"
                  />
                </div>
              </div>
              <div className={styles.box_type}>
                <div className={styles.type}>
                  <img
                    src={require("../../image/types/menu9.png")}
                    onClick={handleImageClickBody}
                    alt=""
                  />
                </div>
                <div className={styles.type}>
                  <img
                    src={require("../../image/types/menu10.png")}
                    onClick={handleImageClickGlasses}
                    alt=""
                  />
                </div>
                <div className={styles.type}>
                  <img
                    src={require("../../image/types/menu11.png")}
                    onClick={handleImageClickCaps}
                    alt=""
                  />
                </div>
                <div className={styles.type}>
                  <img
                    src={require("../../image/types/menu12.png")}
                    onClick={handleImageClickEarrings}
                    alt=""
                  />
                </div>
              </div>
            </div>
            {eyes && (
              <div className={styles.datas}>
                <div className={styles.seconds_data}>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_01.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_01.png")}
                        alt=""
                        className={styles.options_select}

                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_02.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_02.png") }
                        alt=""
                        className={styles.options_select}
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_03.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_03.png")}
                        alt=""
                        className={styles.options_select}

                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_04.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_04.png")}
                        alt=""
                        className={styles.options_select}

                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_05.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_05.png")}
                        alt=""
                        className={styles.options_select}

                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_06.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_06.png")}
                        alt=""
                        className={styles.options_select}

                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_07.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_07.png")}
                        alt=""
                        className={styles.options_select}

                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_08.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_08.png")}
                        alt=""
                        className={styles.options_select}

                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_09.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_09.png")}
                        alt=""
                        className={styles.options_select}

                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_10.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_10.png")}
                        alt=""
                        className={styles.options_select}

                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_11.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_11.png")}
                        alt=""
                        className={styles.options_select}

                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_12.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_12.png")}
                        alt=""
                        className={styles.options_select}

                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_13.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_13.png")}
                        alt=""
                        className={styles.options_select}

                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_14.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_14.png")}
                        alt=""
                        className={styles.options_select}

                      />
                    </div>
                  </div>
                  

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_01.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_01.png")}
                        alt=""
                        className={styles.options_select}

                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageClick(
                          require("../../image/Ojos/OJOS_02.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Ojos/OJOS_02.png") }
                        alt=""
                        className={styles.options_select}
                      />
                    </div>
                  </div>


                </div>
              </div>
            )}

            {faces && (
              <div className={styles.datas}>
                <div className={styles.seconds_data}>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageFace(
                          require("../../image/Rostro/ROSTRO_01.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Rostro/ROSTRO_01.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageFace(
                          require("../../image/Rostro/ROSTRO_02.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Rostro/ROSTRO_02.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageFace(
                          require("../../image/Rostro/ROSTRO_03.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Rostro/ROSTRO_03.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageFace(
                          require("../../image/Rostro/ROSTRO_04.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Rostro/ROSTRO_04.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageFace(
                          require("../../image/Rostro/ROSTRO_05.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Rostro/ROSTRO_05.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageFace(
                          require("../../image/Rostro/ROSTRO_06.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Rostro/ROSTRO_06.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageFace(
                          require("../../image/Rostro/ROSTRO_07.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Rostro/ROSTRO_07.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageFace(
                          require("../../image/Rostro/ROSTRO_08.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Rostro/ROSTRO_08.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageFace(
                          require("../../image/Rostro/ROSTRO_09.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Rostro/ROSTRO_09.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageFace(
                          require("../../image/Rostro/ROSTRO_10.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Rostro/ROSTRO_10.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageFace(
                          require("../../image/Rostro/ROSTRO_11.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Rostro/ROSTRO_11.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageFace(
                          require("../../image/Rostro/ROSTRO_12.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Rostro/ROSTRO_12.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageFace(
                          require("../../image/Rostro/ROSTRO_13.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Rostro/ROSTRO_13.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageFace(
                          require("../../image/Rostro/ROSTRO_14.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Rostro/ROSTRO_14.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {hair && (
              <div className={styles.datas}>
                <div className={styles.seconds_data}>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageHair(
                          require("../../image/Cabello/CABELLO_01.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cabello/CABELLO_01.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageHair(
                          require("../../image/Cabello/CABELLO_02.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cabello/CABELLO_02.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageHair(
                          require("../../image/Cabello/CABELLO_03.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cabello/CABELLO_03.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageHair(
                          require("../../image/Cabello/CABELLO_04.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cabello/CABELLO_04.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageHair(
                          require("../../image/Cabello/CABELLO_05.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cabello/CABELLO_05.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageHair(
                          require("../../image/Cabello/CABELLO_06.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cabello/CABELLO_06.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageHair(
                          require("../../image/Cabello/CABELLO_07.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cabello/CABELLO_07.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageHair(
                          require("../../image/Cabello/CABELLO_08.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cabello/CABELLO_08.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageHair(
                          require("../../image/Cabello/CABELLO_09.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cabello/CABELLO_09.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageHair(
                          require("../../image/Cabello/CABELLO_10.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cabello/CABELLO_10.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageHair(
                          require("../../image/Cabello/CABELLO_11.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cabello/CABELLO_11.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageHair(
                          require("../../image/Cabello/CABELLO_12.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cabello/CABELLO_12.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageHair(
                          require("../../image/Cabello/CABELLO_13.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cabello/CABELLO_13.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageHair(
                          require("../../image/Cabello/CABELLO_14.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cabello/CABELLO_14.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {eyebrows && (
              <div className={styles.datas}>
                <div className={styles.seconds_data}>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEyebrows(
                          require("../../image/Cejas/Cejas10_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cejas/Cejas10_1.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEyebrows(
                          require("../../image/Cejas/Cejas11_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cejas/Cejas11_1.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEyebrows(
                          require("../../image/Cejas/Cejas12_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cejas/Cejas12_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEyebrows(
                          require("../../image/Cejas/Cejas13_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cejas/Cejas13_1.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEyebrows(
                          require("../../image/Cejas/Cejas1_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cejas/Cejas1_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEyebrows(
                          require("../../image/Cejas/Cejas2_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cejas/Cejas2_1.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEyebrows(
                          require("../../image/Cejas/Cejas3_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cejas/Cejas3_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEyebrows(
                          require("../../image/Cejas/Cejas4_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cejas/Cejas4_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEyebrows(
                          require("../../image/Cejas/Cejas5_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cejas/Cejas5_1.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEyebrows(
                          require("../../image/Cejas/Cejas6_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cejas/Cejas6_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEyebrows(
                          require("../../image/Cejas/Cejas7_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cejas/Cejas7_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEyebrows(
                          require("../../image/Cejas/Cejas8_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cejas/Cejas8_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEyebrows(
                          require("../../image/Cejas/Cejas9_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Cejas/Cejas9_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {nose && (
              <div className={styles.datas}>
                <div className={styles.seconds_data}>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageNose(require("../../image/Nariz/Nariz1.png"))
                      }
                    >
                      <img
                        src={require("../../image/Nariz/Nariz1.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageNose(require("../../image/Nariz/Nariz2.png"))
                      }
                    >
                      <img
                        src={require("../../image/Nariz/Nariz2.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageNose(require("../../image/Nariz/Nariz3.png"))
                      }
                    >
                      <img
                        src={require("../../image/Nariz/Nariz3.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageNose(require("../../image/Nariz/Nariz4.png"))
                      }
                    >
                      <img
                        src={require("../../image/Nariz/Nariz4.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageNose(require("../../image/Nariz/Nariz5.png"))
                      }
                    >
                      <img
                        src={require("../../image/Nariz/Nariz5.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageNose(require("../../image/Nariz/Nariz6.png"))
                      }
                    >
                      <img
                        src={require("../../image/Nariz/Nariz6.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageNose(require("../../image/Nariz/Nariz7.png"))
                      }
                    >
                      <img
                        src={require("../../image/Nariz/Nariz7.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageNose(require("../../image/Nariz/Nariz8.png"))
                      }
                    >
                      <img
                        src={require("../../image/Nariz/Nariz8.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageNose(require("../../image/Nariz/Nariz9.png"))
                      }
                    >
                      <img
                        src={require("../../image/Nariz/Nariz9.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageNose(
                          require("../../image/Nariz/Nariz10.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Nariz/Nariz10.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageNose(
                          require("../../image/Nariz/Nariz11.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Nariz/Nariz11.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageNose(
                          require("../../image/Nariz/Nariz12.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Nariz/Nariz12.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageNose(
                          require("../../image/Nariz/Nariz13.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Nariz/Nariz13.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {lips && (
              <div className={styles.datas}>
                <div className={styles.seconds_data}>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageLips(require("../../image/Boca/Boca0_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/Boca/Boca0_1.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageLips(require("../../image/Boca/Boca2_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/Boca/Boca2_1.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageLips(require("../../image/Boca/Boca3_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/Boca/Boca3_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageLips(require("../../image/Boca/Boca4_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/Boca/Boca4_1.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageLips(require("../../image/Boca/Boca5_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/Boca/Boca5_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageLips(require("../../image/Boca/Boca6_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/Boca/Boca6_1.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageLips(require("../../image/Boca/Boca7_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/Boca/Boca7_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageLips(require("../../image/Boca/Boca8_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/Boca/Boca8_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageLips(require("../../image/Boca/Boca9_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/Boca/Boca9_1.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageLips(
                          require("../../image/Boca/Boca10_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Boca/Boca10_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageLips(
                          require("../../image/Boca/Boca11_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Boca/Boca11_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageLips(
                          require("../../image/Boca/Boca12_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Boca/Boca12_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {moustache && (
              <div className={styles.datas}>
                <div className={styles.seconds_data}>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageMoustache(
                          require("../../image/Bigotes/Bigotes1_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Bigotes/Bigotes1_1.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageMoustache(
                          require("../../image/Bigotes/Bigotes2_1_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Bigotes/Bigotes2_1_1.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageMoustache(
                          require("../../image/Bigotes/Bigotes3_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Bigotes/Bigotes3_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageMoustache(
                          require("../../image/Bigotes/Bigotes4_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Bigotes/Bigotes4_1.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageMoustache(
                          require("../../image/Bigotes/Bigotes5_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Bigotes/Bigotes5_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageMoustache(
                          require("../../image/Bigotes/Bigotes6_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Bigotes/Bigotes6_1.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageMoustache(
                          require("../../image/Bigotes/Bigotes7_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Bigotes/Bigotes7_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageMoustache(
                          require("../../image/Bigotes/Bigotes8_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Bigotes/Bigotes8_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageMoustache(
                          require("../../image/Bigotes/Bigotes9_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Bigotes/Bigotes9_1.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageMoustache(
                          require("../../image/Bigotes/Bigotes10_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Bigotes/Bigotes10_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageMoustache(
                          require("../../image/Bigotes/Bigotes11_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Bigotes/Bigotes11_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageMoustache(
                          require("../../image/Bigotes/Bigotes12_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Boca/Boca12_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {ear && (
              <div className={styles.datas}>
                <div className={styles.seconds_data}>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEar(
                          require("../../image/Orejas/OREJAS_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Orejas/OREJAS_1.png")}
                        alt="not found"
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEar(
                          require("../../image/Orejas/OREJAS_2.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Orejas/OREJAS_2.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEar(
                          require("../../image/Orejas/OREJAS_3.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Orejas/OREJAS_3.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEar(
                          require("../../image/Orejas/OREJAS_5.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Orejas/OREJAS_5.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEar(
                          require("../../image/Orejas/OREJAS_6.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Orejas/OREJAS_6.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEar(
                          require("../../image/Orejas/OREJAS_7.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Orejas/OREJAS_7.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEar(
                          require("../../image/Orejas/OREJAS_8.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Orejas/OREJAS_8.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEar(
                          require("../../image/Orejas/OREJAS_9.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Orejas/OREJAS_9.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEar(
                          require("../../image/Orejas/OREJAS_10.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Orejas/OREJAS_10.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEar(
                          require("../../image/Orejas/OREJAS_11.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Orejas/OREJAS_11.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEar(
                          require("../../image/Orejas/OREJAS_12.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Orejas/OREJAS_12.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEar(
                          require("../../image/Orejas/OREJAS_13.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Orejas/OREJAS_13.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {body && (
              <div className={styles.datas}>
                <div className={styles.seconds_data}>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageBody(require("../../image/Ropa/Ropa1_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/opcion_ropa/Ropa1_1.png")}
                        alt="not found"
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageBody(require("../../image/Ropa/Ropa2_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/opcion_ropa/Ropa2_1.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageBody(require("../../image/Ropa/Ropa3_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/opcion_ropa/Ropa3_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageBody(require("../../image/Ropa/Ropa4_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/opcion_ropa/Ropa4_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageBody(require("../../image/Ropa/Ropa5_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/opcion_ropa/Ropa5_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageBody(require("../../image/Ropa/Ropa6_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/opcion_ropa/Ropa6_1.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageBody(require("../../image/Ropa/Ropa7_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/opcion_ropa/Ropa7_1.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageBody(require("../../image/Ropa/Ropa8_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/opcion_ropa/Ropa8_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageBody(require("../../image/Ropa/Ropa9_1.png"))
                      }
                    >
                      <img
                        src={require("../../image/opcion_ropa/Ropa9_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageBody(
                          require("../../image/Ropa/Ropa10_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/opcion_ropa/Ropa10_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageBody(
                          require("../../image/Ropa/Ropa11_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/opcion_ropa/Ropa11_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageBody(
                          require("../../image/Ropa/Ropa12_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/opcion_ropa/Ropa12_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {glasses && (
              <div className={styles.datas}>
                <div className={styles.seconds_data}>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageGlasses(
                          require("../../image/Lentes/Lentes10_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Lentes/Lentes10_1.png")}
                        alt="not found"
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageGlasses(
                          require("../../image/Lentes/Lentes11_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Lentes/Lentes11_1.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageGlasses(
                          require("../../image/Lentes/Lentes12_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Lentes/Lentes12_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageGlasses(
                          require("../../image/Lentes/Lentes1_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Lentes/Lentes1_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageGlasses(
                          require("../../image/Lentes/Lentes2_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Lentes/Lentes2_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageGlasses(
                          require("../../image/Lentes/Lentes3_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Lentes/Lentes3_1.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageGlasses(
                          require("../../image/Lentes/Lentes4_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Lentes/Lentes4_1.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageGlasses(
                          require("../../image/Lentes/Lentes5_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Lentes/Lentes5_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageGlasses(
                          require("../../image/Lentes/Lentes6_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Lentes/Lentes7_1.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageGlasses(
                          require("../../image/Lentes/Lentes8_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Lentes/Lentes8_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageGlasses(
                          require("../../image/Lentes/Lentes9_1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Lentes/Lentes9_1.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {caps && (
              <div className={styles.datas}>
                <div className={styles.seconds_data}>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_01.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_01.png")}
                        alt="not found"
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_02.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_02.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_03.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_03.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_04.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_04.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_05.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_05.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_06.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_06.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_07.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_07.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_08.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_08.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_09.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_09.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_10.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_10.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_11.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_11.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_12.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_12.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_11.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_11.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_13.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_13.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_11.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_11.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageCaps(
                          require("../../image/Gorras/GORRA_14.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Gorras/GORRA_14.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {earrings && (
              <div className={styles.datas}>
                <div className={styles.seconds_data}>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEarrings(
                          require("../../image/Aretes/Aretes1.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Aretes/Aretes1.png")}
                        alt="not found"
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEarrings(
                          require("../../image/Aretes/Aretes2.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Aretes/Aretes2.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEarrings(
                          require("../../image/Aretes/Aretes3.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Aretes/Aretes3.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEarrings(
                          require("../../image/Aretes/Aretes4.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Aretes/Aretes4.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEarrings(
                          require("../../image/Aretes/Aretes5.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Aretes/Aretes5.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEarrings(
                          require("../../image/Aretes/Aretes6.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Aretes/Aretes6.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEarrings(
                          require("../../image/Aretes/Aretes7.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Aretes/Aretes7.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEarrings(
                          require("../../image/Aretes/Aretes8.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Aretes/Aretes8.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEarrings(
                          require("../../image/Aretes/Aretes9.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Aretes/Aretes9.png")}
                        alt=""
                      />
                    </div>

                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEarrings(
                          require("../../image/Aretes/Aretes10.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Aretes/Aretes10.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.box_datas}>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEarrings(
                          require("../../image/Aretes/Aretes11.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Aretes/Aretes11.png")}
                        alt=""
                      />
                    </div>
                    <div
                      className={styles.result_menu}
                      onClick={() =>
                        handleImageEarrings(
                          require("../../image/Aretes/Aretes12.png")
                        )
                      }
                    >
                      <img
                        src={require("../../image/Aretes/Aretes12.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {eyes ? (

            <div className={styles.color}>
              <div onClick={() => setSelectedImageEyes(false)}>
                <img src={require("../../image/Eliminar.png")} alt="" className={styles.option_delete} />
              </div>
              <div>
                <img src={require("../../image/COLOR_AZUL.png")} alt="" />
              </div>
              <div>
                <img src={require("../../image/COLOR_TURQUEZA.png")} alt="" />
              </div>
              <div>
                <img
                  src={require("../../image/COLOR_VERDE_LIMON.png")}
                  alt=""
                />
              </div>
              <div>
                <img src={require("../../image/COLOR_VIOLETA.png")} alt="" />
              </div>
            </div>
            ): null}

{hair ? (

<div className={styles.color}>
  <div onClick={() => 
    setSelectedImageHair(false)
    
    }>
    <img src={require("../../image/Eliminar.png")} alt="" className={styles.option_delete} />
  </div>
  <div>
    <img src={require("../../image/COLOR_AZUL.png")} alt="" />
  </div>
  <div>
    <img src={require("../../image/COLOR_TURQUEZA.png")} alt="" />
  </div>
  <div>
    <img
      src={require("../../image/COLOR_VERDE_LIMON.png")}
      alt=""
    />
  </div>
  <div>
    <img src={require("../../image/COLOR_VIOLETA.png")} alt="" />
  </div>
</div>
): null}

{eyebrows ? (

<div className={styles.color}>
  <div onClick={() => 
    setSelectedImageEyebrows(false)
    
    }>
    <img src={require("../../image/Eliminar.png")} alt="" className={styles.option_delete} />
  </div>
  <div>
    <img src={require("../../image/COLOR_AZUL.png")} alt="" />
  </div>
  <div>
    <img src={require("../../image/COLOR_TURQUEZA.png")} alt="" />
  </div>
  <div>
    <img
      src={require("../../image/COLOR_VERDE_LIMON.png")}
      alt=""
    />
  </div>
  <div>
    <img src={require("../../image/COLOR_VIOLETA.png")} alt="" />
  </div>
</div>
): null}

{nose ? (

<div className={styles.color}>
  <div onClick={() => 
    setSelectedImageNose(false)
    
    }>
    <img src={require("../../image/Eliminar.png")} alt="" className={styles.option_delete} />
  </div>
  <div>
    <img src={require("../../image/COLOR_AZUL.png")} alt="" />
  </div>
  <div>
    <img src={require("../../image/COLOR_TURQUEZA.png")} alt="" />
  </div>
  <div>
    <img
      src={require("../../image/COLOR_VERDE_LIMON.png")}
      alt=""
    />
  </div>
  <div>
    <img src={require("../../image/COLOR_VIOLETA.png")} alt="" />
  </div>
</div>
): null}

{lips ? (

<div className={styles.color}>
  <div onClick={() => 
    setSelectedImageLips(false)
    
    }>
    <img src={require("../../image/Eliminar.png")} alt="" className={styles.option_delete} />
  </div>
  <div>
    <img src={require("../../image/COLOR_AZUL.png")} alt="" />
  </div>
  <div>
    <img src={require("../../image/COLOR_TURQUEZA.png")} alt="" />
  </div>
  <div>
    <img
      src={require("../../image/COLOR_VERDE_LIMON.png")}
      alt=""
    />
  </div>
  <div>
    <img src={require("../../image/COLOR_VIOLETA.png")} alt="" />
  </div>
</div>
): null}

{moustache ? (

<div className={styles.color}>
  <div onClick={() => 
    setSelectedImageMoustache(false)
    
    }>
    <img src={require("../../image/Eliminar.png")} alt="" className={styles.option_delete} />
  </div>
  <div>
    <img src={require("../../image/COLOR_AZUL.png")} alt="" />
  </div>
  <div>
    <img src={require("../../image/COLOR_TURQUEZA.png")} alt="" />
  </div>
  <div>
    <img
      src={require("../../image/COLOR_VERDE_LIMON.png")}
      alt=""
    />
  </div>
  <div>
    <img src={require("../../image/COLOR_VIOLETA.png")} alt="" />
  </div>
</div>
): null}

{ear ? (

<div className={styles.color}>
  <div onClick={() => 
    setSelectedImageEar(false)
    
    }>
    <img src={require("../../image/Eliminar.png")} alt="" className={styles.option_delete} />
  </div>
  <div>
    <img src={require("../../image/COLOR_AZUL.png")} alt="" />
  </div>
  <div>
    <img src={require("../../image/COLOR_TURQUEZA.png")} alt="" />
  </div>
  <div>
    <img
      src={require("../../image/COLOR_VERDE_LIMON.png")}
      alt=""
    />
  </div>
  <div>
    <img src={require("../../image/COLOR_VIOLETA.png")} alt="" />
  </div>
</div>
): null}

{glasses ? (

<div className={styles.color}>
  <div onClick={() => 
    setSelectedImageGlasses(false)
    
    }>
    <img src={require("../../image/Eliminar.png")} alt="" className={styles.option_delete} />
  </div>
  <div>
    <img src={require("../../image/COLOR_AZUL.png")} alt="" />
  </div>
  <div>
    <img src={require("../../image/COLOR_TURQUEZA.png")} alt="" />
  </div>
  <div>
    <img
      src={require("../../image/COLOR_VERDE_LIMON.png")}
      alt=""
    />
  </div>
  <div>
    <img src={require("../../image/COLOR_VIOLETA.png")} alt="" />
  </div>
</div>
): null}

{caps ? (

<div className={styles.color}>
  <div onClick={() => 
    setSelectedImageCaps(false)
    
    }>
    <img src={require("../../image/Eliminar.png")} alt="" className={styles.option_delete} />
  </div>
  <div>
    <img src={require("../../image/COLOR_AZUL.png")} alt="" />
  </div>
  <div>
    <img src={require("../../image/COLOR_TURQUEZA.png")} alt="" />
  </div>
  <div>
    <img
      src={require("../../image/COLOR_VERDE_LIMON.png")}
      alt=""
    />
  </div>
  <div>
    <img src={require("../../image/COLOR_VIOLETA.png")} alt="" />
  </div>
</div>
): null}

{earrings ? (

<div className={styles.color}>
  <div onClick={() => 
    setSelectedImageErrings(false)
    
    }>
    <img src={require("../../image/Eliminar.png")} alt="" className={styles.option_delete} />
  </div>
  <div>
    <img src={require("../../image/COLOR_AZUL.png")} alt="" />
  </div>
  <div>
    <img src={require("../../image/COLOR_TURQUEZA.png")} alt="" />
  </div>
  <div>
    <img
      src={require("../../image/COLOR_VERDE_LIMON.png")}
      alt=""
    />
  </div>
  <div>
    <img src={require("../../image/COLOR_VIOLETA.png")} alt="" />
  </div>
</div>
): null}

          </div>
        </Box>
      </Modal>
    </div>
  );
}
