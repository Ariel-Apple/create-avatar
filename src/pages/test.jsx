import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  p: 4,
  boxShadow: "15px 7px 15px #000",
};

const FabricCanvas = () => {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height: 400,
      backgroundColor: "#f0f0f0",
    });

    setCanvas(newCanvas);

    return () => {
      newCanvas.dispose();
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgregarTexto = () => {
    if (canvas) {
      const text = new fabric.IText("Escribe aquí", {
        left: 50,
        top: 50,
        fontSize: 20,
        fontFamily: "Arial",
        fill: "black",
      });

      canvas.add(text);
      canvas.setActiveObject(text);
      text.enterEditing();

      setTimeout(() => {
        text.hiddenTextarea.focus();
      }, 100);
    }
  };

  return (
    <div>
      <button onClick={handleOpen}>Abrir Modal</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button onClick={handleAgregarTexto}>Agregar Texto</button>
          <div>
            <canvas ref={canvasRef} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FabricCanvas;
