import styles from '../styles/Cabecalho.module.css'

export default function Cabecalho(props){


    return(
        <div className={styles.navbar}>
            <div className={styles.titulo}>
                <h1>Orçamento da Cultura</h1>
                <h2>{props.titulo ?? ''}</h2>
            </div>
        </div>
    )

}