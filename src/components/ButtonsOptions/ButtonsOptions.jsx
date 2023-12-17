import CreateAvatar from "../CreateAvatar/CreateAvatar";
import CreateEscudo from "../CreateEscudo/CreateEscudo";
import CreateMarco from "../CreateMarco/CreateMarco";
import styles from "./ButtonsOptions.module.css";

export default function ButtonsOptions() {
  return (
    <div className={styles.buttons_optiones}>
      <div>
        <CreateAvatar />
      </div>
      <div>
        <CreateMarco />
      </div>
      <div>
        <CreateEscudo />
      </div>
    </div>
  );
}
