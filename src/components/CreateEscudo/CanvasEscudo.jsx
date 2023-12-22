import React, { useRef, useEffect } from "react";
import { fabric } from "fabric";
import { useMediaQuery } from "@mui/material";
import styles from "./CreateEscudo.module.css";
import CardContent from "@mui/material/CardContent";

const CanvasEscudo = (props, ref) => {
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
  const canvasWidth = useMediaQuery("(max-width:1440px)") ? 400 : 600;
  const canvasHeight = useMediaQuery("(max-width:1440px)") ? 400 : 600;
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
          <img src={require("../../image/ESCUDO/TITULAR.png")} alt="" />
        </div>
        <div>
          <canvas ref={canvasRef}></canvas>
        </div>
      
      </div>
      <div className={styles.tools_container}>
      <div className={styles.barra_tools}>
          <div>
          <img src={require("../../image/ESCUDO/MENU DE ELEMENTOS/M1.png")} alt="" />
          
          </div>
          <div className={styles.btn_tools}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />

<img src={require("../../image/ESCUDO/MENU DE ELEMENTOS/M2.png")} alt="" />

          </div>
          <div className={styles.btn_tools} onClick={handleMarcos}>
          <img src={require("../../image/ESCUDO/MENU DE ELEMENTOS/M3.png")} alt="" />

          </div>
          <div className={styles.btn_tools} onClick={handleFondo}>
          <img src={require("../../image/ESCUDO/MENU DE ELEMENTOS/M4.png")} alt="" />

          </div>
          <div className={styles.btn_tools} onClick={handleGlobos}>
          <img src={require("../../image/ESCUDO/MENU DE ELEMENTOS/M5.png")} alt="" />

          </div>
          <div className={styles.btn_tools}>
          <img src={require("../../image/ESCUDO/MENU DE ELEMENTOS/M6.png")} alt="" />

          </div>
          <div className={styles.btn_tools}>
          <img src={require("../../image/ESCUDO/MENU DE ELEMENTOS/M7.png")} alt="" />

          </div>
        
     
        </div>

        <div className={styles.barra_stickers}>
          <div className={styles.img_container}>
            
               <div className={styles.img_escudo}>
                <div className={styles.stickers}>

                <img src={require('../../image/MARCOS/STIKERS/Stikers1.png')} alt="" />
                </div>

                <div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers3.png')} alt="" />
</div>

<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers4.png')} alt="" />
</div>
<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers5.png')} alt="" />
</div>

</div>
<div className={styles.img_escudo}>




<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers7.png')} alt="" />
</div>

<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers8.png')} alt="" />
</div>
<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers9.png')} alt="" />
</div>
<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers10.png')} alt="" />
</div>
</div>

<div className={styles.img_escudo}>




<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers11.png')} alt="" />
</div>

<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers12.png')} alt="" />
</div>
<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers13.png')} alt="" />
</div>
<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers14.png')} alt="" />
</div>
</div>



<div className={styles.img_escudo}>




<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers15.png')} alt="" />
</div>

<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers16.png')} alt="" />
</div>
<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers17.png')} alt="" />
</div>
<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers18.png')} alt="" />
</div>
</div>

<div className={styles.img_escudo}>


<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers19.png')} alt="" />
</div>

<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers20.png')} alt="" />
</div>
<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers21.png')} alt="" />
</div>
<div  className={styles.stickers}>

<img src={require('../../image/MARCOS/STIKERS/Stikers22.png')} alt="" />
</div>
</div>



          </div>
          </div>
      <div className={styles.barra_tools}>
          <div>
            <img
              src={require("../../image/ESCUDO/BARRA_DE HERRMIENTAS/barra_izquierda.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />

            <img
              src={require("../../image/ESCUDO/BARRA_DE HERRMIENTAS/B1.png")}
              alt=""
              onClick={handleCargarFotoClick}
            />
          </div>
          <div className={styles.btn_tools} onClick={handleMarcos}>
            <img
                src={require("../../image/ESCUDO/BARRA_DE HERRMIENTAS/B2.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools} onClick={handleFondo}>
            <img
                src={require("../../image/ESCUDO/BARRA_DE HERRMIENTAS/B3.png")}
              alt=""
            />
          </div>
          <div className={styles.btn_tools} onClick={handleGlobos}>
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
              onClick={handleStickers}
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
            />
          </div>

          <div >
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
