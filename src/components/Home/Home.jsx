import Navbar from "./Navbar/Navbar";
import styles from "./Home.module.css";
import ButtonsOptions from "../ButtonsOptions/ButtonsOptions";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className={styles.center_img}>
        <div className={styles.center_rayos} >
            <img src={require('../../image/home/RAYOS.png')} alt="" />

          </div>
     
          
          <div>
        </div>
      </div>
    </div>
  );
}
