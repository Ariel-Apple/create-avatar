import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./CreateEscudo.module.css";
import backgroundImage from "../../image/ESCUDO/FONDO.png";
import { fabric } from 'fabric';
import { useMediaQuery } from '@mui/material';
import CanvasEscudo from "./CanvasEscudo";

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
      <div className={styles.escudo_img}>
        <img
          onClick={handleOpen}
          src={require("../../image/home/BOTON_ESCUDO.png")}
          alt=""
        />
        <div className={styles.title_escudo}>ESCUDO</div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // Llama a la función al renderizar el modal
      >
        <Box sx={style}>
    
            
  <div >
    
 <CanvasEscudo/>
  </div>
           
        </Box>
      </Modal>
    </div>
  );
}
