import styles from "./CreateEscudo.module.css";

export default function CreateEscudo() {
  return (
    <div>
      <div className={styles.escudo_img}>
        <img
          src={require("../../image/home/BOTON_ESCUDO.png")}
          alt="not found"
        />
        <div className={styles.title_escudo}>ESCUDO</div>

      </div>
    </div>
  );
}
