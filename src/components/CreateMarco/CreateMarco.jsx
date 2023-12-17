import styles from  "./CreateMarco.module.css"

export default function CreateMarco() {
    return (
        <div>
            <div className={styles.marco_img}>
                <img src={require('../../image/home/BOTON_VIÑETA.png')} alt="" />
            </div>
        </div>
    )
}