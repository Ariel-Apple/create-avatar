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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inputRef = useRef(null);


  
  

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

  const backdropStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro con opacidad
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
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
    
      {open && (
        <div style={backdropStyle}>
          <div>
            <div className={styles.modal}>
        <Box sx={style}>
    
            
  <CanvasMarco/>
           
        </Box>
        </div>
          </div>
        </div>
      )}
    </div>
  );
}
