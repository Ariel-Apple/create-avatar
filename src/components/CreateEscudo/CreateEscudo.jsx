import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./CreateEscudo.module.css";
import backgroundImage from "../../image/ESCUDO/FONDO.png";
import { fabric } from "fabric";
import { useMediaQuery } from "@mui/material";
import CanvasEscudo from "./CanvasEscudo";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
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
      <div className={styles.escudo_img}>
        <img
          onClick={handleOpen}
          src={require("../../image/home/BOTON_ESCUDO.png")}
          alt=""
        />
        <div className={styles.title_escudo}>ESCUDO</div>
      </div>

      {open && (
        <div style={backdropStyle}>
          <div>
            <div className={styles.modal}>
              
              <Box sx={style}>
                <CanvasEscudo/>
              </Box>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
