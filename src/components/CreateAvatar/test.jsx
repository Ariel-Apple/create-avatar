import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import backgroundImage from '../../image/FONDO_Mesa.png';
import styles from './CreateAvatar.module.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  p: 4,
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  boxShadow: '15px 7px 15px #000',
};

const Test = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <div>
      <div className={styles.btn_avatar}>
        <img
          src={require('../../image/home/BOTON_AVATAR.png')}
          alt="not-found"
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
            {/* ... otras partes de tu código ... */}
            <div>
              <div className={styles.img_avatar} {...getRootProps()} style={{ border: '2px dashed #ddd', padding: '20px', textAlign: 'center' }}>
                <input {...getInputProps()} />
                {image ? (
                  <img src={image} alt="Avatar" style={{ maxWidth: '100%' }} />
                ) : (
                  <p>Arrastra y suelta una imagen aquí o haz clic para seleccionar una.</p>
                )}
              </div>
            </div>
            {/* ... otras partes de tu código ... */}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Test;
